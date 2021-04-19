
let todoCounter = 0;

function startTodo() {

}

function addTodo() {
    todoCounter++;
    const container = document.getElementById("todoContainer");
    container.innerHTML += `
        <tr>
            <td>
                <label for="todo_${todoCounter}">Todo #${todoCounter} text</label>
                <input id="todo_${todoCounter}" type="text">
            </td>
            <td>
                <label for="done_${todoCounter}">Todo #${todoCounter} done?</label>
                <input id="done_${todoCounter}" type="checkbox">
            </td>
        </tr>
    `;
}
