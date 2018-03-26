
$(document).ready(function() {

    var trivia = [
        {question: 'This bird is popular in cooking, but the meal can give people "coturnism," which causes acute rhabdomyolysis, and is the result of this bird eating hemlock on migratory routes.', 
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

        {question: 'During the Four Pests Campaign, Mao Zedong commanded the people of China to scare them away by banging pots, and the birds flew until exhausted. As a result, agricultural pests exploded in population, and 35 million Chinese died of starvation.',
        options: ['Finch', 'Seagull', 'Sparrow', 'Crane'],
        answer: 'Sparrow',
        image: 'assets/images/sparrow.jpg'},

        {question: 'Serious bird-watchers call themselves "birders," and many of them keep a "life-list" of all the species they have seen in their lifetime. On Earth, there are over 10,000 species of birds. How many species have the most prolific birders collected on their "life-lists"?',
        options: ['500', '3000', '6000', 'Over 9000'],
        answer: 'Over 9000',
        image: 'assets/images/birder.jpg'},


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
        //console.log('Game started.')
        triviaIndex = 0;
        questionsCorrect = 0;
        setTimeout(function() {
            $('.game').empty();
            $('.game').html(`<p class="timer"></p>`);
            $('.game').append('<div class="board"></div>');
            startClock();   
            renderTrivia();
        }, 50);
        
    });

    function startClock() {
        timerCount = 20;
        clearInterval(timerID);
        $('.timer').text(`Time remaining: ${timerCount--} seconds.`);
        timerID = setInterval(function() {
            $('.timer').text(`Time remaining: ${timerCount--} seconds.`);
            if (timerCount<0) {
                showAnswer('timeup');
            }   
        }, 1000);
    }

    function renderTrivia() {
        $('.board').html(`<p class="question">${trivia[triviaIndex].question}</p>`);
        $('.board').append('<ol type="A"></ol>')
        trivia[triviaIndex].options.forEach(function(element) {
            $('.board ol').append(`<li class="clickable">${element}</li>`);
        });
    }

    $('body').on('click', '.clickable', function() {
        showAnswer($(this).text());
    });

    function showAnswer(userAnswer) {
        if (userAnswer==='timeup') {
            $('.board').html(`<h2>${questionIsCorrect(userAnswer)}</h2><p>You are out of time! The correct answer is ${trivia[triviaIndex].answer}.</p>`);
        } else {
            $('.board').html(`<h2>${questionIsCorrect(userAnswer)}</h2><p>Your answer was ${userAnswer}. The correct answer is ${trivia[triviaIndex].answer}.</p>`);
        }
        $('.board').append(`<div><img src="${trivia[triviaIndex].image}"></div>`);
        clearInterval(timerID);
        setTimeout(function() {
            startClock();
            triviaIndex++;
            if (!gameIsComplete()) {
                renderTrivia();
            }
        }, 2000);
        
    }

    function gameIsComplete() {
        if (triviaIndex === trivia.length) {
            $('.board').html(`Game Over. You got ${questionsCorrect} questions right out of ${trivia.length} questions.`);
            clearInterval(timerID);
            $('.board').append('<div><button class="start">New Game</button></div>');
            return true;
        } else {return false;}
    }

    function questionIsCorrect(text) {
        if (text === trivia[triviaIndex].answer) {
            questionsCorrect++;
            return 'Correct!';
        } else return 'Nope!';
    }


});