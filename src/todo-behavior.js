$('#save').live('click', function(event) {
	controller.saveTodosToLocal()
})

$('.todo:not(:has(input))').live('click', function(event) {
	var target = $(event.target)
	var elem = target.hasClass('todo') ? target : target.parents('.todo')
	var id = parseInt(/\d+$/.exec(elem.attr('id'))[0])
	controller.switchToEditMode(id)
	elem.children('.todo-priority').focus()
})

$('#todo-list .todo input').live('keyup', function(event) {
	//on ENTER
	if (event.keyCode == 13) {
		$(event.target).siblings('.todo-save').click()
	}
})

$('.todo-save').live('click', function(event) {
	var todoElem = $(event.target).parent()
	var id = parseInt(/\d+$/.exec(todoElem.attr('id'))[0])
	var priority = $(todoElem).children('.todo-priority').attr('value')[0]
	var description = $(todoElem).children('.todo-description').attr('value')
	controller.updateTodo(id, {
		priority: priority,
		description: description
	})
	controller.sortTodos()
	event.preventDefault()
})

$('.todo-add').live('click', function(event) {
	var todoElem = $(event.target).parent()
	var priority = $(todoElem).children('.todo-priority').attr('value')[0]
	var description = $(todoElem).children('.todo-description').attr('value')
	var text = priority ? '(' + priority + ') ' : ''
	text += formatDate(new Date()) + ' '
	text += description
	controller.createTodo(text)
	todoElem.children('input').attr('value', '')
	todoElem.children('.todo-priority').focus()
	controller.sortTodos()
	event.preventDefault()
})

$('#todo-add .todo input').live('keyup', function(event) {
	//on ENTER
	if (event.keyCode == 13) {
		$(event.target).siblings('.todo-add').click()
	}
})

$(document).ready(function() {
	$('#todo-add .todo-priority').focus()
})