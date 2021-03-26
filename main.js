window.onload = function(){
    console.log("init.");
    startup();
}

function startup(){ //set or get UserName
    if(localStorage.getItem("userName") == null){   //user doesn't exists
        var currentDate = new Date;

        var userName = window.prompt("Wie heißt du?");
        localStorage.setItem("userName", userName); //store Name
        localStorage.setItem("JoinedOn", currentDate);
    }else{  //user exists
        console.log("userName: " + localStorage.getItem("userName"));
        console.log("Joined On: " + localStorage.getItem("JoinedOn"));
        if(localStorage.getItem("lvlData") != null){
            lvlData = parseData(localStorage.getItem("lvlData"));  
            console.log(lvlData);
        }
        progress(); //get lvl Data
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