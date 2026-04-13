import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        city: resolve(__dirname, "src/city/index.html"),
        coiffure_listing: resolve(__dirname, "src/coiffure_listing/index.html"),
        listing_room: resolve(__dirname, "src/listing_room/index.html"),
        payment: resolve(__dirname, "src/payment/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        booking: resolve(__dirname, "src/booking/index.html"),
      },
    },
  },
});
