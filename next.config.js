module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    domains: ["placekitten.com", "placebear.com", "unsplash.it"],
    loader: "imgix",
    path: ""
  },
  swcMinify: true
};
