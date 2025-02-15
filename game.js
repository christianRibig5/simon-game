var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keydown(function () {
    if (!started) {
        playGame();
        $("#level-title").text("Level " + level);
        started = true;
    }
});
function playGame() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

})
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(randomChosenColor) {
    $("." + randomChosenColor).addClass("pressed");
    setTimeout(function () {
        $("." + randomChosenColor).removeClass("pressed");
    }, 100)
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                playGame()
                $("#level-title").text("Level " + level);
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




