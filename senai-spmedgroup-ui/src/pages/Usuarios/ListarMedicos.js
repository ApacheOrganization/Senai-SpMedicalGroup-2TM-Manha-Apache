import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Medicos extends Component{
    constructor(){
        super();
        this.state = {
            medicos : []
        }
    }

    ListarMedicos(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch('http://localhost:5000/api/usuarios/medicos',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ medicos : data }))
            .catch(erro => console.log(erro)) 
    }

    componentDidMount(){
        this.ListarMedicos();
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
                        <th>crm</th>
                        <th>nome</th>
                        <th>email</th>
                        <th>telefone</th>
                        <th>Especialidade</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                       this.state.medicos.map(function(med){
                           return(
                                <tr key={med.id}>
                                    <td>{med.id}</td>
                                    <td>{med.crm}</td>
                                    <td>{med.nome}</td>
                                    <td>{med.email}</td>
                                    <td>{med.telefone}</td>
                                    <td>{med.especialidade}</td>   
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
export default Medicos;