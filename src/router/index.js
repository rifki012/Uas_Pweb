import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Matakuliah from "@/views/Matakuliah";
import Mahasiswa from "@/views/Mahasiswa";
import AmbilMatkul from "@/views/AmbilMatkul";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/matakuliah',
    name: 'matakuliah',
    component: Matakuliah
  },
  {
    path: '/mahasiswa',
    name: 'mahasiswa',
    component: Mahasiswa
  },
  {
    path: '/ambilmatakuliah',
    name: 'ambilmatkul',
    component: AmbilMatkul
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
