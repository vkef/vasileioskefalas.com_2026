import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vasileios Kefalas",
    short_name: "VK",
    description: "Portfolio of Vasileios Kefalas, full stack developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/logoico.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/new-logo-vk.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
