import {setHighScore} from "../index.js"
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $(".gamescreen").css("display","flex")
    sequence()
})
let sequencelist=[],clickable=false,clickindex=0
function sequence(){
    let newclass="#node"+Math.floor(Math.random()*9)
    if(sequencelist.length>0){
        while(sequencelist[sequencelist.length-1]==newclass){
            newclass="#node"+Math.floor(Math.random()*9)
        }
    }
    sequencelist.push(newclass)
    $(".seqlen").text("Sequence Length: "+sequencelist.length)
    sequencelist.map((classname,index)=>{
        console.log(classname,index)
        setTimeout(() => {
            $(classname).animate({backgroundColor:"#FFFFFF"},300)
            $(classname).animate({backgroundColor:"##769F24"},300)
        }, (index+1)*600);
    })
    setTimeout(()=>{
        clickable=true
    },(sequencelist.length+1)*600)
}
$(".gamenode").click(function(){
    if(clickable==true){
        if("#"+$(this).attr("id")==sequencelist[clickindex]){
            $(this).animate({backgroundColor:"#FFFFFF"},200)
            $(this).animate({backgroundColor:"#769F24"},300)
            if (clickindex+1==sequencelist.length){
                clickindex=0
                clickable=false
                setTimeout(() => {
                    $(".top-screen").animate({opacity:"0.5"},300)
                    $(".top-screen").animate({opacity:"1"},300)
                    sequence()
                }, 1000);
            }else{
                clickindex++
            }
        }else{
            $(".gamescreen").hide()
            $(".top-screen").animate({backgroundColor:"#FFA500"},200)
            $(".top-screen").animate({backgroundColor:"#9ACD32"},300)
            $(".endscreen").css("display","flex")
            $(".seqscore").text("Sequence Length: "+(sequencelist.length-1))
            setHighScore(4,sequencelist.length-1)
        }
    }
})
$(".retry").click(()=>{
    $(".endscreen").hide()
    $(".gamescreen").css("display","flex")
    sequencelist=[]
    clickable=false
    clickindex=0
    sequence()

})