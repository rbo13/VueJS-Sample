new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{ title: 'Item 1', price: 100 },
			{ title: 'Item 2', price: 2 },
			{ title: 'Item 3', price: 3 },
			{ title: 'Item 4', price: 4 },
			{ title: 'Item 5', price: 22.30 }
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			this.total += this.items[index].price;
			this.cart.push(this.items[index]);
		}
	}
})
