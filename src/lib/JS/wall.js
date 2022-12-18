import { logOut, savePost } from './index.js';
import { auth } from './firebase.js';

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

  // main de la página
  const main = document.createElement('main');
  main.id = 'mainWall';

  // formulario para publicar
  const form = document.createElement('form');
  form.id = 'formWall';
  const textArea = document.createElement('textarea');
  textArea.id = 'content';
  textArea.placeholder = 'Escribe aquí...';
  const btnSave = document.createElement('button');
  btnSave.textContent = 'Publicar';
  btnSave.type = 'submit';
  btnSave.className = 'btns';

  // mensaje de error
  const errorMessageWall = document.createElement('p');
  errorMessageWall.id = 'errorMessageWall';


  // publicaciones del muro
  const ul = document.createElement('ul');

  nav.append(imgLogo, title, btnLogOut);
  header.append(nav);
  form.append(errorMessageWall, textArea, btnSave);

  main.append(form, ul);
  container.append(header, main);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const userId = user.uid;
    const userNameValue = user.displayName;
    const postContent = form.content.value;
    const currentDate = new Date();
    if (postContent !== '') {
      savePost(postContent, currentDate, userId, userNameValue);
    } else {
      errorMessageWall.innerHTML = 'Error: Su publicación está vacía.';
    }
  });

  btnLogOut.addEventListener('click', async () => {
    const result = logOut();
    if (result === 'null') {
      onNavigate('/');
    }
  });

  return container;
};
