var dragEnterTarget = undefined;

function addItem() {
    var div = document.createElement("div");
    div.setAttribute("class", "Item");
    div.setAttribute("draggable", "true");
    div.setAttribute("ondragstart", "drag(event)");
    div.setAttribute("id", "filler");

    var saveButton = document.createElement("button");
    saveButton.id = "SaveButton";
    saveButton.innerHTML = "Save";
    saveButton.setAttribute("onclick", "saveItem(this.parentNode)");
    saveButton.className = "Item-Child";

    var input = document.createElement("input");
    input.type = "text";
    input.id = "AddText";
    input.placeholder = "New Item";
    input.className = "Item-Name";

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "Item-Child";

    div.appendChild(saveButton);
    div.appendChild(input);
    div.appendChild(deleteButton);

    document.getElementById("To-Do").appendChild(div);
}



function allowDrop(event) {
    if (event.target.className == "Column-Content") {
        event.preventDefault();
    }
}

function drop(event) {
    if (event.target.className == "Column-Content") {
        event.preventDefault();
        var div = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(div));
        document.getElementById(div).setAttribute("id", "filler");
    }
}

function drag(event) {
    event.target.id = "source";
    event.dataTransfer.setData("text", event.target.id);

}


function editItem(parentDiv) {
    var children = parentDiv.childNodes;
    
    var saveButton = document.createElement("button");
    saveButton.setAttribute("id", "SaveButton");
    saveButton.setAttribute("class", "Item-Child");
    saveButton.setAttribute("onclick","saveItem(this.parentNode)");
    saveButton.innerHTML = "Save";

    parentDiv.replaceChild(saveButton, children[0]);

    children = parentDiv.childNodes;

    var inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.value = children[1].innerHTML;
    inputText.className = "Item-Name";
    


    parentDiv.replaceChild(inputText, children[1]);
}

function saveItem(parentDiv) {
    var children = parentDiv.childNodes;
    
    var saveButton = document.createElement("button");
    saveButton.setAttribute("id", "EditButton");
    saveButton.setAttribute("class", "Item-Child");
    saveButton.setAttribute("onclick","editItem(this.parentNode)");
    saveButton.innerHTML = "Edit";

    parentDiv.replaceChild(saveButton, children[0]);

    children = parentDiv.childNodes;

    var text = document.createElement("p");
    text.innerHTML = children[1].value;
    text.className = "Item-Name";

    parentDiv.replaceChild(text, children[1]);
}
