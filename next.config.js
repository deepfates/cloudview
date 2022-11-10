/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dl.airtable.com",
      "fqbyocakhbhchhfvnkcu.supabase.co",
      "adbnuoiifopotfxnxesm.supabase.co",
      "localhost:3000",
      "user-upload-worker.drysys.workers.dev",
      "image-gen-worker.drysys.workers.dev",
      "lh3.googleusercontent.com",
    ],
  },
}

module.exports = nextConfig
