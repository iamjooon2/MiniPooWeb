const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: '0.0.0.0:5001', //배포 전에 바꿀예정
      changeOrigin: true,
    })
  );
};