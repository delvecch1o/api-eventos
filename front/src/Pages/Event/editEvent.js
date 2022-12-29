import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import axios from 'axios';
import { Container, Form, Label, Input, LabelError, Button } from './styles';
import { useHistory, useParams } from 'react-router-dom';


function Edit() {
    const history = useHistory();
    const [nome, setNome] = useState();
    const [palestrante, setPalestrante] = useState();
    const [inicio, setInicio] = useState();
    const [fim, setFim] = useState();
    const [descricao, setDescricao] = useState();
    const [participantes, setParticipantes] = useState();
    const [error, setError] = useState();

    const { id } = useParams();

    async function getEvent(){
        const response = await axios.get('/api/event/show-details/' + id);
        console.log(response.data.show);
        
        setNome(response.data.show.nome);
        setPalestrante(response.data.show.palestrante);
        setInicio(response.data.show.inicio);
        setFim(response.data.show.fim);
        setDescricao(response.data.show.descrição);
        setParticipantes(response.data.show.numero_de_participantes);
        
    }

    useEffect(() => {
        getEvent();
    }, []);

    const submitEdit = (e) => {
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
            numero_de_participantes: participantes,
            id: id,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put('/api/event/update/' + id, data)
                .then(res => {
                    alert("Evento Atualizado com Sucesso!");
                    history.push('/');


                })
                .catch((error) => {
                    alert("Erro \n");


                });
        });


    }


    return (
        <>
            <Header />
            <Container>
                <Label>Editar Evento</Label>
                <Form onSubmit={submitEdit} >
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
                    <Button type='submit'>Editar</Button>

                </Form>
            </Container>

        </>

    )
}

export default Edit