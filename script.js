let note = 0;

let noteTitle = "";
let noteContent = "";

let noteArr = [];

let titleNo;
let contentNo;

function addNote(){
    note = note + 1;
    const node = document.createElement("div")
    node.setAttribute("class",`note${note} note`)
    node.setAttribute("id",`note${note}`)
    const noteDiv = document.getElementById("notesDiv").appendChild(node)
    noteDiv.innerHTML = `<input type='text' placeholder='Title' id='title${note}' class='title'onchange='titleChange(event)'/>
                        <textarea id='content${note}' class='text' rows='4' cols='43' placeholder='Note...' onchange='textChange(event)'></textarea>
                        <button class='submit' id='submitNote${note}' onclick='setNote(event)'>✔</button>
                        <button class='delete' id='deleteNote${note}' onclick='deleteNote(event)'>Delete</button>`
}

function titleChange(e){
    noteTitle=""
    titleNo = e.target.id[5]
    noteTitle=e.target.value

}
function textChange(e){
    noteContent=""
    contentNo = e.target.id[7]
    noteContent=e.target.value
}

function setNote(e){
    const titleId = `title${e.target.id[10]}`; // Construct the ID of the corresponding title input element
    const contentId = `content${e.target.id[10]}`; // Construct the ID of the corresponding content textarea element

    

    const title = document.getElementById(titleId).value; // Get the value of the title input element
    const content = document.getElementById(contentId).value; // Get the value of the content textarea element

    const noteObj = {
        title: title,
        content: content
    };

    const noteVariableName = `note${e.target.id[10]}`; // Construct the variable name using the note index
    window[noteVariableName] = noteObj; // Assign the note object to a variable with the constructed name
    localStorage.setItem(noteVariableName, JSON.stringify(noteObj));
}

function deleteNote(e){
    note = note-1;
    const noteId = `note${e.target.id[10]}`;

    document.getElementById(noteId).remove();
    localStorage.removeItem(`note${e.target.id[10]}`);
}

function renderNotesFromLocalStorage() {
    note = localStorage.length
    let noteArr = []
    for (let i = localStorage.length-1; i >= 0; i--) {
        const key = localStorage.key(i);
        noteArr.push(key)
        // Check if the key starts with "note" to filter out other items in local storage
            

    }
    noteArr = noteArr.sort();
    for(let i = 0; i<noteArr.length; i++){
        const noteObj = JSON.parse(localStorage.getItem(noteArr[i])); // Retrieve and parse the JSON string representing the note object
            const node = document.createElement("div")
            node.setAttribute("class",`note${i+1} note`)
            node.setAttribute("id",`note${i+1}`)
            const noteDiv = document.getElementById("notesDiv").appendChild(node)
            noteDiv.innerHTML = `<input type='text' placeholder='Title' id='title${i+1}' class='title'onchange='titleChange(event)' value='${noteObj.title}'/>
                                 <textarea id='content${i+1}' class='text' rows='4' cols='43' placeholder='Note...' onchange='textChange(event)'>${noteObj.content}</textarea>
                                 <button class='submit' id='submitNote${i+1}' onclick='setNote(event)'>✔</button>
                                 <button class='delete' id='deleteNote${i+1}' onclick='deleteNote(event)'>Delete</button>`
    }
}

// Call the function to render notes from local storage when the page loads
window.addEventListener("load", renderNotesFromLocalStorage);