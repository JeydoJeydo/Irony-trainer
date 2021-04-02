var userName;

window.onload = function(){
    console.log("init.");

    const mw = new movinwords({
        "el": ".word",
        "autostart": false,
        "delay": "10",
        "duration": "500",
        "transition": "slideInTop",
        "offset": "5",
        "wordSpacing": "5"
    });
    mw.start();

    startup();
}

function startup(){ //set or get UserName
    if(localStorage.getItem("userName") == null){   //user doesn't exists
        console.log("User doesnt exists!");
    }else{  //user exists
        console.log("User exists!");
        userName = localStorage.getItem("userName");
        console.log("userName: " + localStorage.getItem("userName"));
        console.log("Joined On: " + localStorage.getItem("JoinedOn"));
        if(localStorage.getItem("lvlData") != null){
            lvlData = parseData(localStorage.getItem("lvlData"));  
            console.log(lvlData);
        }
        //document.querySelector(".intro-wrapper").style.display = "none";
    }
}


var currentLvl = 0; //current Level

function progress(){
    document.getElementById("texttest").innerHTML = lvlData[currentLvl].text;   //display Text
    document.getElementById("currentLvl").innerHTML = currentLvl +1;    //display current Lvl
}





function userInput(lvldpInput){ //gets which button was pressed
    if(lvldpInput == lvlData[currentLvl].solution){  //if answer is correct
        console.log("richtig");
    }else{
        console.log("falsch");
    }
    lvlData[currentLvl].userAnswer = lvldpInput;
    console.log(lvlData);
    saveLocal(stringifyData(lvlData));
}

function saveLocal(dataToSave){
    localStorage.setItem("lvlData", dataToSave);
}

function stringifyData(givenData){
    return(JSON.stringify(givenData));
}
function parseData(givenData){
    return(JSON.parse(givenData));
}






// intro functions

function introResume(){
    var introOne = document.querySelector(".intro-aboutText-wrapper");
    var introTwo = document.querySelector(".intro-login-wrapper");
    var appName = document.querySelector("#app-name");
    var welcomeMsg = document.querySelector(".intro-welcome-msg");
    var nameInput = document.getElementById("nameInput");
    var introButtonOne = document.querySelector(".intro-button-wrapper");

    if(introOne.style.left != "-100%" && introTwo.style.left != "0%"){
        introOne.style.left = "-100%";
        introTwo.style.left = "0%"; 
        appName.style.left = "-100%";
        welcomeMsg.style.left = "100%";
    }else if(nameInput.value == null || nameInput.value == ""){
        console.log("please fill");
        nameInput.style.boxShadow = "0 0 0 2pt #f4ead5";
    }else if(welcomeMsg.style.left == "100%"){
        welcomeMsg.style.left = "0%";
        introTwo.style.left = "-100%";
        introButtonOne.style.left = "-100%";

        var currentDate = new Date;
        userName = document.getElementById("nameInput").value;
        localStorage.setItem("userName", userName); //store Name
        localStorage.setItem("JoinedOn", currentDate);

        document.querySelector("#intro-msg-response").innerHTML = "Hallo " + userName +  ", bist du bereit für die erste Runde?";
    }else{
        nameInput.style.boxShadow = "none";
        console.log("ready");
    }    
}





function resume(){
    currentLvl++;
    progress();
}
function reverse(){
    currentLvl--;
    progress();
}
function deleteData(){
    localStorage.clear();
}