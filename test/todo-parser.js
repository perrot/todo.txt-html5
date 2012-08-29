function parseTodos(contents) {
	var lines = contents.split('\n');

	for (i = 0; i < lines.length; i++) {
		if (lines[i].trim() == '') {
			break;
		}
		var pattern = /^\s*(?:(x)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(?:\(([A-Za-z])\)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(.*)/;
		var matches = pattern.exec(lines[i]);

		var todo = TodoApp.Todo.create();
		todo.set('complete', matches[1] == 'x');
		if (matches[3]) {
			todo.set('priority', matches[3]);			
		}
		todo.set('description', matches[5]);

		if (matches[3] || matches[4]) {
			todo.set('created', new Date(matches[4]));
			todo.set('completed', new Date(matches[2]));
		} else {
			todo.set('created', new Date(matches[2]));
			todo.set('completed', null);
		}
		TodoApp.todosController.pushObject(todo);
	}
}
