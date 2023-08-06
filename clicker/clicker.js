import {setHighScore} from "../index.js"
let clicks=0
let click="enabled"
let timer=null
let countdown
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $("#statcontain").show()
    $("#clickarea").css("display","flex")
})
$("#clickarea").click(function(){
    if(click=="enabled"){
        clicks++;
        $("#clickarea").text("")
        $("#clickcount").text("clicks: "+clicks)
    }
    if(timer==null){
        starttimer()
    }
})
function starttimer(){
    timer=10
    countdown=setInterval(()=>{
        timer--
        $("#timer").text("time: "+timer)
        if(timer==0){
            clearInterval(countdown)
            click="disabled"
            $("#statcontain").hide()
            $("#clickarea").hide()
            $(".endscreen").css("display","flex")
            $(".cpsscore").text("Clicks Per Second: "+(clicks/10).toFixed(1))
            setHighScore(0,clicks/10)
        }
    },1000)
}
$(".retry").click(()=>{
    $(".endscreen").hide()
    $("#statcontain").show()
    $("#clickarea").css("display","flex")
    clicks=0
    click="enabled"
    timer=null
    $("#timer").text("time: 10")
})