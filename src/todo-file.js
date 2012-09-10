function handleFsError(error) {
	var msg = ''
	switch(error.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'File system quote was exceeded.'
			break
		case FileError.NOT_FOUND_ERR:
			msg = 'File system was not found.'
			break
		case FileError.SECURITY_ERR:
			msg = 'File system security error.'
			break
		case FileError.INVALID_MODIFICATION_ERR:
			msg = 'Invalid file system modification.'
			break
		case FileError.INVALID_STATE_ERR:
			msg = 'Invalid files system state.'
			break
		default:
			msg = 'Unknown error'
			break
	}
	$('#errors').html(msg)
	console.log(error)
}

function initFs(fs) {
	fs.root.getFile('todo.txt', {create: true}, function(fileEntry) {
		TodoApp.Files.Todo = fileEntry
		fileEntry.file(function(file) {
			readTodos(file)
		}, handleFsError)
	}, handleFsError)
}
	
function readTodos(file) {
	var reader = new FileReader()
	reader.onload = function(event) {
		parseTodos(event.target.result)
	}
	reader.onerror = function(event) {
		console.log('Could not read todo.txt', event)
	}
	reader.readAsText(file)
	console.log(reader.readyState)
}

function writeTodos() {
	var writeFile = function() {
		TodoApp.Files.Todo.createWriter(function(writer) {
			writer.onwriteerror = handleFsError
			var blob = new Blob([TodoApp.todosController.get('asString')], {type:'text/plain'})
			writer.write(blob)
		}, handleFsError)
	}

	TodoApp.Files.Todo.createWriter(function(writer) {
		writer.onwriteend = writeFile
		writer.onwriteerror = handleFsError
		writer.truncate(0)
	})
}

$(document).ready(function() {
	var size = 1024 * 1024
	window.webkitStorageInfo.requestQuota(window.PERSISTENT, size, function(grantedBytes) {
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
		window.requestFileSystem(window.PERSISTENT, size, initFs, handleFsError)
	}, function(error) {
		$('#errors').html(error.message)
		console.log(error)
	})
})
