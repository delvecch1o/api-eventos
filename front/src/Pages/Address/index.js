import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/index';
import { Container, Form, Label, Input, LabelError, Button } from './styles';
import MaskedInput from '../../Components/MaskInput/index';
import axios from "axios";



function Address() {

    const [cep, setCep] = useState();
    const [numero, setNumero] = useState();
    const [error, setError] = useState();


    return (
        <>
            <Header />
            <Container>
                <Label>Cadastre o seu Endereço</Label>
                <Form >

                    <MaskedInput
                        name="cep"
                        mask="99999-999"
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChange={(e) => [setCep(e.target.value), setError("")]}


                    />

                    <Input
                        type='text'
                        placeholder='Logradouro'

                    />
                    <Input
                        type='text'
                        placeholder='Complemento'

                    />

                    <Input
                        type='text'
                        placeholder='Bairro'

                    />

                    <Input
                        type="text"
                        placeholder="Localidade"

                    />

                    <Input
                        type='text'
                        placeholder='uf'

                    />
                    <Input
                        type='text'
                        placeholder='Numero'
                        value={numero}
                        onChange={(e) => [setNumero(e.target.value), setError("")]}

                    />


                    <LabelError></LabelError>
                    <Button type='submit'>Cadastrar</Button>

                </Form>
            </Container>

        </>
    )

}

export default Address
