import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/index'

const routes = [
  {
    path: '/login-register',
    name: 'LoginRegister',
    component: () => import('../views/LoginRegister.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    redirect: `/team`,
    children: [
        {
            name: "Team",
            path: "team",
            component: () => import('../views/dashboard/Team.vue')
        },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next)=>{
  const authStore = useAuthStore()
  if (to.name !== 'LoginRegister' && localStorage.getItem("token")){
    await authStore.auth().then(()=>{
      next()
    }).catch(()=>{
      next('/login-register')
    })
  }
  else if ( to.name !== 'LoginRegister' && !localStorage.getItem("token") ){
    next('/login-register')
  } else if (to.name === 'LoginRegister' && localStorage.getItem("token")){
      next('/dashboard')
  } else {
    next();
  }
})

export default router
