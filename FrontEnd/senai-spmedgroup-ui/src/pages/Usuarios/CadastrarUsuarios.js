import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import API from '../../Services/api';

class CadastroUsuarios extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      nome: "",
      email: "",
      senha: "",
      datanascimento: "",
      telefone: "",
      CPF: "",
      endereco: "",
      RG: "",
      IdTipoUsuario: "",
      erromensagem: ""

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

  ListarUsuarios() {
    fetch(API + '/usuarios/pacientes', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ usuarios: data }))
      .catch(erro => console.log(erro))
  }

  CadastraUsuario(event) {
    event.preventDefault();

    var url = API + '/usuarios'
    if (this.state.IdTipoUsuario === "1") {
      url = API + '/usuarios/administrador'
    } else if (this.state.IdTipoUsuario === "2") {
      url = API + '/usuarios/medico'
    } else {
      url = API + '/usuarios/paciente'
    }

    if (this.state.IdTipoUsuario === 0 || this.state.IdTipoUsuario === '' || this.state.IdTipoUsuario === null) {
      alert("Informe um tipo de usuário")
    } else {



      fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            datanascimento: this.state.datanascimento,
            telefone: this.state.telefone,
            CPF: this.state.CPF,
            endereco: this.state.endereco,
            RG: this.state.RG,
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
            alert("Usuário Cadastrado!");
          } else {
            this.setState({ erromensagem: 'Houve um erro' + response.mensagem })
          }

        })
        .then(this.ListarUsuarios())
        .catch(erro => console.log(erro))
    }
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
  atualizaEstadodatanascimento(event) {
    this.setState({ datanascimento: event.target.value });
  }
  atualizaEstadotelefone(event) {
    this.setState({ telefone: event.target.value });
  }
  atualizaEstadoCPF(event) {
    this.setState({ CPF: event.target.value });
  }
  atualizaEstadoendereco(event) {
    this.setState({ endereco: event.target.value });
  }
  atualizaEstadoRG(event) {
    this.setState({ RG: event.target.value });
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
                    <p className="h5 text-center mb-4">Cadastre um usuario</p>
                    <div className="grey-text">
                      <select value={this.state.IdTipoUsuario} style={{ width: "15em" }} onChange={this.atualizaEstadoTipoFormulario} className="browser-default custom-select" required>
                        <option>Tipo de Usuario</option>
                        <option value="1">Administrador</option>
                        <option value="3">Paciente</option>
                      </select>
                      <br />
                      <br />

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
                        label="Data de Nascimento"
                        icon="lock"
                        group
                        type="date"
                        validate
                        required
                        value={this.state.datanascimento}
                        onChange={this.atualizaEstadoDataFormulario}
                      />
                      <MDBInput
                        label="Telefone"
                        icon="lock"
                        group
                        type="tel"
                        validate
                        required
                        value={this.state.telefone}
                        onChange={this.atualizaEstadoTelFormulario}
                      />
                      <MDBInput
                        label="CPF"
                        icon="lock"
                        group
                        minLength="11"
                        maxLength="11"
                        type="text"
                        validate
                        required
                        value={this.state.CPF}
                        onChange={this.atualizaEstadoCPFFormulario}
                      />
                      <MDBInput
                        label="Endereço"
                        icon="lock"
                        group
                        type="text"
                        validate
                        required
                        value={this.state.endereco}
                        onChange={this.atualizaEstadoEndFormulario}
                      />
                      <MDBInput
                        label="RG"
                        icon="lock"
                        group
                        minLength="9"
                        maxLength="9"
                        type="text"
                        validate
                        required
                        value={this.state.RG}
                        onChange={this.atualizaEstadoRGFormulario}
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

export default CadastroUsuarios;