import { createApp } from "vue";
import microApp from "@micro-zoe/micro-app";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./app.vue";
import { setupRouter } from "./router";

const vuetify = createVuetify({
  components,
  directives,
});

export {};

// microApp.start()

// createApp(App).mount("#app");
// window.unmount = () => {
//   app.unmount()
// }

microApp.start();
const app = createApp(App);
setupRouter(app);
app.use(vuetify);
app.mount("#app");
window.unmount = () => {
  app.unmount();
};
