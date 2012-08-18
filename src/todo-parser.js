function parseTodos(contents) {
	var lines = contents.split('\n');
	var tasks = Array();
	for (i = 0; i < lines.length; i++) {
		if (lines[i].trim() == '') {
			break;
		}
		var pattern = /^\s*(?:(x)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(?:\(([A-Za-z])\)\s+)?(?:(\d{4}-\d{2}-\d{2})\s+)?(.*)/;
		var matches = pattern.exec(lines[i]);
		
		var task = { }
		task.complete = matches[1] == 'x';
		task.priority = matches[3];
		task.description = matches[5];
		
		if (matches[3] || matches[4]) {
			task.created = matches[4];
			task.completed = matches[2];
		} else {
			task.created = matches[2];
			task.completed = undefined;
		}
		
		task.contexts = parseContexts(matches[5]);
		task.projects = parseProjects(matches[5]);
		tasks[i] = task;
	}
	return tasks;
}

function parseContexts(description) {
	var pattern = /@\w+/;
	return pattern.exec(description);
}

function parseProjects(description) {
	var pattern = /\+\w+/;
	return pattern.exec(description);
}
