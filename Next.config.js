// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",   // for Cloudinary
      "cdn.chec.io",          // for Commerce.js product images
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "").replace("/","") // for Supabase storage
    ]
  },
  env: {
    // Already pulled from your .env.local
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_IG_USER_ID: process.env.NEXT_PUBLIC_IG_USER_ID,
    NEXT_PUBLIC_IG_ACCESS_TOKEN: process.env.NEXT_PUBLIC_IG_ACCESS_TOKEN,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  }
});