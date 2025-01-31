// Este es el punto de entrada de tu aplicacion
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/JS/firebase.js';
import { Login } from './lib/JS/login.js';
import { Register } from './lib/JS/register.js';
import { Wall } from './lib/JS/wall.js';
import { Welcome } from './lib/JS/welcome.js';

const root = document.getElementById('root');

let routes = {};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]);
};

routes = {
  '/': Welcome(onNavigate),
  '/login': Login(onNavigate),
  '/register': Register(onNavigate),
  '/wall': Wall(onNavigate),
};

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(routes[window.location.pathname]);
};

root.appendChild(routes[window.location.pathname]);

onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/wall');
  } else {
    onNavigate('/');
  }
});
