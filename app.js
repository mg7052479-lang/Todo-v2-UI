const addBtn = document.getElementById("button")
const inputBox = document.getElementById("inputbox")
const listContainer = document.getElementById("listContainer")

const allBtn = document.getElementById("all")
const complete = document.getElementById("complete")
const pending = document.getElementById("pending")


addBtn.addEventListener("click", function() {
    const textTask = inputBox.value.trim();

    if (textTask === ""){
        alert("write something task should not be empty");
        return ;
    }
    if (isDuplicateTask(textTask)){
        alert ("PLEASE WRITE SOMETHING NEW THIS TASK IS ALREADY EXITS")
        return ;
    }
    addTask(textTask, false);
    inputBox.value = ""
    saveData();


})

 function addTask(text , checked){
     const li = document.createElement("li");
    li.textContent = text ;

    if (checked) {
        li.classList.add("checked")
    }
  const deleteBtn = document.createElement("span");
   deleteBtn.innerHTML = "🗑️"
   li.appendChild(deleteBtn);

   listContainer.appendChild(li)


 } 
listContainer.addEventListener("click",function(e) {
    const li = e.target.tagName === "LI" ? e.target : e.target.parentElement ;

    if (e.target.tagName === "LI"){
        li.classList.toggle("checked");
        saveData();
    }
    if (e.target.tagName === "SPAN"){
        li.remove();
        saveData();
    }
} )

// Duplicate task  give alert // 

function isDuplicateTask (text) {
    const tasks = listContainer.querySelectorAll("li");

    for (let li of tasks){
        if (li.firstChild.nodeValue.toLowerCase() === text.toLowerCase()){
            return true ;
        }
    }
    return false ;
}


/// filtring the tasks // 
allBtn.addEventListener("click", ()=> filterTasks("all"))
complete.addEventListener("click", ()=> filterTasks("complete"))
pending.addEventListener("click", ()=> filterTasks("pending"))

function filterTasks(type) {
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(li => {
        const isCompleted = li.classList.contains("checked");
        
        if (type === "all"){
            li.style.display = "flex";
        }else if (type === "complete") {
            li.style.display = isCompleted ? "flex" : "none" ;
        }else if (type === "pending") {
            li.style.display = !isCompleted ? "flex" : "none" ;
        }

    })
}


// save data // 
function saveData () {
    const tasks= [];

    listContainer.querySelectorAll("li").forEach (li => {
        tasks.push({
            text : li.firstChild.nodeValue ,
            checked : li.classList.contains("checked")
        })
    })
    localStorage.setItem("tasks" , JSON.stringify(tasks))
}

function showData (){
    const tasks = JSON.parse(localStorage.getItem("tasks", "[]"))
    listContainer.innerHTML = ""
    tasks.forEach(task =>addTask(task.text , task.checked))
}

// LOAD ON REFRESH
window.addEventListener("DOMContentLoaded", showData);
// 