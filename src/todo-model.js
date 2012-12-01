var files = {
	todo: null,
	done: null
}

var Todo = function() {
	this._complete = false
	this.priority = ''	
	this.description = ''
	this.created = new Date()
	this.completed = null
}

Todo.prototype = {
	get rDescription() {
		return this.description.replace(/(\(?(?:http|https|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])/, '<a href="$1">$1</a>')
			.replace(/(@\w+)/, '<span class="todo-context">$1</span>')
			.replace(/(\+\w+)/, '<span class="todo-project">$1</span>')
	},
	get contexts() {
		return /@\w+/.exec(this.description)
	},
	get projects() {
		return /\+\w+/.exec(this.description)
	},
	get age() {
		return Math.round((new Date().getTime() - new Date(this.created).getTime())/(1000 * 60 * 60 * 24))
	},
	get rAge() {
		var age = this.age
		if (isNaN(age) || age == 0) {
			return 'Today'
		} else {
			return age + ' days ago'
		}
	},
	get createdToday() {
		return this.getAge == 0
	},
	get complete() {
		return this._complete
	},
	set complete(isComplete) {
		this.completed = isComplete ? new Date() : null
		this._complete = isComplete
	},
	get status() {
		return this.complete ? 'complete' : 'incomplete'
	}
}
