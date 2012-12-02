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
		this.renderCheckbox(todo)
	},
	renderAllDisplays: function(todos) {
		$('#todo-list').html('')
		for (var i = 0; i < todos.length; i++) {
			this.renderDisplay(todos[i])
		}
	},
	renderDisplay: function(todo) {
		this._renderTodo(this._displayTemplate, todo)
	},
	renderEdit: function(todo) {
		this._renderTodo(this._editTemplate, todo)
	},
	renderCheckbox: function(todo) {
		var canvasJ = $('#todo-' + todo.id + ' canvas.checkbox')
		if (canvasJ.length == 1) {
			var canvas = canvasJ[0]
			var ctx = canvas.getContext('2d')
			ctx.lineWidth = 3
			ctx.strokeStyle = '#5f5f57'
			ctx.strokeRect(3, 3, 19, 19)
			if (todo.complete) {
				ctx.moveTo(3, 3)
				ctx.lineTo(22, 22)
				ctx.stroke()
				ctx.moveTo(3, 22)
				ctx.lineTo(22, 3)
				ctx.stroke()
			}
			canvasJ.on('click', function(event) {
				controller.updateTodo(todo.id, { complete: !todo.complete })
			})
		}
	}
}
