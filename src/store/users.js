import { defineStore } from 'pinia'
import axios from "../api/axios"
export const useUsersStore = defineStore('users', {
  state: () => ({ 
    users: [] 
  }),
  getters: {
    getUsers: state => state.users,
  },
  actions: {
      callUsers(){
        return new Promise( async (resolve, reject) => {
          await axios.get('/getUsers').then((res)=> {
            this.users = res.data
          resolve(res.data)
          }).catch((err)=> {
            reject(err.response.data.message)
          })
        })
      },
    },
  },
)
