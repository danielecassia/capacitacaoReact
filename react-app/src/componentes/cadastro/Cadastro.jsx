import './Cadastro.css';
import FormCadastro from './formCadastro/formCadastro';
import Logo from "../../logo.svg";
import {Link} from 'react-router-dom'

export default function Login() {
  return(
    <div className="Cadastro">
      <div className="conteudo">
      </div>
      <div className="left-side">
        <Link to="/login">
            <img src={Logo}
            alt="seta"
            width="70%"
            height="70%"
            padding="0" 
            />
        </Link>
      </div>

      <div className="right-side">
        <h1>Cadastro</h1>
        <FormCadastro/>
      </div>


    </div>
  )
}