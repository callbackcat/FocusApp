const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  pendingNum.textContent = tasks.length === 0 ? "0" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    localStorage.setItem("todoLists", JSON.stringify(toJSON(todoLists)));

    return;
  }

  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
  localStorage.setItem("todoLists", JSON.stringify(toJSON(todoLists)));
}

window.addEventListener("load", function () {
  todoLists.insertAdjacentHTML(
    "beforeend",
    toDOM(localStorage.getItem("todoLists")).innerHTML
  );
});

inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();

  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    console.log(toJSON(todoLists));

    inputField.value = "";
    allTasks();
  }
});

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
}

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
}

clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});

function toJSON(node) {
  node = node || this;
  let obj = {
    nodeType: node.nodeType,
  };
  if (node.tagName) {
    obj.tagName = node.tagName.toLowerCase();
  } else if (node.nodeName) {
    obj.nodeName = node.nodeName;
  }
  if (node.nodeValue) {
    obj.nodeValue = node.nodeValue;
  }
  let attrs = node.attributes;
  let childNodes = node.childNodes;
  let length;
  let arr;
  if (attrs) {
    length = attrs.length;
    arr = obj.attributes = new Array(length);
    for (let i = 0; i < length; i++) {
      const attr = attrs[i];
      arr[i] = [attr.nodeName, attr.nodeValue];
    }
  }
  if (childNodes) {
    length = childNodes.length;
    arr = obj.childNodes = new Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = toJSON(childNodes[i]);
    }
  }
  return obj;
}

function toDOM(obj) {
  if (typeof obj == "string") {
    obj = JSON.parse(obj);
  }
  let node,
    nodeType = obj.nodeType;
  switch (nodeType) {
    case 1: //ELEMENT_NODE
      node = document.createElement(obj.tagName);
      let attributes = obj.attributes || [];
      for (let i = 0, len = attributes.length; i < len; i++) {
        const attr = attributes[i];
        node.setAttribute(attr[0], attr[1]);
      }
      break;
    case 3: //TEXT_NODE
      // eslint-disable-next-line no-undef
      node = document.createTextNode(obj.nodeValue);
      break;
    case 8: //COMMENT_NODE
      node = document.createComment(obj.nodeValue);
      break;
    case 9: //DOCUMENT_NODE
      node = document.implementation.createDocument();
      break;
    case 10: //DOCUMENT_TYPE_NODE
      node = document.implementation.createDocumentType(obj.nodeName);
      break;
    case 11: //DOCUMENT_FRAGMENT_NODE
      node = document.createDocumentFragment();
      break;
    default:
      return node;
  }
  if (nodeType == 1 || nodeType == 11) {
    const childNodes = obj.childNodes || [];
    for (let i = 0, len = childNodes.length; i < len; i++) {
      node.appendChild(toDOM(childNodes[i]));
    }
  }
  return node;
}

function outerHTML(node) {
  return node.outerHTML || new XMLSerializer().serializeToString(node);
}
