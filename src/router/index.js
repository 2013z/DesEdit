import Vue from "vue";
import Router from "vue-router";
import index from "@/page/index";

Vue.use(Router);

export default new Router({
  // linkActiveClass: "active",
  // 访问模式
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    }
  ]
});
