function addItem(column, text, isSaved) {
    var div = document.createElement("div");
    div.setAttribute("class", "Item");
    div.setAttribute("draggable", "true");
    div.setAttribute("ondragstart", "drag(event)");

    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.setAttribute("onclick", "saveItem(this.parentNode, true)");
    saveButton.className = "Item-Child";

    var input = document.createElement("input");
    input.type = "text";
    input.maxLength = 25;
    input.placeholder = "New Item";
    if (text != "") {
        input.value = text;
    }
    input.className = "Item-Name";

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "Item-Child";
    deleteButton.id = "DeleteButton";
    deleteButton.setAttribute("onclick", "deleteItem(this.parentNode.parentNode, this.parentNode)");

    div.appendChild(saveButton);
    div.appendChild(input);
    div.appendChild(deleteButton);

    document.getElementById(column).appendChild(div);

    if (isSaved) {
        saveItem(div, false);
    }
}

function allowDrop(event, element) {
    event.preventDefault();
    element.style["background-color"] = "#DDDDDD";
}

function resetColor(element) {
    element.style["background-color"] = "white";
}

function drop(event, element) {
    event.preventDefault();
    var div = event.dataTransfer.getData("text");
    var el = document.getElementById(element);
    el.appendChild(document.getElementById(div));
    document.getElementById(div).removeAttribute("id");
    savePage();
}

function drag(event) {
    event.target.id = "source";
    event.dataTransfer.setData("text", event.target.id);
}


function editItem(parentDiv) {
    var children = parentDiv.childNodes;
    
    var saveButton = document.createElement("button");
    saveButton.setAttribute("class", "Item-Child");
    saveButton.setAttribute("onclick","saveItem(this.parentNode, true)");
    saveButton.innerHTML = "Save";

    parentDiv.replaceChild(saveButton, children[0]);

    children = parentDiv.childNodes;

    var inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.maxLength = 25;
    inputText.value = children[1].innerHTML;
    inputText.className = "Item-Name";
    parentDiv.replaceChild(inputText, children[1]);
}

function savePage() 
{
    console.log("SAVE");
    var ToDoArray = [];
    for (var item of document.getElementById("To-Do").children) {
        ToDoArray.push(item.children[1].innerHTML);
    }

    var DoingArray = [];
    for (var item of document.getElementById("Doing").children) {
        DoingArray.push(item.children[1].innerHTML);
    }

    var DoneArray = [];
    for (var item of document.getElementById("Done").children) {
       DoneArray.push(item.children[1].innerHTML);
    }

    localStorage.setItem("ToDoArray", JSON.stringify(ToDoArray));
    localStorage.setItem("DoingArray", JSON.stringify(DoingArray));
    localStorage.setItem("DoneArray", JSON.stringify(DoneArray));
}

function loadPage() {
    var ToDoArray = JSON.parse(localStorage.getItem("ToDoArray"));
    if (ToDoArray != null) {
        for (var i = 0; i < ToDoArray.length; i++) {
            addItem("To-Do", ToDoArray[i], true);
        }
    }
    
    var DoingArray = JSON.parse(localStorage.getItem("DoingArray"));
    if (DoingArray != null) {
        for (var i = 0; i < DoingArray.length; i++) {
            addItem("Doing", DoingArray[i], true);
        }
    }

    var DoneArray = JSON.parse(localStorage.getItem("DoneArray"));
    if (DoneArray != null) {
        for (var i = 0; i < DoneArray.length; i++) {
            addItem("Done", DoneArray[i], true);
        }
    }
}

function saveItem(parentDiv, doSave) {
    var children = parentDiv.childNodes;
    
    var saveButton = document.createElement("button");
    saveButton.setAttribute("class", "Item-Child");
    saveButton.setAttribute("onclick","editItem(this.parentNode)");
    saveButton.innerHTML = "Edit";

    parentDiv.replaceChild(saveButton, children[0]);

    children = parentDiv.childNodes;

    var text = document.createElement("p");
    text.innerHTML = children[1].value;
    text.className = "Item-Name";

    parentDiv.replaceChild(text, children[1]);
    if (doSave) {
        savePage();
    }
}

function deleteItem(parentDiv, div) {
    parentDiv.removeChild(div);
    savePage();
}
