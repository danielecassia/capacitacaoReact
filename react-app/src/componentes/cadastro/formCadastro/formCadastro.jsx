import './formCadastro.css';

export default function FormCadastro() {

  return (
    <div className="fromCadastro">
      <h1>Cadastro</h1>

      <form action="">
        <table>
          <tr>
            <td> <input type="text" placeholder="Nome" /> </td>
            <td> <input type="text" placeholder="E-mail" /> </td>
          </tr>
          <tr class="separar"></tr>
          <tr>
            <td> <input type="password" placeholder="Senha" /> </td>
            <td> <input type="password" placeholder="Repetir Senha" /> </td>
          </tr>
        </table>
      
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  )
}