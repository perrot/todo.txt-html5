function parseTodos(contents) {
	var lines = contents.split('\n')

	for (i = 0; i < lines.length; i++) {
		if (lines[i].trim() == '') {
			break
		}
		var pattern = /^\s*(?:(x)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(?:\(([A-Za-z])\)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(.*)/
		var matches = pattern.exec(lines[i])

		var todo = new Todo()
		todo.complete = matches[1] == 'x'
		if (matches[3]) {
			todo.priority = matches[3]
		}
		todo.description = matches[5]

		if (matches[3] || matches[4]) {
			todo.created = new Date(matches[4])
			todo.completed = new Date(matches[2])
		} else {
			todo.created = new Date(matches[2])
		}
		todos.push(todo)
	}
}
