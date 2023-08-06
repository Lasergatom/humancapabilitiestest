import {setHighScore} from "../index.js"
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $(".gamescreen").css("display","flex")
    visual()
})
let tiles=1,numslist=[],idlist=[],clickable=false,life=3,newtileid,newtilenum
function visual(){
    $(".glowtiles").text("Glowing Tiles: "+tiles)
    for(let i=0;i<tiles;i++){
        let newtilenum=Math.floor(Math.random()*36)
        while(numslist.includes(newtilenum)){
            newtilenum=Math.floor(Math.random()*36)
        }
        numslist.push(newtilenum)
        if(newtilenum>=10){
            newtileid="#node"+newtilenum
        }else{
            newtileid="#node0"+newtilenum
        }
        idlist.push(newtileid)
        $(newtileid).animate({backgroundColor:"#FFFFFF"},500)
        $(newtileid).animate({backgroundColor:"#769F24"},500)
        setTimeout(()=>{
            clickable=true
        },1000)
    }
}
$(".gamenode").click(function(){
    if(clickable==true){
        if(idlist.includes("#"+$(this).attr("id"))){
            $(this).animate({backgroundColor:"#FFFFFF"},200)
            idlist.splice(idlist.indexOf("#"+$(this).attr("id")),1)
            if (idlist.length==0){
                $(".top-screen").animate({opacity:"0.5"},300)
                $(".top-screen").animate({opacity:"1"},300)
                clickable=false
                tiles++
                numslist=[]
                setTimeout(() => {
                    $(".gamenode").animate({backgroundColor:"#769F24"},500)
                }, 200);
                setTimeout(() => {
                    visual()
                }, 1000);
            }
        }else{
            if($(this).css("background-color")!="rgb(255, 255, 255)"){
                $("#life"+life).hide()
                $(".top-screen").animate({backgroundColor:"#FFA500"},200)
                $(".top-screen").animate({backgroundColor:"#9ACD32"},300)
                life--
                clickable=false
                numslist=[]
                idlist=[]
                setTimeout(() => {
                    $(".gamenode").animate({backgroundColor:"#769F24"},500)
                    if(life==0){
                        $(".gamescreen").hide()
                        $(".endscreen").css("display","flex")
                        $(".glowscore").text("Tiles: "+(tiles-1))
                        setHighScore(5,tiles-1)
                    }else{
                        setTimeout(() => {
                            visual()
                        }, 1000);
                    }
                }, 200);
            }
            // $(".gamescreen").hide()
            // $(".top-screen").animate({backgroundColor:"#FFA500"},200)
            // $(".top-screen").animate({backgroundColor:"#9ACD32"},300)
            // $(".endscreen").css("display","flex")
            // $(".seqscore").text("Sequence Length: "+(sequencelist.length-1))
        }
    }
})
$(".retry").click(()=>{
    $(".endscreen").hide()
    $(".gamescreen").css("display","flex")
    tiles=1,clickable=false,life=3
    $(".life").show()
    visual()

})