// vite.config.ts
import react from "file:///C:/Users/Michael/Documents/vite-web-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///C:/Users/Michael/Documents/vite-web-extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///C:/Users/Michael/Documents/vite-web-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Attheviewbox URL Generator",
  description: "Generates URL for Attheviewbox",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: [
    "storage",
    "tabs",
    "nativeMessaging"
  ],
  host_permissions: ["https://www.pacsbin.com/*"],
  content_scripts: [
    {
      matches: [
        "https://www.pacsbin.com/*"
      ],
      js: ["src/pages/content/index.tsx"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon-128.png",
        "icon-32.png"
      ],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.2.0",
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
    "@cornerstonejs/core": "^1.74.8",
    "@cornerstonejs/tools": "^1.74.8",
    "cornerstone-core": "^2.6.1",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "use-chrome-storage": "^1.3.1",
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
var __vite_injected_original_dirname = "C:\\Users\\Michael\\Documents\\vite-web-extension";
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
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNaWNoYWVsXFxcXERvY3VtZW50c1xcXFx2aXRlLXdlYi1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1pY2hhZWxcXFxcRG9jdW1lbnRzXFxcXHZpdGUtd2ViLWV4dGVuc2lvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTWljaGFlbC9Eb2N1bWVudHMvdml0ZS13ZWItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcclxuXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xyXG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5kZXYuanNvbic7XHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XHJcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcclxuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xyXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xyXG5cclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XHJcblxyXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcclxuICAuLi5tYW5pZmVzdCxcclxuICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6IHt9IGFzIE1hbmlmZXN0VjNFeHBvcnQpLFxyXG4gIG5hbWU6IGlzRGV2ID8gYERFVjogJHsgbWFuaWZlc3QubmFtZSB9YCA6IG1hbmlmZXN0Lm5hbWUsXHJcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbn07XHJcblxyXG4vLyBwbHVnaW4gdG8gcmVtb3ZlIGRldiBpY29ucyBmcm9tIHByb2QgYnVpbGRcclxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyAoYXBwbHk6IGJvb2xlYW4pIHtcclxuICBpZiAoYXBwbHkpIHJldHVybiBudWxsXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3RyaXAtZGV2LWljb25zJyxcclxuICAgIHJlc29sdmVJZCAoc291cmNlOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gJ3ZpcnR1YWwtbW9kdWxlJyA/IHNvdXJjZSA6IG51bGxcclxuICAgIH0sXHJcbiAgICByZW5kZXJTdGFydCAob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xyXG4gICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxyXG4gICAgICBmcy5ybShyZXNvbHZlKG91dERpciwgJ2Rldi1pY29uLTMyLnBuZycpLCAoKSA9PiBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0zMi5wbmcgZnJtIHByb2QgYnVpbGRgKSlcclxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsICdkZXYtaWNvbi0xMjgucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTEyOC5wbmcgZnJtIHByb2QgYnVpbGRgKSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0BzcmMnOiByb290LFxyXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcclxuICAgICAgJ0BwYWdlcyc6IHBhZ2VzRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoe1xyXG4gICAgICBtYW5pZmVzdDogZXh0ZW5zaW9uTWFuaWZlc3QgYXMgTWFuaWZlc3RWM0V4cG9ydCxcclxuICAgICAgY29udGVudFNjcmlwdHM6IHtcclxuICAgICAgICBpbmplY3RDc3M6IHRydWUsXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgc3RyaXBEZXZJY29ucyhpc0RldilcclxuICBdLFxyXG4gIHB1YmxpY0RpcixcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyLFxyXG4gICAgc291cmNlbWFwOiBpc0RldixcclxuICAgIGVtcHR5T3V0RGlyOiAhaXNEZXZcclxuICB9LFxyXG59KTtcclxuIiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJBdHRoZXZpZXdib3ggVVJMIEdlbmVyYXRvclwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJHZW5lcmF0ZXMgVVJMIGZvciBBdHRoZXZpZXdib3hcIixcclxuICBcIm9wdGlvbnNfdWlcIjoge1xyXG4gICAgXCJwYWdlXCI6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiXHJcbiAgfSxcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxyXG4gIH0sXHJcbiAgXCJhY3Rpb25cIjoge1xyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcclxuICAgICAgXCIzMlwiOiBcImljb24tMzIucG5nXCJcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBcImljb25zXCI6IHtcclxuICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcclxuICB9LFxyXG4gIFwicGVybWlzc2lvbnNcIjogW1wic3RvcmFnZVwiLFxyXG4gIFwidGFic1wiLFwibmF0aXZlTWVzc2FnaW5nXCJcclxuXSxcclxuICBcImhvc3RfcGVybWlzc2lvbnNcIjpbXCJodHRwczovL3d3dy5wYWNzYmluLmNvbS8qXCJdLFxyXG4gIFwiY29udGVudF9zY3JpcHRzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJtYXRjaGVzXCI6IFtcclxuICAgICAgICBcImh0dHBzOi8vd3d3LnBhY3NiaW4uY29tLypcIlxyXG4gICAgICBdLFxyXG4gICAgICBcImpzXCI6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LnRzeFwiXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJkZXZ0b29sc19wYWdlXCI6IFwic3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWxcIixcclxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcclxuICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcclxuICAgICAgICBcImljb24tMTI4LnBuZ1wiLFxyXG4gICAgICAgIFwiaWNvbi0zMi5wbmdcIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW11cclxuICAgIH1cclxuICBdXHJcbn1cclxuIiwgIntcclxuICBcImFjdGlvblwiOiB7XHJcbiAgICBcImRlZmF1bHRfaWNvblwiOiBcInB1YmxpYy9kZXYtaWNvbi0zMi5wbmdcIixcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcclxuICB9LFxyXG4gIFwiaWNvbnNcIjoge1xyXG4gICAgXCIxMjhcIjogXCJwdWJsaWMvZGV2LWljb24tMTI4LnBuZ1wiXHJcbiAgfSxcclxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcclxuICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcclxuICAgICAgICBcImRldi1pY29uLTEyOC5wbmdcIixcclxuICAgICAgICBcImRldi1pY29uLTMyLnBuZ1wiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXVxyXG4gICAgfVxyXG4gIF1cclxufVxyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcInZpdGUtd2ViLWV4dGVuc2lvblwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMi4wXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxyXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gIFwicmVwb3NpdG9yeVwiOiB7XHJcbiAgICBcInR5cGVcIjogXCJnaXRcIixcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0pvaG5CcmEvd2ViLWV4dGVuc2lvbi5naXRcIlxyXG4gIH0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImRldlwiOiBcIm5vZGVtb25cIlxyXG4gIH0sXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY29ybmVyc3RvbmVqcy9jb3JlXCI6IFwiXjEuNzQuOFwiLFxyXG4gICAgXCJAY29ybmVyc3RvbmVqcy90b29sc1wiOiBcIl4xLjc0LjhcIixcclxuICAgIFwiY29ybmVyc3RvbmUtY29yZVwiOiBcIl4yLjYuMVwiLFxyXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4zLjFcIixcclxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJ1c2UtY2hyb21lLXN0b3JhZ2VcIjogXCJeMS4zLjFcIixcclxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTEuMFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjIzXCIsXHJcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI2OFwiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMi4xMVwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4xXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMy4wXCIsXHJcbiAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC43XCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuOC4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy44LjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4yLjFcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjkuMVwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuOC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zNC4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjJcIixcclxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXHJcbiAgICBcIm5vZGVtb25cIjogXCJeMy4xLjBcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjNcIixcclxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjJcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4xMVwiXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVUsT0FBTyxXQUFXO0FBQ3JWLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQTZCOzs7QUNKdEM7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFlBQWM7QUFBQSxJQUNaLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixjQUFnQjtBQUFBLE1BQ2QsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsYUFBZTtBQUFBLElBQUM7QUFBQSxJQUNoQjtBQUFBLElBQU87QUFBQSxFQUNUO0FBQUEsRUFDRSxrQkFBbUIsQ0FBQywyQkFBMkI7QUFBQSxFQUMvQyxpQkFBbUI7QUFBQSxJQUNqQjtBQUFB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
