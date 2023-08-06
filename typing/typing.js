let paras
$(document).ready(function(){
    $.get("../paragraphs.txt",function(data){
        paras=data.split("\n!\n")
    });
});
$(".begin-button").click(()=>{
    $(".titlescreen").hide()
    $(".gamescreen").css("display","flex")
    typing()
})