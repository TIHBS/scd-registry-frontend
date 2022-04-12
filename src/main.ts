import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import Toast, { POSITION, useToast } from "vue-toastification";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toastification/dist/index.css";
import "vue-json-pretty/lib/styles.css";

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router).mount("#app");
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
});

interface ErrorMessage {
  message: string;
}

function onError(message: string) {
  console.error(message);
  useToast().error(message);
}

app.config.errorHandler = (err, _vm, _info) => {
  onError((err as ErrorMessage).message);
};

window.onerror = function (message, source, lineno, colno, error) {
  onError(message.toString());
};

app.config.warnHandler = (msg, _vm, _info) => {
  console.warn(msg);
  useToast().warning(msg);
};
