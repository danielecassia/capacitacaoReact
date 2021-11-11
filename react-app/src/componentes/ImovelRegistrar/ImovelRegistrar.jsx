import './ImovelRegistrar.css';
import { useEffect, useRef, useState } from 'react';


export default function Teste(props) {
    
    const myBtn = useRef(null);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [cost, setCost] = useState('');
    const [adUrl, setAdUrl] = useState('');
    const [sellerTell, setSellerTell] = useState('');

    useEffect(() => {
        if( name !== '' && address !== '' && type !== '' && cost !== '' && adUrl !== '' && sellerTell !== '' ){
            myBtn.current.disabled = false;
        }else{
            myBtn.current.disabled = true;
        }
    },
    [name, address, type, cost, adUrl, sellerTell]
    )
    

  return (
    <div className="fromCadastro">
      <h1>Teste</h1>

      <form action="">
          <div className="input100">
            <input type="text" placeholder="Nome" value={ name } onChange={ (e) => setName(e.target.value) } />
            <input type="text" placeholder="Endereço" value={ address } onChange={ (e) => setAddress(e.target.value) } />
            </div>

        <table>
          <tr>
            <td> 
                <select name="tipo" id="tipo" value={ type } onChange={ (e) => setType(e.target.value) }>
                    <option value="">Tipo</option>
                    <option value="ap">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="comercial">Comercial</option>
                </select>
            </td>
            <td> <input type="text" placeholder="Preço" value={ cost } onChange={ (e) => setCost(e.target.value) } /> </td>
          </tr>
          <tr class="separar"></tr>
          <tr>
            <td> <input type="password" placeholder="URL do Anúncio" value={ adUrl } onChange={ (e) => setAdUrl(e.target.value) } /> </td>
            <td> <input type="password" placeholder="Telefone do Vendedor" value={ sellerTell } onChange={ (e) => setSellerTell(e.target.value) } /> </td>
          </tr>
        </table>
      
        <input type="submit" value="Cadastrar" ref={ myBtn } disabled="true"/>
      </form>
    </div>
  )
}