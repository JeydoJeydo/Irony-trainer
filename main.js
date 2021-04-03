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
        document.querySelector(".intro-wrapper").style.display = "none";
        welcomeApp();
    }
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

function verteiler(a){
    switch (a){
        case 0:
            break;
        case 1:
            welcomeApp();
            document.querySelector(".intro-wrapper").style.display = "none";
            break;
        case 2:
            document.querySelector(".settings").style.top = "0%";
            break;
        case 3:
            document.querySelector(".settings").style.top = "-100%";
            break;
        case 4:
            localStorage.clear();
            break;
        default:
            console.log("issue in verteiler function");
    }
}

// app functions

function welcomeApp(){
    var currentDate = new Date;
    var currentDate = currentDate.getHours();
    var daytime;
    
    if(currentDate < 13){
        daytime = "Guten Morgen,";
    }else if(currentDate >= 13 && currentDate <= 17){
        daytime = "Moin,";
    }else if(currentDate >= 18){
        daytime = "Guten Abend,";
    }
    var welcomeMsg = document.querySelector("#landing-msg");
    welcomeMsg.innerHTML = daytime  + " " + userName;
}





















function testingFunction(){
    localStorage.clear();
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
