export const Register = (onNavigate) => {
  // contenedor de la página de bienvenida
  const container = document.createElement('main');
  container.id = 'containerRegister';

  // formulario de inicio de sesión
  const form = document.createElement('form');
  form.id = 'registerForm';

  // input y label para nombre de usuario
  const labelNameUser = document.createElement('label');
  labelNameUser.setAttribute('for', 'inputNameUser');
  labelNameUser.textContent = 'Escribe tu nombre';
  const inputNameUser = document.createElement('input');
  inputNameUser.setAttribute('type', 'text');
  inputNameUser.setAttribute('id', 'inputNameUser');
  inputNameUser.setAttribute('placeholder', 'Nombre de usuario');

  // input y label para correo electrónico
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', 'inputEmail');
  labelEmail.textContent = 'Ingresa tu dirección de correo electrónico';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id', 'inputEmailRegister');
  inputEmail.setAttribute('placeholder', 'ejemplo@ejemplo.com');

  // input y label para contraseña
  const labelPassword = document.createElement('label');
  labelPassword.setAttribute('for', 'inputPassword');
  labelPassword.textContent = 'Ingresa tu contraseña';
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id', 'inputPasswordRegister');
  inputPassword.setAttribute('placeholder', 'contraseña');

  // titulo de la página
  const title = document.createElement('h2');
  title.textContent = 'Regístrate';
  title.className = 'titles';

  // logo de la página
  const imgLogo = document.createElement('img');
  imgLogo.src = './lib/assets/images/Logo_FoodExplorers.png';
  imgLogo.alt = 'logo food explorers. Brújula con tenedor y cuchara como flechas';
  imgLogo.className = 'imgLogo';

  // texto para mostrar mensajes de error
  const errorMessageRegister = document.createElement('p');
  errorMessageRegister.id = 'errorMessageRegister';

  // div para botones
  const divBtnsRegister = document.createElement('div');
  divBtnsRegister.className = 'divBtns';

  // boton de registro
  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Crear cuenta';
  btnRegister.className = 'btns';
  btnRegister.type = 'submit';

  // boton de volver
  const btnBack = document.createElement('button');
  btnBack.textContent = 'Volver al inicio';
  btnBack.className = 'btns';

  container.append(form);
  divBtnsRegister.append(btnRegister, btnBack);
  form.append(
    title,
    imgLogo,
    errorMessageRegister,
    labelNameUser,
    inputNameUser,
    labelEmail,
    inputEmail,
    labelPassword,
    inputPassword,
    divBtnsRegister,
  );

  btnRegister.addEventListener('click', () => {
    onNavigate('/wall');
  });

  btnBack.addEventListener('click', () => {
    onNavigate('/');
  });

  return container;
};
