const tasks = JSON.parse(localStorage.getItem('tasks'));
if(tasks.length === 0){
    document.getElementsByClassName("list-container")[0].classList.add("hide")
}

const createListItem = (item) => {
    const listItem = document.createElement('li');
    listItem.classList.add("listitem")
    listItem.innerHTML = `
        <span class="task-name">${item}</span>
        <div class="task-button-container">
            <button id="done" class="done-button" onclick="handleDoneOrDelete(event)">Done</button>
            <button id="delete" class="delete-button" onclick="handleDoneOrDelete(event)">Remove</button>
        </div>
    `
    return listItem;
}

tasks && tasks.map((task) => {
    document.querySelector('ul').append(createListItem(task));
}
);

function handleFormSubmit(event){
    event.preventDefault();
    const currentTasks = JSON.parse(localStorage.getItem('tasks'));
    const list = document.querySelector('ul');
    const input = document.querySelector('input');

    // create html and append to ul list
    if(input.value)
    {
        const trimmedInput = input.value.trim();
        
        if(currentTasks){
            if(currentTasks.indexOf(trimmedInput) !== -1){
                alert("task already exists");
                return;
            }
            document.getElementsByClassName("list-container")[0].classList.remove("hide")
            localStorage.setItem('tasks', JSON.stringify([...currentTasks, trimmedInput]));
        } else{
            localStorage.setItem('tasks', JSON.stringify([trimmedInput]));
        }
        list.append(createListItem(trimmedInput));
        input.value=''
    }
}

function handleDoneOrDelete(event){
    let element = event.target.parentElement.parentElement;
    let taskName = element.firstElementChild.innerText;
    const currentTasks = JSON.parse(localStorage.getItem('tasks')).filter((task) => task.trim() !== taskName.trim());
    if(event.target.id === "delete"){
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
        if(JSON.parse(localStorage.getItem('tasks')).length === 0){
            document.getElementsByClassName("list-container")[0].classList.add("hide")
        }
        element.remove();

    } else if(event.target.id === "done"){
        let element = event.target.parentElement.parentElement;
        if (element.firstElementChild.style.textDecoration == 'line-through'){
            element.firstElementChild.style.textDecoration = 'none';
            event.target.innerHTML = "Done";
        }
        else{
            element.firstElementChild.style.textDecoration = 'line-through';
            event.target.innerHTML = "Undo";
        }
    }
}

document.querySelector("form").addEventListener("submit",handleFormSubmit);
