import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

function guest() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return { name: 'vehicles' }
  }
}

function auth() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return { name: 'login' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
      beforeEnter: guest
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
      beforeEnter: guest
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile/EditView.vue'),
      beforeEnter: auth
    },
    {
      path: '/profile/change-password',
      name: 'change-password',
      component: () => import('@/views/Profile/ChangePassword.vue'),
      beforeEnter: auth
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: () => import('@/views/Vehicles/ListView.vue'),
      beforeEnter: auth
    },
    {
      path: '/vehicles/create',
      name: 'vehicles-create',
      component: () => import('@/views/Vehicles/CreateView.vue'),
      beforeEnter: auth
    }
  ]
})

export default router
