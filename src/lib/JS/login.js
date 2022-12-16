import { signInEmail, signInGoogle } from './index.js';

export const Login = (onNavigate) => {
  // contenedor de la página de bienvenida
  const container = document.createElement('main');
  container.id = 'containerLogin';

  // formulario de inicio de sesión
  const form = document.createElement('form');
  form.id = 'loginForm';

  // input y label para correo electrónico
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', 'inputEmail');
  labelEmail.textContent = 'Correo electrónico';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id', 'inputEmail');
  inputEmail.setAttribute('placeholder', 'ejemplo@ejemplo.com');

  // input y label para contraseña
  const labelPassword = document.createElement('label');
  labelPassword.setAttribute('for', 'inputPassword');
  labelPassword.textContent = 'Contraseña';
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id', 'inputPassword');
  inputPassword.setAttribute('placeholder', 'contraseña');

  // titulo de la página
  const title = document.createElement('h2');
  title.textContent = 'Inicia Sesión';
  title.className = 'titles';

  // logo de la página
  const imgLogo = document.createElement('img');
  imgLogo.src = './lib/assets/images/Logo_FoodExplorers.png';
  imgLogo.alt = 'logo food explorers. Brújula con tenedor y cuchara como flechas';
  imgLogo.className = 'imgLogo';

  // texto para mostrar mensajes de error
  const errorMessageLogin = document.createElement('p');
  errorMessageLogin.id = 'errorMessageLogin';

  // div para botones
  const divBtnsLogin = document.createElement('div');
  divBtnsLogin.className = 'divBtns';

  // boton de Login
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Entrar';
  btnLogin.className = 'btns';

  // boton de volver
  const btnBack = document.createElement('button');
  btnBack.textContent = 'Volver al inicio';
  btnBack.className = 'btns';

  //  boton para iniciar sesión con google
  const btnGoogle = document.createElement('button');
  btnGoogle.textContent = 'o inicia sesión con ';
  btnGoogle.id = 'btnGoogle';
  const imgGoogle = document.createElement('img');
  imgGoogle.src = './lib/assets/images/google.png';
  imgGoogle.alt = 'icono google';
  imgGoogle.id = 'imgGoogle';

  container.append(form);
  divBtnsLogin.append(btnLogin, btnBack);
  form.append(
    title,
    imgLogo,
    errorMessageLogin,
    labelEmail,
    inputEmail,
    labelPassword,
    inputPassword,
    divBtnsLogin,
    btnGoogle,
  );
  btnGoogle.append(imgGoogle);

  btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    const result = await signInEmail(email, password);
    if (result === 'auth/user-not-found') {
      errorMessageLogin.innerHTML = 'Dirección Email no encontrada, por favor regístrese';
    } else if (result === 'auth/wrong-password') {
      errorMessageLogin.innerHTML = 'Contraseña incorrecta';
    } else if (result === 'auth/invalid-email') {
      errorMessageLogin.innerHTML = 'Dirección de Email invalida';
    } else if (typeof result === 'object') {
      form.reset();
      onNavigate('/wall');
    }
  });

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle();
    onNavigate('/wall');
  });

  btnBack.addEventListener('click', () => {
    onNavigate('/');
  });

  return container;
};
