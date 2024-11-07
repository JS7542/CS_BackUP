const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://184.73.92.129:9000/",
      changeOrigin: true,
    })
  );
  app.use(
    "/amazon",
    createProxyMiddleware({
      target: "https://senierproject.s3.amazonaws.com/",
      changeOrigin: true,
    })
  );
};
