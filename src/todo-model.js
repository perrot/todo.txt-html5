TodoApp = Ember.Application.create()

TodoApp.todosController = Ember.ArrayController.create({
	content: [],
	priorities: ['_', 'A', 'B', 'C', 'D', 'E']
})

TodoApp.Todo = Ember.Object.extend({
	complete: false,
	priority: '_',
	description: '',
	created: new Date(),
	completed: null,
	contexts: function() {
		return /@\w+/.exec(this.description)
	}.property('description'),
	projects: function() {
		return /\+\w+/.exec(this.description)
	}.property('description'),
	age: function() {
		return Math.round((new Date().getTime() - new Date(this.created).getTime())/(1000 * 60 * 60 * 24))
	}.property('created')
})

TodoApp.TodoView = Ember.View.extend({
	classNames: ['task'],
	templateName: 'todo'
})

TodoApp.todosView = Ember.CollectionView.create({
	classNames: ['task-list'],
	content: TodoApp.todosController,
	itemViewClass: TodoApp.TodoView,
	emptyView: Ember.View.create({
		template: Ember.Handlebars.compile('There are no tasks.')
	})
})

$(document).ready(function() {
	TodoApp.todosView.appendTo('#container')
})
