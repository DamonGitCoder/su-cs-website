import { NextRequest, NextResponse } from "next/server";

const DRUPAL_BASE_URL =
  process.env.DRUPAL_BASE_URL ?? "http://3.b.hackathon.devsoc.co.za/web";

/**
 * Transparent proxy to Drupal JSON:API.
 * Solves CORS: browser talks to /api/drupal/..., server talks to Drupal.
 * Usage: fetch('/api/drupal/node/staff?include=field_image')
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const joinedPath = path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const drupalUrl = `${DRUPAL_BASE_URL}/jsonapi/${joinedPath}${searchParams ? `?${searchParams}` : ""}`;

  try {
    const res = await fetch(drupalUrl, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      next: { revalidate: 60 },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to proxy request to Drupal" },
      { status: 502 }
    );
  }
}
