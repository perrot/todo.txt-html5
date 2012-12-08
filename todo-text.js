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
var text = {
	_pattern: /^\s*(?:(x)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(?:\(([A-Za-z])\)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(.*)/,
	parseTodo: function(contents) {
		var matches = this._pattern.exec(contents)
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
		return todo
	}
}
