export const Welcome = (onNavigate) => {
  // contenedor de la página de bienvenida
  const container = document.createElement('main');
  container.id = 'containerWelcome';

  // logo de la página
  const imgLogo = document.createElement('img');
  imgLogo.src = './lib/assets/images/Logo_FoodExplorers.png';
  imgLogo.alt = 'logo food explorers. Brújula con tenedor y cuchara como flechas';
  imgLogo.id = 'mainImgLogo';

  // titulo de la página
  const title = document.createElement('h1');
  title.textContent = 'Food Explorers';
  title.id = 'mainTitle';

  // texto slogan
  const textWelcome = document.createElement('p');
  textWelcome.textContent = 'La red social para compartir tus hallazgos del mundo culinario';
  textWelcome.id = 'textSlogan';

  // div para botones
  const divBtnsWelcome = document.createElement('div');
  divBtnsWelcome.className = 'divBtns';

  // boton de Login
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Inicia sesión';
  btnLogin.className = 'btns';

  // boton de Registro
  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Regístrate';
  btnRegister.className = 'btns';

  divBtnsWelcome.append(btnLogin, btnRegister);
  container.append(
    imgLogo,
    title,
    textWelcome,
    divBtnsWelcome,
  );

  btnLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  btnRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  return container;
};
