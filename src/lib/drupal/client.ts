import type { DrupalListResponse, DrupalSingleResponse } from "@/types/drupal";

const DRUPAL_BASE_URL =
  process.env.DRUPAL_BASE_URL ?? "http://3.b.hackathon.devsoc.co.za/web";

/**
 * Core fetch wrapper for Drupal JSON:API calls.
 * All requests are server-side; CORS is not an issue.
 */
export async function drupalFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  tags: string[] = [],
  revalidate: number = 3600
): Promise<T | null> {
  const url = new URL(`${DRUPAL_BASE_URL}/jsonapi/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/vnd.api+json",
      },
      next: {
        revalidate,
        ...(tags.length > 0 ? { tags } : {}),
      },
    });

    if (!res.ok) {
      // Expected during development while Drupal content types are being configured.
      // Falls back to mock data automatically — not an application error.
      if (process.env.NODE_ENV === "development") {
        console.debug(`[Drupal] ${res.status} for ${endpoint} — using mock data fallback`);
      }
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[Drupal] fetch failed for ${endpoint} — using mock data fallback`);
    }
    void err;
    return null;
  }
}

export async function drupalList<TNode>(
  endpoint: string,
  params: Record<string, string> = {},
  tags: string[] = []
): Promise<DrupalListResponse<TNode> | null> {
  return drupalFetch<DrupalListResponse<TNode>>(endpoint, params, tags);
}

export async function drupalSingle<TNode>(
  endpoint: string,
  params: Record<string, string> = {},
  tags: string[] = []
): Promise<DrupalSingleResponse<TNode> | null> {
  return drupalFetch<DrupalSingleResponse<TNode>>(endpoint, params, tags);
}

export { DRUPAL_BASE_URL };
