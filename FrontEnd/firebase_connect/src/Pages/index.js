import React, { Component } from 'react'
import firebase from '../Services/FirebaseConfig'

const collection = "InfoAdcionais";

export default class PgIndex extends Component {

    constructor() {
        super();
        this.state = {
            endereco: '',
            latitude: '',
            longitude: '',
            idade: '',
            especialidade: '',
            doenca: '',
            List: []
        }
    }

    updateState(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    ListDate(event) {
        event.preventDefault();
        firebase.firestore().collection(collection)
            .get()
            .then((date) => {
                let array = [];
                date.forEach((anyDate) => {
                    array.push({
                        idade: anyDate.Idade_paciente,
                        endereco: anyDate.Localizacao,
                        doenca: anyDate.Doenca_paciente,
                        especialidade: anyDate.Especialidade_medico
                    })
                })
                this.setState({ List: array });
            })
    }

    registerPaciente(event) {
        event.preventDefault();
        if (this.state.idade === 0 || this.state.idade === '' || this.state.idade === null) {
            firebase.firestore().collection(collection).add({
                Localizacao: this.state.latitude + ',' + this.state.longitude,
                Idade_paciente: this.state.idade,
                Especialidade_medico: this.state.especialidade,
                Doenca_paciente: this.state.doenca
            }).then((result) => {
                alert("Cadastrado com sucesso");
            }).catch((err) => {
                console.log('tag', err)
            })
        } else {
            firebase.firestore().collection(collection).add({
                Localizacao: this.state.latitude + ',' + this.state.longitude,
                Idade_paciente: this.state.idade,
                Especialidade_medico: this.state.especialidade,
                Doenca_paciente: this.state.doenca
            }).then((result) => {
                alert("Cadastrado com sucesso");
            }).catch((err) => {
                console.log('tag', err)
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.registerPaciente.bind(this)}>
                    <div>
                        <label>Latitude</label>
                        <input type="text" name="latitude" value={this.state.latitude} onChange={this.updateState.bind(this)} required></input>
                    </div>
                    <div>
                        <label>Longitude</label>
                        <input type="text" name="longitude" value={this.state.longitude} onChange={this.updateState.bind(this)} required></input>
                    </div>
                    <div>
                        <label>Idade</label>
                        <input type="text" name="idade" value={this.state.idade} onChange={this.updateState.bind(this)}></input>
                    </div>
                    <div>
                        <label>Especialidade</label>
                        <input type="text" name="especialidade" value={this.state.especialidade} onChange={this.updateState.bind(this)} required></input>
                    </div>
                    <div>
                        <label>Doenca</label>
                        <input type="text" name="doenca" value={this.state.doenca} onChange={this.updateState.bind(this)} required></input>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}
