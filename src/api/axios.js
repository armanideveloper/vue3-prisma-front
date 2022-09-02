import axios from 'axios';
import router from "../router/index";
import { useAuthStore } from '../store/index'

axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})
axios.interceptors.response.use(response => {
  return response
}, function (error) {
    const authStore = useAuthStore() 
  if(error.response.status === 401) {
    authStore.logOut().then(() => {
      router.push('/login-register')
    })
  }
  return Promise.reject(error)
})
export default axios
