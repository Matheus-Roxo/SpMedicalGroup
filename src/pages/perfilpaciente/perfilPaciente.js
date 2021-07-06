import { Component } from 'react'

class PerfilPaciente extends Component{
    constructor (props){
        super(props);
        this.state = {
            listaConsultas : []
        }
    }


    buscarConsultas = () => {
        console.log('Testando')

        fetch('http://localhost:5000/api/Consultas')

        .then(resposta => resposta.json())

        .then(data => this.setState({listaConsultas : data}))

        .catch((erro) => console.log(erro))

    }

    componentDidMount(){
         this.buscarConsultas  ();

    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2> ola você é um paciente </h2>
                        <table>
                            <thread>
                                    <tr>
                                    <th>1</th>
                                    <th>Titulo</th>
                                </tr>
                            </thread>
                                
                               <tbody>
                                   {
                                    this.state.listaConsultas.map( (listaConsulta)  => {
                                        return (
                                            <tr> key={listaConsulta.idConsulta}
                                                <td> key={listaConsulta.idPaciente}</td>
                                                <td> key={listaConsulta.idMédico}</td>
                                            </tr>
                                        )
                                    })
                                   }
                               </tbody>
                        </table>
                    </section>
                </main>
            </div>
        );
    }
}

export default PerfilPaciente;