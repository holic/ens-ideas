/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => ({
    beforeFiles: [
      {
        has: [
          {
            type: "host",
            value: "api.ensideas.com",
          },
        ],
        source: "/:path*",
        destination: "/api/:path*",
      },
    ],
  }),
};
