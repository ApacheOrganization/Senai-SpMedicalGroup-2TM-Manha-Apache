import React, {Component} from 'react'
import Axios from "axios";
import {parseJwt} from '../../Services/Auth';
import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/css/Login.css';
import "mdbreact/dist/css/mdb.css";
import {MDBCol } from "mdbreact";
import { MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Login extends Component{
    constructor(){
        super();
        this.state={
            email : '',
            senha : '',
            errorMessage : ''
        }
    }

    atualizaEstadoEmail(event){
        this.setState({ email : event.target.value});
    }

    atualizaEstadoSenha(event){
        this.setState({ senha : event.target.value});
    }

    realizaLogin(event){
        event.preventDefault();
        // alert(this.state.email + " - " + this.state.senha);

        Axios.post("http://localhost:5000/api/login", {
            email : this.state.email,
            senha : this.state.senha
        })
        .then(data =>{
            if(data.status === 200){
                console.log(data);
                localStorage.setItem("usuario-lindao", data.data.token);
                console.log(parseJwt().permissao);
                // alert(parseJwt().Role);
                if(parseJwt().permissao === "Administrador"){
                    this.props.history.push("/")
                }else if(parseJwt().permissao === "Médico"){
                    this.props.history.push("/")
                }else if(parseJwt().permissao === "Paciente"){
                    this.props.history.push("/")
                }else{
                    this.props.history.push("/")
                }   
            }
        })
        .catch(erro => {this.setState({errorMessage : 'Email ou Senha incorretos'})});
    }

    render(){
        return(
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
              <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.realizaLogin.bind(this)}>
                  <p className="h5 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Escreva seu email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.atualizaEstadoEmail.bind(this)}
                    />
                    <MDBInput
                      label="Escreva sua senha"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.senha}
                      onChange={this.atualizaEstadoSenha.bind(this)}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit">Login</MDBBtn>
                  </div>
                </form>
                </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        );
    }
}

export default Login;