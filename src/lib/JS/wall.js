import { logOut } from './index.js';

export const Wall = (onNavigate) => {
  // contenedor de la página de bienvenida
  const container = document.createElement('div');
  container.id = 'containerWall';

  // header y navegador de la página
  const header = document.createElement('header');
  const nav = document.createElement('nav');

  // logo de la página
  const imgLogo = document.createElement('img');
  imgLogo.src = './lib/assets/images/Logo_FoodExplorers.png';
  imgLogo.alt = 'logo food explorers. Brújula con tenedor y cuchara como flechas';
  imgLogo.id = 'imgLogoNav';

  // titulo de la página
  const title = document.createElement('h2');
  title.textContent = 'Food Explorers';
  title.id = 'titleWall';

  // boton de LogOut
  const btnLogOut = document.createElement('button');
  btnLogOut.textContent = 'Cerrar sesión';
  btnLogOut.id = 'btnLogOut';

  // texto slogan
  const textWelcome = document.createElement('p');
  textWelcome.textContent = 'La red social para compartir tus hallazgos del mundo culinario';
  textWelcome.id = 'textSlogan';

  // main de la página
  const main = document.createElement('main');
  main.id = 'mainWall';

  // formulario para publicar
  const form = document.createElement('form');
  form.id = 'formWall';
  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Escribe aquí...';
  const btnSave = document.createElement('button');
  btnSave.textContent = 'Publicar';
  btnSave.type = 'submit';
  btnSave.className = 'btns';

  // publicaciones del muro
  const ul = document.createElement('ul');

  nav.append(imgLogo, title, btnLogOut);
  header.append(nav);
  form.append(textArea, btnSave);

  main.append(form, ul);
  container.append(header, main);

  btnLogOut.addEventListener('click', async () => {
    const result = logOut();
    if (result === 'null') {
      onNavigate('/');
    }
  });

  return container;
};
