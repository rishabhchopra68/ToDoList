function handleFormSubmit(event){
    event.preventDefault();
    // console.log(event);
    const list = document.querySelector('ul');
    const input = document.querySelector('input');

    // create html and append to ul list
    const listItem = document.createElement('li');
    listItem.classList.add("listitem")
    listItem.innerHTML = `
        <span style="width: 100%">${input.value}</span>
        <button id="done"  style="background-color: #4CAF50">Done</button>
        <button id="delete"  style="background-color: #FF0000">Delete</button>
    `
    list.append(listItem);
    input.value=''
}

function handleDoneOrDelete(event){
    console.log(event)
    if(event.target.id === "delete"){
        let element = event.target.parentElement;
        element.remove();

    } else if(event.target.id === "done"){
        let element = event.target.parentElement;

        if (element.style.textDecoration == 'line-through'){
            element.style.textDecoration = 'none';
            event.target.textContent = "Done"
        }
        else{
            element.style.textDecoration = 'line-through';
            event.target.textContent = "Undo"
        }
        
    }
}

document.querySelector("form").addEventListener("submit",handleFormSubmit);

document.querySelector("ul").addEventListener("click",handleDoneOrDelete);