
$(document).ready(function() {

    var trivia = [
        {question: 'This bird is popular in cooking, but the meal can give people "coturnism," which causes muscle tenderness and vomiting, and is the result of this bird eating hemlock.', 
        options: ['Goose', 'Duck', 'Quail', 'Turkey'],
        answer: 'Quail',
        image: 'assets/images/quail.jpg'}, 

        {question: 'This bird is also known as the "butcherbird" due its habit of impaling insects and small mammals on thorns or barbed wire, to save for later.',
        options: ['Nighthawk', 'Shrike', 'Kite', 'Phoebe'],
        answer: 'Shrike',
        image: 'assets/images/shrike.jpg'},

        {question: 'The kea is a large species of parrot. The kea is highly curious about human materials such as backpacks and boots, and is even known for prying apart the rubber parts of cars. It is a native of this island.',
        options: ['New Zealand', 'Galapagos', 'Phillipines', 'Madagascar'],
        answer: 'New Zealand',
        image: 'assets/images/kea.jpg'},

        {question: 'Birds evolved from:',
        options: ['Fish', 'Lizards', 'Dinosaurs', 'Mammals'],
        answer: 'Dinosaurs',
        image: 'assets/images/trex.gif'},
        
        {question: 'The Arctic Tern breeds in summer in Arctic regions of North America. Where does the bird migrate to for the winter?',
        options: ['Africa', 'Antarctica', 'East Asia', 'Central America'],
        answer: 'Antarctica',
        image: 'assets/images/tern.jpg'},

        {question: 'This bird knows how to moonwalk.',
        options: ['Manakin', 'Motmot', 'Potoo', 'Toucan'],
        answer: 'Manakin',
        image: 'assets/images/manakin.gif'},

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
    var questionsIncorrect;
    var questionsUnanswered;

    $('body').on('click', '.start', function() {
        //console.log('Game started.')
        triviaIndex = 0;
        questionsCorrect = 0;
        questionsIncorrect = 0;
        questionsUnanswered = 0;
        setTimeout(function() {
            $('.game').empty();
            $('.game').html(`<p class="timer"></p>`);
            $('.game').append('<div class="board"></div>');
            startClock();   
            renderTrivia();
        }, 50);
        
    });

    function startClock() {
        timerCount = 15;
        clearInterval(timerID);
        $('.timer').text(`Time remaining: ${timerCount--} seconds.`);
        timerID = setInterval(function() {
            $('.timer').text(`Time remaining: ${timerCount--} seconds.`);
            if (timerCount<0) {
                showAnswer('time');
                console.log('Out of time');
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
        if (userAnswer==='time') {
            $('.board').html(`<h2>Out of time.</h2><p>The correct answer is: ${trivia[triviaIndex].answer}.</p>`);
            questionsUnanswered++;
        } else if (userAnswer === trivia[triviaIndex].answer) {
            $('.board').html(`<h2>Correct!</h2><p>${trivia[triviaIndex].answer}</p>`);
            questionsCorrect++;
        } else {
            $('.board').html(`<h2>Nope.</h2><p>The correct answer is: ${trivia[triviaIndex].answer}.</p>`);
            questionsIncorrect++;
        }
        $('.board').append(`<div><img src="${trivia[triviaIndex].image}"></div>`);
        clearInterval(timerID);
        setTimeout(function() {
            startClock();
            triviaIndex++;
            if (!gameIsComplete()) {
                renderTrivia();
            }
        }, 3000);
        
    }

    function gameIsComplete() {
        if (triviaIndex === trivia.length) {
            $('.board').html(`<h2>Here is how you did.</h2><p>Right answers: ${questionsCorrect}</p><p>Wrong answers: ${questionsIncorrect}</p><p>Unanswered: ${questionsUnanswered}</p>`);
            clearInterval(timerID);
            $('.board').append('<div><button class="start">Start Over</button></div>');
            return true;
        } else {return false;}
    }

});