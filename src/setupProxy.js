const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://sedna.univ-fcomte.fr",
			pathRewrite: {
				"^/api/v1": "/jsp/custom/ufc",
			},
			changeOrigin: true,
		})
	);
};
