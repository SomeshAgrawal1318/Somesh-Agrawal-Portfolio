/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    const headers = [
      {
        source: "/(.*)",
        headers: [
          // SAMEORIGIN (not DENY) so the resume page can embed its own PDF;
          // still blocks other sites from framing us (clickjacking protection).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];

    // Long-lived immutable caching is only safe in production, where assets are
    // content-hashed. In dev, Turbopack reuses stable chunk URLs, so caching
    // them "immutable" makes the browser serve stale bundles after every edit.
    if (process.env.NODE_ENV === "production") {
      headers.push(
        {
          source: "/assets/(.*)",
          headers: [
            { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          ],
        },
        {
          source: "/_next/static/(.*)",
          headers: [
            { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          ],
        }
      );
    }

    return headers;
  },
};

export default nextConfig;
