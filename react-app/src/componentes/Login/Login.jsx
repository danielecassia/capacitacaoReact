import './Login.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Login(props) {
    
    const myBtn = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if( email !== '' && password !== '' ){
            myBtn.current.disabled = false;
        }else{
            myBtn.current.disabled = true;
        }
    },
    [email, password]
    )

    return (
        <div className="Login">
            <h1>Login</h1>

            <form action="">
                <input type="text" placeholder="E-mail" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                <input type="password" placeholder="Senha" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                <input type="submit" value="Entrar" ref={ myBtn } disabled="true"/>
            </form>
            <p>Não tem uma conta ainda? <Link to="/cadastro" className="login-submit"><strong>Cadastre-se</strong></Link></p>
            <p>Registrar Imóvel <Link to="/imovelregistrar" className="login-submit"><strong>Imovel</strong></Link></p>

        </div>
    )
}