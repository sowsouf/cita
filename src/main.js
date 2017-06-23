// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 	from 'vue'
import App 	from './App'
import router 	from './router'
import Api 	from './utils/api'
import Store 	from './utils/store'

let VueTouch = require('vue-touch');
let VueCookie = require('vue-cookie');
let api = new Api();

VueTouch.config.swipe = {
	direction: 'horizontal'
};
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueCookie)

Vue.config.productionTip = false

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.findChapterById = (id) => {
	for (var i = 0; i < Store.chapitres.length; i++) {
		if (Store.chapitres[i].id === id) {
			Store.curChapitres = Store.chapitres[i];
			return (Store.chapitres[i])
		}
	}
}

Array.prototype.findOneById = (id) => {
	Store.invocationsByChap = [];
	Store.invocations.forEach(function(invocation) {
		if (invocation.chapitre === id)
			Store.invocationsByChap.push(invocation);
	})
	return (Store.invocationsByChap)
}

function bake_cookie(name, value) {
	value = JSON.stringify(value);
	localStorage.setItem(name, value);
}

function read_cookie(name) {
	return JSON.parse(localStorage.getItem(name));
}

let online = navigator.onLine;
if (online) {

	api.get('/chapitres').then(chapitres => {
		Store.chapitres = chapitres;
		bake_cookie('chapitres', chapitres);
		api.get('/invocations').then(invocations => {
			Store.invocations = invocations;
			bake_cookie('invocations', invocations);
			/* eslint-disable no-new */
			new Vue({
				el: '#app',
				router,
				template: '<App/>',
				components: { App }
			})
		}).catch(error => {
			console.error(error);
		})
	}).catch(error => {
		console.error(error);
		Store.chapitres = read_cookie("chapitres");
		Store.invocations = read_cookie("invocations");
		new Vue({
			el: '#app',
			router,
			template: '<App/>',
			components: { App }
		})
	})

}

else {

	Store.chapitres = read_cookie("chapitres");
	Store.invocations = read_cookie("invocations");
	new Vue({
		el: '#app',
		router,
		template: '<App/>',
		components: { App }
	})

}