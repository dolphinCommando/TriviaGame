
$(document).ready(function() {

    var trivia = [
        {question: 'This bird is popular in cooking, but eating it can cause an illness known as "coturnism" which is the result of the bird feeding on hemlock.', 
        options: ['Goose', 'Duck', 'Turkey', 'Quail'],
        answer: 'Quail',
        image: 'assets/images/quail.jpg'}, 

        {question: 'This bird is also known as the "butcherbird" due its habit of impaling insects and small mammals on thorns or barbed wire, to eat later.',
        options: ['Nighthawk', 'Shrike', 'Kite', 'Phoebe'],
        answer: 'Shrike',
        image: 'assets/images/shrike.jpg'},

        {question: 'The kea is a large species of parrot. The kea is highly curious about human materials such as backpacks and boots, and is even known for prying apart the rubber parts of cars. It is a native of this island.',
        options: ['New Zealand', 'Galapagos', 'Phillipines', 'Madagascar'],
        answer: 'New Zealand',
        image: 'assets/images/kea.jpg'},

        {question: 'What is the airspeed velocity of an un-laden swallow?', 
        options: ['60 km/hr', '42', '1,192 km/hr', 'What do you mean, an African or European swallow?'],
        answer: 'What do you mean, an African or European swallow?',
        image: 'assets/images/montypython.jpg'},
    ]

    var triviaIndex;

    var timerID;
    var timerCount;
    var questionsCorrect;

    $('body').on('click', '.start', function() {
        console.log('Game started.')
        triviaIndex = 0;
        timerCount = 30;
        questionsCorrect = 0;
        setTimeout(function() {
            $('.game').empty();
            $('.game').html('<p class="timer"></p>');
            $('.game').append('<div class="board"></div>');
            startClock();
            renderTrivia();
        }, 500);
        
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
        $('.board').append(`<div><img src="${trivia[triviaIndex].image}"></div>`);
        clearInterval(timerID);
        setTimeout(function() {
            startClock();
            triviaIndex++;
            if (!gameIsComplete()) {
                renderTrivia();
            }
        }, 1000);
        
    });

    function gameIsComplete() {
        if ((timerCount <= 0) || (triviaIndex === trivia.length)) {
            $('.board').html(`Game Over. You got ${questionsCorrect} questions right out of ${trivia.length} questions.`);
            clearInterval(timerID);
            $('.board').append('<div><button class="start">New Game</button></div>');
            return true;
        } else {return false;}
    }


});