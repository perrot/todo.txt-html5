var html = {
	_displayTemplate: Handlebars.compile($('#todo-display-template').html()),
	_editTemplate: Handlebars.compile($('#todo-edit-template').html()),
	_renderTodo: function(templateFun, todo) {
		var elem = $('#todo-' + todo.id)
		if (elem.length > 0) {
			elem.html(templateFun(todo))
		} else {
			$('#todo-list').append('<div id="todo-' + todo.id + '" class="todo">' + templateFun(todo) + '</div>')
		}
	},
	renderDisplay: function(todo) {
		this._renderTodo(this._displayTemplate, todo)
	},
	renderEdit: function(todo) {
		this._renderTodo(this._editTemplate, todo)
	}
}
