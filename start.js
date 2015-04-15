var User = Backbone.Model.extend({
 defaults : {
 	id: 1,
   name: "Jason",
   score: 0
 },
 initialize : function() {
   this.user = new User;
   this.user.url = 'user/' + this.id;
 }
});

var AppView = Backbone.View.extend({
	initialize: function(){
		this.initialRender();
	},
	initialRender: function(){
		this.container = $('<div>')
			.attr('id', 'container')
			.appendTo(this.el);

		this.header = $('<div>')
			.addClass('header')
			.appendTo(this.container);
		
		this.headerTitle = $('<h1>')			
			.text('Let\'s Do Some Math')
			.appendTo(this.header);

		this.mainContent = $('<div>')
			.addClass('mainContent')
			.appendTo(this.container);

		this.startHeader = $('<h3>')
			.addClass('startHeader')
			.text('Hit the start button and let\'s get started.')
			.appendTo(this.mainContent);

		this.startButton = $('<button>')
			.addClass('startBtn btn btn-success')
			.attr('type', 'button')
			.attr('value', 'Start')
			.text('Start')
			.appendTo(this.mainContent)
			.bind('click', this.startGame);

		this;
	},
	render: function(){
		return;
	},
	startGame: function(){
		$('.mainContent').remove();
		this.remove();
		var questionsView = new QuestionsView({
			el: $('#all')
		});
		return
	}
});

var appView = new AppView({el: $('#all')});

QuestionsModel = Backbone.Model.extend({});

var QuestionsView = Backbone.View.extend({
	events: {
        'keyup #answer': 'checkAnswer'
    },
	initialize: function(){
		var number1;
		var number2;
		var userAnswer;
		var actualAnswer;
		var problemDiv = $("#problem");
		var statusDiv = $("#status");
		var answer = $("#answer");

		this.initialRender();
	},
	initialRender: function(){	
		this.questionContainer = $('<div>')
			.addClass('questionContainer')
			.appendTo(this.el);

		this.problem = $('<h3>')
			.attr('id', 'problem')
			.appendTo(this.questionContainer);

		this.divForAnswerandBtn = $('<div>')
			.addClass('input-append')
			.appendTo(this.questionContainer);

		this.answer = $('<input>')
			.attr('type', 'text')
			.attr('id', 'answer')
			.attr('placeholder', 'answer...')
			.addClass('form-control span2')			
			.appendTo(this.divForAnswerandBtn);		

		this.solve = $('<input>')
			.attr('value','Solve')
			.addClass('solve btn')
			.attr('type', 'button')
			.appendTo(this.divForAnswerandBtn)
			.bind('click', this.checkAnswer);

		this.statusDiv = $('<div>')
			.attr('id', 'status')
			.text('Click the Solve button to Solve the problem')
			.appendTo(this.questionContainer);

		this.nextProblem = $('<button>')
			.addClass('nextProblem btn btn-success')
			.attr('type', 'button')
			.attr('value', 'Next')
			.css('display', 'none')
			.text('Next')
			.appendTo(this.formContainer)
			.bind('click', this.nextProblem);

		this.score= $('<div>')
			.addClass('score')
			.text('0')
			.appendTo(this.questionContainer);

		number1 = Math.floor(1 + Math.random() * 9);
		number2 = Math.floor(1 + Math.random() * 9);
		this.problem.text("How much is " + number1 + " x " + number2 + " ?");
		actualAnswer = (number1 * number2);
		var score = 0;

		this;
	},
	nextProblem: function(){
		$('.questionContainer').remove();

		var questionsView = new QuestionsView({
			el: $('#all')
		});
		return
	},
	checkAnswer: function(e){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == 13){
			userAnswer = answer.value;
			answer.value = "";
			if (parseInt(userAnswer,10) === actualAnswer){
				$('#answer').remove();
				$('.solve').remove();

				this.correctAnswer = $('<div>')
					.attr('id', 'correctAnswer')
					.text(actualAnswer)
					.appendTo($('#problem'))

				$("#status").text('Correct!');
				this.score();
				//Is this working????
				this.nextProblem.css('display');

				$('.nextProblem').css('display', 'inline');
			}
			else {
				$("#status").text("No. Please try again");
			}
		}
		return
	},
	score: function(){
		score++
		this.score.text(score);
		return
	}

});

