import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard, MDBCardBody } from 'mdbreact';
import Cabecalho from '../../Components/NavBar';
import { Link } from "react-router-dom";
import Rodape from '../../Components/Footer';

class CadastroConsulta extends Component{

    constructor(){

        super();
        this.state = {
            consultas : [],
            idpaciente : "",
            idmedico : "",
            dataconsulta : "",
            observacoes : "",
            idstatus : "",
            Pacientes : [],
            Medicos : [],
            Status : [],
            erromensagem : ""
        }
        
        this.atualizaEstadoidpacienteFormulario = this.atualizaEstadoidpaciente.bind(this);
        this.atualizaEstadoidmedicoFormulario = this.atualizaEstadoidmedico.bind(this);
        this.atualizaEstadodataconsultaFormulario = this.atualizaEstadodataconsulta.bind(this);
        this.atualizaEstadoobservacoesFormulario = this.atualizaEstadoobservacoes.bind(this);
        this.atualizaEstadoidstatusFormulario = this.atualizaEstadoidstatus.bind(this);
    }

    ListarConsultas(){
        fetch('http://localhost:5000/api/consultas',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ consultas : data }))
            .catch(erro => console.log(erro)) 
    }

    ListarPacientes(){
      fetch('http://localhost:5000/api/usuarios/pacientes',{
          method: 'GET',
          headers : {
            "Content-Type" : "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
          }
      })
          .then(resposta => resposta.json())
          .then(data => this.setState({ Pacientes : data }))
          .catch(erro => console.log(erro)) 
  }
  ListarMedicos(){
    fetch('http://localhost:5000/api/usuarios/medicos',{
        method: 'GET',
        headers : {
          "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
        }
    })
        .then(resposta => resposta.json())
        .then(data => this.setState({ Medicos : data }))
        .catch(erro => console.log(erro)) 
}
    
    CadastraConsulta(event){   
        event.preventDefault();
        
        var url = 'http://localhost:5000/api/consultas';
        
         fetch(url,{
             method : 'POST',
             body : JSON.stringify(
                { idpaciente : this.state.idpaciente ,
                    idmedico : this.state.idmedico ,
                    dataconsulta : this.state.dataconsulta ,
                    observacoes : this.state.observacoes ,
                    idstatus : this.state.idstatus  }
                ),
             headers : {
               "Content-Type" : "application/json",
               'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao")
             }
         })
         .then(response => {
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds

            this.setState({date:
              year + '-' + month + '-' + date + 'T' + hours + ':' + min + ':' + sec,});
              alert(date);
          if(this.state.dataconsulta >= this.state.date){
            if (response.status === 200) {
              alert("Consulta Cadastrada!");
              this.Redirecionar();
            } else {
              this.setState({ erromensagem: 'Houve um erro' + response.mensagem })   
            }
          }else{
            alert("Insira uma data superior a de hoje!")
          }
         })
         .then(this.ListarConsultas())
         .catch(erro => console.log(erro))
    }

    atualizaEstadoidpaciente(event){
        this.setState({ idpaciente : event.target.value });
    }

    atualizaEstadoidmedico(event){
        this.setState({ idmedico : event.target.value });
    }

    atualizaEstadodataconsulta(event){
        this.setState({ dataconsulta : event.target.value });
    }

    atualizaEstadoobservacoes(event){
        this.setState({ observacoes : event.target.value });
    }

    atualizaEstadoidstatus(event){
        this.setState({ idstatus : event.target.value });
    }

    componentDidMount(){
        this.ListarConsultas();
        this.ListarPacientes();
        this.ListarMedicos();
    }

    Redirecionar(){
      this.props.history.push('/consultas');
    }

    render(){
        return(
            <div id="conteudoPrincipal-cadastro">
            <Cabecalho/>
            <br/>
            <br/>
              <MDBContainer style={{marginLeft:"40em"}}>
                <MDBRow>
                  <MDBCol md="6">
                  <MDBCard>
                  <MDBCardBody>
                    <form onSubmit={this.CadastraConsulta.bind(this)}>
                      <p className="h5 text-center mb-4">Cadastrar Consulta</p>
                      <div className="grey-text">
                      <select value={this.state.idpaciente} style={{width:"29em", marginLeft:"2em"}} onChange={this.atualizaEstadoidpacienteFormulario} className="browser-default custom-select">
                        <option>Paciente</option>
                        {
                          this.state.Pacientes.map((element) =>{
                            return <option key={element.id} value={element.id}>
                            {element.nome}
                            </option>
                          })
                        }
                      </select>
                      <br/>
                      <br/>
                      <br/>
                      <select value={this.state.idmedico} style={{width:"29em", marginLeft:"2em"}} onChange={this.atualizaEstadoidmedicoFormulario} className="browser-default custom-select">
                        <option>Medico</option>
                        {
                          this.state.Medicos.map((element) =>{
                            return <option key={element.id} value={element.id}>
                            {element.nome}
                            </option>
                          })
                        }
                      </select>
                      <br/>
                      <br/>
                        <MDBInput
                          label=""
                          icon="exclamation-triangle"
                          group
                          type="datetime-local"
                          validate
                          error="wrong"
                          success="right"
                          required
                          value={this.state.dataconsulta}
                          onChange={this.atualizaEstadodataconsultaFormulario}
                          />
                        <MDBInput
                          label="Observações"
                          icon="lock"
                          group
                          type="text"
                          validate
                          required
                          value={this.state.observacoes}
                          onChange={this.atualizaEstadoobservacoesFormulario}
                          />

                      <select value={this.state.idstatus} style={{width:"29em", marginLeft:"2em"}} onChange={this.atualizaEstadoidstatusFormulario} className="browser-default custom-select">
                        <option>Status Consulta</option>
                        <option value="1">Confirmada</option>
                        <option value="2">Recusada</option>
                        <option value="3">Adiada</option>
                        <option value="4">Aguardando confirmação do médico</option>
                        <option value="5">Realizada</option>
                        <option value="6">Cancelada</option>
                        <option value="7">Agendada</option>
                      </select>
                      <br/>
                      <br/> 
                        
                      </div>
                      <div className="text-center">
                      <p>{this.state.erromensagem}</p>
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

export default CadastroConsulta;