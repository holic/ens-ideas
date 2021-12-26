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
  redirects: async () => [
    {
      has: [
        {
          type: "host",
          value: "ensideas.com",
        },
      ],
      source: "/api/:path*",
      destination: "https://api.ensideas.com/:path*",
      permanent: false,
    },
  ],
};
