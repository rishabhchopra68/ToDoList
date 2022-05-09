const tasks = JSON.parse(localStorage.getItem('tasks'));

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
        if(currentTasks){
            localStorage.setItem('tasks', JSON.stringify([...currentTasks, input.value]));
        } else{
            localStorage.setItem('tasks', JSON.stringify([input.value]));
        }
        list.append(createListItem(input.value));
        input.value=''
    }
}

function handleDoneOrDelete(event){
    let element = event.target.parentElement.parentElement;
    let taskName = element.firstElementChild.innerText;
    const currentTasks = JSON.parse(localStorage.getItem('tasks')).filter((task) => task !== taskName);
    if(event.target.id === "delete"){
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
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
