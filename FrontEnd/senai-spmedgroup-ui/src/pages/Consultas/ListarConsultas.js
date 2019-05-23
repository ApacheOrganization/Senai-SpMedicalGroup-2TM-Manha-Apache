import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import API from '../../Services/api'

class Consultas extends Component{
    constructor(){
        super();
        this.state = {
            consultas : []
        }
    }

    ListarConsultas(){
        fetch(API + '/consultas',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ consultas : data }))
            .catch(erro => console.log(erro)) 
    }

    componentDidMount(){
        this.ListarConsultas();
    }

    render(){
        return(
            <div>
                <Cabecalho/>
                <br/>
                <br/>
              <MDBTable >
                <MDBTableHead color="primary-color" textWhite>
                <tr>
                    <th>#</th>
                    <th>CPF Paciente</th>
                    <th>RG Paciente</th>
                    <th>Endereço Paciente</th>
                    <th>Nome Médico</th>
                    <th>Data</th>
                    <th>Observações</th>
                    <th>Status</th>
                    
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {
                       this.state.consultas.map(function(cons){
                           return(
                                <tr key={cons.idConsulta}>
                                    <td>{cons.idConsulta}</td>
                                    <td>{cons.pacienteCPF}</td>
                                    <td>{cons.pacienteRG}</td>
                                    <td>{cons.pacienteEnd}</td>
                                    <td>{cons.nomeMedico}</td>
                                    <td>{cons.dataConsulta}</td>
                                    <td>{cons.observacoes}</td>
                                    <td>{cons.statusConsulta}</td>
                                </tr>
                           );
                       }) 
                    }
                </MDBTableBody>
              </MDBTable>
              <br/>
              <br/>
              <Rodape/>
            </div>
        );
    }
}
export default Consultas;