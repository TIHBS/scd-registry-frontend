import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import Toast, { POSITION, useToast } from "vue-toastification";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router).mount("#app");
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
});

interface ErrorMessage {
  message: string;
}

app.config.errorHandler = (err, _vm, _info) => {
  useToast().error((err as ErrorMessage).message);
};

app.config.warnHandler = (msg, _vm, _info) => {
  useToast().warning(msg);
};
