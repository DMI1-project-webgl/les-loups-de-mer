import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Values from "@/views/Home/Values.vue";
import Actions from "@/views/Home/Actions.vue";

import Experience from "@/views/Experience/Experience.vue";
import Clean from "@/views/Experience/Clean.vue";
import Greenery from "@/views/Experience/Greenery.vue";
import Food from "@/views/Experience/Food.vue";
import Result from "@/views/Experience/Result.vue";

import Shop from "@/views/Shop.vue";
import Newsletter from "@/views/Newsletter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/valeurs",
    name: "Values",
    component: Values,
  },
  {
    path: "/actions",
    name: "Actions",
    component: Actions,
  },
  {
    path: "/experience",
    component: Experience,
    children: [
      { path: '/clean', component: Clean, alias: ['', 'clean'] },
      { path: "/greenery", component: Greenery, alias: ['', 'greenery'] },
      { path: "/food", component: Food, alias: ['', 'food'] },
      { path: "/result", component: Result, alias: ['', 'result'] },
    ],
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/newsletter",
    name: "Newsletter",
    component: Newsletter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;