import React, {Component} from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../services/auth';
import '../../assets/css/style.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading : false
        }
    };

    efetuaLogin = (event) => {

        event.preventDefault();
        this.setState({ erroMensagem : '', isLoading : true });
        axios.post('http://localhost:5000/api/Login', {
            email : this.state.email,
            senha : this.state.senha
        })

        .then(resposta => {

            if (resposta.status === 200) {

                localStorage.setItem('usuario-login', resposta.data.token);
                console.log('Meu token é: ' + resposta.data.token);
                this.setState({ isLoading: false })
                let base64 = localStorage.getItem('usuario-login').split('.')[1];
                console.log(base64);
                console.log(window.atob(base64));
                console.log(JSON.parse(window.atob(base64)));
                console.log(parseJwt().role);

                switch (parseJwt().role) {

                    case '1':
                        this.props.history.push('/perfiladm')
                        break;

                    case '2':
                        this.props.history.push('/perfilpaciente')
                        break;

                    case '3':
                        this.props.history.push('/perfilmedico')
                        break;

                    default:
                        this.props.history.push('/')
                        break;

                }

                console.log('estou logado: ' + usuarioAutenticado());
            }
        })

        .catch(() => {

            this.setState({ erroMensagem: 'E-mail ou senha inválidos! Tente novamente.', isLoading: false });
        })
}

        atualizaStateCampo = (campo) => {
            this.setState({ [campo.target.name]: campo.target.value })
        };

    render(){
        return(
        <div id="container-login">
            <section className="card-login">
                <form onSubmit={this.efetuaLogin}>
                    <div className="input-login">
                        <input
                            required
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.atualizaStateCampo}
                            placeholder="Email" />
                    </div>

                    <div className="input-login">
                        <input
                            required
                            type="password"
                            name="senha"
                            value={this.state.senha}
                            onChange={this.atualizaStateCampo}
                            placeholder="Senha" />
                    </div>

                    {
                        this.state.isLoading === false &&
                        <div className="justify-center">
                            <input id="btn-login"
                            required
                            type="submit"
                            name="Entrar"
                            ></input>
                        </div>
                    }
                </form>
            </section>
        </div>

    )
}

};

export default Login;