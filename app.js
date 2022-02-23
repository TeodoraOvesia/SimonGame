buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
var randomNumber;
var randomChosenColour = "";
var userChosenColour = "";
userClickedPattern = [];
var i = 0;
var level = 0;
var correct;


function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);

}

$(".btn").click(function () {
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio(name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$("body").keypress(function () {
    if (i === 0) {
        $("h1").text("Level " + level);
        nextSequence();
        i++;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    i = 0;
    $("body").keypress(function () {
        if (i === 0) {
            $("h1").text("Level " + level);
            nextSequence();
            i++;
        }
    });
}