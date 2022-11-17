// TODO: ADJUST FOR MOBILE LAYOUT

let newName;
let textNewItem;
let isCompleted;
let url = "https://cse204.work/todos";
const api_key = "69ed88-c749fc-d73c52-0c5e80-ee5441";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let todo_array = JSON.parse(this.responseText);
        for (var x=0; x<todo_array.length; x++){
            let todo_item = todo_array[x];
            display(todo_item);
        }
    }
};

xhttp.open("GET", url, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.setRequestHeader("x-api-key", api_key);
xhttp.send();


function addItem(){
    var data = {
        text: document.getElementById("newItemEnter").value
    }
    //Make API POST call to send this item to list
    var xhttp2 = new XMLHttpRequest();

    //when loaded
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            display(todo);
            document.getElementById("newItemEnter").value = ""
        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key",api_key);
    xhttp2.send(JSON.stringify(data));
}

function updateItem(id_to_complete){
    // Setting variable for ToDo id
    let id = id_to_complete;
    checkbox = document.getElementsByClassName(id)[0]
    let checked = new Boolean(checkbox.checked)
    if (checked == true){
        var data = {
            completed: true
        }
    }
    else{
        var data = {
            completed: false
        }
    }

    // Initalize AJAX Request
    var xhttp3 = new XMLHttpRequest();

    // Response handler
    xhttp3.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            element = document.getElementById(id);
            element.className = "";
            if(checked == true){
                element.className = "complete";
            }
            else{
                element.className = "incomplete"
            }
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };

    xhttp3.open("PUT", url+"/"+id, true);

    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key", api_key);
    xhttp3.send(JSON.stringify(data));
}

function deleteItem(id_to_delete){
    let id = id_to_delete;

    let xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let list = document.getElementById("listOfItems");
            let item = document.getElementById(id);
            list.removeChild(item);
        }
    };

    xhttp4.open("DELETE", url+"/"+id, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", api_key);
    xhttp4.send();
}


function display(todo_item){
    let list = document.getElementById("listOfItems");
    let li = document.createElement("li");
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox")
    checkBox.className = todo_item.id
    checkBox.checked = todo_item.completed;
    
    if(todo_item.completed){
        li.className = "complete";
    }
    else if(todo_item.completed == false){
        li.className = "incomplete";
    }
    
    //for both selecting and deselecting
    li.appendChild(checkBox);

    let task = document.createElement("p");
    task.innerHTML = todo_item.text;
    console.log(task.innerHTML);

    li.appendChild(task)

    //get text value from object
    let deleteB = document.createElement("input");
    deleteB.setAttribute("type", "button");
    deleteB.className = "deleteButton";
    deleteB.setAttribute("value", "X");
    li.appendChild(deleteB);
    li.setAttribute("id", todo_item.id)


    list.appendChild(li);

    checkBox.addEventListener("click", function(event){updateItem(todo_item.id)});
    deleteB.addEventListener("click", function(event){deleteItem(todo_item.id)})
    
};

function enter(event){
    console.log("enter");
    if(event.key == "Enter"){
        addItem();
    }
}



let submitB = document.getElementById("submitNewItem");
submitB.addEventListener("click", function(event){addItem()});
document.addEventListener("keypress", function(event){enter(event)});

