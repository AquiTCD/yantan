import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import Preferences from '@/components/Preferences'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Editor,
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: Preferences,
    },
  ],
})
