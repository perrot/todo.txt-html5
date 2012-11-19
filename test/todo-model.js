TodoApp = Ember.Application.create({
	Files: {}
})

TodoApp.todosController = Ember.ArrayController.create({
	content: [],
	priorities: ['_', 'A', 'B', 'C', 'D', 'E'],
	doneAsString: function() {
		return renderTodos(this.get('content').filter(function(todo) {
			return todo.get('complete')
		}))
	}.property('content.@each',
		'content.@each.complete',
		'content.@each.priority',
		'content.@each.description',
		'content.@each.created',
		'content.@each.completed'),
	incompleteAsString: function() {
		return renderTodos(this.get('content').filter(function(todo) {
			return !todo.get('complete')
		}))
	}.property('content.@each',
		'content.@each.complete',
		'content.@each.priority',
		'content.@each.description',
		'content.@each.created',
		'content.@each.completed'),
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
	priority: '',
	description: '',
	descriptionRender: function() {
		return this.description.replace(/(\(?(?:http|https|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])/, '<a href="$1">$1</a>')
			.replace(/(@\w+)/, '<span class="task-context">$1</span>')
			.replace(/(\+\w+)/, '<span class="task-project">$1</span>')
			.htmlSafe()
	}.property('description'),
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
	tagName: 'span',
	template: Ember.Handlebars.compile('{{content}}'),
})

TodoApp.TodoView = Ember.View.extend({
	classNames: ['todo'],
	templateName: 'todo',
	isEditing: false
})

TodoApp.TodoDisplayView = Ember.View.extend({
	classNames: ['task'],
	classNameBindings: ['complete'],
	templateName: 'todo-display',
	click: function() {
		this.get('parentView').set('isEditing', true)
	}
})

TodoApp.TodoEditView = Ember.View.extend({
	classNames: ['task'],
	classNameBindings: ['complete'],
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
	classNames: ['task'],
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
