const button = document.getElementById("button")
const inputbox = document.getElementById("inputbox")
const listContainer = document.getElementById("listContainer")
const all = document.getElementById("all")
const complete = document.getElementById("complete")
const pending  = document.getElementById("pending")

button.addEventListener("click", () => {
    let taskText = inputbox.value.trim();

    if (taskText === "") {
        alert("write something");
        return;
    }

    if (isDuplicateTask(taskText)) {
        alert("Task already exists");
        return;
    }  

    addTask(taskText);
    inputbox.value = "";
    saveTask();
});

function addTask(text, checked = false) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(text));

    const delbtn = document.createElement("span");
    delbtn.innerHTML = "fuck";
    li.appendChild(delbtn);

    if (checked) li.classList.add("checked");

    listContainer.appendChild(li);
}

listContainer.addEventListener("click", (e) => {
    const li = e.target.tagName === "LI"
        ? e.target
        : e.target.parentElement;

    if (e.target.tagName === "LI") {
        li.classList.toggle("checked");
        saveTask();
    }

    if (e.target.tagName === "SPAN") {
        li.remove();
        saveTask();
    }
});

function saveTask() {
    const task = [];

    listContainer.querySelectorAll("li").forEach(li => {
        task.push({
            text: li.firstChild.nodeValue,
            checked: li.classList.contains("checked")
        });
    });

    localStorage.setItem("task", JSON.stringify(task));
}
listContainer.addEventListener("dblclick", (e) => {
    if (e.target.tagName !== "LI") return;

    const li = e.target;
    const oldText = li.firstChild.nodeValue;
    const delbtn = li.querySelector("span");

    const input = document.createElement("input");
    input.value = oldText;
    input.type = "text";

    li.replaceChild(input, li.firstChild);
    li.appendChild(delbtn);
    input.focus();

    function saveEdit() {
        if (!li.contains(input)) return;

        const newTask = input.value.trim() || oldText;
        li.replaceChild(document.createTextNode(newTask), input);
        saveTask();
    }

    input.addEventListener("keyup", e => {
        if (e.key === "Enter") saveEdit();
    });

    input.addEventListener("blur", saveEdit);
});

function isDuplicateTask(text) {
    const tasks = listContainer.querySelectorAll("li");

    for (let li of tasks) {
        if (li.firstChild.nodeValue.toLowerCase() === text.toLowerCase()) {
            return true; 
        }
    }
    return false; 
}

