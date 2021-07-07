import React, {useState,useEffect} from 'react'
import axios from 'axios'

import '../../assets/css/style.css'


export default function PerfilPacientes(){

    const [ listaConsultas, setConsulta ] = useState( [] )   
    function getConsultas(){
        axios.get('http://localhost:5000/api/Consulta/Minhas', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        
        .then(resposta => {
            if (resposta.status === 200) {
                
                setConsulta(resposta.data)
            }
        })   
        .catch(erro => console.log(erro));
    }       
    
    useEffect( getConsultas, [] ) 

    return(    
        <div>

            <section>
    
                <h2 className="sub-titulo">Consultas Marcadas - Paciente</h2>
    
                <table>
                    
                    <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Médico</th>
                                <th>Especialidade</th>
                                <th>Status</th>  
                                <th>Descrição</th>               
                            </tr> 
                    </thead>

                    <tbody>                   
                        {
                            listaConsultas.map((consulta) => {
                                return(
                                    <tr key={consulta.idConsulta}> 
                                        <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                        <td>{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                        <td>{consulta.horarioConsulta}</td>
                                        <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                        <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade}</td>
                                        <td>{consulta.descricaoAtendimento}</td>
                                        <td>{consulta.idStatusConsultaNavigation.descricaoStatusConsulta}</td>
                                    </tr>
                                )
                            })
                        }                          
                    </tbody>
    
                </table>
    
            </section>
    
        </div>
    
    )
}