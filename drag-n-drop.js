function handleDnD(event) {
	event.stopPropagation();
	event.preventDefault();
}

$(document).ready(function() {
	var dropbox = $('#dropbox')
	dropbox.bind('dragover', function(event) {
		handleDnD(event);
		$('#dropbox').addClass('over');
	});
	dropbox.bind('dragleave', function(event) {
		handleDnD(event);
		$('#dropbox').removeClass('over');
	});
	dropbox.bind('drop', function(event) {
		handleDnD(event);
		var reader = new FileReader();
		reader.onload = function(event) {
			controller.createTodos(event.target.result);
		}
		reader.onerror = function(event) {
			console.log('file read error', e);
		}
		
		var files = event.originalEvent.dataTransfer.files;
		for (var i = 0; i < files.length; i++) {
			reader.readAsText(files[i]);
		}
		$('#dropbox').removeClass('over');
	});
});
