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
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import ConsoltasLogado from './pages/Consultas/ListarPorLogado';
import CadastroUsuarios from './pages/Usuarios/CadastrarUsuarios';
import CadastrarClinicas from './pages/Clinicas/CadastrarClinica';

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Login" component = {Login}/>
                <Route path="/usuarios/medicos" component = {Medicos}/>
                <Route path="/usuarios/pacientes" component = {Pacientes}/>
                <Route path="/consultas" component = {Consultas}/>
                <Route path="/minhasconsultas" component = {ConsoltasLogado}/>
                <Route path="/cadastroUsuario" component = {CadastroUsuarios}/>
                <Route path="/cadastroClinica" component = {CadastrarClinicas}/>
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
