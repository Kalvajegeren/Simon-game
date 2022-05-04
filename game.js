   let buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];


let level = 0;

let started = false;


$(document).keypress(function(){
if(! started){
$("#level-title").text("level" + level);
nextSequence();
  started === true;
}
});  

// Hva skjer når personen trykker på knapp
$(".btn").click(function(){
   let userChosenColor = $(this).attr("id");
    userClickedPattern.push (userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length -1);
    
});

// Neste sekvens i mønsteret
 function nextSequence (){
   userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()*4 )
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push (randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
     
} 

// lage lyd med kappene
function playSound(name){
   let audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

 // Lage animasjon på knappene
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Skjekke om bruker gjør det samme som CPU
function checkAnswer (currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
// Restarte
  function starOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }

  if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
   let audioWrong = new Audio("sounds/wrong.mp3")
   audioWrong.play();
   $("body").addClass("game-over")
   setTimeout(function(){
     $("body").removeClass("game-over")
   }, 200);
   $("h1").text("Game Over, Press Any Key to Restart");
   starOver();
  }
}





 


 