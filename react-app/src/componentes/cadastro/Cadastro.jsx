import './Cadastro.css';
import FormCadastro from './formCadastro/formCadastro';
import {Link} from 'react-router-dom'


export default function Login() {
  return(
    <div className="Cadastro">
      <div className="conteudo">
      </div>
      <div className="left-side">

        <Link to="/login">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.5533 29.58H19.7667L32.78 16.5667C33.82 15.5267 33.82 13.82 32.78 12.78C31.74 11.74 30.06 11.74 29.02 12.78L11.4467 30.3533C10.4067 31.3933 10.4067 33.0733 11.4467 34.1133L29.02 51.6867C30.06 52.7267 31.74 52.7267 32.78 51.6867C33.82 50.6467 33.82 48.9667 32.78 47.9267L19.7667 34.9133H49.5533C51.02 34.9133 52.22 33.7133 52.22 32.2467C52.22 30.78 51.02 29.58 49.5533 29.58Z" fill="#1D3557"/>
            </svg>
        </Link>
      </div>

      <div className="right-side">
        <FormCadastro/>
      </div>
    </div>
  )
}