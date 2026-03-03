import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "3.b.hackathon.devsoc.co.za",
      },
      {
        protocol: "https",
        hostname: "3.b.hackathon.devsoc.co.za",
      },
      {
        protocol: "https",
        hostname: "www.su.ac.za",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src https://maps.google.com https://www.google.com https://www.openstreetmap.org",
              "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://3.b.hackathon.devsoc.co.za https://*.tile.openstreetmap.org https://*.openstreetmap.org",
              "connect-src 'self' https://*.googleapis.com http://3.b.hackathon.devsoc.co.za https://3.b.hackathon.devsoc.co.za https://*.openstreetmap.org",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
