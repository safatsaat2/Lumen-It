/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // @react-pdf/renderer must stay a Node dependency; bundling it breaks fonts.
  serverExternalPackages: ["@react-pdf/renderer"],
  async redirects() {
    return [
      {
        source: "/de/services/wordpress-development",
        destination: "/de/services/wordpress-entwicklung-dortmund",
        permanent: true,
      },
      {
        source: "/en/services/wordpress-entwicklung-dortmund",
        destination: "/en/services/wordpress-development",
        permanent: true,
      },
      // GSC: malformed URLs where path + link label were concatenated
      {
        source: "/de/templatesTemplates",
        destination: "/de/templates",
        permanent: true,
      },
      {
        source: "/de/impressumImpressum",
        destination: "/de/impressum",
        permanent: true,
      },
      {
        source: "/en/brandingBranding",
        destination: "/en/branding",
        permanent: true,
      },
      {
        source: "/de/workProjekte",
        destination: "/de/work",
        permanent: true,
      },
      {
        source: "/en/workWork",
        destination: "/en/work",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Do not attach security headers to Next static assets (CSS/JS chunks)
        source: "/((?!_next/static|_next/image|favicon.ico|favicon.svg|fav.jpeg|manifest.webmanifest|logo.svg).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
