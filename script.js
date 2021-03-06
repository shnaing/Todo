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
  	if (inputData.trim() != 0) {
     addTodo(event)
    }
    else if (inputData === "") {
    	return
    }
   }
}


// EventListener

inputButton.addEventListener("click", addTodo)
todoLists.addEventListener("click", checkTodo)

// Function

function addTodo(event) {
	event.preventDefault()
	let inputData = input.value
	const task = createTask(inputData)
	tasks.push(task)
	render()
	save()
	inputButton.classList.remove("active")
}

function createTask(name) {
	return {id: Date.now().toString(), name: name, complete: false}
}

function render() {
	clearElement(todoLists)
	tasks.forEach(task => {
	const newTodo = document.createElement("li")
	newTodo.dataset.taskId = task.id
	newTodo.classList.add("todo")
	renderCompleteItem (newTodo)
	todoLists.appendChild(newTodo)

	const todoText = document.createElement("p")
	todoText.classList.add("text")
	todoText.innerText = task.name
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

function renderCompleteItem (newTodo) {
	const selectedTask = tasks.find(task => task.id === newTodo.dataset.taskId) || ''
	if (selectedTask.complete === true) {
		newTodo.classList.add("completed")
	}
	else {
		newTodo.classList.remove("completed")
	}
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
		const selectedTask = tasks.find(task => task.id === todo.dataset.taskId)
   	todo.classList.toggle("completed")
   	if (todo.classList[1] === "completed") {
	   	selectedTask.complete = true
   	}
   	else {
	   	selectedTask.complete = false
   	}
   	save()
   }
}

function removeLocalTodos(todo) {
  const index = todo.children[0].innerText
  tasks.splice(tasks.findIndex(element => index), 1)
  save()
}