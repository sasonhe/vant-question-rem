import Vue from 'vue'
import Router from 'vue-router'
import Question from '@/components/Question'
import Index from '@/pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/toquestion',
      name: 'Question',
      component: Question
    }
  ]
})
