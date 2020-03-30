import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("./views/Home.vue")
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import("./views/Messages.vue")
    },
    {
      path: '/interfaceDecoders',
      name: 'interfaceDecoders',
      component: () => import("./views/InterfaceDecoders.vue")
    },
    {
      path: '/transportConfigurations',
      name: 'transportConfigurations',
      component: () => import("./views/TransportConfigurations.vue")
    },
  ]
})
