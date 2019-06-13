import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard, MDBCardBody } from 'mdbreact';
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import API from '../../Services/api'

class CadastrarClinicas extends Component{
    constructor(){
        super();
        this.state = {
            clinicas : [],
            nome : "",
            razaosocial : "",
            cnpj : "",
            horariofuncionamento : "",
            localidade : "",
            erromensagem : ""

        }
        this.atualizaEstadoNomeFormulario = this.atualizaEstadoNome.bind(this);
        this.atualizaEstadorazaosocialFormulario = this.atualizaEstadoRazaoSocial.bind(this);
        this.atualizaEstadocnpjFormulario = this.atualizaEstadoCNPJ.bind(this);
        this.atualizaEstadohorariofuncionamentoFormulario = this.atualizaEstadoHorFunc.bind(this);
        this.atualizaEstadolocalidadeFormulario = this.atualizaEstadoLocalidade.bind(this);
    }

    ListarClinicas(){
        fetch(API + '/clinicas',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ clinicas : data }))
            .catch(erro => console.log(erro)) 
    }

    CadastraClinica(event){   
        event.preventDefault();
         fetch(API + '/clinicas',{
             method : 'POST',
             body : JSON.stringify(
                { nome : this.state.nome ,
                    razaosocial : this.state.razaosocial ,
                    cnpj : this.state.cnpj ,
                    horariofuncionamento : this.state.horariofuncionamento ,
                    localidade : this.state.localidade}
                ),
             headers : {
               "Content-Type" : "application/json",
               'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao")
             }
         })
         .then(response => {
          if (response.status === 200) {
            alert("Clínica Cadastrada!");
            this.Redirecionar();
          } else {
            this.setState({ erromensagem: 'Houve um erro' + response.mensagem })   
          }
         })
         .then(this.ListarClinicas())
         .catch(erro => console.log(erro))
    }


    atualizaEstadoNome(event){
        this.setState({ nome : event.target.value });
    }
    atualizaEstadoRazaoSocial(event){
        this.setState({ razaosocial : event.target.value });
    }
    atualizaEstadoCNPJ(event){
        this.setState({ cnpj : event.target.value });
    }
    atualizaEstadoHorFunc(event){
        this.setState({ horariofuncionamento : event.target.value });
    }
    atualizaEstadoLocalidade(event){
        this.setState({ localidade : event.target.value });
    }

    componentDidMount(){
        this.ListarClinicas();
    }
    Redirecionar(){
      this.props.history.push('/clinicas');
    }

    render(){
        return(
<div id="conteudoPrincipal-cadastro">
<Cabecalho/>
<br/>
            <br/>
  <MDBContainer>
    <MDBRow>
      <MDBCol className="text-center">
      <MDBCard>
        <MDBCardBody>

        <form onSubmit={this.CadastraClinica.bind(this)}>
          <p className="h5 text-center mb-4">Cadastrar Clinica</p>
          <div className="grey-text">
            <MDBInput
              label="Nome"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              value={this.state.nome}
              onChange={this.atualizaEstadoNomeFormulario}
              />
            <MDBInput
              label="Razão Social"
              icon="envelope"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              value={this.state.razaosocial}
              onChange={this.atualizaEstadorazaosocialFormulario}
              />
            <MDBInput
              label="CNPJ"
              icon="exclamation-triangle"
              group
              type="text"
              validate
              maxlength="14"
              minlength="14"
              error="wrong"
              success="right"
              required
              value={this.state.cnpj}
              onChange={this.atualizaEstadocnpjFormulario}
              />
            <MDBInput
              label="Horário Funcionamento"
              icon="lock"
              group
              type="text"
              validate
              required
              value={this.state.horariofuncionamento}
              onChange={this.atualizaEstadohorariofuncionamentoFormulario}
              />
            <MDBInput
              label="Localidade"
              icon="lock"
              group
              type="text"
              validate
              required
              value={this.state.localidade}
              onChange={this.atualizaEstadolocalidadeFormulario}
              />
          </div>
          <div className="text-center">
            <MDBBtn type="submit"color="primary">Cadastrar</MDBBtn>
          </div>
        </form>
              </MDBCardBody>
              </MDBCard>
      </MDBCol>
    </MDBRow>
</MDBContainer>
<br/>
<br/>
<Rodape/>
</div>
        );
    }
}

export default CadastrarClinicas;