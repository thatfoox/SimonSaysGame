//game variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;



function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4); // random number
    var randomChosenColor  = buttonColors[randomNumber]; // random color based on random number
    gamePattern.push(randomChosenColor); // pushing random color in array
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);// random color animation
    playSound(randomChosenColor)
    $("#level-title").text("level "+level);//changes text based on level
    
    
    
}

//choosing buttons
$('div[type="button"]').click(function() { 
    var userChosenColor =  this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1);
});


// flash animation when buttons are pressed 
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

   setTimeout( function(){$("#"+currentColor).removeClass("pressed")},100);
}

//function that makes button make sounds
function playSound(name){
    var audio = new Audio(URL="sounds/"+name+".mp3");
    audio.play();
}
// starts the game if not started by pressed on any key
$(document).keydown(function(){
    if(started === false){
        nextSequence();
        started = true;
    }
});



// function that checks answers 
function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            console.log("succsess")
            if(gamePattern.length===userClickedPattern.length){
                setTimeout(function(){nextSequence()},1000)
            }
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200)
            $("#level-title").text("Game Over, Press Any Key To Restart!")
            startOver();
        }
    
}

// function for start game over if lost
function startOver(){
    gamePattern=[];
    level = 0; 
    started = false;
}
