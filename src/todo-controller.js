var controller = {
	_lastId: 1,
	_todos: [],

	getTodo: function(id) {
		return this._todos[id]
	},

	getTodoAsText: function(id) {
		return text.renderTodo(this.getTodo(id))
	},

	getAllTodos: function() {
		return this._todos
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

	toggleTodoStatus: function(id) {
		var todo = getTodo(id)
		todo.complete = todo.complete ? false : true
		//find checkbox and switch state?
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

	}
}
