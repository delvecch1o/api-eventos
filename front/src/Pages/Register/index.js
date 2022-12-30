import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Form, Label, Input, LabelError, Button, LabelLogin, Strong } from './styles';
import MaskedInput from '../../Components/MaskInput/index';

function Register() {

    const history = useHistory();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhaConfirme, setSenhaConfirme] = useState();
    const [cpf, setCpf] = useState();
    const [função, setFunção] = useState();
    const [error, setError] = useState();

    const submitRegister = (e) => {
        e.preventDefault();
        if (!nome | !email | !senha | !senhaConfirme | !cpf | !função) {
            setError("Preencha todos os campos");
            return;
        } else if (senha !== senhaConfirme) {
            setError("As senhas não são iguais");
            return;
        } else if (senha.length < 8) {
            setError("Senha muito curta, minimo 8 caracteres");
            return;
        }

        const data = {
            name: nome,
            email: email,
            password: senha,
            password_confirmation: senhaConfirme,
            cpf: cpf,
            role: função,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data)
                .then(res => {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_nome', res.data.username);
                    alert("Usuario Cadastrado Com Sucesso!")
                    history.push('/');

                })
                .catch((error) => {
                 
                 alert("Erro \n " + error.response.data.errors.cpf);
                 alert("Erro \n " + error.response.data.errors.email);
                
                });
        });

    }


    return (
        <Container>
            <Label>Faça o seu Cadastro</Label>
            <Form onSubmit={submitRegister} >
                <Input
                    type='text'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type='email'
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />

                <Input
                    type='password'
                    placeholder='Digite sua senha, minimo 8 '
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />

                <Input
                    type="password"
                    placeholder="Confirme sua Senha"
                    value={senhaConfirme}
                    onChange={(e) => [setSenhaConfirme(e.target.value), setError("")]}
                />

                <MaskedInput
                    name="cpf"
                    mask="999.999.999-99"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChange={(e) => [setCpf(e.target.value), setError("")]}


                />

                <Input
                    type='text'
                    placeholder='Digite sua Função'
                    value={função}
                    onChange={(e) => [setFunção(e.target.value), setError("")]}
                />


                <LabelError>{error}</LabelError>
                <Button type='submit'>Registre-se</Button>
                <LabelLogin>
                    Já possui uma conta?
                    <Strong>
                        <Link to="/login">&nbsp;Entre</Link>
                    </Strong>
                </LabelLogin>
            </Form>
        </Container>
    )

}

export default Register