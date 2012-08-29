function validDate(date) {
	if (Object.prototype.toString.call(date) === '[object Date]') {
		return !isNaN(date.getTime())
	} else {
		return false
	}
}

function formatDate(date) {
	return date.getFullYear() + '-' + ('0' + date.getMonth()).substr(-2,2) + '-' + ('0' + date.getDate()).substr(-2,2);
}

function renderTodos(todos) {
	var lines = []
	for (var i = 0; i < todos.length; i++) {
		var todo = todos[i]
		var line = ""
		if (todo.complete) {
			line += "x "
		}
		if (validDate(todo.completed)) {
			line += formatDate(todo.completed) + ' '
		}
		if (todo.priority && todo.priority != '_') {
			line += '(' + todo.priority + ') '
		}
		if (validDate(todo.created)) {
			line += formatDate(todo.created) + ' '
		}
		line += todo.description
		lines.push(line)
	}
	return lines.join('\n')
}
