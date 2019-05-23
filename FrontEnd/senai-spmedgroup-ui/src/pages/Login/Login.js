import React, {Component} from 'react'
import Axios from "axios";
import {parseJwt} from '../../Services/Auth';
import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/css/Login.css';
import "mdbreact/dist/css/mdb.css";
import Rodape from '../../Components/Footer';
import Cabecalho from '../../Components/NavBar';
import {MDBCol } from "mdbreact";
import { MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import API from '../../Services/api'

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

        Axios.post(API + "/login", {
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
        .catch(erro => {this.setState({errorMessage : 'Email ou Senha inválidos'})});
    }

    render(){
        return(
          <div>
          <Cabecalho/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
            <MDBContainer style={{marginBottom:'28px'}}>
            <MDBRow style={{marginLeft:'17.5em'}}>
              <MDBCol md="8"  >
              <MDBCard style={{height:'22em'}}>
              <MDBCardBody style={{height:'25em'}}>
                <form onSubmit={this.realizaLogin.bind(this)} style={{padding:'10px', height:'25em'}}>
                  <p style={{marginTop:'15px', marginBottom:'15px'}} className="h5 text-center mb-4">Login</p>
                  <div className="grey-text" style={{marginLeft:'-32px'}}>
                    <MDBInput
                      label="Escreva seu email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      required
                      value={this.state.email}
                      onChange={this.atualizaEstadoEmail.bind(this)}
                    />
                    <MDBInput
                      label="Escreva sua senha"
                      icon="lock"
                      group
                      type="password"
                      validate
                      required
                      value={this.state.senha}
                      onChange={this.atualizaEstadoSenha.bind(this)}
                    />
                  </div>
                  <div className="text-center">
                    <p>{this.state.errorMessage}</p>
                    <MDBBtn color="success" type="submit">Login</MDBBtn>
                  </div>
                </form>
                </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <br/>
          <br/>
          <br/>
          
          <br/>
          <br/>
          <Rodape />
          </div>
        );
    }
}

export default Login;