$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $(".gamescreen").css("display","flex")
    colorgame()
})
var colorlist,red,green,blue,pos,slot,change=45,posneg,score=0
function colorgame(){
    red=Math.floor(Math.random()*131)+50
    green=Math.floor(Math.random()*131)+50
    blue=Math.floor(Math.random()*131)+50
    colorlist=[red,green,blue]
    pos=Math.floor(Math.random()*9)
    console.log(pos)
    slot=Math.floor(Math.random()*3)
    posneg=Math.floor(Math.random()*2)
    $(".gamenode").css("backgroundColor",`rgb(${colorlist[0]},${colorlist[1]},${colorlist[2]})`)
    if(posneg==0){
        if(colorlist[slot]-change>=0){
            colorlist[slot]-=change
            $(`#node${pos}`).css("backgroundColor",`rgb(${colorlist[0]},${colorlist[1]},${colorlist[2]})`)
            colorlist[slot]+=change
        }else{
            posneg=1
        }
    }if(posneg==1){
        if(colorlist[slot]+change<=255){
            colorlist[slot]+=change
            $(`#node${pos}`).css("backgroundColor",`rgb(${colorlist[0]},${colorlist[1]},${colorlist[2]})`)
            colorlist[slot]-=change
        }else{
            posneg=0
            colorlist[slot]-=change
            $(`#node${pos}`).css("backgroundColor",`rgb(${colorlist[0]},${colorlist[1]},${colorlist[2]})`)
            colorlist[slot]+=change
        }
    }
}
$(".gamenode").click(function(){
    console.log($(this).attr("id"))
    if($(this).attr("id")[$(this).attr("id").length-1]==pos){
        score++
        if(change>10){
            change--
            console.log(change)
        }
        $(".round").text("Color Score: "+score)
        $(".top-screen").animate({opacity:"0.5"},300)
        $(".top-screen").animate({opacity:"1"},300)
        colorgame()
    }else{
        $(".gamescreen").hide()
        $(".endscreen").css("display","flex")
        $(".score").text("Color Score: "+score)
        $(".top-screen").animate({backgroundColor:"#FFA500"},200)
        $(".top-screen").animate({backgroundColor:"#9ACD32"},300)
    }
})
$(".retry").click(()=>{
    $(".endscreen").hide()
    $(".gamescreen").css("display","flex")
    score=0,change=45
    $(".round").text("Color Score: "+score)
    colorgame()

})