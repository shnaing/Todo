// Selector

const input = document.querySelector(".input")
const inputButton = document.querySelector(".input-btn")
const todoLists = document.querySelector(".todo-lists")
const LOCAL_STORAGE_LIST_KEY = 'todo.tasks'

let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []


// Render

render()

// On Keyup

input.onkeyup = (event) => {
  let inputData = input.value
  if (inputData.trim() != 0) {
    inputButton.classList.add("active")
  } else {
    inputButton.classList.remove("active")
  }
  if (event.key === 'Enter' || event.keyCode === 13) {
     addTodo(event)
   }
}


// EventListener

inputButton.addEventListener("click", addTodo)
todoLists.addEventListener("click", checkTodo)

// Function

function addTodo(event) {
	event.preventDefault()
	let inputData = input.value
	tasks.push(inputData)
	render()
	save()
	inputButton.classList.remove("active")
}

function render() {
	clearElement(todoLists)
	tasks.forEach(task => {
	const newTodo = document.createElement("li")
	newTodo.classList.add("todo")
	todoLists.appendChild(newTodo)

	const todoText = document.createElement("p")
	todoText.classList.add("text")
	todoText.innerText = task
	newTodo.appendChild(todoText)

	const completeButton = document.createElement("button")
	completeButton.classList.add("complete-icon")
	completeButton.innerHTML = `<i class="fas fa-check"></i>`
	newTodo.appendChild(completeButton)

	const deleteButton = document.createElement("button")
	deleteButton.classList.add("delete-icon")
	deleteButton.innerHTML = `<i class="fas fa-times"></i>`
	newTodo.appendChild(deleteButton)
	})

	input.value = ""
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(tasks))
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
}

function checkTodo(event) {
  const item = event.target

  if (item.classList[0] === "delete-icon") {
    const todo = item.parentElement
    removeLocalTodos(todo)
    todo.remove()
    }

   if (item.classList[0] === "complete-icon") {
   	const todo = item.parentElement
   	todo.classList.toggle("completed")
   }
}

function removeLocalTodos(task) {
  const index = task.children[0].innerText;
  tasks.splice(tasks.indexOf(index), 1);
  save()
}