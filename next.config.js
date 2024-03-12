/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "roomimg.stream.highwebmedia.com",
      "blob:https://chaturbate.com/",
      "https://chaturbate.com/",
      "www.youtube.com",
      "https://www.youtube.com/",
      "https://cherry.tv/",
      "https://cherry.tv/", "https://s3.cherry.tv/", "s3.cherry.tv", "thumbnails.cherry.tv"
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig
