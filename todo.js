

const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".text button");

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    } else {
        let li = document.createElement("li");

        // --- Task Text Span ---
        // The main task text will be in this span
        let taskTextSpan = document.createElement("span");
        taskTextSpan.classList.add("task-text");
        taskTextSpan.textContent = inputBox.value.trim(); // Use textContent for plain text
        li.appendChild(taskTextSpan);

        // --- This is a edit icon to change the specific task  ---
        let editSpan = document.createElement("span");
        editSpan.classList.add("edit-btn");
        editSpan.innerHTML = "&#9998;"; // this is a inbuilt code for pencil/edit icon
        li.appendChild(editSpan);

        // --- Delete Icon Span ---
        let deleteSpan = document.createElement("span");
        deleteSpan.classList.add("delete-btn"); // this will delete the rspective code 
        deleteSpan.innerHTML = "\u00d7"; // this is a inbuild code for 'x' icon
        li.appendChild(deleteSpan);

        listContainer.appendChild(li);
    }
    // this will set the input bar as it was before
    inputBox.value = ""; 
    saveData(); 
}

// Event listener for the "Add" button
addButton.addEventListener("click", addTask);

// Event listener for the input box (for "Enter" key to add task)
inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// this is an event listener to the list container for checking, editing, and deleting tasks
listContainer.addEventListener("click", function(e) {
    const target = e.target; 



        // this will react when i will click on it , showing task checked / unchecked
    if (target.tagName === "LI" || target.classList.contains("task-text")) {
        const liToToggle = target.tagName === "LI" ? target : target.parentElement;
        liToToggle.classList.toggle("checked");
        saveData();
          }
          
          
          // If i will click on the delete button 'x' text will be delete
        else if (target.classList.contains("delete-btn")) {
        target.parentElement.remove(); 
        saveData();
            }
       
            // this will edit the respective text whenever it will be clicked
    else if (target.classList.contains("edit-btn")) { 
        const listItem = target.parentElement; 
        const taskTextSpan = listItem.querySelector(".task-text"); 

        if (taskTextSpan) { // Make sure the task text span exists
            const currentText = taskTextSpan.textContent.trim(); // Get the current text
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = currentText;
            editInput.classList.add("edit-input"); // Add a class for styling the input
            editInput.autofocus = true; // Focus on the input field

            // this will replace the task text span with the input field
            listItem.replaceChild(editInput, taskTextSpan);

            // Add event listener for when the user presses Enter or blurs the input
            editInput.addEventListener("keyup", function(event) {
                if (event.key === "Enter") {
                    taskTextSpan.textContent = editInput.value.trim();
                    listItem.replaceChild(taskTextSpan, editInput);
                    saveData();
                }
            });

            editInput.addEventListener("blur", function() {
                // If the input not selected , save the text as it is 
                taskTextSpan.textContent = editInput.value.trim();
                listItem.replaceChild(taskTextSpan, editInput);
                saveData();
            });
        }
    }
}, false); // 'false' for event bubbling

// this will save data downside
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// this will show data as it is even after the page refresh
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
 
}

// this will show the task which will be enter in the input bar  
showTask();