/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake large named-export packages so each page only ships the
  // icons/components it actually uses (big win for react-icons & lucide).
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "framer-motion",
      "@mui/material",
    ],
  },
  // Serve modern formats if any next/image usage is added later.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
