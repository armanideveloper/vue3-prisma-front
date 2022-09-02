<template>
    <form @submit.prevent="submit">
            <div class="mb-4">
              <h1 class="text-4xl text-center text-blue-500">Register</h1>
            </div>

            <!-- Name input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                v-model="data.name"
                placeholder="Name"
              />
            </div>

            <!-- sureName input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                v-model="data.sureName"
                placeholder="Surename"
              />
            </div>
  
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                v-model="data.email"
                placeholder="Email address"
              />
            </div>
  
            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                v-model="data.password"
                placeholder="Password"
              />
            </div>

            <select class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                v-model="data.gender"
                >
                    <option :value="null" selected>Choose you'r gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
  
            <div class="text-center lg:text-left">
              <button
                type="submit"
                class="inline-block px-7 mt-4 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
              
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Do you have an account?
                <button
                  @click="$emit('switch-form')"  
                  class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                  >Login</button
                >
              </p>

              <p class="text-red-500 text-lg">{{ err }}</p>
            </div>
          </form>
</template>

<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import { useAuthStore } from '../../store/index'
const emit = defineEmits()
const authStore = useAuthStore()

const data = reactive({
    name: '',
    sureName: '',
    email: '',
    password: '',
    gender: null
})

const err = ref('')

function submit(){
    err.value = ''
    authStore.register(data).then(()=>{
        emit('switch-form')
    }).catch(error => {
        err.value = error
    })
}
</script>