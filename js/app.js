
window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const listItems = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		appendToTasks(input, listItems);
		
	});	
});

const appendToTasks = (input, listItems) => {
	//retrieve the value of the input
	const task = input.value;

	//create new task
	const taskElement = document.createElement('div');//parent
	taskElement.classList.add('task');

	//create content
	const taskContent = document.createElement('div');//child
	taskContent.classList.add('content');

	const taskInput = document.createElement('input');//child child
	taskInput.classList.add('text');
	taskInput.type = 'text';
	taskInput.value = task;
	taskInput.setAttribute('readonly', 'readonly');

	//create actions
	const taskActions = document.createElement('div');//child
	taskActions.classList.add('actions');

	const taskEdit = taskButton('edit'); //child child
	const taskRemove = taskButton('remove'); //child child

	//give element input value as content
	// taskContent.innerText = task;//this is static, read only.
	taskContent.appendChild(taskInput);
	
	taskActions.appendChild(taskEdit);
	taskActions.appendChild(taskRemove);
	
	taskElement.appendChild(taskContent);
	taskElement.appendChild(taskActions);

	//append element to list
	listItems.append(taskElement);
	//reset input value
	input.value = '';
	taskActions.addEventListener('click', e => {
		let actionFn = e.target.innerText.toLowerCase()
		if(actionFn == "edit" || actionFn == "save" || actionFn == "remove"){
			actionContext[actionFn](e.target);
		}
	})
}

const edit = (btn) => {
	const taskContent = btn.parentNode.parentNode.children[0].children[0]
	if(btn.innerText.toLowerCase() == "edit"){
		btn.innerText = "save";
		taskContent.removeAttribute('readonly');
		taskContent.focus();
	}else if(btn.innerText.toLowerCase() == "save"){
		btn.innerText = "edit";
		taskContent.setAttribute("readonly", "readonly");
	}
}

const remove = (btn) =>{
	const task = btn.parentNode.parentNode
	const taskList = btn.parentNode.parentNode.parentNode;
	taskList.removeChild(task);
	
}

const taskButton = (taskType) => {
	const newButton = document.createElement('button');
	newButton.classList.add(taskType);
	newButton.innerText = taskType;
	return newButton;
}
const actionContext = {
	"edit": edit,
	"remove": remove,
	"save": edit
}