function renderTodos(todos) {
	var list = $('#task-list');

	for (var i = 0; i < todos.length; i++) {
		var num = list.children().size();
		var todo = todos[i];
		var task = $('<div class="task"></div>').appendTo(list);
		var body = $('<div class="task-body"></div>').appendTo(task);

		//complete
		$('<div class="task-status"><input id="task-' + num + '-complete" type="checkbox" name="check"></div>')
			.appendTo(body)
		$('#task-' + num + '-complete').prop('checked', todo.complete);

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
		$('<div class="task-footer"><span class="task-age">Created x days ago.</span></div>')
			.appendTo(task);
	}
}
