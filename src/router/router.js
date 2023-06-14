import AdminLogin from "../views/AdminLogin"
import NotFound from "../views/NotFound"
import { createRouter, createWebHistory } from 'vue-router';



const routes = [
    { path: '/admin/login', component: AdminLogin },
    { path: '/:pathMatch(.*)', component: NotFound }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;