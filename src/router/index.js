import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: () => import('@/views/Vehicles/ListView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

// Route guard for auth routes
router.beforeEach((to) => {
  const { isAuthenticated } = useAuthStore()

  if (to.matched.some((response) => response.meta.auth)) {
    if (!isAuthenticated && to.name !== 'login') {
      return { name: 'login' }
    }
  }
})

export default router
