const addTaskBtn = document.getElementById("add-task");
const clearAllTasksBtn = document.getElementById("clear-all-tasks");
const taskInput = document.getElementById("todo-task");
const taskList = document.getElementById("task-list");
const editModal = document.getElementById("task-edit");
const editInput = document.getElementById("edit-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

// === Helpers ===
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === Render ===
function renderTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className =
            "flex justify-between items-center border rounded-xl p-2 bg-gray-100";

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("line-through", "text-gray-500");
        }

        const actions = document.createElement("div");
        actions.className = "flex gap-2";

        // Complete button
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML =
            '<img src="../icons/check-icon.svg" alt="done" width="18px" height="18px" />';
        completeBtn.className =
            "px-2 py-1 bg-green-600 text-white rounded hover:bg-green-500";
        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<img src="../icons/trash-icon.svg" alt="done" width="18px" height="18px" />';
        deleteBtn.className =
            "px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
            Toastify({
                text: "Task deleted!",
                duration: 2000,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "white",
                    color: "black",
                    border: "2px solid green",
                    borderRadius: "10px",
                }
            }).showToast();
        });

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML =
            '<img src="../icons/pencil-icon.svg" alt="edit" width="18px" height="18px" />';
        editBtn.className =
            "px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-500";
        editBtn.addEventListener("click", () => {
            currentTaskSpan = span;
            editInput.value = task.text;
            editModal.classList.remove("hidden");
            editModal.classList.add("flex");

            saveEditBtn.onclick = () => {
                tasks[index].text = editInput.value.trim();
                saveTasks(tasks);
                editModal.classList.add("hidden");
                editModal.classList.remove("flex");
                renderTasks();
                Toastify({
                    text: "Task edited!",
                    duration: 2000,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "white",
                        color: "black",
                        border: "2px solid green",
                        borderRadius: "10px",
                    }
                }).showToast();
            };

            cancelEditBtn.onclick = () => {
                editModal.classList.add("hidden");
                editModal.classList.remove("flex");
            };
        });

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        taskItem.appendChild(span);
        taskItem.appendChild(actions);
        taskList.appendChild(taskItem);
    });
}

// === Add Task ===
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);

    renderTasks();
    taskInput.value = "";
    Toastify({
        text: "New task added!",
        duration: 2000,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "white",
            color: "black",
            border: "2px solid green",
            borderRadius: "10px",
        }
    }).showToast();
});

// === Clear All Tasks ===
clearAllTasksBtn.addEventListener("click", () => {
    if (taskList.childElementCount ===  0) {
        return;
    }
    localStorage.clear();
    taskList.replaceChildren();
    Toastify({
        text: "Cleared all tasks!",
        duration: 2000,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "white",
            color: "black",
            border: "2px solid green",
            borderRadius: "10px",
        }
    }).showToast();
});

// === Load on startup ===
document.addEventListener("DOMContentLoaded", renderTasks);
