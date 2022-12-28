import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import { Table, Container, Label, Thead, Tr, Th, Tbody, Td, TdIcone } from "./styles";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Report() {
    const history = useHistory();
    const [events, setEvents] = useState([]);
    const [address, setAddress] = useState([]);

    const getReportsEvents = () => {
        axios.get('/api/event/show')
            .then(response => {
                setEvents(response.data.show.show);
                console.log(response.data.show.show);
            });
    }

    const getReportsAddress = () => {
        axios.get('/api/address/show')
        .then(response => {
            setAddress(response.data.show.show);
            console.log(response.data.show.show);
        });
    }

    useEffect(() => {
        getReportsEvents();
        getReportsAddress();
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

    async function handleDeleteAddress(id) {
        if (window.confirm("Deseja realmente excluir esse endereço ? ")) {
            await axios.delete('/api/address/' + id)
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

            <Container>
                <Label>
                    Relatorios de Endereços
                </Label>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>User Id</Th>
                            <Th>CEP</Th>
                            <Th>Logradouro</Th>
                            <Th>Complemento</Th>
                            <Th>Bairro</Th>
                            <Th>Localidade</Th>
                            <Th>UF</Th>
                            <Th>Número</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {address.map((report, i) => (
                            <Tr key={i}>
                                <Td>{report.user_id}</Td>
                                <Td>{report.cep}</Td>
                                <Td>{report.logradouro}</Td>
                                <Td>{report.complemento}</Td>
                                <Td>{report.bairro}</Td>
                                <Td>{report.localidade}</Td>
                                <Td>{report.uf}</Td>
                                <Td>{report.numero}</Td>

                                <TdIcone alignCenter width="5%">
                                    <FaEdit onClick={() => navegar("/address/" + report.id)} />
                                </TdIcone>

                                <TdIcone alignCenter width="5%">
                                    <FaTrash onClick={() => handleDeleteAddress(report.id)} />
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