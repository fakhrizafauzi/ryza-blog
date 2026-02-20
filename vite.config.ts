import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/ryza-blog", // TODO: Replace YOUR_REPO_NAME with your repository name (e.g., "/my-blog/")
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
