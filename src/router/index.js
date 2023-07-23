import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getVehicle } from '@/api/vehicle'
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

async function vehicle(to) {
  const { id } = to.params

  try {
    await getVehicle(id)
  } catch (error) {
    if (error.response.status === 404) {
      return { name: 'not-found' }
    }

    throw error
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
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
    },
    {
      path: '/vehicles/:id/edit',
      name: 'vehicles-edit',
      component: () => import('@/views/Vehicles/EditView.vue'),
      beforeEnter: [auth, vehicle]
    }
  ]
})

export default router
