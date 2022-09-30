const buttonColor = ["green","red","yellow","blue"];

var userChosenPattern = [];
var gamePattern = [];
let timeoutID; 

settingStart();

function settingStart(){
    $(document).keydown(pressToStart);
    $("body").on('click touchstart',pressToStart);
    // $("body").click(pressToStart);
}

function pressToStart(evt){
    gameStart();
}

function gameStart(){
    if (gamePattern.length === 0 ){
        nextSequence();

        // Remove Body Event Listener
        $(document).off();
        $("body").off();

        // Add Button Event Listener
        $(".btn").on('click touchstart',function(evt){
            checkSequence(this.id);  
        });
    }
}

function nextSequence(){    
    userChosenPattern = [];
    $("#level-title").text("Level " + (gamePattern.length+1));
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(randomNumber);
    buttonAnimation(randomNumber);
}

function checkSequence(name){
    var buttonNumber = buttonColor.indexOf(name);
    userChosenPattern.push(buttonNumber);
    console.log(userChosenPattern.length);

    pressAnimation("#" + name, "pressed");
    playSound(name);
    if (buttonNumber === gamePattern[userChosenPattern.length - 1] ){
        if(userChosenPattern.length === gamePattern.length){
            timeoutID = setTimeout(function(){        
                nextSequence();
            },1000);
        }
    }else{
        clearTimeout(timeoutID);
        pressAnimation("#" + name, "pressed");
        pressAnimation("body", "game-over");
        playSound("wrong");
        
        $("#level-title").text("Game Over").addClass("game-over-title");
        startOver();
    }
}

function pressAnimation(name, styleClassName){
    $(name).addClass(styleClassName);
    setTimeout(function(){        
        $(name).removeClass(styleClassName);
    },100);
}

function buttonAnimation(number){
    $("#"+buttonColor[number]).fadeOut(100).fadeIn(100);
    playSound(buttonColor[number]);
}

function playSound(name){
    var sounds = new Audio();
    sounds.src = "sounds/" + name + ".mp3";
    sounds.play();
}

function startOver(){

    gamePattern = [];
    level = 0;
    $(".btn").off();
    setTimeout(function(){        
        settingStart();
        $("#level-title").text("Press Any Key to Restart").removeClass("game-over-title");
    },2000);
}
