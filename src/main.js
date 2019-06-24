import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    isNumber: function (number) {
      return number != "" && !(isNaN(number))
    }
  }
})

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
