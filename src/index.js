import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './pages/services/auth';

import './index.css';

import App from './pages/home/App';
import PerfilPaciente from './pages/perfilpaciente/perfilPaciente';
import PerfilAdm from './pages/perfiladm/perfilAdm';
import PerfilMedico from './pages/perfilmedico/perfilMedico';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/Login';


import reportWebVitals from './reportWebVitals';


const PermissaoAdm = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().role === "1" ?
          <Component {...props} /> :
          <Redirect to='/' />
      }
    />
  )

const PermissaoPaciente = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().role === "2" ?
          <Component {...props} /> :
          <Redirect to='/' />
      }
    />
  )

  const PermissaoMedico = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().role === "3" ?
          <Component {...props} /> :
          <Redirect to='/' />
      }
    />
  )

const routing = (
  <Router>
      <div>
          <Switch>
              <Route exact path="/" component={App}  /> {/*home*/}
              <Route exact  path="/login" component={Login} /> { /*Login */}
              <PermissaoAdm path="/perfiladm" component={PerfilAdm} /> {/*perfil do administrador*/}
              <PermissaoPaciente path="/perfilpaciente" component={PerfilPaciente} /> {/*perfil do paciente*/}
              <PermissaoMedico path="/perfilmedico" component={PerfilMedico} /> {/*perfil do médico*/}
              <Route exact path="/notfound" component={NotFound} /> {/*Not Found*/}
              <Redirect to = "notfound" />
          </Switch>
      </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
