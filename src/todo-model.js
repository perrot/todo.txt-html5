TodoApp = Ember.Application.create()

TodoApp.todosController = Ember.ArrayController.create({
	content: [],
	priorities: ['_', 'A', 'B', 'C', 'D', 'E'],
	asFile: function() {
		return renderTodos(this.get('content'))
	}.property('content.@each',
		'content.@each.complete',
		'content.@each.priority',
		'content.@each.description',
		'content.@each.created',
		'content.@each.completed')
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
	}.property('created'),
	createdToday: function() {
		return this.get('age') == 0
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

TodoApp.todoCreateView = Ember.View.create({
	classNames: ['new-task'],
	content: TodoApp.Todo.create(),
	templateName: 'new-todo',
	add: function() {
		TodoApp.todosController.pushObject(this.get('content'))
		this.set('content', TodoApp.Todo.create())
	}
})

TodoApp.todoFileView = Ember.View.create({
	classNames: ['todo-file'],
	content: TodoApp.todosController,
	tagName: 'pre',
	template: Ember.Handlebars.compile('{{content.asFile}}')
})

$(document).ready(function() {
	TodoApp.todosView.appendTo('#container')
	TodoApp.todoCreateView.appendTo('#container')
	TodoApp.todoFileView.appendTo('body')
})
