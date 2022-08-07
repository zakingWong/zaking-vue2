const VueServerRenderer = require("vue-server-renderer");
const Koa = require("koa");
const Router = require("@koa/router");
const fs = require("fs");
const path = require("path");
const KoaStatic = require("koa-static");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

let app = new Koa();
let router = new Router();

const templateContent = fs.readFileSync(
  path.resolve(__dirname, "./dist/index.html"),
  "utf-8"
);
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template: templateContent,
  clientManifest,
});
router.get("/(.*)", async (ctx) => {
  try {
    ctx.body = await render.renderToString({ url: ctx.url });
  } catch (error) {
    if (error.code === 404) {
      ctx.body = "page not found";
    }
  }
});
app.use(KoaStatic(path.resolve(__dirname, "dist")));
app.use(router.routes());
app.listen(3000);
