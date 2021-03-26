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

        progress(); //get lvl Data
    }
}


var currentLvl = 0; //current Level

function progress(){
    console.log(lvlDataAnswers[currentLvl]);
    console.log(lvlDataText[currentLvl]);
    console.log(lvlDataSolution[currentLvl]);

    document.getElementById("texttest").innerHTML = lvlDataText[currentLvl];
    document.getElementById("currentLvl").innerHTML = currentLvl +1;
}





function userInput(lvldpInput){
    var lvlAmount = lvlDataText.length;
    /*
    switch(lvldpInput){
        case 0:
            console.log("Ironie");
            break;
        case 1:
            console.log("Lüge");
            break;
        case 2:
            console.log("Fehler");
            break;
    }
    */
    if(lvldpInput == lvlDataSolution[currentLvl]){  //if answer is correct
        console.log("richtig");
    }else{
        console.log("falsch");
    }
    lvlDataAnswers.push(lvldpInput);    //add answer to list of answers given by the user
    saveToLocal();
}

function saveToLocal(){
    localStorage.setItem("lvlDataAnswers", lvlDataAnswers);
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