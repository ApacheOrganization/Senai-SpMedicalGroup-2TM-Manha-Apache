import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from "../Services/Auth";
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.css';    
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'

//withRouter para redirecionar as rotas
import {Link, withRouter} from 'react-router-dom';

class Cabecalho extends Component{
    logout(){
        localStorage.removeItem("usuario-lindao");
        this.props.history.push('/');
    }
    render(){
        if(usuarioAutenticado() && parseJwt().permissao === "Administrador"){
            return(
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/cadastroUsuario">Cadastrar Usuario</Nav.Link>
                        <Nav.Link href="/cadastroClinica">Cadastrar Clínica</Nav.Link>
                        <NavDropdown title="Listas" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/usuarios/pacientes">Lista Pacientes</NavDropdown.Item>
                            <NavDropdown.Item href="/usuarios/medicos">Lista Médicos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/consultas">Todas Consultas</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Nav>
                        <Nav.Link href="/Login">Login</Nav.Link>
                        <Nav.Link>
                            Sair
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }else if(usuarioAutenticado() && parseJwt().permissao === "Médico"){
            return(
                <div>
                    <h1>Você é um Médico</h1>
                </div>
            );
        }else if(usuarioAutenticado() && parseJwt().permissao === "Paciente"){
            return(
                <div>
                    <h1>Você é um Paciente</h1>
                </div>
            );
        }else{
            return (
                <div>
                  <Link to="/login">Login</Link>
                </div>
              );
        }
    }
}

//componente utilizando withRouter para poder utilizar o redirect do logout
export default withRouter(Cabecalho);