const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}

// Script para arrastar o divisor e redimensionar o menu
const resizer = document.querySelector('.resizer');
const sideNav = document.querySelector('.side-nav');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
  });
});

function handleMouseMove(e) {
  if (isResizing) {
    const newWidth = e.clientX;
    if (newWidth > 100) { // Limita a largura mínima para a side-nav
      sideNav.style.width = `${newWidth}px`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".column");
  const createTaskButton = document.getElementById("create-lead");
  const addColumnButton = document.getElementById("add-column");
  const settingsButton = document.getElementById("settings");
  const settingsModal = document.getElementById("settings-modal");
  const closeModal = settingsModal.querySelector(".close");
  let selectedColumn = null;

  // Função para criar uma nova tarefa
  function createTask() {
    if (!selectedColumn) {
      alert("Selecione uma coluna antes de criar uma tarefa.");
      return;
    }

    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.draggable = true;
    newItem.innerHTML = 
      `<h4>Nova Tarefa</h4>
      <p class="cliente">Novo Cliente</p>`;
    selectedColumn.appendChild(newItem);
  }

  // Função para adicionar uma nova coluna
  function addColumn() {
    const kanban = document.querySelector(".kanban");
    const newColumn = document.createElement("div");
    newColumn.className = "column";
    newColumn.setAttribute("contenteditable", "true");
    newColumn.innerHTML = 
      `<h4>Nova Coluna</h4>
      <div class="item" draggable="true">Novo Card</div>`;
    kanban.appendChild(newColumn);
    columns.forEach(column => {
      column.addEventListener("click", selectColumn);
    });
  }

  // Função para abrir o modal de configurações
  function openSettings() {
    settingsModal.style.display = "block";
  }

  // Função para fechar o modal de configurações
  function closeSettings() {
    settingsModal.style.display = "none";
  }

  // Função para selecionar a coluna
  function selectColumn(e) {
    columns.forEach(col => col.classList.remove("selected"));
    selectedColumn = e.currentTarget;
    selectedColumn.classList.add("selected");
  }

  // Eventos dos botões
  createTaskButton.addEventListener("click", createTask);
  addColumnButton.addEventListener("click", addColumn);
  settingsButton.addEventListener("click", openSettings);
  closeModal.addEventListener("click", closeSettings);
  window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      closeSettings();
    }
  });

  // Adiciona seleção de coluna
  columns.forEach(column => {
    column.addEventListener("click", selectColumn);
  });
  
  // Funções de arrastar e soltar
  document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });
  
  document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
  
  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necessário para permitir o drop
      const dragging = document.querySelector(".dragging");
      const applyAfter = getNewPosition(item, e.clientY);
  
      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else {
        item.prepend(dragging);
      }
    });
  });
  
  function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;
  
    for (let refer_card of cards) {
      const box = refer_card.getBoundingClientRect();
      const boxCenterY = box.y + box.height / 2;
  
      if (posY >= boxCenterY) result = refer_card;
    }
  
    return result;
  }
});
