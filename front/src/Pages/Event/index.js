import React, { useState } from "react";
import Header from '../../Components/Header/index';
import axios from 'axios';
import { Container, Form, Label, Input, LabelError, Button } from './styles';


function Event() {

    const [nome, setNome] = useState();
    const [palestrante, setPalestrante] = useState();
    const [inicio, setInicio] = useState();
    const [fim, setFim] = useState();
    const [descricao, setDescricao] = useState();
    const [participantes, setParticipantes] = useState();
    const [error, setError] = useState();

    const submitEvent = (e) => {
        e.preventDefault();
        if (!nome | !palestrante | !inicio | !fim | !descricao | !participantes) {
            setError("Preencha todos os campos");
            return;
        }

        const data = {
            nome: nome,
            palestrante: palestrante,
            inicio: inicio,
            fim: fim,
            descrição: descricao,
            numero_de_participantes: participantes
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/event', data)
                .then(res => {

                    alert("Evento criado com Sucesso!")

                })
                .catch((error) => {
                    alert("Erro \n" + error.response.data.errors.fim);


                });
        });


    }


    return (
        <>
            <Header />
            <Container>
                <Label>Crie um Evento</Label>
                <Form onSubmit={submitEvent} >
                    <Input
                        type='text'
                        placeholder='Nome do Evento'
                        value={nome}
                        onChange={(e) => [setNome(e.target.value), setError("")]}

                    />
                    <Input
                        type='text'
                        placeholder='Palestrante'
                        value={palestrante}
                        onChange={(e) => [setPalestrante(e.target.value), setError("")]}

                    />

                    <Input
                        type='date'
                        value={inicio}
                        onChange={(e) => [setInicio(e.target.value), setError("")]}


                    />

                    <Input
                        type="date"
                        value={fim}
                        onChange={(e) => [setFim(e.target.value), setError("")]}



                    />
                    <Input
                        type='text'
                        placeholder='Descrição'
                        value={descricao}
                        onChange={(e) => [setDescricao(e.target.value), setError("")]}

                    />
                    <Input
                        type='number'
                        placeholder='Numero de Participantes'
                        value={participantes}
                        onChange={(e) => [setParticipantes(e.target.value), setError("")]}

                    />
                    <LabelError>{error}</LabelError>
                    <Button type='submit'>Criar Evento</Button>

                </Form>
            </Container>

        </>

    )
}

export default Event