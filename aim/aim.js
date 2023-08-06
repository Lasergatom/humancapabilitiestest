// $(".tpimg").on("load",function(){
//     let angle=0
//     rotation=setInterval(()=>{
//         angle++
//         $(".tpimg").css("transform",`rotateY(${angle}deg)`)
//     },1000/360)
// })
import {setHighScore} from "../index.js"
let odate,omin,osec,omil,ftime
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    odate=new Date()
    omin=odate.getMinutes()
    osec=odate.getSeconds()
    omil=odate.getMilliseconds()
    aimgame()
})
$(".retry").click(()=>{
    $(".aimcanvas").show()
    $(".endscreen").hide()
    odate=new Date()
    omin=odate.getMinutes()
    osec=odate.getSeconds()
    omil=odate.getMilliseconds()
    targets=0
    aimgame()
})
let targets=0
function aimgame(){
    if(targets<20){
        $(".targetlabel").text("Targets left: "+(20-targets))
        generate()
    }else{
        let ndate=new Date()
        let nmin=ndate.getMinutes()
        let nsec=ndate.getSeconds()
        let nmil=ndate.getMilliseconds()
        if(nmil==omil){
            ftime=((nsec*1000+nmil)-(osec*1000+omil))/20
        }else{
            ftime=((nmin*60*1000+nsec*1000+nmil)-(omin*60*1000+osec*1000+omil))/20
        }
        $(".aimcanvas").hide()
        $(".endscreen").css("display","flex")
        $(".finaltime").text(ftime+"ms")
        setHighScore(3,ftime)
    }
}
function generate(){
    var x = Math.floor( Math.random() * ($(".aimcanvas").outerWidth()-$(".target").outerWidth()));
    var y = Math.floor( Math.random() * ($(".aimcanvas").outerHeight()-$(".target").outerHeight()));
    $(".target").css("top",y+"px")
    $(".target").css("left",x+"px")
    targets++
}
$(".target").on("mousedown",()=>{
    aimgame()
})