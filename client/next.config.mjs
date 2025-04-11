/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },

      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
    ],
  },
};

export default nextConfig;
