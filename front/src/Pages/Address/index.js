import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import { Container, Form, Label, Input, LabelError, Button, Btn } from './styles';
import MaskedInput from '../../Components/MaskInput/index';
import axios from "axios";
import { useParams, Link, useHistory } from 'react-router-dom';


function Address() {
    
    const history = useHistory();
    const [cepInput, setCepInput] = useState();
    const [logradouro, setLogradouro] = useState();
    const [complemento, setComplemento] = useState();
    const [bairro, setBairro] = useState();
    const [localidade, setLocalidade] = useState();
    const [uf, setUf] = useState();
    const [numero, setNumero] = useState();
    const [error, setError] = useState();

    const { cep } = useParams();

    async function getCep() {
        const response = await axios.get('/api/cep/' + cep);
        console.log(response.data.endereco);
        setCepInput(response.data.endereco.cep);
        setLogradouro(response.data.endereco.logradouro);
        setComplemento(response.data.endereco.complemento);
        setBairro(response.data.endereco.bairro);
        setLocalidade(response.data.endereco.localidade);
        setUf(response.data.endereco.uf);

    }

    useEffect(() => {
        getCep();
    }, []);


    const submitAddress = (e) => {
        e.preventDefault();

        const data = {
            cep: cepInput,
            numero: numero,

        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/address', data)
                .then(res => {
                    alert("Endereço Cadastrado com Sucesso!");
                    history.push('/new-address');

                })
                .catch((error) => {
                    alert("Erro \n" + error.response.data.message);
                    history.push('/new-address');
                });
        });


    }

    return (
        <>
            <Header />
            <Container>
                <Label>Cadastre o seu Endereço</Label>
                <Form onSubmit={submitAddress}>

                    <MaskedInput
                        name="cep"
                        mask="99999-999"
                        placeholder="Digite seu CEP"
                        value={cepInput}
                        onChange={(e) => [setCepInput(e.target.value), setError("")]}  


                    />
                    <Link to={`/new-address/${cepInput}`}>
                        <Btn>Pesquisar</Btn>
                    </Link>


                    <Input
                        disabled
                        type='text'
                        placeholder='Logradouro'
                        value={logradouro}

                    />
                    <Input
                        disabled
                        type='text'
                        placeholder='Complemento'
                        value={complemento}

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
                    <Button type='submit'>Cadastrar</Button>

                </Form>
            </Container>

        </>
    )

}

export default Address
