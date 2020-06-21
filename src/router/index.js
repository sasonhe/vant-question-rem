import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Question from "@/layout/question"
import View from "@/layout/view"
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/',
      component: Question,
      children:[
        {
          path:'',
          component: Index,
        }
      ]
    },
    {
      path: '/toquestion',
      redirect:'/toquestion',
      component: Question,
      children:[
        {
          path:'',
          component: () => import('@/components/Question')
        }
      ]
    },
    {
      path: '/success/:name/:fractions/:time',
      redirect:'/success',
      component: Question,
      children:[
        {
          path:'',
          component: () => import('@/pages/success'),
          props:true
        }
      ]
    },
    {
      path: '/preview',
      redirect:'/preview',
      component: View,
      children:[
        {
          path:'',
          component: () => import('@/pages/preview')
        }
      ]
    }
  ]
})
