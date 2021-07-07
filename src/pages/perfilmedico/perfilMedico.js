import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../../assets/css/style.css'

export default function PerfilMedicos() {

    const [listaConsultas, setConsulta] = useState([])
    const [descricaoAtendimento, setDescricaoAtendimento] = useState('')
    const [emModoEdicao, setEmModoEdicao] = useState({
        status: false,
        idLinha: null
    })

    function getConsultas() {
        axios.get('http://localhost:5000/api/Consulta/Minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    setConsulta(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    function emEdicao({ idLinha, descricaoAtual }) {

        setEmModoEdicao({

            status: true,
            idLinha: idLinha
        })

        setDescricaoAtendimento(descricaoAtual)
    }
    function salvarEdicao({ idLinha, novaDescricao }) {

        patchDescricao({ idLinha, novaDescricao })

    }


    function cancelarEdicao() {

        setEmModoEdicao({
            status: false,
            idLinha: null
        })

        setDescricaoAtendimento("")

    }

    function patchDescricao({ idLinha, novaDescricao }) {

        console.log(idLinha, novaDescricao)

        axios.patch('http://localhost:5000/api/consulta/' + idLinha, { descricaoAtendimento: novaDescricao }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 204) {

                    console.log("Descricação atualizada")

                    getConsultas()

                    cancelarEdicao()

                }
            })
            .catch(erro => console.log(erro))

    }

    useEffect(getConsultas, [])


    return (

        <div>
            <section>

                <h2 className="sub-titulo">Consultas Marcadas - Médico</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Paciente</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Médico</th>
                            <th>Especialidade</th>
                            <th>Status</th>
                            <th>Descrição Consulta</th>
                            <th>Edição</th>
                        </tr>

                    </thead>


                    <tbody>
                        {
                            listaConsultas.map((consulta) => {
                                return (
                                    <tr key={consulta.idConsulta}>
                                        <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                        <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                        <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade}</td>
                                        <td>{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                        <td>{consulta.horarioConsulta}</td>
                                        <td>{consulta.idStatusConsultaNavigation.descricaoStatusConsulta}</td>
                                        {
                                            emModoEdicao.status &&
                                                emModoEdicao.idLinha === consulta.idConsulta ?
                                                (
                                                    <input id="input-edit"
                                                        type="text"
                                                        defaultValue={consulta.descricaoAtendimento}
                                                        onChange={(event) => setDescricaoAtendimento(event.target.value)}
                                                    />
                                                ) : (<td>{consulta.descricaoAtendimento}</td>)
                                        }
                                        <td id="editar">

                                            <div id="btn-acoes">
                                                <buttom id="btn-editar"  onClick={() => emEdicao({ idLinha: consulta.idConsulta, descricaoAtual: consulta.descricaoAtendimento })} >mode_edit_outline</buttom>
                                                <buttom id="btn-salvar"  onClick={() => salvarEdicao({ idLinha: consulta.idConsulta, novaDescricao: descricaoAtendimento })} >check</buttom>
                                                <buttom id="btn-cancelar"  onClick={() => cancelarEdicao()} >clear</buttom>
                                            </div>

                                        </td>
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