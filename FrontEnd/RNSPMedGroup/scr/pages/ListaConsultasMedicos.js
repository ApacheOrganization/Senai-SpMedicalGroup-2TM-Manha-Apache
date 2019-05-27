import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, FlatList, ScrollView, AsyncStorage, StatusBar, TextInput, Picker, ActivityIndicator } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import api from '../services/api'

class ListaConsultasMedicos extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require("../assets/img/list.png")}
                style={styles.tabNavigatorIconHome}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            ListaConsultas: [],
            listacomConsultas: [],
            nome: "",
            status: "",
            loading: false
        };

    }

    componentDidMount() {
        this.ListaConsultas();
    }

    ListaConsultas = async () => {
        this.setState({ loading: true })
        const value = await AsyncStorage.getItem("userToken")
        const answer = await api.get("/consultas/listarporusuariologado", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + value
            }
        });

        const dados = answer.data;
        this.setState({ listaConsultas: dados, listacomConsultas: dados });
        this.setState({loading:false})
    }

    FiltraConsultas() {
        let listaFiltrada = this.state.listaConsultas;

        if (this.state.nome !== null && this.state.nome !== "") {
            listaFiltrada = listaFiltrada.filter(x => x.pacienteNome.toLowerCase().includes(this.state.nome.toLowerCase())
            );
        }

        if (this.state.status !== null && this.state.status !== "") {
            listaFiltrada = listaFiltrada.filter(x => x.statusConsulta.includes(this.state.status)
            );
        }
        this.setState({ listacomConsultas: listaFiltrada });
    }

    render() {
        const loader = 
		this.state.loading?
		<ActivityIndicator size="large" color="#FFFFFF" animating={true}/>:
		null;
        return (
            <View style={styles.background}>
                <ScrollView>
                    <StatusBar backgroundColor="#5e9bff" barStyle="light-content" />
                    <View style={styles.espaco}>
                        <View style={styles.cabecalho}>
                            <Text style={styles.titulo}>Consultas</Text>
                            <View style={styles.linhaTitulo} />
                        </View>
                        <View style={styles.pesquisa}>
                            <Collapse>
                                <CollapseHeader>
                                    <View style={styles.textFiltro}>
                                        <Text style={styles.title2}>Filtros</Text>
                                        <Image
                                            source={require("../assets/img/filter.png")}
                                            style={styles.imgfilter}
                                        />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <TextInput
                                        style={styles.input}
                                        value={this.state.nome}
                                        name="nome"
                                        onChangeText={nome => this.setState({ nome }, () => { this.FiltraConsultas() })}
                                        placeholder="Nome Médico"
                                        underlineColorAndroid="#99999"
                                    />
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={this.state.status}
                                        onValueChange={status => this.setState({ status }, () => { this.FiltraConsultas() })}>
                                        <Picker.Item label="Nenhum" value="" />
                                        <Picker.Item label="Agendada" value="Agendada" />
                                        <Picker.Item label="Confirmada" value="Confirmada" />
                                        <Picker.Item label="Adiada" value="Adiada" />
                                        <Picker.Item label="Recusada" value="Recusada" />
                                        <Picker.Item label="Cancelada" value="Cancelada" />
                                        <Picker.Item label="Realizada" value="Realizada" />
                                        <Picker.Item label="Aguardando Confirmação" value="Aguardando Confirmação" />
                                    </Picker>
                                </CollapseBody>
                            </Collapse>
                        </View>
                        <Text style={styles.textrecent}>Todas Consultas</Text>
                        <View style={styles.linha} />
                        <FlatList
                            data={this.state.listacomConsultas}
                            keyExtractor={item => item.idConsulta}
                            renderItem={this.renderizar}
                        />


                    </View>
                </ScrollView>
            </View>
        );
    }

    renderizar = ({ item }) => {
        if (item.statusConsulta === 'Recusada') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_recusada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else if (item.statusConsulta === 'Adiada') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_adiada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else if (item.statusConsulta === 'Agendada') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_agendada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else if (item.statusConsulta === 'Aguardando confirmação do médico') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_aguardo}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else if (item.statusConsulta === 'Cancelada') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_cancelada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else if (item.statusConsulta === 'Confirmada') {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_confirmada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Collapse>
                        <CollapseHeader style={{ width: '100%' }}>
                            <View >
                                <View style={styles.container_text}>
                                    <Text style={styles.title}>
                                        Paciente: {item.pacienteNome}
                                    </Text>
                                    <Text style={styles.status_realizada}>
                                        Status: {item.statusConsulta}
                                    </Text>

                                    <Text style={styles.datacria}>
                                        Data: {item.dataConsulta}
                                    </Text>

                                    <Image
                                        source={require("../assets/img/down.png")}
                                        style={styles.imgarrow}
                                    />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.description}>
                                Obs: {item.observacoes}
                            </Text>
                            <Text style={styles.endereco}>
                                Endereço: {item.endereco}
                            </Text>
                            <Text style={styles.nomeClinica}>
                                Nome da Clínica: {item.nomeClinica}
                            </Text>
                        </CollapseBody>
                    </Collapse>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    textFiltro:{
        width: 390
    },
    endereco: {
        marginLeft: 11,
        marginBottom: 5
    },
    nomeClinica: {
        marginLeft: 11
    },
    imgarrow: {
        height: 13,
        width: 13,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    imgfilter: {
        display: 'flex',
        height: 13,
        width: 13,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'relative',
        justifyContent: 'center',
        marginLeft: 70,
        marginTop: -14
    },
    pesquisa: {
        flex: 1,
        padding: 14,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 4,
    },
    tabNavigatorIconHome: {
        width: 25,
        height: 25,
        tintColor: "#FFFFFF"
    },
    status_adiada: {
        fontStyle: 'italic',
        color: 'yellow'
    },
    status_agendada: {
        fontStyle: 'italic',
        color: 'blue'
    },
    status_aguardo: {
        fontStyle: 'italic'
    },
    status_cancelada: {
        fontStyle: 'italic',
        color: 'red'
    },
    status_confirmada: {
        fontStyle: 'italic',
        color: 'green'
    },
    status_realizada: {
        fontStyle: 'italic',
        color: 'green'
    },
    status_recusada: {
        fontStyle: 'italic',
        color: 'red'
    },
    background: {
        height: "100%",
        backgroundColor: "white"
    },
    espaco: {
        flex: 1,
    },
    textrecent: {
        marginLeft: 17,
        marginTop: 16,
        marginBottom: 8,
        fontSize: 18
    },
    linha: {
        width: 420,
        marginLeft: 16,
        borderBottomColor: "#999999",
        borderBottomWidth: 0.9,
        marginBottom: 8
    },
    titulo: {
        fontSize: 22,
        letterSpacing: 1
    },
    cabecalho: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 16
    },
    linhaCabecalho: {
        flexDirection: "row"
    },

    linhaTitulo: {
        width: 100,
        borderBottomColor: "#999999",
        borderBottomWidth: 0.9,
        marginBottom: 8,
        marginTop: 2
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        paddingLeft:7,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 18,
        color: '#000',
    },
    title2: {
        fontSize: 18,
        color: '#000',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:-3
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
        height: 60,
        width: 382
    },
    description: {
        marginLeft: 11,
        marginBottom: 3
    },
    datacria: {
        fontSize: 14
    },
    input: {
        marginBottom: 10,
        fontSize: 12,
        marginTop:10
    },
    picker: {
        marginLeft: 9,
        marginBottom: 10,
        color: '#999999'
    }
});

export default ListaConsultasMedicos;