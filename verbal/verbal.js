import {setHighScore} from "../index.js"
let words
$(document).ready(function(){
    $.get("../letters.txt",function(data){
        words=data.split("\r\n")
    });
});
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $(".gamescreen").css("display","flex")
    addgroup()
    verbal()
})
let wordgrouplist=[],selectedgroups=[],seen=[],selectedword,life=3,score=0,newgroup,newgroupnum
function addgroup(){
    newgroupnum=Math.floor(Math.random()*30)*10
    while(selectedgroups.includes(newgroupnum)){
        newgroupnum=Math.floor(Math.random()*30)*10
    }
    selectedgroups.push(newgroupnum)
    newgroup=words.slice(newgroupnum,newgroupnum+10)
    wordgrouplist=wordgrouplist.concat(newgroup)

}
function verbal(){
    if(life==0 || seen.length==300){
        $(".gamescreen").hide()
        $(".endscreen").css("display","flex")
        $(".wordscore").text("Score: "+score)
        setHighScore(6,score)
    }
    if(seen.length==wordgrouplist.length/2){
        addgroup()
        console.log("added group")
    }
    $(".top-screen").animate({opacity:"0.5"},300)
    $(".top-screen").animate({opacity:"1"},300)
    $(".wordcount").text("Score: "+score)
    selectedword=wordgrouplist[Math.floor(Math.random()*wordgrouplist.length)]
    while(selectedword==$(".word").text()){
        selectedword=wordgrouplist[Math.floor(Math.random()*wordgrouplist.length)]
    }
    $(".word").text(selectedword)
}
$(".seenword").click(()=>{
    if(!seen.includes(selectedword)){
        $("#life"+life).hide()
        life--
    }else{
        score++
    }
    verbal()
})
$(".newword").click(()=>{
    if(seen.includes(selectedword)){
        $("#life"+life).hide()
        life--
    }else{
        score++
    }
    seen.push(selectedword)
    verbal()
})
$(".retry").click(()=>{
    wordgrouplist=[],selectedgroups=[],seen=[],life=3,score=0
    $(".endscreen").hide()
    $(".gamescreen").css("display","flex")
    $(".life").show()
    addgroup()
    verbal()

})