// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHKTzxYmbM7h-9Qsddn1cvzPjV6v4kcxk",
  authDomain: "human-bench.firebaseapp.com",
  projectId: "human-bench",
  storageBucket: "human-bench.appspot.com",
  messagingSenderId: "6808904074",
  appId: "1:6808904074:web:cc27023016557657da6873",
  measurementId: "G-CM2E9YFLPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
//code
const userinfo=localStorage.getItem("account")
if(userinfo!=null){
    $(".accountoptions").hide()
    $(".accountui").css("display","flex")
    $(".accountname").text("Player: "+userinfo)
}
$(".sotrigger").click(()=>{
    localStorage.removeItem('account')
    location.reload()
})
let userdocs,highscoreslist
async function setHighScore(gameindex,score){
    if(userinfo!=null){
        userdocs=await getDoc(doc(db,"users",userinfo))
        highscoreslist=userdocs.data().highscores
        let oldhighscore=userdocs.data().highscores[gameindex]
        if(score>oldhighscore){
            highscoreslist[gameindex]=score
            await updateDoc(doc(db,"users",userinfo), {
                highscores:highscoreslist
              });
        }
    }
}
//exports
export {setHighScore}