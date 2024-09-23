// Script para Registro de Lead (indexCadastro.html)
document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.getElementById('lead-form');
  
  if (leadForm) {
    leadForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Captura os dados do formulário
      const leadData = {
        companyName: document.getElementById('company-name').value,
        oreType: document.getElementById('ore-type').value,
        companyType: document.getElementById('company-type').value,
        interestLevel: document.getElementById('interest-level').value,
        contactPerson: document.getElementById('contact-person').value,
        contactEmail: document.getElementById('contact-email').value,
        contactPhone: document.getElementById('contact-phone').value,
        observations: document.getElementById('observations').value
      };
      
      // Salva no localStorage
      let leads = JSON.parse(localStorage.getItem('leads')) || [];
      leads.push(leadData);
      localStorage.setItem('leads', JSON.stringify(leads));

      alert('Lead registrado com sucesso!');

      // Redireciona para a página do CRM (Kanban)
      window.location.href = 'indexCrm.html';
    });
  }
});

// Script para o CRM (indexCrm.html)
document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".column");
  const addColumnButton = document.getElementById("add-column");

  // Função para adicionar um novo lead ao Kanban
  function addLeadToKanban(lead) {
    const kanban = document.querySelector(".kanban");
    const selectedColumn = kanban.querySelector(".column:first-child"); // Coloca na primeira coluna por padrão
    
    if (selectedColumn) {
      const newItem = document.createElement("div");
      newItem.className = "item";
      newItem.draggable = true;
      newItem.innerHTML = `
        <h4>${lead.companyName}</h4>
        <p><strong>Minério:</strong> ${lead.oreType}</p>
        <p><strong>Tipo de Empresa:</strong> ${lead.companyType}</p>
        <p><strong>Nível de Interesse:</strong> ${lead.interestLevel}</p>
        <p><strong>Responsável:</strong> ${lead.contactPerson}</p>
        <p><strong>Email:</strong> ${lead.contactEmail}</p>
        <p><strong>Telefone:</strong> ${lead.contactPhone}</p>
        <p><strong>Observações:</strong> ${lead.observations}</p>
      `;
      selectedColumn.appendChild(newItem);
    }
  }

  // Carregar leads do localStorage e adicionar ao Kanban
  let leads = JSON.parse(localStorage.getItem('leads')) || [];
  leads.forEach(lead => addLeadToKanban(lead));

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
  }

  if (addColumnButton) {
    addColumnButton.addEventListener("click", addColumn);
  }

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

  // Script para redimensionar a barra lateral
  const resizer = document.querySelector('.resizer');
  const sideNav = document.querySelector('.side-nav');
  let isResizing = false;

  if (resizer) {
    resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
      });
    });
  }

  function handleMouseMove(e) {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 100) { // Limita a largura mínima para a side-nav
        sideNav.style.width = `${newWidth}px`;
      }
    }
  }
});
