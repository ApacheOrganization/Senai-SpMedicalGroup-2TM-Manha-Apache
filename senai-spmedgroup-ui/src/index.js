import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Medicos from './pages/Usuarios/ListarMedicos';
import Pacientes from './pages/Usuarios/ListarPacientes';
import Consultas from './pages/Consultas/ListarConsultas';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import ConsoltasLogado from './pages/Consultas/ListarPorLogado';
import CadastroUsuarios from './pages/Usuarios/CadastrarUsuarios';
import CadastrarClinicas from './pages/Clinicas/CadastrarClinica';
import Clinicas from './pages/Clinicas/ListarClinicas';
import CadastroConsulta from './pages/Consultas/CadastrarConsultas';
import CadastroMedico from './pages/Usuarios/CadastrarMedico';
import { usuarioAutenticado, parseJwt } from "../src/Services/Auth";

const PermissaoAdmin = ({ component: Component }) => (
    <Route
      render = { props => usuarioAutenticado() && parseJwt().permissao === "Administrador" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/Login" }} />
        )
      }
    />
  );

  const PermissaoComum = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().permissao === "Paciente" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

    
  const PermissaoMedico = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().permissao === "MÃ©dico" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Login" component = {Login}/>
                <PermissaoAdmin path="/usuarios/medicos" component = {Medicos}/>
                <PermissaoAdmin path="/usuarios/pacientes" component = {Pacientes}/>
                <PermissaoAdmin path="/consultas" component = {Consultas}/>
                <Route path="/minhasconsultas" component = {ConsoltasLogado}/>
                <PermissaoAdmin path="/cadastroUsuario" component = {CadastroUsuarios}/>
                <PermissaoAdmin path="/cadastroClinica" component = {CadastrarClinicas}/>
                <PermissaoAdmin path="/cadastroConsulta" component = {CadastroConsulta}/>
                <PermissaoAdmin path="/clinicas" component = {Clinicas}/>
                <PermissaoAdmin path="/cadastroMedico" component = {CadastroMedico}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
