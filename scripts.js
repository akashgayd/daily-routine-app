
let inputBoxEl = document.getElementById("inputBox");

let listContainer = document.getElementById("listContainer");



// let todoList =[
// {
  
//     title : "mornig",
//     id:1

// }
// ]

function onGetData(){

    let getData = localStorage.getItem("myproject");

    if(getData === null){

        return [];
    }
    else{

        let parse = JSON.parse(getData);
        return parse;
    }
    
}

let todoList = onGetData();


function createAdaliyRountine(todo){
 let checkId = "checkId"+todo.id;
 let lineId = "lineId"+todo.id;
 let todoId = "todo"+todo.id;

    // create a li html tag container

   let listCont = document.createElement("li");
   listCont.classList.add("list-cont");
    listContainer.appendChild(listCont);
    listCont.id = todoId;


    // create a input checkbox for select the and done for today task


    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    listCont.appendChild(checkBoxEl);
    checkBoxEl.style.width =  "18px";
    checkBoxEl.id = checkId;
    if(todo.isChecked ===  true){

        checkBoxEl.checked = true;
    }

    checkBoxEl.onclick = function(){
  onstatusChenge(checkId,lineId,todoId);

    }
    

    // add a label cont for check the id and checkbox

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    listCont.appendChild(labelEl);
    labelEl.htmlFor = checkId;


    // add h1 tag for show the main todoList title


    let heading = document.createElement("h4");
    heading.textContent = todo.title;
    labelEl.appendChild(heading);
    heading.id = lineId;
    if(todo.isChecked === true ){

        heading.classList.add("line-thorow")
    }


    // create a button for add delete icon and run the delete icon


    let buttonEl = document.createElement("button");
    buttonEl.classList.add("delete-btn");
    labelEl.appendChild(buttonEl);
    buttonEl.onclick = function(){
        onremoveList(todoId)
    }
   



    // the icon add on font osm website

    let fontEl = document.createElement("i");
     fontEl.classList.add("fa-solid", "fa-trash")
     buttonEl.appendChild(fontEl);



    
}


for(each of todoList){
    createAdaliyRountine(each)
}



function onAddTodo(){
    
    let day = new Date();

    let uniueId = Math.ceil(Math.random()*day.getTime());


    let myTodo = {

        title:inputBoxEl.value,
        id : uniueId,
        isChecked : false
    }
    if(inputBoxEl.value === ""){

        alert("please add your today task");
    }
    else{
        createAdaliyRountine(myTodo);

        todoList.push(myTodo);
        inputBoxEl.value = "";
    }
}
function  onstatusChenge(checkId,lineId,todoId){

    let checkIdEl = document.getElementById(checkId);

    let lineIdEl = document.getElementById(lineId);

    if(checkIdEl.checked === true){
        lineIdEl.classList.add("line-thorow")
    }
    else{
        lineIdEl.classList.remove("line-thorow");
    }

    let ongetTodo = todoId.slice(4);

    let index = todoList.findIndex((each)=> each.id == ongetTodo)

    for(i=0; i<todoList.length; i++){

        if(index === i){

            if(todoList[i].isChecked === false){

                todoList[i].isChecked = true;
            }
            else{
                todoList[i].isChecked = false;
            }
        }
    }
}

function   onremoveList(todoId){

    let todoIdEl = document.getElementById(todoId);

    listContainer.removeChild(todoIdEl);
    let removeEl = todoId.slice(4);

    let index = todoList.findIndex((each)=> each.id == removeEl);

    todoList.splice(index,1);
}

function onSaveData(){

    let saveTodo = JSON.stringify(todoList);
    localStorage.setItem("myproject",saveTodo);
}