
alert("😊\n #Click New Note - Note Saved \n #Click Recent - Recently created notes\n #Click Reset - Default Colors");

//-------START JavaScript

var notesArray = [];
var titleArray = [];
var note_num = 0;
var goPrev = 0;
var goNext = 0;
var currentText, currentTitle;
var changed = false;
var onPrev = false, onNext = false;
var recentClicked = false;
var updatingText, expanded=false;


const passVal = () => {

    

    if(changed == false){
        currentText = document.getElementById("notes").innerText;
        currentTitle = document.getElementById("title").value;
    }
    else if(goNext == note_num){
        currentText = document.getElementById("notes").innerText;
        currentTitle = document.getElementById("title").value;
    }
    else if(changed == true){
        updatingText = document.getElementById("notes").innerText;
        if(onPrev = true){
            notesArray[goPrev] += updatingText[updatingText.length - 1];
        }
        else{
            notesArray[goNext] += updatingText[updatingText.length - 1];
        }
    }

}


const newNote = () => {

    
    
    //initializing the text editor
    if(recentClicked == true){
        document.getElementById("paper").innerHTML = `<div id="notes" onkeyup="passVal()" contenteditable="true"  style="min-height: 306.563px;" spellcheck="true"></div>`;
        document.getElementById("title").value = "";
    }
    
    document.getElementById("notes").style.color = `${textColor_}`;
    
    //making change false for initializing currentText as empty.
    currentText = "";
    currentTitle = "";

    //changing the color of title in new note
    document.getElementById("title").style.backgroundColor = "rgb(255, 210, 194)";
    document.getElementById("title").removeAttribute("class", "title");



    //Getting the values from notepad and title
    var note = document.getElementById("notes").innerText;
    var title = document.getElementById("title").value;

    //Storing and updating the values
    if(note != undefined && title != "" ){
            notesArray[note_num] = note;
            titleArray[note_num] = title;
            document.getElementById("notes").innerText = "";
            document.getElementById("title").value = "";
            note_num++;
            goNext = goPrev = note_num;
    }
    else if( title == "" && recentClicked == false){
        //changing the color of title if title is not given
        document.getElementById("title").style.backgroundColor = "rgb(238, 255, 0)";
        document.getElementById("title").setAttribute("class", "title");
    }
    recentClicked = false;
}


const change = (moveType) => {

    changed = true;

    if(recentClicked == true){
        document.getElementById("paper").innerHTML = `<div id="notes" onkeyup="passVal()" contenteditable="true"  style="min-height: 306.563px;" spellcheck="true"></div>`;
        document.getElementById("notes").innerText = "";
        document.getElementById("title").value = "";
        recentClicked = false;
    }

    if(moveType == 'prev' && goPrev > 0 ){
        onPrev = true; onNext = false;
        document.getElementById("notes").innerText = notesArray[--goPrev];
        document.getElementById("title").value = titleArray[goPrev];
        goNext = goPrev;
    }

    else if (moveType == 'next' && ++goNext <= note_num  ){
        onPrev = false; onNext = true;
        if(goNext == note_num){
            document.getElementById("notes").innerText = currentText;
            document.getElementById("title").value = currentTitle;
        }

        else {
            document.getElementById("notes").innerText = notesArray[goNext];
            document.getElementById("title").value = titleArray[goNext];
        }
        goPrev = goNext;
    }
}

var noteDiv, titleContent, noteContent;

const recent = () => {
    
    recentClicked = true;


    document.getElementById("paper").innerHTML = `<div id='noteBox'></div>`;
    document.getElementById("title").value = "Recent Notes";




    //If no note entered
    if(note_num == 0){
        document.getElementById("noteBox").innerHTML = `<div id='noNoteTextError'>No Notes...</div> `;
    }
    else {
        for(var i=note_num-1 ; i>=0 ; i--){
            noteDiv = document.createElement("div");
            noteDiv.setAttribute("class", "noteDiv");
            noteDiv.setAttribute("id", `noteDiv${i}`);

            titleContent = document.createElement("div");
            titleContent.setAttribute("class", "titleContent");
            titleContent.setAttribute("id", `titleContent${i}`);
            titleContent.appendChild(document.createTextNode(`${titleArray[i].length > 25 ? titleArray[i].slice(0, 20) + "..." : titleArray[i]}`));
            noteDiv.appendChild(titleContent);


            noteContent = document.createElement("div");
            noteContent.setAttribute("id", `noteContent${i}`);
            noteContent.setAttribute("class", `noteContent`);
            document.getElementById(`noteContent${i}`)
            noteContent.appendChild(document.createTextNode(`${notesArray[i].length > 20 ? notesArray[i].slice(0, 30) + "..." : notesArray[i]}`));
            noteDiv.appendChild(noteContent);

            document.getElementById("noteBox").appendChild(noteDiv);
            document.getElementById("noteBox").appendChild(document.createElement("br"));
            noteDiv.setAttribute("onclick", `expand(${i})`);
        }
    }
}

// var record = [];
const expand = (i) => {
    
    if(expanded == false){
        //expanding
        document.getElementById(`noteContent${i}`).innerText = notesArray[i];
        document.getElementById(`titleContent${i}`).innerText = titleArray[i];
        expanded = true;
    } else {
        //shrinking
        document.getElementById(`titleContent${i}`).innerText = `${titleArray[i].length > 25 ? titleArray[i].slice(0, 20) + "..." : titleArray[i]}`; 
        document.getElementById(`noteContent${i}`).innerText = `${notesArray[i].length > 20 ? notesArray[i].slice(0, 30) + "..." : notesArray[i]}`;
        expanded = false;
    }
    
}


var pageColor, ruleColor, textColor_;


const cleanPaper = () => {

    if(recentClicked == false){
        document.getElementById("notes").innerText = "";
        document.getElementById("title").value = "";

        notesArray[note_num] = "";
        titleArray[note_num] = "";
    }
}

pageColor = "#e2e2e2";
ruleColor = "#000000";
textColor_ = "#000000";



const pageChange = () => {
    pageColor = document.getElementById("pageColor").value;
    document.getElementById("paper").style.backgroundImage = `linear-gradient(${ruleColor} 0%, ${pageColor} 8%)`;
}

const ruleChange = () => {
    ruleColor = document.getElementById("ruleColor").value;
    document.getElementById("paper").style.backgroundImage = `linear-gradient(${ruleColor} 0%, ${pageColor} 8%)`;
}

const textChange = () => {
    textColor_ = document.getElementById("textColor").value;
    document.getElementById("notes").style.color = `${textColor_}`;
    
}

const resetPage = () => {
    if(recentClicked == false){
        pageColor =  document.getElementById("pageColor").value = "#e2e2e2";
        ruleColor =  document.getElementById("ruleColor").value = "#000000";
        textColor_ =  document.getElementById("textColor").value = "#000000";
        document.getElementById("paper").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.815) 0%,rgb(226, 226, 226) 8%)`;
        document.getElementById("notes").style.color = "black";
    }
}
