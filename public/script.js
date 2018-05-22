var PRICE = 9.99;
var RESULTS_PER_QUERY = 10;

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
    results: [],
		cart: [],
		search: 'imgur',
		lastSearch: '',
		loading: false,
		price: PRICE,
    timeElapsed: 0,
	},
  computed: {
    noMoreItems: function() {
      return this.items.length === this.results.length && this.results > 0;
    }
  },
	methods: {
    appendItems: function() {
      if (this.items.length < this.results.length) {
        var append = this.results.slice(this.items.length, this.items.length + RESULTS_PER_QUERY);
        this.items = this.items.concat(append);
      }
    },
		addItem: function(index) {
			// this.total += this.items[index].price;
			this.total += PRICE; 
			var item = this.items[index];
			var found = false;
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === item.id) {
					found = true;
					this.cart[i].qty++;
					break;
				}
			}
			if (!found) {
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: PRICE
				});
			}
		},
		inc: function(item) {
			item.qty++;
			this.total += PRICE;
		},
		dec: function(item) {
			item.qty--;
			this.total -= PRICE;
			if (item.qty <= 0) {
				for (var i = 0; i < this.cart.length; i++) {
					if (this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit: function() {
      if (!this.search) {
        return;
      }
		  var started = Date.now();	
      this.items = [];
			this.loading = true;
			this.$http
				.get('/search/'.concat(this.search))
				.then(function(res) {
          this.results = res.data;
					this.lastSearch = this.search;
          this.appendItems();
					this.loading = false;
				});
      this.timeElapsed = Date.now() - started;
		}
	},

	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}

	},

	mounted: function() {
		this.onSubmit();
    const vm = this;

    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(() => {
      vm.appendItems();
    });

	}

});
