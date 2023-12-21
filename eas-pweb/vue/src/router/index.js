import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Chatting from "../views/Chatting.vue";
// import NotFound from "../views/Page404.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signin", name: "Signin", component: Signin },
  { path: "/chats/:id", name: "Chatting", component: Chatting },
  // { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;