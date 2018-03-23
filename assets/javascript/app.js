
$(document).ready(function() {

    var trivia = [
        {question: 'This bird is popular in cooking, but eating it can cause an illness known as "coturnism" which is the result of the bird feeding on hemlock.', 
        options: ['Goose', 'Duck', 'Turkey', 'Quail'],
        answer: 'Quail'}, 

        {question: 'This bird is also known as the "butcherbird" due its habit of impaling insects and small mammals on thorns or barbed wire, to eat later.',
        options: ['Nighthawk', 'Shrike', 'Kite', 'Phoebe'],
        answer: 'Shrike'},

        {question: 'What is the airspeed velocity of an un-laden swallow?', 
        options: ['60 km/hr', '42', '1,192 km/hr', 'What do you mean, an African or European swallow?'],
        answer: 'What do you mean, an African or European swallow?'},
    ]

    var imageLinks = [];

    var triviaIndex = 0;

    var timerID;
    var timerCount= 30;
    
    $('.game').prepend('<button class="start">Start Game</button>');

    $('.start').click(function() {
        $('.game').html('<p class="timer"></p>');
        $('.game').append('<div class="board"></div>');
        startClock();
        renderTrivia();
    });

    function startClock() {
        timerID = setInterval(function() {
            $('.timer').text(`You have ${timerCount} seconds left.`);
            timerCount--;
        }, 1000);
    }

    function renderTrivia() {
        $('.board').html(`<p>${trivia[triviaIndex].question}</p>`);
        trivia[triviaIndex].options.forEach(function(element) {
            $('.board').append(`<p class="clickable">${element}</p>`);
        });
    }

    $('body').on('click', '.clickable', function() {
        $('.board').html(`Your answer was ${$(this).text()}. The correct answer is ${trivia[triviaIndex].answer}`);
        clearInterval(timerID);
        setTimeout(function() {
            startClock();
            triviaIndex++;
            renderTrivia();
        }, 5000);
        
    });


});