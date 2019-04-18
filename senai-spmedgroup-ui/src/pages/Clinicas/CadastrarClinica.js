import React, { Component } from "react";

class CadastrarClinicas extends Component{
    constructor(){
        super();
        this.state = {
            clinicas : [],
            nome : "",
            razaosocial : "",
            cnpj : "",
            horariofuncionamento : "",
            localidade : ""

        }
        this.atualizaEstadoNomeFormulario = this.atualizaEstadoNome.bind(this);
        this.atualizaEstadorazaosocialFormulario = this.atualizaEstadoRazaoSocial.bind(this);
        this.atualizaEstadocnpjFormulario = this.atualizaEstadoCNPJ.bind(this);
        this.atualizaEstadohorariofuncionamentoFormulario = this.atualizaEstadoHorFunc.bind(this);
        this.atualizaEstadolocalidadeFormulario = this.atualizaEstadoLocalidade.bind(this);
    }

    ListarClinicas(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch('http://localhost:5000/api/clinicas',{
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
        
        var url = 'http://localhost:5000/api/clinicas'
         fetch(url,{
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
         .then(response => response)
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

    render(){
        return(
            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Clinicas
              </h2>
              <form onSubmit={this.CadastraClinica.bind(this)}>
                <div className="container">
                  <input
                    type="text"
                    value={this.state.nome}
                    onChange={this.atualizaEstadoNomeFormulario}
                    id="nomeUsuario"
                    placeholder="Nome Usuário"
                  />
                  <input
                    type="text"
                    value={this.state.razaosocial}
                    onChange={this.atualizaEstadoRazaoSocial}
                    id="emailUsuario"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    value={this.state.cnpj}
                    onChange={this.atualizaEstadoCNPJ}
                    id="senhaUsuario"
                    placeholder="Senha"
                  />
                  <input
                    type="text"
                    value={this.state.horariofuncionamento}
                    onChange={this.atualizaEstadoHorFunc}
                    id="dataNascimentoUsuario"
                    placeholder="Data Nascimento"
                  />
                  <input
                    type="text"
                    value={this.state.localidade}
                    onChange={this.atualizaEstadoLocalidade}
                    id="relefoneUsuario"
                    placeholder="Telefone"
                  />
                  <button type="submit" className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                  </button>
                  <button onClick={this.CadastraClinica.bind(this)} className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
        );
    }
}

export default CadastrarClinicas;