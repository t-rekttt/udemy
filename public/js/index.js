new Vue({
	el: '#binding',
	data() {
		return {
			courses: [],
			keyword: null
		}
	},
	mounted() {
		fetch('./api/1.0/getFreeCourses?amount=12')
		.then(resp => resp.json())
		.then(json => this.courses = json)
	},
	methods: {
		search(keyword, amount) {
			fetch(`./api/1.0/searchFreeCourses?amount=${amount}&keyword=${keyword}`)
			.then(resp => resp.json())
			.then(json => this.courses = json)
		}
	}
})