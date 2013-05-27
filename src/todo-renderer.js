/*
 *  Copyright (C) 2012 Andrew Oberstar
 *
 *  todo.txt-html5 is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  todo.txt-html5 is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with todo.txt-html5.  If not, see <http://www.gnu.org/licenses/>.
 */
function validDate(date) {
	if (Object.prototype.toString.call(date) === '[object Date]') {
		return !isNaN(date.getTime())
	} else {
		return false
	}
}

function formatDate(date) {
	return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).substr(-2,2) + '-' + ('0' + (date.getDate() + 1)).substr(-2,2);
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
	return lines.join('\n') + '\n'
}
