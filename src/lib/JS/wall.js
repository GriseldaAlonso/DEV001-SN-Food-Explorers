/* eslint-disable no-shadow */
import {
  logOut, savePost, onGetPosts, deletePost, getPost, updatePost,
} from './index.js';
import { auth } from './firebase.js';
import { createModal } from './modal.js';

export const Wall = (onNavigate) => {
  // contenedor de la página de bienvenida
  const container = document.createElement('div');
  container.id = 'containerWall';

  // header y navegador de la página
  const header = document.createElement('header');
  const nav = document.createElement('nav');

  // logo de la página
  const imgLogo = document.createElement('img');
  imgLogo.src = 'https://raw.githubusercontent.com/GriseldaAlonso/DEV001-SN-Food-Explorers/main/src/lib/assets/images/Logo_FoodExplorers.png';
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
  let editStatus = false;
  let id = '';
  const btnSave = document.createElement('button');
  btnSave.textContent = 'Publicar';
  btnSave.type = 'submit';
  btnSave.className = 'btns';

  // publicaciones del muro
  const postsList = document.createElement('ul');
  postsList.id = 'postsList';

  // modal
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modalContainer';
  const modal = document.createElement('dialog');
  modal.className = 'modal';
  modal.id = 'modal';

  nav.append(imgLogo, title, btnLogOut);
  header.append(nav);
  form.append(textArea, btnSave);

  main.append(form, postsList);
  container.append(header, main, modalContainer);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ts = new Date();
    const user = auth.currentUser;
    const userId = user.uid;
    const userNameValue = user.displayName;
    const postContent = form.content.value;
    const currentDate = ts.toLocaleString();
    if (postContent !== '' && !editStatus) {
      await savePost(postContent, currentDate, userId, userNameValue, ts);
      form.reset();
    } else if (editStatus === true) {
      await updatePost(id, {
        content: form.content.value,
      });
      editStatus = false;
      form.reset();
    } else {
      createModal();
      modal.showModal();
      const close = document.getElementById('closeModalButton');
      close.addEventListener('click', () => {
        modal.close();
      });
    }
  });

  const showPosts = (postsQuerySnapshot) => {
    let html = '';
    postsQuerySnapshot.forEach((doc) => {
      const post = doc.data();
      const user = auth.currentUser;
      if (post.uid === user.uid) {
        html += `
      <li id=''>
        <div class='top-section'>
          <h3 class='userName-post'>${post.userName}</h3>
          <div class='nav-show'>
            <button class='btn-delete' data-id='${doc.id}'><img src="https://raw.githubusercontent.com/GriseldaAlonso/DEV001-SN-Food-Explorers/main/src/lib/assets/images/bxs-trash.svg" alt="icono de eliminar"></button>
            <button class='btn-edit' data-id='${doc.id}'><img src="https://raw.githubusercontent.com/GriseldaAlonso/DEV001-SN-Food-Explorers/main/src/lib/assets/images/bxs-edit-alt.svg" alt="icono de editar"></button>
          </div>
        </div>
        <div>
          <p class='posts'>${post.content}</p>
          <p class='date'>${post.date}</p>
        </div>
      </li>
      `;
      } else {
        html += `
      <li id=''>
        <div class='top-section'>
          <h3 class='userName-post'>${post.userName}</h3>
          <div class='nav-show'>
          </div>
        </div>
        <div>
          <p class='posts'>${post.content}</p>
          <p class='date'>${post.date}</p>
        </div>
      </li>
      `;
      }
      postsList.innerHTML = html;
      const btnsDelete = postsList.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async () => {
          // eslint-disable-next-line no-restricted-globals, no-alert
          const agree = confirm('¿Estas seguro de eliminar este comentario?');
          if (agree === true) {
            await deletePost(btn.dataset.id);
          }
        });
      });
      const btnsEdit = postsList.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const doc = await getPost(btn.dataset.id);
          const post = doc.data();
          form.content.value = post.content;
          editStatus = true;
          id = doc.id;
        });
      });
    });
  };

  onGetPosts(showPosts);

  btnLogOut.addEventListener('click', () => {
    form.reset();
    const result = logOut();
    if (result === 'null') {
      onNavigate('/');
      postsList.remove();
    }
  });

  return container;
};
