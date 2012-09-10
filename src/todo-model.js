TodoApp = Ember.Application.create({
	Files: {}
})

TodoApp.todosController = Ember.ArrayController.create({
	content: [],
	priorities: ['_', 'A', 'B', 'C', 'D', 'E'],
	asString: function() {
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
	}.property('created'),
	_completeChanged: function() {
		this.set('completed', this.get('complete') ? new Date() : null)
	}.observes('complete')
})

TodoApp.TodoDescriptionView = Ember.View.extend({
	classNames: ['task-description'],
	template: Ember.Handlebars.compile('{{content}}'),
	click: function() {
		this.get('parentView').get('parentView').set('isEditing', true)
	}
})

TodoApp.TodoView = Ember.View.extend({
	classNames: ['todo'],
	templateName: 'todo',
	isEditing: false
})

TodoApp.TodoDisplayView = Ember.View.extend({
	classNames: ['task'],
	templateName: 'todo-display'
})

TodoApp.TodoEditView = Ember.View.extend({
	classNames: ['task-edit'],
	templateName: 'todo-edit',
	close: function() {
		this.get('parentView').set('isEditing', false)
	}
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
	templateName: 'todo-create',
	add: function() {
		TodoApp.todosController.pushObject(this.get('content'))
		this.set('content', TodoApp.Todo.create())
	}
})

TodoApp.todoFileView = Ember.View.create({
	classNames: ['todo-file'],
	content: TodoApp.todosController,
	tagName: 'pre',
	template: Ember.Handlebars.compile('{{content.asString}}')
})

$(document).ready(function() {
	TodoApp.todosView.appendTo('#container')
	TodoApp.todoCreateView.appendTo('#container')
	TodoApp.todoFileView.appendTo('body')
})
