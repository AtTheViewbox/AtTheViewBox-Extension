// vite.config.ts
import react from "file:///Users/MKF55412/Documents/AtTheViewBox-Extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import path from "path";
import fs from "fs";
import { defineConfig } from "file:///Users/MKF55412/Documents/AtTheViewBox-Extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///Users/MKF55412/Documents/AtTheViewBox-Extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import wasm from "file:///Users/MKF55412/Documents/AtTheViewBox-Extension/node_modules/vite-plugin-wasm/exports/import.mjs";
import topLevelAwait from "file:///Users/MKF55412/Documents/AtTheViewBox-Extension/node_modules/vite-plugin-top-level-await/exports/import.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "AtTheViewBox URL Generator",
  description: "Generates URL for AtTheViewBox",
  icons: {
    "128": "icon.png"
  },
  permissions: [
    "storage"
  ],
  host_permissions: ["https://www.pacsbin.com/c/*"],
  action: {
    default_icon: "public/icon.png",
    default_popup: "src/pages/popup/index.html"
  },
  content_scripts: [
    {
      matches: [
        "https://www.pacsbin.com/c/*"
      ],
      js: ["src/pages/content/index.tsx"]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "src/pages/content/inject.js"
      ],
      matches: [
        "https://www.pacsbin.com/*"
      ]
    }
  ],
  externally_connectable: {
    ids: ["*"]
  },
  version: "1.1"
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/icon.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/icon.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png",
        "icon.png",
        "src/pages/content/inject.js"
      ],
      matches: ["https://www.pacsbin.com/*"]
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.2.4",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@cornerstonejs/core": "^1.66.9",
    "@cornerstonejs/dicom-image-loader": "^1.66.9",
    "@cornerstonejs/streaming-image-volume-loader": "^1.66.9",
    "@cornerstonejs/tools": "^1.66.9",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    buffer: "^6.0.3",
    Buffer: "^0.0.0",
    "class-variance-authority": "^0.7.0",
    clsx: "^2.1.1",
    "dynamic-react-grid": "^0.2.0",
    "lucide-react": "^0.379.0",
    "rc-slider": "^10.6.2",
    "rc-tooltip": "^6.2.0",
    react: "^18.2.0",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^18.2.0",
    "react-modern-drawer": "^1.3.1",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "use-chrome-storage": "^1.3.1",
    vaul: "^0.9.1",
    "vite-plugin-top-level-await": "^1.4.1",
    "vite-plugin-wasm": "^3.3.0",
    "webextension-polyfill": "^0.11.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@types/chrome": "^0.0.268",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.2",
    typescript: "^5.4.5",
    vite: "^5.2.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/MKF55412/Documents/AtTheViewBox-Extension";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(resolve(outDir2, "dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png frm prod build`));
      fs.rm(resolve(outDir2, "dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png frm prod build`));
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@cornerstonejs/tools": "@cornerstonejs/tools/dist/umd/index.js",
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
  worker: {
    // Not needed with vite-plugin-top-level-await >= 1.3.0
    // format: "es",
    plugins: [
      wasm(),
      topLevelAwait()
    ]
  },
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvTUtGNTU0MTIvRG9jdW1lbnRzL0F0VGhlVmlld0JveC1FeHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9NS0Y1NTQxMi9Eb2N1bWVudHMvQXRUaGVWaWV3Qm94LUV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvTUtGNTU0MTIvRG9jdW1lbnRzL0F0VGhlVmlld0JveC1FeHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgcmVzb2x2ZX0gZnJvbSAncGF0aCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyeCwgTWFuaWZlc3RWM0V4cG9ydCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XG5pbXBvcnQgd2FzbSBmcm9tIFwidml0ZS1wbHVnaW4td2FzbVwiO1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbic7XG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5kZXYuanNvbic7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgJ3BhZ2VzJyk7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsICdhc3NldHMnKTtcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XG5cbmNvbnN0IGV4dGVuc2lvbk1hbmlmZXN0ID0ge1xuICAuLi5tYW5pZmVzdCxcbiAgLi4uKGlzRGV2ID8gZGV2TWFuaWZlc3QgOiB7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSxcbiAgbmFtZTogaXNEZXYgPyBgREVWOiAkeyBtYW5pZmVzdC5uYW1lIH1gIDogbWFuaWZlc3QubmFtZSxcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG59O1xuXG4vLyBwbHVnaW4gdG8gcmVtb3ZlIGRldiBpY29ucyBmcm9tIHByb2QgYnVpbGRcbmZ1bmN0aW9uIHN0cmlwRGV2SWNvbnMgKGFwcGx5OiBib29sZWFuKSB7XG4gIGlmIChhcHBseSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzdHJpcC1kZXYtaWNvbnMnLFxuICAgIHJlc29sdmVJZCAoc291cmNlOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzb3VyY2UgPT09ICd2aXJ0dWFsLW1vZHVsZScgPyBzb3VyY2UgOiBudWxsXG4gICAgfSxcbiAgICByZW5kZXJTdGFydCAob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xuICAgICAgY29uc3Qgb3V0RGlyID0gb3V0cHV0T3B0aW9ucy5kaXJcbiAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCAnZGV2LWljb24tMzIucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApKVxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsICdkZXYtaWNvbi0xMjgucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTEyOC5wbmcgZnJtIHByb2QgYnVpbGRgKSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBjb3JuZXJzdG9uZWpzL3Rvb2xzXCI6IFwiQGNvcm5lcnN0b25lanMvdG9vbHMvZGlzdC91bWQvaW5kZXguanNcIixcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgJ0BzcmMnOiByb290LFxuICAgICAgJ0Bhc3NldHMnOiBhc3NldHNEaXIsXG4gICAgICAnQHBhZ2VzJzogcGFnZXNEaXIsXG4gICAgICBcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB3YXNtKCksXG4gICAgdG9wTGV2ZWxBd2FpdCgpLFxuICAgIGNyeCh7XG4gICAgICBtYW5pZmVzdDogZXh0ZW5zaW9uTWFuaWZlc3QgYXMgTWFuaWZlc3RWM0V4cG9ydCxcbiAgICAgIGNvbnRlbnRTY3JpcHRzOiB7XG4gICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICBzdHJpcERldkljb25zKGlzRGV2KSxcbiAgICBcbiAgXSwgIFxuICB3b3JrZXI6IHtcbiAgICAvLyBOb3QgbmVlZGVkIHdpdGggdml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0ID49IDEuMy4wXG4gICAgLy8gZm9ybWF0OiBcImVzXCIsXG4gICAgcGx1Z2luczogW1xuICAgICAgd2FzbSgpLFxuICAgICAgdG9wTGV2ZWxBd2FpdCgpXG4gICAgXVxuICB9LFxuICBcbiAgcHVibGljRGlyLFxuICBidWlsZDoge1xuICAgIG91dERpcixcbiAgICBzb3VyY2VtYXA6IGlzRGV2LFxuICAgIGVtcHR5T3V0RGlyOiAhaXNEZXZcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIkF0VGhlVmlld0JveCBVUkwgR2VuZXJhdG9yXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJHZW5lcmF0ZXMgVVJMIGZvciBBdFRoZVZpZXdCb3hcIixcblxuICBcImljb25zXCI6IHtcbiAgICBcIjEyOFwiOiBcImljb24ucG5nXCJcbiAgfSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJzdG9yYWdlXCJcbl0sXG4gIFwiaG9zdF9wZXJtaXNzaW9uc1wiOltcImh0dHBzOi8vd3d3LnBhY3NiaW4uY29tL2MvKlwiXSxcbiAgXCJhY3Rpb25cIjoge1xuICAgIFwiZGVmYXVsdF9pY29uXCI6IFwicHVibGljL2ljb24ucG5nXCIsXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIlxuICB9LFxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAge1xuICAgICAgXCJtYXRjaGVzXCI6IFtcbiAgICAgICAgXCJodHRwczovL3d3dy5wYWNzYmluLmNvbS9jLypcIlxuICAgICAgXSxcbiAgICAgIFwianNcIjogW1wic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4XCJdXG4gICAgfVxuICBdLFxuICBcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xuICAgIHtcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcbiAgICAgICAgXCJzcmMvcGFnZXMvY29udGVudC9pbmplY3QuanNcIlxuICAgICAgXSxcbiAgICAgIFwibWF0Y2hlc1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93d3cucGFjc2Jpbi5jb20vKlwiXG4gICAgICAgIFxuICAgICAgXVxuICAgIH1cbiAgXSxcbiAgXCJleHRlcm5hbGx5X2Nvbm5lY3RhYmxlXCI6IHtcbiAgICBcImlkc1wiOiBbXCIqXCJdfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4xXCJcbn1cbiIsICJ7XG4gIFwiYWN0aW9uXCI6IHtcbiAgICBcImRlZmF1bHRfaWNvblwiOiBcInB1YmxpYy9pY29uLnBuZ1wiLFxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcbiAgfSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxMjhcIjpcInB1YmxpYy9pY29uLnBuZ1wiXG4gIH0sXG4gIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICB7XG4gICAgICBcInJlc291cmNlc1wiOiBbXG4gICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICBcImRldi1pY29uLTEyOC5wbmdcIixcbiAgICAgICAgXCJkZXYtaWNvbi0zMi5wbmdcIixcbiAgICAgICAgXCJpY29uLnBuZ1wiLFxuICAgICAgICBcInNyYy9wYWdlcy9jb250ZW50L2luamVjdC5qc1wiXG4gICAgICBdLFxuICAgICAgXCJtYXRjaGVzXCI6IFtcImh0dHBzOi8vd3d3LnBhY3NiaW4uY29tLypcIl1cbiAgICB9XG4gIF1cbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcInZpdGUtd2ViLWV4dGVuc2lvblwiLFxuICBcInZlcnNpb25cIjogXCIxLjIuNFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzaW1wbGUgY2hyb21lIGV4dGVuc2lvbiB0ZW1wbGF0ZSB3aXRoIFZpdGUsIFJlYWN0LCBUeXBlU2NyaXB0IGFuZCBUYWlsd2luZCBDU1MuXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0pvaG5CcmEvd2ViLWV4dGVuc2lvbi5naXRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJub2RlbW9uXCJcbiAgfSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb3JuZXJzdG9uZWpzL2NvcmVcIjogXCJeMS42Ni45XCIsXG4gICAgXCJAY29ybmVyc3RvbmVqcy9kaWNvbS1pbWFnZS1sb2FkZXJcIjogXCJeMS42Ni45XCIsXG4gICAgXCJAY29ybmVyc3RvbmVqcy9zdHJlYW1pbmctaW1hZ2Utdm9sdW1lLWxvYWRlclwiOiBcIl4xLjY2LjlcIixcbiAgICBcIkBjb3JuZXJzdG9uZWpzL3Rvb2xzXCI6IFwiXjEuNjYuOVwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiOiBcIl4xLjAuNVwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWxhYmVsXCI6IFwiXjIuMC4yXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2Nyb2xsLWFyZWFcIjogXCJeMS4wLjVcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbGlkZXJcIjogXCJeMS4xLjJcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMC4yXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtdG9hc3RcIjogXCJeMS4xLjVcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC10b29sdGlwXCI6IFwiXjEuMC43XCIsXG4gICAgXCJidWZmZXJcIjogXCJeNi4wLjNcIixcbiAgICBcIkJ1ZmZlclwiOiBcIl4wLjAuMFwiLFxuICAgIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI6IFwiXjAuNy4wXCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4xXCIsXG4gICAgXCJkeW5hbWljLXJlYWN0LWdyaWRcIjogXCJeMC4yLjBcIixcbiAgICBcImx1Y2lkZS1yZWFjdFwiOiBcIl4wLjM3OS4wXCIsXG4gICAgXCJyYy1zbGlkZXJcIjogXCJeMTAuNi4yXCIsXG4gICAgXCJyYy10b29sdGlwXCI6IFwiXjYuMi4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRuZFwiOiBcIl4xNi4wLjFcIixcbiAgICBcInJlYWN0LWRuZC1odG1sNS1iYWNrZW5kXCI6IFwiXjE2LjAuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtbW9kZXJuLWRyYXdlclwiOiBcIl4xLjMuMVwiLFxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi4zLjBcIixcbiAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcbiAgICBcInVzZS1jaHJvbWUtc3RvcmFnZVwiOiBcIl4xLjMuMVwiLFxuICAgIFwidmF1bFwiOiBcIl4wLjkuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0XCI6IFwiXjEuNC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi13YXNtXCI6IFwiXjMuMy4wXCIsXG4gICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMS4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMjNcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI2OFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuMTFcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMy4wXCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuN1wiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy44LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy44LjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMi4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yOS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzQuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMlwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJub2RlbW9uXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjNcIixcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC41XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4xMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsT0FBTyxXQUFXO0FBQ3BWLFNBQVMsZUFBYztBQUN2QixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBQ2YsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxXQUE2QjtBQUN0QyxPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7OztBQ1AxQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBRWYsT0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGFBQWU7QUFBQSxJQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNFLGtCQUFtQixDQUFDLDZCQUE2QjtBQUFBLEVBQ2pELFFBQVU7QUFBQSxJQUNSLGNBQWdCO0FBQUEsSUFDaEIsZUFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0Es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SUFBTSxXQUFXLFFBQVEsTUFBTSxPQUFPO0FBQ3RDLElBQU0sWUFBWSxRQUFRLE1BQU0sUUFBUTtBQUN4QyxJQUFNLFNBQVMsUUFBUSxrQ0FBVyxNQUFNO0FBQ3hDLElBQU0sWUFBWSxRQUFRLGtDQUFXLFFBQVE7QUFFN0MsSUFBTSxRQUFRLFFBQVEsSUFBSSxZQUFZO0FBRXRDLElBQU0sb0JBQW9CO0FBQUEsRUFDeEIsR0FBRztBQUFBLEVBQ0gsR0FBSSxRQUFRLHVCQUFjLENBQUM7QUFBQSxFQUMzQixNQUFNLFFBQVEsUUFBUyxpQkFBUyxJQUFLLEtBQUssaUJBQVM7QUFBQSxFQUNuRCxTQUFTLGdCQUFJO0FBQ2Y7QUFHQSxTQUFTLGNBQWUsT0FBZ0I7QUFDdEMsTUFBSTtBQUFPLFdBQU87QUFFbEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVyxRQUFnQjtBQUN6QixhQUFPLFdBQVcsbUJBQW1CLFNBQVM7QUFBQSxJQUNoRDtBQUFBLElBQ0EsWUFBYSxlQUFvQixjQUFtQjtBQUNsRCxZQUFNQSxVQUFTLGNBQWM7QUFDN0IsU0FBRyxHQUFHLFFBQVFBLFNBQVEsaUJBQWlCLEdBQUcsTUFBTSxRQUFRLElBQUksd0NBQXdDLENBQUM7QUFDckcsU0FBRyxHQUFHLFFBQVFBLFNBQVEsa0JBQWtCLEdBQUcsTUFBTSxRQUFRLElBQUkseUNBQXlDLENBQUM7QUFBQSxJQUN6RztBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLHdCQUF3QjtBQUFBLE1BQ3hCLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFFWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWMsS0FBSztBQUFBLEVBRXJCO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQTtBQUFBLElBR04sU0FBUztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsY0FBYztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUFBLEVBRUE7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxhQUFhLENBQUM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIm91dERpciJdCn0K
