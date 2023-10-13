const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const data = new Date();
let isEditTask = false;
const addTaskButton = document.querySelector('#addTask');
const cancelButton = document.querySelector('#cancel-btn')
let taskTitleEdit = null;



// Добавление задач
form.addEventListener('submit', addTask);

// Удаление задач
tasksList.addEventListener('click', deleteTask);

// Задача выполнена
tasksList.addEventListener('click', doneTask);

//Редактирование задачи
tasksList.addEventListener('click', editTask);

// Отмена редактирования задачи

if (localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

// Функция добавления задачи
function addTask(event) {
    // Отменем стандартное поведение при отправки формы
    event.preventDefault();
    // Достаем текст задачи из поля ввода 
    const taskText = taskInput.value;

    if(isEditTask){
        saveEditTask(taskText);
        return;
    }
    // Разметка для новой задачи
    const taskHTML = `
                <li class="list-group-item d-flex justify-content-between task-item">
                    <div class='data-box'>
                    <span class="data">${data}</span>
                    </div>
                    <span class="task-title">${taskText}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="editing" class="btn-action">
							<img src="./img/edit.svg" alt="Editing" width="18" height="18">
						</button>
                    </div>
                </li>`;

    // Добавление задачи на страницу
    // метод insertAjacentHtml используется для вставки кода. 
    // принимает два аргумента (в какую часть кода и сам код)
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем строку ввода и делаем на нем фокус
    taskInput.value = "";    // Очистка строки
    taskInput.focus(); // метод focus возвращает фокус на строку ввода

    // создаем условие при котором "список пуст" будет ативно или нет.
    // Если в EmptyList более одного элемента то "Список пуст" будет не активно.
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }

    saveHTMLtoLocalStorage();
}

// Функция удаления задачи 
function deleteTask(event) {
    if(isEditTask){
        alert('В данный момент это не возможно!');
        return;
    }
    // c помощью target отслеживаем элемент по которому происходит клик.
    if (event.target.dataset.action === 'delete') {
        const parenNode = event.target.closest('.list-group-item');
        parenNode.remove();
    }
    // Если в списке задач 1 элемент показываем блок "Список пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }

    saveHTMLtoLocalStorage();
}

// Функция выполнения задачи 
function doneTask(event) {
    if(isEditTask){
        alert('В данный момент это не возможно!');
        return;
    }
    
    if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title'); // querySelector позволяет искать элемент по HTML 
        taskTitle.classList.toggle('task-title--done'); //toggle добовляет и удаляет класс

        saveHTMLtoLocalStorage();
    }
}

// Функция сохранения всей разметки 
function saveHTMLtoLocalStorage() {
    localStorage.setItem('tasksHTML', tasksList.innerHTML);
}

// Функция редактирования задачи
function editTask(event){
    if(event.target.dataset.action === 'editing'){
        isEditTask = true;
        const parentNode = event.target.closest('.list-group-item');
        taskTitleEdit = parentNode.querySelector('.task-title');
        taskInput.focus();
        taskInput.value = taskTitleEdit.textContent;
        addTaskButton.textContent = 'Сохранить';
        cancelButton.classList.remove('none');
    }
}

// Функция сохраниения изменений после редактирования 
function saveEditTask(taskText){
    taskTitleEdit.textContent = taskText;
    resetFormEdit();
}

// Функция сброса формы для редактирования.
function resetFormEdit(){
    isEditTask = false;
    cancelButton.classList.add('none');
    addTaskButton.textContent = 'Добавить';
    taskInput.value = "";
    taskInput.focus();
    saveHTMLtoLocalStorage();
}