import { createRouter, createWebHistory } from 'vue-router';
import AuthTabsComponent from '@/components/authtabs/AuthTabsComponent.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DashboardComponent from '@/components/DashboardComponent.vue';

const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
  {
    path: '/login',
    name: 'Login',
    component: AuthTabsComponent,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isAuthenticated = () => {
    // Replace with your actual authentication check
    return !!localStorage.getItem('authToken');
  }

// Navigation Guard
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
    else next()
  })

export default router;
