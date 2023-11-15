var boxColors = ["navyblue", "darkblue", "skyblue", "offwhite"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; 
var level = 0;
$(document).keypress(function (){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true; 
    }
});
$(".box").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1-heading").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenBox = boxColors[randomNumber];
    console.log(chosenBox);
    gamePattern.push(chosenBox);
    console.log(gamePattern);
    $("#"+chosenBox).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenBox);
}
function playSound(name){
    var randomSound = new Audio("./sounds/" + name + ".mp3");
    randomSound.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}