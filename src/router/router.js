import AdminLogin from "../views/AdminLogin"
import NotFound from "../views/NotFound"
import DashBoard from "../views/DashBoard"
import { createRouter, createWebHistory } from 'vue-router';
import { isLogin } from "@/helpers/isLogin";

const routes = [
    { path: '/admin/login',
      component: AdminLogin,
    },
    {
      path: '/admin/dashboard',
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)', component: NotFound }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach( async (to, from, next) => {
    const isLoginState = await isLogin();
    if (to.meta.requiresAuth && !isLoginState) {
      next('/');
    } else {
      next();
    }
  });

export default router;