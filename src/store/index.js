import { defineStore } from 'pinia'
import axios from "../api/axios"
export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: null 
  }),
  getters: {
    double: state => state.count,
  },
  actions: {
      auth(){
        return new Promise( async (resolve, reject) => {
          await axios.get('/auth').then((res)=> {
          resolve(res)
          }).catch((err)=> {
            reject(err.response.data.message)
          })
        })
      },
      register(data) {
        return new Promise( async (resolve, reject) => {
          await axios.post('/register', data).then((res)=>{
          console.log(res, 888)
          resolve(res)
          }).catch((err)=> {
            reject(err.response.data.message)
          })
        })
      },
      login(data) {
        return new Promise( async (resolve, reject) => {
          await axios.post('/login', data).then((res)=> {
            this.user = res.data.user;
            localStorage.setItem("token", res.data.token)
            resolve(res.data.data)
          }).catch((err)=> {
            reject(err.response.data.message)
          })
        })
      },
      logOut() {
        return new Promise((resolve) => {
          this.user = null
          localStorage.removeItem('token')
          resolve(true)
        }).catch(error => {
          console.log(error)
        })
      }
    },
  },
)
