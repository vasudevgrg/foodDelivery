import proxy from "http-proxy-middleware";
module.exports = function(app) {
    app.use(proxy("/auth/google", { target: "http://localhost:5002" }));
    app.use(proxy("/api/**", { target: "http://localhost:5002" }));
};