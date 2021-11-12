import './InSystem.css'

import NavBar from '../../componentes/NavBar/NavBar'
import ImovelRegistrar from '../../componentes/ImovelRegistrar/ImovelRegistrar'
import { Route } from 'react-router-dom'

export default function InSystem(props){
    return(
        <div className="InSystem">
            <NavBar/>
            <Route path="/InSystem/imovelregistrar">
                <ImovelRegistrar></ImovelRegistrar>
            </Route>
        </div>
    )
}