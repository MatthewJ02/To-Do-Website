function addItem() {
    var itemText = document.getElementById("AddText").value;
    if (itemText != "") {
        var div = document.createElement("div");
        div.setAttribute("Class", "Item");

        var doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.className = "Item-Child";
        

        var text = document.createElement("p");
        text.innerHTML = itemText;
        document.getElementById("AddText").value = "";
        text.className = "Item-Child";

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "Item-Child";

        div.appendChild(doneButton);
        div.appendChild(text);
        div.appendChild(deleteButton);

        document.getElementById("Doing").appendChild(div);

        doneButton.addEventListener("click", function() {
            document.getElementById("Doing").removeChild(div);
            div.removeChild(doneButton);
            deleteButton.addEventListener("click", function() {
                document.getElementById("Done").removeChild(div);
            });
            document.getElementById("Done").appendChild(div);
        });

        deleteButton.addEventListener("click", function() {
            document.getElementById("Doing").removeChild(div);
        });
    }
}

function completeItem(div) {

}

function deleteItem() {

}

