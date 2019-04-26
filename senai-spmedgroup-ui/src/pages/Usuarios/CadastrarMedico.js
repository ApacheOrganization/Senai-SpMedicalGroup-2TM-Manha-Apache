import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';

class CadastroMedico extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      IdTipoUsuario: "",
      idClinica: "",
      idEspecialidade: "",
      crm: "",
      erromensagem: ""

    }
    this.atualizaEstadoNomeFormulario = this.atualizaEstadoNome.bind(this);
    this.atualizaEstadoEmailFormulario = this.atualizaEstadoEmail.bind(this);
    this.atualizaEstadoSenhaFormulario = this.atualizaEstadoSenha.bind(this);
    this.atualizaEstadoTelFormulario = this.atualizaEstadotelefone.bind(this);
    this.atualizaEstadoTipoFormulario = this.atualizaEstadoIdTipoUsuario.bind(this);
    this.atualizaEstadoidEspecialidadeFormulario = this.atualizaEstadoidEspecialidade.bind(this);
    this.atualizaEstadoidClinicaFormulario = this.atualizaEstadoidClinica.bind(this);
    this.atualizaEstadocrmFormulario = this.atualizaEstadocrm.bind(this);
  }

  ListarUsuarios() {
    fetch('http://localhost:5000/api/usuarios/pacientes', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ usuarios: data }))
      .catch(erro => this.setState({ erromensagem: 'Houve um erro' + erro }))
  }

  CadastraUsuario(event) {
    event.preventDefault();
    var url = 'http://localhost:5000/api/usuarios/medico';


      fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            telefone: this.state.telefone,
            idClinica: this.state.idClinica,
            idEspecialidade: this.state.idEspecialidade,
            crm: this.state.crm,
            IdTipoUsuario: this.state.IdTipoUsuario
          }
        ),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao")
        }
      })
      .then(response => {
        if (response.status === 200) {
          alert("Médico Cadastrado!");
        } else {
          console.log(response);
          this.setState({ erromensagem: 'Houve um erro' + response.mensagem })   
        }
      })
      .then(this.ListarUsuarios())
      .catch(erro => { 
        this.setState({ erromensagem: 'Houve um erro' + erro }) 
      })
  }


  atualizaEstadoNome(event) {
    this.setState({ nome: event.target.value });
  }
  atualizaEstadoEmail(event) {
    this.setState({ email: event.target.value });
  }
  atualizaEstadoSenha(event) {
    this.setState({ senha: event.target.value });
  }
  atualizaEstadotelefone(event) {
    this.setState({ telefone: event.target.value });
  }
  atualizaEstadoidClinica(event) {
    this.setState({ idClinica: event.target.value });
  }
  atualizaEstadoidEspecialidade(event) {
    this.setState({ idEspecialidade: event.target.value });
  }
  atualizaEstadocrm(event) {
    this.setState({ crm: event.target.value });
  }
  atualizaEstadoIdTipoUsuario(event) {
    this.setState({ IdTipoUsuario: event.target.value });
  }

  componentDidMount() {
    this.ListarUsuarios();
  }

  render() {
    return (

      <div id="conteudoPrincipal-cadastro">
        <Cabecalho />
        <br />
        <br />
        <MDBContainer>
          <MDBRow>
            <MDBCol className="text-center" style={{ height: "60em" }} >
              <MDBCard>
                <MDBCardBody>

                  <form onSubmit={this.CadastraUsuario.bind(this)}>
                    <p className="h5 text-center mb-4">Cadastrar Médico</p>
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
                        label="E-Mail"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        required
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
                        required
                        value={this.state.senha}
                        onChange={this.atualizaEstadoSenhaFormulario}
                      />
                      <MDBInput
                        label="Telefone"
                        icon="lock"
                        group
                        type="tel"
                        required
                        validate
                        value={this.state.telefone}
                        onChange={this.atualizaEstadoTelFormulario}
                      />
                      <MDBInput
                        label="IdClinica"
                        icon="lock"
                        group
                        minLength="1"
                        type="text"
                        validate
                        required
                        value={this.state.idClinica}
                        onChange={this.atualizaEstadoidClinicaFormulario}
                      />

                      <MDBInput
                        label="IdEspecialidade"
                        icon="lock"
                        group
                        type="text"
                        validate
                        required
                        value={this.state.idEspecialidade}
                        onChange={this.atualizaEstadoidEspecialidadeFormulario}
                      />


                      <MDBInput
                        label="Crm"
                        icon="lock"
                        group
                        minLength="1"
                        type="text"
                        validate
                        required
                        value={this.state.crm}
                        onChange={this.atualizaEstadocrmFormulario}
                      />

                      <br />
                      <br />

                    </div>
                    <div className="text-center">
                      <p>{this.state.erromensagem}</p>
                      <MDBBtn type="submit" color="primary">Cadastrar</MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <Rodape />
      </div>
    );
  }
}

export default CadastroMedico;