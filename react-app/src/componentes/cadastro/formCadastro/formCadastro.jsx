import './formCadastro.css';
import { useEffect, useRef, useState } from 'react'


export default function FormCadastro() {

  const myBtn = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        if( name !== '' && email !== '' && password !== '' && password2 !== '' ){
            myBtn.current.disabled = false;
        }else{
            myBtn.current.disabled = true;
        }
    },
    [name, email, password, password2]
    )
    

  return (
    <div className="fromCadastro">
      <h1>Cadastro</h1>

      <form action="">
        <table>
          <tr>
            <td> <input type="text" placeholder="Nome" value={ name } onChange={ (e) => setName(e.target.value) } /> </td>
            <td> <input type="text" placeholder="E-mail" value={ email } onChange={ (e) => setEmail(e.target.value) } /> </td>
          </tr>
          <tr class="separar"></tr>
          <tr>
            <td> <input type="password" placeholder="Senha" value={ password } onChange={ (e) => setPassword(e.target.value) } /> </td>
            <td> <input type="password" placeholder="Repetir Senha" value={ password2 } onChange={ (e) => setPassword2(e.target.value) } /> </td>
          </tr>
        </table>
      
        <input type="submit" value="Cadastrar" ref={ myBtn } disabled="true"/>
      </form>
    </div>
  )
}