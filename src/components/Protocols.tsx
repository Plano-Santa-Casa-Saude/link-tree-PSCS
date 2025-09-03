import { Paper } from "@mui/material"
import { useEffect,useState } from "react"

import '../styles/StyleProtocols.css'

function Protocols(){

    const [Teste,setTeste] = useState('1');

    useEffect(() => {
        setTeste('2')
    })

    return(
        <Paper className="session-detail">
            <h2>Protocolos</h2>
        </Paper>
    )

}

export default Protocols