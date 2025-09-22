const addTaskBtn = document.getElementById("add-task");
const taskInput = document.getElementById("todo-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    let todoTask = taskInput.value.trim();
    if (todoTask === "") {
        return;
    }
    // Create task container
    const taskItem = document.createElement("div");
    taskItem.className =
        "flex justify-between items-center border rounded-xl p-2 bg-gray-100";

    // Task
    const span = document.createElement("span");
    span.textContent = todoTask;

    // Buttons
    const actions = document.createElement("div");
    actions.className = "flex gap-2";

    // Complete Button
    const taskCompleteBtn = document.createElement("button");
    taskCompleteBtn.innerHTML =
        '<img src="../icons/check-icon.svg" alt="done" width="18px" height="18px" />';
    taskCompleteBtn.className =
        "px-2 py-1 bg-green-600 text-white rounded hover:bg-green-500";
    taskCompleteBtn.addEventListener("click", () => {
        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-500");
    });

    // Edit Button
    const taskEditBtn = document.createElement("button");
    taskEditBtn.innerHTML = '<img src="../icons/pencil-icon.svg" alt="edit" width="18px" height="18px" />';
    taskEditBtn.className = "px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-500";
    taskEditBtn.addEventListener("click", () => {
        // TODO: When clicking the button, edit the task in a popup window?!
        return;
    })

    // Delete Button
    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.innerHTML =
        '<img src="../icons/trash-icon.svg" alt="delete" width="18px" height="18px" />';
    taskDeleteBtn.className =
        "px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500";
    taskDeleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
    });

    actions.appendChild(taskCompleteBtn);
    actions.appendChild(taskEditBtn);
    actions.appendChild(taskDeleteBtn);
    taskItem.appendChild(span);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);

    taskInput.value = null;
});
