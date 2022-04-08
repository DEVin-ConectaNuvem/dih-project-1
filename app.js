const itemInput = document.getElementById('item-input');
const btnAdd = document.getElementById('btn-add');
const ulCart = document.getElementById('cart');

let list = [
  { id: 0, name: 'batata', status: false },
  { id: 1, name: 'arroz', status: false },
  { id: 2, name: 'feijao', status: false },
];


function createCheckbox(status, listener) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = status;
  checkbox.onclick = listener;
  return checkbox;
}

function updateScreen() {
  ulCart.innerHTML = '';
  list.forEach(item => {
    
    const checkbox = createCheckbox(
      item.status,
      event => toggleItem(item, event.target.checked)
    );

    const span = document.createElement('span');
    span.innerText = item.name;

    const btn = document.createElement('button');
    btn.innerText = 'x';
    btn.onclick = () => {
      removeItem(item);
    };
  
    const li = document.createElement('li');
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    ulCart.appendChild(li);
  });
}

function toggleItem(item, checked) {
  console.log(checked);
  if (checked) {
    item.status = true;
  } else {
    item.status = false;
  }
  console.log(item, list);
}

function removeItem(itemToRemove) {
  console.log('Exclui', itemToRemove);
  list = list.filter(item => {
    return item.name !== itemToRemove.name
  });
  console.log(list);
  updateScreen();
}

function addItem() {
  const name = itemInput.value;

  if (!name) return;

  let maior = 0;
  list.forEach(item => {
    if (item.id > maior) {
      maior = item.id;
    }
  });

  list.push({
    id: maior + 1,
    name: name,
    status: false
  });

  console.log(list);

  itemInput.value = '';
  updateScreen();
}


btnAdd.addEventListener('click', addItem);

updateScreen();
