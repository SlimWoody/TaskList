const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// Добавление задач
form.addEventListener('submit', addTask);

// Удаление задач
tasksList.addEventListener('click', deleteTask)

// Задача выполнена
tasksList.addEventListener('click', doneTask)

// Функция добавления задачи
function addTask(event) {
    // Отменем стандартное поведение при отправки формы
    event.preventDefault();
    // Достаем текст задачи из поля ввода 
    const taskText = taskInput.value;
    // Разметка для новой задачи
    const taskHTML = `
                <li class="list-group-item d-flex justify-content-between task-item">
                    <span class="task-title">${taskText}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
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
}

// Функция удаления задачи 
function deleteTask(event){
    // c помощью target отслеживаем элемент по которому происходит клик.
    if (event.target.dataset.action === 'delete'){
        console.log('DELETE!!!');
        const parenNode = event.target.closest('.list-group-item');
        parenNode.remove();
    }

    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}

// Функция выполнения задачи 
function doneTask(event){
    if (event.target.dataset.action === "done"){
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title'); // querySelector позволяет искать элемент по HTML 
        taskTitle.classList.toggle('task-title--done'); //toggle добовляет и удаляет класс
    }
}
