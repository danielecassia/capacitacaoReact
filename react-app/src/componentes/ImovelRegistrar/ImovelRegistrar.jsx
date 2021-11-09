import './ImovelRegistrar.css';
import { useEffect, useRef, useState } from 'react';


export default function Teste(props) {
    
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
      <h1>Teste</h1>

      <form action="">
          <div className="input100">
            <input type="text" placeholder="Nome" value={ name } onChange={ (e) => setName(e.target.value) } />
            <input type="text" placeholder="Endereço" value={ name } onChange={ (e) => setName(e.target.value) } />
            </div>

        <table>
          <tr>
            <td> 
                <select name="tipo" id="tipo" value={ name } onChange={ (e) => setName(e.target.value) }>
                    <option value="">Tipo</option>
                    <option value="ap">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="comercial">Comercial</option>
                </select>
            </td>
            <td> <input type="text" placeholder="Preço" value={ email } onChange={ (e) => setEmail(e.target.value) } /> </td>
          </tr>
          <tr class="separar"></tr>
          <tr>
            <td> <input type="password" placeholder="URL do Anúncio" value={ password } onChange={ (e) => setPassword(e.target.value) } /> </td>
            <td> <input type="password" placeholder="Telefone do Vendedor" value={ password2 } onChange={ (e) => setPassword2(e.target.value) } /> </td>
          </tr>
        </table>
      
        <input type="submit" value="Cadastrar" ref={ myBtn } disabled="true"/>
      </form>
    </div>
  )
}