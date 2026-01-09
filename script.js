const button = document.getElementById("button");
const inputbox = document.getElementById("inputbox");
const listContainer = document.getElementById("listContainer");

// Load tasks on refresh
const savedTasks = JSON.parse(localStorage.getItem("task")) || [];
savedTasks.forEach(text => {
    createTask(text);
});

button.addEventListener("click", () => {
    const text = inputbox.value.trim();
    if (text === "") return;

    createTask(text);
    inputbox.value = "";
    saveData();
});

function createTask(text) {
    const li = document.createElement("li");
    li.textContent = text;
    listContainer.appendChild(li);
}

function saveData() {
    const tasks = [];
    document.querySelectorAll("#listContainer li").forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem("task", JSON.stringify(tasks));
}
