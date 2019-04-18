import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Cabecalho from '../../Components/NavBar';

class CadastroUsuarios extends Component{
    constructor(){
        super();
        this.state = {
            usuarios : [],
            nome : "",
            email : "",
            senha : "",
            datanascimento : "",
            telefone : "",
            CPF : "",
            endereco : "",
            RG : "",
            IdTipoUsuario : ""

        }
        this.atualizaEstadoNomeFormulario = this.atualizaEstadoNome.bind(this);
        this.atualizaEstadoEmailFormulario = this.atualizaEstadoEmail.bind(this);
        this.atualizaEstadoSenhaFormulario = this.atualizaEstadoSenha.bind(this);
        this.atualizaEstadoDataFormulario = this.atualizaEstadodatanascimento.bind(this);
        this.atualizaEstadoTelFormulario = this.atualizaEstadotelefone.bind(this);
        this.atualizaEstadoCPFFormulario = this.atualizaEstadoCPF.bind(this);
        this.atualizaEstadoEndFormulario = this.atualizaEstadoendereco.bind(this);
        this.atualizaEstadoRGFormulario = this.atualizaEstadoRG.bind(this);
        this.atualizaEstadoTipoFormulario = this.atualizaEstadoIdTipoUsuario.bind(this);
    }

    ListarUsuarios(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch('http://localhost:5000/api/usuarios/pacientes',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ usuarios : data }))
            .catch(erro => console.log(erro)) 
    }

    CadastraUsuario(event){   
        event.preventDefault();
        
        var url = 'http://localhost:5000/api/usuarios'

        if(this.state.IdTipoUsuario === 1){
          url='http://localhost:5000/api/usuarios/administrador'
        }else if(this.state.IdTipoUsuario === 2){
          url='http://localhost:5000/api/usuarios/medico'
        }else{
          url='http://localhost:5000/api/usuarios/paciente'
        }
        debugger;
        console.log(this.state.email)

         fetch(url,{
             method : 'POST',
             body : JSON.stringify(
                { nome : this.state.nome ,
                 email : this.state.email ,
                 senha : this.state.senha ,
                 datanascimento : this.state.datanascimento ,
                 telefone : this.state.telefone ,
                 CPF : this.state.CPF ,
                 endereco : this.state.endereco ,
                 RG : this.state.RG ,
                 IdTipoUsuario : this.state.IdTipoUsuario }
                ),
             headers : {
               "Content-Type" : "application/json",
               'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao")
             }
         })
         .then(response => response)
         .then(this.ListarUsuarios())
         .catch(erro => console.log(erro))
    }


    atualizaEstadoNome(event){
        this.setState({ nome : event.target.value });
    }
    atualizaEstadoEmail(event){
        this.setState({ email : event.target.value });
    }
    atualizaEstadoSenha(event){
        this.setState({ senha : event.target.value });
    }
    atualizaEstadodatanascimento(event){
        this.setState({ datanascimento : event.target.value });
    }
    atualizaEstadotelefone(event){
        this.setState({ telefone : event.target.value });
    }
    atualizaEstadoCPF(event){
        this.setState({ CPF : event.target.value });
    }
    atualizaEstadoendereco(event){
        this.setState({ endereco : event.target.value });
    }
    atualizaEstadoRG(event){
        this.setState({ RG : event.target.value });
    }
    atualizaEstadoIdTipoUsuario(event){
        this.setState({ IdTipoUsuario : event.target.value });
    }

    componentDidMount(){
        this.ListarUsuarios();
    }

    render(){
        return(
          
            <div id="conteudoPrincipal-cadastro">
            <Cabecalho/>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="6">
                    <form>
                      <p className="h5 text-center mb-4">Sign up</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Nome"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          value={this.state.nome}
                          onChange={this.atualizaEstadoNomeFormulario}
                        />
                        <MDBInput
                          label="E-Mail"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          value={this.state.email}
                    onChange={this.atualizaEstadoEmailFormulario}
                        />
                        <MDBInput
                          label="Senha"
                          icon="exclamation-triangle"
                          group
                          type="password"
                          validate
                          error="wrong"
                          success="right"
                          value={this.state.senha}
                    onChange={this.atualizaEstadoSenhaFormulario}
                        />
                        <MDBInput
                          label="Data de Nascimento"
                          icon="lock"
                          group
                          type="date"
                          validate
                          value={this.state.datanascimento}
                    onChange={this.atualizaEstadoDataFormulario}
                        />
                        <MDBInput
                          label="Telefone"
                          icon="lock"
                          group
                          type="tel"
                          validate
                          value={this.state.telefone}
                    onChange={this.atualizaEstadoTelFormulario}
                        />
                        <MDBInput
                        label="CPF"
                        icon="lock"
                        group
                        type="text"
                        validate
                        value={this.state.CPF}
                    onChange={this.atualizaEstadoCPFFormulario}
                      />
                      <MDBInput
                        label="Endereço"
                        icon="lock"
                        group
                        type="text"
                        validate
                        value={this.state.endereco}
                    onChange={this.atualizaEstadoEndFormulario}
                      />
                      <MDBInput
                        label="RG"
                        icon="lock"
                        group
                        type="number"
                        validate
                        value={this.state.RG}
                    onChange={this.atualizaEstadoRGFormulario}
                      />
                      <MDBInput
                        label="Id Tipo Usuario"
                        icon="lock"
                        group
                        type="number"
                        validate
                        value={this.state.IdTipoUsuario}
                    onChange={this.atualizaEstadoTipoFormulario}
                      />


                      </div>
                      <div className="text-center">
                        <MDBBtn type="submit"color="primary">Register</MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        );
    }
}

export default CadastroUsuarios;