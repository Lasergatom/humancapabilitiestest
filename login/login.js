// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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
let userinfo, userdata
$(".submitdata").click(async()=>{
    userinfo= await getDoc(doc(db,"users",$(".username").val()))
    userdata= await userinfo.data()
    if(userinfo.exists()){
        if($(".password").val()==userdata.password){
            localStorage.setItem("account",userdata.username)
            alert("login successful")
            window.open(`../index.html`,"_parent");
        }else{
            $(".warning").text("The password is wrong :(")
        }

    }else{
        $(".warning").text("Account does not exist!!!")
    }
})