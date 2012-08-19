$(':checkbox').live('click', function(event) {
	$(event.target).parent().parent().toggleClass('complete');
});

$('.task-priority').live('mouseenter', function(event) {
	$(event.target).closest('.task-priority').children('.chooser').slideDown(200);
}).live('mouseleave', function(event) {
	$(event.target).closest('.task-priority').children('.chooser').hide();
});

$('.task-priority > .chooser li').live('click', function(event) {
	$(event.target).parent().parent().prev().text($(event.target).text())
});
