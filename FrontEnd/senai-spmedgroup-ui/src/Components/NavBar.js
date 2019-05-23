import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from "../Services/Auth";
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.css';    
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
import logo from '../assets/img/logo.png'

//withRouter para redirecionar as rotas
import {withRouter} from 'react-router-dom';

class Cabecalho extends Component{
    logout(){
        localStorage.removeItem("usuario-lindao");
        this.props.history.push('/');
    }
    render(){
        if(usuarioAutenticado() && parseJwt().permissao === "Administrador"){
            return(
                <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
                    <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/cadastroUsuario">Cadastrar Usuario</Nav.Link>
                        <Nav.Link href="/cadastroMedico">Cadastrar Médico</Nav.Link>
                        <Nav.Link href="/cadastroClinica">Cadastrar Clínica</Nav.Link>
                        <Nav.Link href="/cadastroConsulta">Cadastrar Consulta</Nav.Link>
                        <NavDropdown title="Listas" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/usuarios/pacientes">Lista Pacientes</NavDropdown.Item>
                            <NavDropdown.Item href="/usuarios/medicos">Lista Médicos</NavDropdown.Item>
                            <NavDropdown.Item href="/clinicas">Lista Clinicas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/consultas">Todas Consultas</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        
                        <Nav>
                        <div style={{flexDirection:"row"}}>

                        { usuarioAutenticado() ?
                            
                            (
                                <div style={{display:"flex"}}>
                                    <Nav.Link href="#"> { parseJwt().nomeuser } </Nav.Link>
                                    <Nav.Link onClick={this.logout.bind(this)}>Sair</Nav.Link>    
                                </div>
                            ) :
                            (
                                <div>
                                    <Nav.Link href="/Login">Login</Nav.Link>
                                </div>
                            )
                        }
                        </div>
                        
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
                
            );
        }else if(usuarioAutenticado() && parseJwt().permissao === "MÃ©dico"){
                return(
                    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
                    <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/minhasconsultas">Minhas Consultas</Nav.Link>
                        </Nav>
                        
                        <Nav>
                        <div style={{flexDirection:"row"}}>

                        { usuarioAutenticado() ?
                            
                            (
                                <div style={{display:"flex"}}>
                                    
                                    <Nav.Link href="#"> { parseJwt().nomeuser } </Nav.Link>
                                    <Nav.Link onClick={this.logout.bind(this)}>Sair</Nav.Link>    
                                </div>
                            ) :
                            (
                                <div>
                                    <Nav.Link href="/Login">Login</Nav.Link>
                                </div>
                            )
                        }
                        </div>
                        
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
                );
        }else if(usuarioAutenticado() && parseJwt().permissao === "Paciente"){
            return(
                    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
                        <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/minhasconsultas">Minhas Consultas</Nav.Link>
                            </Nav>
                            
                            <Nav>
                            <div style={{flexDirection:"row"}}>

                            { usuarioAutenticado() ?
                                
                                (
                                    <div style={{display:"flex"}}>
                                        
                                        <Nav.Link href="#"> { parseJwt().nomeuser } </Nav.Link>
                                        <Nav.Link onClick={this.logout.bind(this)}>Sair</Nav.Link>    
                                    </div>
                                ) :
                                (
                                    <div>
                                        <Nav.Link href="/Login">Login</Nav.Link>
                                    </div>
                                )
                            }
                            </div>
                            
                            </Nav>
                        </Navbar.Collapse>
                        
                    </Navbar>
                    );
        }else{
            return (
                <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
                    <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Cadastre-se ou faça Login para ter acesso a nossos serviços</Nav.Link>
                        </Nav>
                        
                        <Nav>
                        <div style={{flexDirection:"row"}}>

                        { usuarioAutenticado() ?
                            
                            (
                                <div style={{display:"flex"}}>
                                    
                                    <Nav.Link href="#"> { parseJwt().nomeuser } </Nav.Link>
                                    <Nav.Link onClick={this.logout.bind(this)}>Sair</Nav.Link>    
                                </div>
                            ) :
                            (
                                <div>
                                    <Nav.Link href="/Login">Login</Nav.Link>
                                </div>
                            )
                        }
                        </div>
                        
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
              );
        }
    }
}

//componente utilizando withRouter para poder utilizar o redirect do logout
export default withRouter(Cabecalho);