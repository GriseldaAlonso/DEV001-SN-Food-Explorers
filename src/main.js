// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/JS/index.js';
import { Login } from './lib/JS/login.js';
import { Register } from './lib/JS/register.js';
import { Wall } from './lib/JS/wall.js';
import { Welcome } from './lib/JS/welcome.js';

myFunction();

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

const components = () => routes[window.location.pathname];

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(components());
};

root.appendChild(components());
