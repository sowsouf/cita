	import http 	from 	'axios'

	export default class Api{
		constructor(url){
			//this.url 		= "http://localhost/api/citadelle";
			this.url 		= "https://sofianeakbly-personal-test.000webhostapp.com/api/citadelle";
			this.invocations 	= [];
			this.chapitres 		= [];
		}

		get(url) {

			return new Promise((resolve, reject) => {

				http.get(this.url + url).then(response => {
					resolve(response.data);
				}).catch(error => {
					reject(error)
				});
			})

		}

		post(url, datas) {

			return new Promise((resolve, reject) => {
				http.post(this.url + url, {
					data 		: datas
				}).then(response => {
					console.log(response);
					resolve(response);
				}).catch(error => {
					reject(error)
				});
			});

		}

		put(url, datas) {
			return new Promise((resolve, reject) => {
				http({
					method 	: 'PUT',
					url 		: this.url + url,
					data 		: datas
				}).then(response => {
					resolve(true);
				}).catch(error => {
					reject(error)
				});
			})
		}

		delete(url) {

			return new Promise((resolve, reject) => {
				http({
					method 	: 'DELETE',
					url 		: this.url + url
				}).then(response => {
					var index 	= 0;
					var schemas 	= Store.schemas;
					schemas.forEach(function(schema){
						if (schema.id === id)
							schemas.splice(index, 1);
						index++;
					})
					resolve(schemas);
				}).catch(error => {
					reject(error)
				});
			});

		}
	}
