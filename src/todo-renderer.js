function renderTodos(todos) {
	var list = $('#task-list');

	for (var i = 0; i < todos.length; i++) {
		var num = list.children().size();
		var todo = todos[i];
		var task = $('<div id="task-' + num + '" class="task"></div>').appendTo(list);
		var body = $('<div class="task-body"></div>').appendTo(task);

		//complete
		if (todo.complete) {
			task.addClass('complete')
		}

		$('<div class="task-status"><input id="task-' + num + '-complete" type="checkbox" name="check"></div>')
			.appendTo(body)
		$('#task-' + num + '-complete')
			.prop('checked', todo.complete)
			.click(function(event) {
				$(event.target).parent().parent().toggleClass('complete');
			});

		//priority
		var priority = todo.priority;
		if (!priority) {
			priority = '_';
		}
		$('<div class="task-priority">' + priority + '</div> ')
			.appendTo(body)

		//body
		var description = todo.description
			.replace(/(\+\w+)/g, "<span class='task-project'>$1</span>")
			.replace(/(@\w+)/g, "<span class='task-context'>$1</span>")
		$('<div class="task-description">' + description + '</div>')
			.appendTo(body)

		//footer
		var footer = '';
		if (todo.created) {
			var age = Math.round((new Date().getTime() - new Date(todo.created).getTime())/(1000 * 60 * 60 * 24));
			footer = $('<span class="task-age">Created ' + age + ' days ago</span>');
		}
		$('<div class="task-footer"></div>')
			.append(footer)
			.appendTo(task);
	}
}
