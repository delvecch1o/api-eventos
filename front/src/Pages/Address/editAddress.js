import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import { Container, Form, Label, Input, LabelError, Button } from './styles';
import MaskedInput from '../../Components/MaskInput/index';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';



function Editar() {
    
    const history = useHistory();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [complemento, setComplemento] = useState();
    const [bairro, setBairro] = useState();
    const [localidade, setLocalidade] = useState();
    const [uf, setUf] = useState();
    const [numero, setNumero] = useState();
    const [error, setError] = useState();


    const { id } = useParams();

    async function getCep(){
        const response = await axios.get('/api/address/show-details/' + id);
        console.log(response.data.show);

        setCep(response.data.show.cep);
        setLogradouro(response.data.show.logradouro);
        setComplemento(response.data.show.complemento);
        setBairro(response.data.show.bairro);
        setLocalidade(response.data.show.localidade);
        setUf(response.data.show.uf);
        setNumero(response.data.show.numero);
        
        
    }

    useEffect(() => {
        getCep();
    }, []);

    const submitEdit = (e) => {
        e.preventDefault();

        const data = {
            cep : cep,
            numero: numero,
            complemento: complemento,
            id: id,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put('/api/address/update/' + id, data)
                .then(res => {
                    alert("Endereço Atualizado com Sucesso!");
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
                <Label>Cadastre o seu Endereço</Label>
                <Form onSubmit={submitEdit} >

                    <MaskedInput
                        name="cep"
                        mask="99999-999"
                        value={cep}
                        disabled


                    />

                    <Input
                        disabled
                        type='text'
                        placeholder='Logradouro'
                        value={logradouro}

                    />
                    <Input
                        
                        type='text'
                        placeholder='Complemento'
                        value={complemento}
                        onChange={(e) => [setComplemento(e.target.value), setError("")]}

                    />

                    <Input
                        disabled
                        type='text'
                        placeholder='Bairro'
                        value={bairro}

                    />

                    <Input
                        disabled
                        type="text"
                        placeholder="Localidade"
                        value={localidade}

                    />

                    <Input
                        disabled
                        type='text'
                        placeholder='uf'
                        value={uf}

                    />
                    <Input
                        type='text'
                        placeholder='Numero'
                        value={numero}
                        onChange={(e) => [setNumero(e.target.value), setError("")]}

                    />


                    <LabelError>{error}</LabelError>
                    <Button type='submit'>Editar</Button>

                </Form>
            </Container>

        </>
    )

}



export default Editar