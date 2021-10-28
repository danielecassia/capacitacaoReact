import './Cadastro.css';
import FormCadastro from './formCadastro/formCadastro';
import Logo from "../../logo.svg";
export default function Login() {
  return(
    <div className="Cadastro">
      <div className="conteudo">
      </div>
      <div className="left-side">
          <img src={Logo}
          alt="seta"
          width="70%"
          height="70%"
          padding="0" 
            />
      </div>

      <div className="right-side">
        <h1>Cadastro</h1>
        <FormCadastro/>
      </div>


    </div>
  )
}