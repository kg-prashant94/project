
let todoList = [
  {
    item: 'buy milk', 
    due_Date: '05-10-2024'
  },
  {
    item: 'buy cake', 
    due_Date: '05-10-2024'
  }
  ];
displayItems();

function addTodo() {
   let inputElement = document.querySelector('#todo-input');
   let dateElement = document.querySelector('#todo-date');
   let todoItem = inputElement.value;
   let todoDate = dateElement.value;
   todoList.push({item: todoItem, due_Date: todoDate});
   inputElement.value = '';
   dateElement.value = '';

   displayItems();
}


function displayItems() {
   let containerElement = document.querySelector('.todo-container');
   let newHtml = ``;
   for(let i = 0; i < todoList.length; i++) {
    // let item = todoList[i].item;
    // let dueDate = todoList[i].due_Date;
    let {item, due_Date} = todoList[i];
     newHtml += `
        <span>${item}</span>
        <span>${due_Date}</span>
        <button class="btn-delete" onclick="todoList.splice(${i},1);    displayItems();">Delete</button>
     `;
   }
   containerElement.innerHTML = newHtml;
}