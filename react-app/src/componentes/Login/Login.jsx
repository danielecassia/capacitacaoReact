import './Login.css'
import { Link } from 'react-router-dom'


export default function Login(props) {
    return (
        <div className="Login">
            <h1>Login</h1>

            <form action="">
                <input type="text" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <input type="submit" value="Entrar" />
            </form>
            <p>Não tem uma conta ainda? <Link to="/cadastro" className="login-submit"><strong>Cadastre-se</strong></Link></p>
        </div>
    )
}