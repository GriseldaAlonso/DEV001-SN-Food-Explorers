const modal = document.getElementById('modal');
const modalContainer = document.getElementById('modalContainer');

export const createModal = () => {
  modal.innerHTML = `
    <div class="nav-show">
      <button id= "closeModalButton"><img src="https://raw.githubusercontent.com/GriseldaAlonso/DEV001-SN-Food-Explorers/main/src/lib/assets/images/bxs-square.svg" alt="icono X para cerrar"></button>
    </div>
    <p id="errorMessageWall">Error: Su publicación está vacía.</p><br>
    `;
  modalContainer.appendChild(modal);
};
