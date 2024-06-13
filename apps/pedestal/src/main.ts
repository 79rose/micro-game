import { createApp } from "vue";
// import microApp from "@micro-zoe/micro-app";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Toast from "vue-toastification";
import { VNumberInput } from "vuetify/labs/VNumberInput";
import App from "./app.vue";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { setupRouter } from "./router";

const vuetify = createVuetify({
  directives,
  components: {
    VNumberInput,
    ...components,
  },
});

// export {};

// microApp.start()

// createApp(App).mount("#app");
// window.unmount = () => {
//   app.unmount()
// }

// microApp.start();
const app = createApp(App);
setupRouter(app);
app.use(vuetify);
app.use(Toast);
app.mount("#app");
// window.unmount = () => {
//   app.unmount();
// };
