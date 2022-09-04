import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	server: {
		proxy: {
			"^/api/v1/.*": {
				target: "https://sedna.univ-fcomte.fr",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, "/jsp/custom/ufc"),
			},
		},
	},
});
