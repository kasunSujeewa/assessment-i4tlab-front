import { createRouter, createWebHistory } from 'vue-router';
import AuthTabsComponent from '@/components/authtabs/AuthTabsComponent.vue';
import DashboardComponent from '@/components/DashboardComponent.vue';

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: AuthTabsComponent,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  }

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
    else next()
  })

export default router;
