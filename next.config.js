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
  headers: async () => [
    {
      has: [
        {
          type: "host",
          value: "api.ensideas.com",
        },
      ],
      source: "/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        },
      ],
    },
  ],
};
