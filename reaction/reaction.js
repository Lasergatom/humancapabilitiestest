import {setHighScore} from "../index.js"
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    reaction()
})
let react="unreacting"
let reactionlist=[]
let omil,omin,osec,clickaction,secondsgen,ftime,avgtime
function reaction(){
    $(".top-screen").animate({backgroundColor:"#FFA500"},200)
    $(".reactioncontent").fadeIn(200).css("display","flex")
    $(".reactionstatus").text("Don't click yet...")
    $(".reactionnote").text("")
    secondsgen=Math.floor(Math.random()*5)+5
    clickaction=setTimeout(()=>{
        $(".top-screen").animate({backgroundColor:"#9ACD32"},200)
        $(".reactionstatus").text("PRESS NOW!!!")
        console.log(secondsgen)
        react="reacting"
        let odate=new Date()
        omin=odate.getMinutes()
        osec=odate.getSeconds()
        omil=odate.getMilliseconds()
    },secondsgen*1000)
    
}
$(".reactioncontent").click(()=>{
    if(react=="reacting"){
        let ndate=new Date()
        let nmin=ndate.getMinutes()
        let nsec=ndate.getSeconds()
        let nmil=ndate.getMilliseconds()
        if(nsec==osec){
            ftime=nmil-omil
        }else if(nmil==omil){
            ftime=(nsec*1000+nmil)-(osec*1000+omil)
        }else{
            ftime=(nmin*60*1000+nsec*1000+nmil)-(omin*60*1000+osec*1000+omil)
        }
        console.log(ftime)
        $(".reactionstatus").text(ftime+"ms")
        $(".reactionnote").text("click to continue")
        reactionlist.push(ftime)
        react="reacted"
    }else if(react=="unreacting"){
        clearTimeout(clickaction)
        $(".reactionstatus").text("Too early :(")
        $(".reactionnote").text("click to retry")
        react="reacted"
    }else{
        if(reactionlist.length==5){
            $(".reactioncontent").hide()
            $(".endscreen").css("display","flex")
            avgtime=reactionlist.reduce((a, b) => a + b, 0) / 5
            $(".reactscore").text("Average Time: "+avgtime+"ms")
            setHighScore(2,avgtime)
            reactionlist=[]
        }else{
            reaction()
        }
    }
})
$(".retry").click(()=>{
    $(".endscreen").hide()
    $(".reaction").css("display","flex")
    reaction()
})