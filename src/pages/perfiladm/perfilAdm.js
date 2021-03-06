import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../assets/css/style.css';

export default function PerfilAdms() {

    const [idPaciente, setIdPaciente] = useState(0)
    const [idMedico, setIdMedico] = useState(0)
    const [idStatusConsulta, setIdStatusConsulta] = useState(0)
    const [dataConsulta, setDataConsulta] = useState(new Date())
    const [horarioConsulta, setHorarioConsulta] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [listaConsultas, setListaConsultas] = useState([])
    const [listaMedicos, setListaMedicos] = useState([])
    const [listaPacientes, setListaPacientes] = useState([])

    function getConsultas() {
        axios.get('http://localhost:5000/api/Consulta', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    function getMedicos() {
        axios.get('http://localhost:5000/api/Medico', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMedicos(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    function getPacientes() {
        axios.get('http://localhost:5000/api/Paciente', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    function postConsultas(event) {

        event.preventDefault()
        setIsLoading(true)
        axios.post('http://localhost:5000/api/Consulta', {

            idPaciente: idPaciente,
            idMedico: idMedico,
            dataConsulta: new Date(dataConsulta),
            horarioConsulta: horarioConsulta,
            idStatusConsulta: idStatusConsulta,
            descricaoAtendimento: ' - - - - N/A - - - - '

        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {

                if (resposta.status === 201) {

                    console.log('A sua consulta foi cadastrada com sucesso')
                    setIsLoading(false)
                    getConsultas();

                }
            })

            .catch(erro => {
                console.log(erro)
                setIsLoading(false)
            })

    };

    useEffect(getConsultas, [])

    useEffect(getMedicos, [])

    useEffect(getPacientes, [])


    return (

        <div className="pg-adm">
            <div className="conteudo-adm">
                <section className="cadastro">
                    <h2 className="sub-titulo">Cadastro de Consultas </h2>
                    <form id="cadastro-consulta" onSubmit={postConsultas}>

                        <div className="campos">

                            <p>Paciente</p>

                            <select>
                                <option value="0">Paciente</option>

                                {
                                    listaPacientes.map(paciente => {
                                        return (
                                            <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                                {paciente.nomePaciente}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="campos">

                            <p>M??dico</p>

                            <select
                                name="idMedico"
                                value={idMedico}
                                onChange={(event) => setIdMedico(event.target.value)}
                            >
                                <option value="0">M??dico</option>

                                {
                                    listaMedicos.map(medico => {
                                        return (
                                            <option
                                                key={medico.idMedico}
                                                value={medico.idMedico}>
                                                {medico.nomeMedico} - {medico.idEspecialidadeNavigation.descricaoEspecialidade}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                        </div>

                        <div className="campos">

                            <p>Data</p>

                            <input

                                type="date"
                                name="dataConsulta"
                                value={dataConsulta}
                                onChange={(event) => setDataConsulta(event.target.value)}
                                placeholder="Data Consulta"

                            />

                        </div>

                        <div className="campos">

                            <p>Hor??rio</p>

                            <input

                                type="time"
                                name="horarioConsulta"
                                value={horarioConsulta}
                                onChange={(event) => setHorarioConsulta(event.target.value)}
                                placeholder="Hor??rio"

                            />

                        </div>

                        <div className="campos">

                            <p>Status</p>

                            <select
                                name="idStatusConsulta"
                                value={idStatusConsulta}
                                onChange={(event) => setIdStatusConsulta(event.target.value)}

                            >
                                <option value="1">Agendado</option>
                                <option value="2">Cancelado</option>
                                <option value="3">Realizado</option>

                            </select>

                        </div>

                        <div id="bot??o-cadastrar">
                            {
                                isLoading === true &&
                                <button id="bot??o-adm" type="submit" disabled>
                                    Loading...
                                </button>
                            }



                            {
                                isLoading === false &&
                                <button id="bot??o-salvar"  type="submit">
                                    check
                                </button>
                            }
                        </div>




                    </form>

                </section>

                <hr />

                <section id="historico-consulta">

                    <h2 className="sub-titulo">Todas as Consultas - ADM</h2>

                    <table id="table-adm">

                        <thead>

                            <tr>
                                <th>Paciente</th>
                                <th>Data</th>
                                <th>Hor??rio</th>
                                <th>M??dico</th>
                                <th>Especialidade</th>
                                <th>Status</th>
                                <th>Descri????o</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                listaConsultas.map((consulta) => {
                                    return (
                                        <tr key={consulta.idConsulta}>
                                            <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                            <td>{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                            <td>{consulta.horarioConsulta}</td>
                                            <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                            <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade}</td>
                                            <td>{consulta.idStatusConsultaNavigation.descricaoStatusConsulta}</td>
                                            <td>{consulta.descricaoAtendimento}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </section>
            </div>
        </div>

    )
}