new Vue({
	el: '#binding',
	data() {
		return {
			courses: [],
			keyword: null,
			resAmount: 0,
			offset: 0
		}
	},
	mounted() {
		fetch('./api/1.0/getFreeCourses?amount=12')
		.then(resp => resp.json())
		.then(json => {
			this.resAmount = json.data.totalCount
			this.courses = json.data.results
		})
		.catch(this.handleErr)
	},
	methods: {
		search(keyword, amount) {
			this.resAmount = null
			this.courses = []

			fetch(`./api/1.0/searchFreeCourses?amount=${amount}&keyword=${keyword}`)
			.then(resp => resp.json())
			.then(json => {
				this.resAmount = json.data.totalCount
				this.courses = json.data.results
			})
			.catch(this.handleErr)
		},
		handleErr(err) {
			alert('An unexpected error has occured')
		}
	}
})