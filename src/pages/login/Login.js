import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : ''
        }
    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <p>Bem vindo(a)!</p> <br>Faça lobgin para acessar a
                         sua conta.</br>

                         <form onSubmit={this.efetuaLogin}>
                             <input
                             type="text"
                             name="email"

                             value={this.state.email}
                             onChange={this.atualizaStateCampo}
                             placeholder="username"
                             />

                            <input
                             type="password"
                             name="senha"

                             value={this.state.senha}
                             onChange={this.atualizaStateCampo}
                             placeholder="paassword"
                             />

                             <button type='submit'>
                                 Login
                             </button>
                         </form>
                    </section>
                </main>
            </div>
        )
    }
}

export default Login;