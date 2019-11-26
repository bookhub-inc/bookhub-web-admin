import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";



import Home from "./components/home/Home.vue";
import Livro from "./components/livro/Livro.vue";
import Usuario from "./components/usuario/Usuario.vue";
import Topico from "./components/topico/Topico.vue";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import MaterialService from './service/MaterialService';
import {ConfigClass} from './classes/ConfigClass';

let server = `${ConfigClass.getUrlApi().toString()}`

Vue.prototype.$materialService = MaterialService;
Vue.prototype.$server = server;

Vue.use(VueRouter);


Vue.config.productionTip = false;

const routes = [
  { name: "Livro", path: "/livro", component: Livro },
  { name: "Home", path: "/home", component: Home },
  { name: "Usuario", path: "/usuario", component: Usuario},
  { name: "Topico", path: "/topico", component: Topico}
];

const router = new VueRouter({mode: 'history', routes: routes})


new Vue({
  render: h => h(App),
  router
}).$mount("#app");
