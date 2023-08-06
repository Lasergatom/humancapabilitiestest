// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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
$(".submitdata").click(async()=>{
    if($(".username").val().trim()!=""){
        var getuserinfo= await getDoc(doc(db,"users",$(".username").val()))
        if(getuserinfo.exists()){
            $(".warning").text("Sorry :( username taken!")
        }else{
            if($(".password").val().match(/\S/g)){
                if($(".password").val().length>=8){
                    if($(".password").val().match(/[A-z]/g)){
                        if($(".password").val().match(/[0-9]/g)){ 
                            if($(".password").val().match(/\W/g) || $(".password").val().includes('_')){
                                console.log("succcess")
                                await setDoc(doc(db,"users",$(".username").val()),{
                                    username:$(".username").val(),
                                    password:$(".password").val(),
                                    highscores:[0,0,0,0,0,0,0]
                                })
                                localStorage.setItem("account",$(".username").val())
                                alert("sign up success")
                                window.open(`../index.html`,"_parent");
                            }else{
                                $(".warning").text("Password must contain at least 1 symbol :(")
                            }
                        }else{
                            $(".warning").text("Password must contain at least 1 number :(")
                        }
                    }else{
                        $(".warning").text("Password must contain at least 1 letter :(")
                    }
                    
                }else{
                    $(".warning").text("Password must contain at least 8 characters :(")
                }
            }else{
                $(".warning").text("Password cannot contain whitespace characters :(")
            }
        }
    }else{
        $(".warning").text("username cannot be empty :(")
    }
})