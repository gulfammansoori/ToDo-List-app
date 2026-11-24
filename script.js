const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");
const remaining = document.getElementById("remaining-count");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
let todoText; // this should be populated when the user clicks on add button
let todos = [];
// if we have todos in the localStorage, we will read it 
let todosString = localStorage.getItem("todos")
if (todosString) {
    todos = JSON.parse(todosString);
    remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
}


const populateTodos = () => {
    let string = "";
    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
          <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""} >
          <span class="todo-text">${todo.title}</span>
        <button class="delete-btn">×</button>
         </li>`
    }
    todoListUl.innerHTML = string

    // add the checkbox logic to populate todos
    const todoCheckboxes = document.querySelectorAll(".todo-checkbox");

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed")
                console.log(todos)
                // grab this todo from the todos array and uupdate its isCompleted property to true
                todos = todos.map(todo => {
                    if ( todo.id == element.parentNode.id) {
                        console.log(todo.id, element.parentNode.id)
                        return {
                            ...todo,
                            isCompleted: true
                        }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")
                // grab this todo from the todos array and uupdate its isCompleted property to false
                todos = todos.map(todo => {
                    if ( todo.id == element.parentNode.id) {
                        return {
                            ...todo,
                            isCompleted: false
                        }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    })

    // Handle the clear completed button
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => {
            return todo.isCompleted != true
        })
        remaining.innerHTML = todos.filter((item) => {return item.isCompleted != false}).length;
        localStorage.setItem("todos", JSON.stringify(todos))
        populateTodos()
    })

    // Handle the delete buttons
    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Are you sure you want to delete this todo?")
            if (confirmation) {
                todos = todos.filter((todo) => {
                     return (todo.id) !== (e.target.parentNode.id)
                     })
                     remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }
        })
    })

}



addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value
    // check if the length of the todo is greater than 3
    if (todoText.trim().length < 4) {
        alert("Todo text must be at least 4 characters long")
        return
    }
    inputTag.value = ""
    let todo = {
        id:"todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }

    todos.push(todo)
    remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos();
})

populateTodos();
remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;


