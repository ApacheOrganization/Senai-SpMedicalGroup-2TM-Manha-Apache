import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import jwt from "jwt-decode";
import api from '../services/api'

class TelaInicial extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', senha: '' };
    }

    componentDidMount() {
        (async () => {
            let tokenvalidado = await AsyncStorage.getItem("userToken")
            if (tokenvalidado !== null) {
                if (jwt(tokenvalidado).permissao == 'Administrador') {
                    this.props.navigation.navigate('Home - Administrador')
                }
                if (jwt(tokenvalidado).permissao == 'Paciente') {
                    this.props.navigation.navigate('Home - Paciente')
                } if (jwt(tokenvalidado).permissao == 'Médico') {
                    this.props.navigation.navigate('Home - Medico')
                }
            }
            else {
                this.props.navigation.navigate('Tela inicial');
            }
        })()
    }

    login = async () => {
        if (this.state.email == '') {
            Alert.alert(
                "Erro",
                "Informe um email",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {

            if (this.state.senha == '') {
                Alert.alert(
                    "Erro",
                    "Informe sua senha",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            } else {
                const resposta = await api.post("/Login", {
                    email: this.state.email,
                    senha: this.state.senha
                })
                    .catch(error => {
                        if (error.response.status == 404) {
                            Alert.alert(
                                "Erro",
                                "Email ou senha não existem",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        }
                    })
                const token = resposta.data.token;
                await AsyncStorage.setItem("userToken", token);
                if (token.length > 10) {
                    if (jwt(token).permissao == 'Administrador') {
                        this.props.navigation.navigate('Home - Administrador')
                    }
                    if (jwt(token).permissao == 'Paciente') {
                        this.props.navigation.navigate('Home - Paciente')
                    } if (jwt(token).permissao == 'Médico') {
                        this.props.navigation.navigate('Home - Medico')
                    }
                } else {
                    Alert.alert(
                        "Erro",
                        "ASDASDASDASDl",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }
            }
        }
    };

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#5e9bff" barStyle="light-content" />
                <View style={styles.conteudo}>

                    <Image
                        source={require("../../scr/assets/img/logo.png")}
                        style={styles.imageLogin}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#5e9bff"
                        underlineColorAndroid="#5e9bff"
                        defaultValue="fernandoguerra@gmail.com"
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Senha"
                        placeholderTextColor="#5e9bff"
                        password="true"
                        defaultValue="12345"
                        underlineColorAndroid="#5e9bff"
                        onChangeText={senha => this.setState({ senha })}
                    />
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={this.login}
                    >
                        <Text style={styles.textoBotao}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteudo: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    imageLogin: {
        height:80,
        width:75
    },
    botao: {
        height: 38,
        elevation: 4,
        width: 240,
        borderRadius: 30,
        backgroundColor: "#81DF99",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    textoBotao: {
        fontSize: 12,
        fontFamily: "OpenSans-Regular",
        color: "white",
        letterSpacing: 4
    },
    input: {
        width: 240,
        marginBottom: 10,
        fontSize: 12,
        color: '#5e9bff'
    }
});

export default TelaInicial;