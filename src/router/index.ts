import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Clean from "@/views/Clean.vue";
import Greenery from "@/views/Greenery.vue";
import Food from "@/views/Food.vue";
import Result from "@/views/Result.vue";
import Shop from "@/views/Shop.vue";
import Newsletter from "@/views/Newsletter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/clean",
    name: "Clean",
    component: Clean,
  },
  {
    path: "/greenery",
    name: "Greenery",
    component: Greenery,
  },
  {
    path: "/food",
    name: "Food",
    component: Food,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
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