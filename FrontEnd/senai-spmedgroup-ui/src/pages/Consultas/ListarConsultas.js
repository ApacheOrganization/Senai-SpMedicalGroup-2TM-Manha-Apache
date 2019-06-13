import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBCardHeader } from 'mdbreact';
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
                <Cabecalho />
                <h1 className='text-center' style={{marginTop:'2%'}}><span style={{color:'#42f498'}}>T</span><span style={{color:'#5fbfe1'}}>odas</span> <span style={{color:'#42f498'}}>C</span><span style={{color:'#5fbfe1'}}>onsultas</span></h1>
                <MDBContainer style={{marginTop:'3%'}}>
                    <MDBRow className="mb-32">

                        {
                            this.state.consultas.map(function(cons) {
                                return (
                                    <MDBCol sm="6" style={{marginBottom:"2.9%" }}>
                                        <MDBCard>
                                        <MDBCardHeader color="primary-color" tag="h3">
                                                    Consulta {cons.idConsulta}
                                                </MDBCardHeader>
                                            <MDBCardBody >
                                                <div style={{ marginLeft: "3%", marginBottom:"5%" }}>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>CPF do Paciente: </span>{cons.pacienteCPF}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>RG do Paciente: </span>{cons.pacienteRG}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Endereço do Paciente: </span>{cons.pacienteEnd}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Nome do Médico: </span>{cons.nomeMedico}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Data da consulta: </span>{cons.dataConsulta}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Observações: </span>{cons.observacoes}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Status: </span>{cons.statusConsulta}</MDBCardText>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                );
                            })
                        }

                    </MDBRow>
                </MDBContainer>
                <Rodape />
            </div>
            
        );
    }
}
export default Consultas;