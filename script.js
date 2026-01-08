const button = document.getElementById("button");
const listContainer = document.getElementById("listContainer");
const inputbox = document.getElementById("inputbox");
// FOr filtring task //
const all = document.getElementById("all");
const complete = document.getElementById("complete");
const pending = document.getElementById("pending");

button.addEventListener("click", function(){
    const newTask = inputbox.value.trim();
    if (newTask === "" ){
        alert ("hello bhai kush kar");
        return;
    }
    addTask(newTask);
    inputbox.value = "";
    saveData(); 
});

function addTask (text, checked = false){
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    // create span for a delete button 
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "🗑️";
    li.appendChild(deleteBtn);

    if (checked) li.classList.add("checked")
    listContainer.appendChild(li);
}

listContainer.addEventListener("click",(e) => {
    let li = e.target.tagName === "LI"
    ? e.target
    : e.target.parentElement;
        if (e.target.tagName === "LI"){
        li.classList.toggle("checked");
        saveData();
    }
    if (e.target.tagName === "SPAN"){
        li.remove();
        saveData();
    }   
})
// Save tasks to localStorage
function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            task: li.firstChild.nodeValue,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("task", JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    tasks.forEach(task => addTask(task.task, task.checked));
});
