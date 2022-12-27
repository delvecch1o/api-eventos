import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import { Table, Container, Label, Thead, Tr, Th, Tbody, Td, TdIcone } from "./styles";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Report() {
    const history = useHistory();
    const [events, setEvents] = useState([]);

    const getReportsEvents = () => {
        axios.get('/api/event/show')
            .then(response => {
                setEvents(response.data.show.show);
                console.log(response.data.show.show);
            });
    }

    useEffect(() => {
        getReportsEvents();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Deseja realmente excluir esse evento ? ")) {
            await axios.delete('/api/event/' + id)
                .then(response => {
                    console.log(response.data.message);
                    alert("Sucesso \n" + response.data.message);

                })
                .catch((error) => {
                    alert("ERRO");

                });

        }
    }


    const navegar = (key) => {
        history.push({
            pathname: key,
        });
    };

    return (
        <>
            <Header />
            <Container>
                <Label>
                    Relatorios de Eventos
                </Label>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>User Id</Th>
                            <Th>Nome Do Evento</Th>
                            <Th>Palestrante</Th>
                            <Th>Data de Inicio</Th>
                            <Th>Data de Termino</Th>
                            <Th>Descrição</Th>
                            <Th>Participantes</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {events.map((report, i) => (
                            <Tr key={i}>
                                <Td>{report.user_id}</Td>
                                <Td>{report.nome}</Td>
                                <Td>{report.palestrante}</Td>
                                <Td>{report.inicio}</Td>
                                <Td>{report.fim}</Td>
                                <Td>{report.descrição}</Td>
                                <Td>{report.numero_de_participantes}</Td>

                                <TdIcone alignCenter width="5%">
                                    <FaEdit onClick={() => navegar("/event/" + report.id)} />
                                </TdIcone>

                                <TdIcone alignCenter width="5%">
                                    <FaTrash onClick={() => handleDelete(report.id)} />
                                </TdIcone>


                            </Tr>
                        ))}
                    </Tbody>

                </Table>

            </Container>


        </>


    )
}

export default Report