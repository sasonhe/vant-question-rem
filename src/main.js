// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'amfe-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import promise from 'es6-promise'
import '@vant/touch-emulator'
import api from '@/api/'
promise.polyfill()
import { NavBar,Dialog,Row, Col, Icon,Tabbar, TabbarItem,Button,Tag,RadioGroup, Radio,Swipe, SwipeItem,Checkbox, CheckboxGroup,Cell, CellGroup,Toast,Notify   } from 'vant'
Vue.use(NavBar);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Tag);
Vue.use(RadioGroup);
Vue.use(Radio);

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Notify);
Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.config.productionTip = false

Vue.prototype.$http = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
