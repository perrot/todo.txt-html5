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

$('.todo input').live('keyup', function(event) {
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
})
