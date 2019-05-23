import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import API from '../../Services/api'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


class Clinicas extends Component{
    constructor(){
        super();
        this.state = {
            clinicas : []
        }
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

    componentDidMount(){
        this.ListarClinicas();
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
                    <th>Nome</th>
                    <th>Horario Funcionamento</th>
                    <th>Endereço</th>
                    <th>CNPJ</th>
                    <th>Razão Social</th>
                    
                  </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                       this.state.clinicas.map(function(cons){
                           return(
                                <tr key={cons.id}>
                                    <td>{cons.id}</td>
                                    <td>{cons.nome}</td>
                                    <td>{cons.horarioFuncionamento}</td>
                                    <td>{cons.localidade}</td>
                                    <td>{cons.cnpj}</td>
                                    <td>{cons.razaoSocial}</td>
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
export default Clinicas;