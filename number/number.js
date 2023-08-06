import {setHighScore} from "../index.js"
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $("#statcontain").show()
    $("#clickarea").css("display","flex")
    gennumber()
})
let digits=0
function gennumber(){
    digits++
    $("#clickcount").text("Digits: "+digits)
    $("#answer").val("")
    $("#number").text(Math.floor(Math.random()*(9*(10**(digits-1))))+(10**(digits-1)))
    $(".numbercontain").fadeIn().css("display","flex")
    setTimeout(()=>{
        $(".numbercontain").fadeOut(300)
    },3000)
    setTimeout(()=>{
        $(".replyarea").css("display","flex")
    },3500)
}
$("#retry").click(()=>{
    $(".endscreen").hide()
    gennumber()
})
$("#continue").click(()=>{
    $(".resultarea").hide()
    gennumber()
})
$("#submitter").click(()=>{
    $(".replyarea").hide()
    $(".playerans").text("Your answer: "+$("#answer").val())
    $(".modelans").text("Actual answer: "+$("#number").text())
    if($("#answer").val()==$("#number").text()){
        $(".top-screen").animate({opacity:"0.5"},300)
        $(".top-screen").animate({opacity:"1"},300)
        let numanswer="correct"
        $(".resultarea").css("display","flex")
        
    }else{
        $(".top-screen").animate({backgroundColor:"#FFA500"},200)
        $(".top-screen").animate({backgroundColor:"#9ACD32"},300)
        $(".endscreen").css("display","flex")
        $(".numscore").text("Digits: "+(digits-1))
        let numanswer="incorrect"
        setHighScore(1,digits-1)
        digits=0
    }
})