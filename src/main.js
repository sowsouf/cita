// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 	from 'vue'
import App 	from './App'
import router 	from './router'
var VueTouch = require('vue-touch')

Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
