var controller = {
	_lastId: 1,
	_todos: [],
	_files: {
		todo: null,
		done: null
	},

	getTodo: function(id) {
		return this._todos[id]
	},

	getTodoAsText: function(id) {
		return text.renderTodo(this.getTodo(id))
	},

	getAllTodos: function() {
		return this._todos
	},

	getFilteredTodos: function(criteria) {
		var filtered = []
		var todos = this.getAllTodos()
		for (var i = 1; i < todos.length; i++) {
			var match = true
			for (key in criteria) {
				if (criteria[key] instanceof Array) {
					for (criterion in criteria[key]) {
						if (!todos[i].hasPropertyValue(key, criterion)) {
							match = false
							break
						}
					}
				} else if (!todos[i].hasPropertyValue(key, criteria[key])) {
					match = false
					break
				}
			}
			if (match) {
				filtered.push(todos[i])
			}
		}
		return filtered
	},

	getAllTodosAsText: function() {
		return text.renderTodos(this.getAllTodos())
	},

	createTodo: function(contents) {
		var todo = text.parseTodo(contents)
		todo.id = this._lastId++
		this._todos[todo.id] = todo
		html.renderDisplay(todo)
		return todo
	},

	createTodos: function(contents) {
		var todos = []
		var lines = contents.split('\n')
		for (i = 0; i < lines.length; i++) {
			if (lines[i].trim() == '') {
				break
			}
			todos.push(this.createTodo(lines[i]))
		}
		return todos
	},

	deleteTodo: function(id) {
		html.removeTodo(id)
		var todo = this._todos[id]
		this._todos[id] = null
		return todo
	},

	switchToEditMode: function(id) {
		html.renderEdit(this.getTodo(id))
	},

	updateTodo: function(id, changes) {
		var todo = this.getTodo(id)
		for (key in changes) {
			todo[key] = changes[key]
		}
		html.renderDisplay(todo)
		return todo
	},

	filterByContext: function(contexts) {

	},

	filterByProject: function(contexts) {

	},

	filterByStatus: function(statuses) {

	},

	clearContextFilter: function() {

	},

	clearProjectFilter: function() {

	},

	clearStatusFilter: function() {

	},

	saveTodosToLocal: function() {
		writeTodoFile(this._files.todo, renderTodos(this.getFilteredTodos({complete:false})))
		writeTodoFile(this._files.done, renderTodos(this.getFilteredTodos({complete:true})))
	}
}
