import React, { Component } from "react";

class Consultas extends Component{
    constructor(){
        super();
        this.state = {
            consultas : []
        }
    }

    ListarConsultas(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
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

    componentDidMount(){
        this.ListarConsultas();
    }

    render(){
        return(
            <div>
                <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>pacienteCPF</th>
                    <th>pacienteRG</th>
                    <th>pacienteEnd</th>
                    <th>nomeMedico</th>
                    <th>dataConsulta</th>
                    <th>observacoes</th>
                    <th>statusConsulta</th>
                    
                  </tr>
                </thead>

                <tbody>
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
                </tbody>
              </table>
            </div>
        );
    }
}
export default Consultas;