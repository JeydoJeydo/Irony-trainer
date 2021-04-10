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
    avaLvl();
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
        popmsg("gib bitte deinen Namen an");
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
            welcomeApp();
            document.querySelector(".intro-wrapper").style.display = "none";
            levelIntroducing("lvl0");
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
            popmsg("alle Daten gelöscht");
            break;
        case 5:
            document.querySelector(".level-structure").style.display = "none";
            taskButtonAppearance(0); //show resume button on lvl entry
            break;
        default:
            console.log("issue in verteiler function");
    }
}

function avaLvl(){ //grey out all unavailable level
    var amountOfLevel = document.querySelector(".lvl-overview-wrapper").getElementsByTagName("div").length;
    for(i = 0; i < amountOfLevel; i++){
        if(lvlData[i].userAnswer == ""){
            var elementID = "#lvl" + (i+1);
            console.log(elementID);
            document.querySelector(elementID).style.opacity = "0.5";
        }else{
            console.log("yess");
        }
        console.log("durchlauf");
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

function popmsg(msg){
    document.querySelector("#popmsg").innerHTML = msg;
    document.querySelector("#popmsg").style.top = "calc(100% - 4em)";
    document.querySelector("#popmsg").style.opacity = "1";
    setTimeout(popmsgclose, 3500);
    function popmsgclose(){
        document.querySelector("#popmsg").style.top = "calc(100% + 1em)";
        document.querySelector("#popmsg").style.opacity = "0";
    }
}

function levelIntroducing(divId){
    divNumber = divId.slice(-1);
    if(divNumber == 0){ //first level
        console.log("acces granted");
        lvlLoader(divId);
    }else{ //every other than first level
        if(lvlData[divNumber-1].userAnswer != ""){
            console.log("acces granted");
            lvlLoader(divId);
        }else{
            console.log("not granted");
            popmsg("level noch nicht freigeschaltet");
        }
    }
}
var currentId; //just number
function lvlLoader(divId){
    console.log(divId);
    divNumber = divId.slice(-1);
    document.querySelector(".level-structure").style.display = "block";
    document.querySelector("#level-header-level").innerHTML = "Level: " + (parseInt(divNumber)+1);

    spOne = document.querySelector("#storypart-one");
    spTwo = document.querySelector("#storypart-two");
    spThree = document.querySelector("#storypart-three");

    spOne.innerHTML = lvlData[divNumber].text;
    currentId = divNumber;
}

function lvlresume(){
    spOne = document.querySelector("#storypart-one");
    spTwo = document.querySelector("#storypart-two");
    spThree = document.querySelector("#storypart-three");
    taskButtonAppearance(1);

    spOne.innerHTML = lvlData[currentId].task;
}

function userInput(lvldpInput){ //gets which button was pressed
    if(lvldpInput == lvlData[currentLvl].solution){  //if answer is correct
        console.log("richtig");
        userFeedbackMsg(1);
    }else{
        console.log("falsch");
        userFeedbackMsg(2);
    }
    lvlData[currentLvl].userAnswer = lvldpInput;
    //console.log(lvlData);
    //saveLocal(stringifyData(lvlData));
}

function userFeedbackMsg(rw){
    if(rw == 1){//answer is right
        //document.querySelector(".userFeedback").style.display = "block";
        //document.querySelector("#userFeedbackMsg").innerHTML = "richtig";
    }else if(rw == 2){//answer is wrong
        document.querySelector(".userFeedback").style.display = "block";
        document.querySelector("#userFeedbackMsg").innerHTML = "falsch";
        document.querySelector("#userFeedbackMsg").innerHTML = lvlData[currentId].ifWrong;
    }
    setTimeout(userFeedbackMsgClose, 3000);
    function userFeedbackMsgClose(){
        document.querySelector(".userFeedback").style.display = "none";
    }
}

function taskButtonAppearance(buttonId){
    tbaButton = document.querySelector("#levelFooterButton");
    tbaWhat = document.querySelector(".typeOne");
    tbaChoose = document.querySelector(".typeTwo");

    switch(buttonId){
        case 0:
            tbaButton.style.display = "block";
            tbaWhat.style.display = "none";
            tbaChoose.style.display = "none";
            break;
        case 1:
            tbaButton.style.display = "none";
            tbaWhat.style.display = "flex";
            tbaChoose.style.display = "none";
            break;
        case 2:
            tbaButton.style.display = "none";
            tbaWhat.style.display = "none";
            tbaChoose.style.display = "block";
            break;
    }
}































var currentLvl = 0; //current Level

function progress(){
    document.getElementById("texttest").innerHTML = lvlData[currentLvl].text;   //display Text
    document.getElementById("currentLvl").innerHTML = currentLvl +1;    //display current Lvl
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
