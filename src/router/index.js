import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "about" */ '../views/FavoritesView.vue')
  },
  {
    path: '/players',
    name: 'players',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayersView.vue')
  },
  {
    path: '/clubs',
    name: 'clubs',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClubsView.vue')
  },
  {
    path: '/competitions',
    name: 'competitions',
    component: () => import(/* webpackChunkName: "about" */ '../views/CompetitionsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router