var displayTemplate = Handlebars.compile($('#todo-display-template').html())
var editTemplate = Handlebars.compile($('#todo-edit-template').html())

function renderDisplay(todo) {
	renderTodo(displayTemplate, todo)
}

function renderEdit(todo) {
	renderTodo(editTemplate, todo)
}

function renderTodo(templateFun, todo) {
	var elem = $('#task-' + todo.id)
	if (elem === 0) {
		elem.html(displayTemplate(todo))
	} else {
		$('#task-list').append('<div id="task-' + todo.id + '" class="task">' + displayTemplate(todo) + '</div>')
	}
}
