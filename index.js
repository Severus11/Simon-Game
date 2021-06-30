var buttonColors=["red", "blue", "green", "yellow"];
var userClickPattern=[]
var gamePattern = []
var level =0

$(document).keypress(function(){
  if(level ==0){
      nextSequence()
  }

})

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3")
  audio.play()
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]== userClickPattern[currentLevel])
  {
    console.log("Sucess")
    if(gamePattern.length == userClickPattern.length)
    {
      setTimeout(function(){
        nextSequence()
      }, 1000)
    }
  }
  else {

    var audiof = new Audio("sounds/wrong.mp3")
    audiof.play()
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 800)
    $("h1").text("Failed ! Your Score is: "+level)


    gamePattern=[]
    setTimeout(function(){
      $("h1").text("Press any key to restart")
    }, 2000)
    $(document).keypress(function(){
      level =0
      nextSequence()
    })
  }
}



function nextSequence()
{
  userClickPattern=[]
  level += 1
  $("h1").text("Level "+level)
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor)
  $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  animatePress(randomChosenColor)
  playSound(randomChosenColor)
}

$(".btn").click(function(){
  var userChosenColor= $(this).attr("id")
  userClickPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)

  checkAnswer(userClickPattern.length -1)
  // console.log(userClickPattern)
})
