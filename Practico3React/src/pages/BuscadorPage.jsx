import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarXNombre, delNivel } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import {  useNavigate } from "react-router-dom";
import { NIVEL_DETAIL_URL, NIVEL_EDIT_URL, ACTIVIDAD_EDIT_URL } from "../navigation/CONSTANTS";


export default function BuscadorPage(){
    const navigate = useNavigate();
    const [listaNiveles, setListaNiveles] = useState({});

    const AdminGameComponent = ({ owner, game }) => {
        let content = null;
      
        if (owner) {
          content =                      
          <>   
          <Button onClick={()=> {
                  deleteNivel(game.id)
          }}>Eliminar</Button>
          <Link to={'http://127.0.0.1:5173'+NIVEL_EDIT_URL+game.id}>Editar</Link>
        </>;
        }
      
        return (
            {content}
        );
      };
      

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadNiveles()
    }, [])
    

    const loadNiveles = () => {
        buscarXNombre(getAuthToken(), 'data').then((data) => {
            setListaNiveles(data);
            console.log(data);
        });
    }

    const deleteNivel = (id) => {
        delNivel(getAuthToken(),id).then((data) => {
            //setListaNiveles(data);
        });
    }


    const GameDetail = ({ game }) => {
        return (
          <div>
            <h2>{game.nombre}</h2>
            <p>Precio: {game.precio}</p>
            <img src={game.foto} alt={game.nombre} />
          </div>
        );
      };
      

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Niveles
                        </Card.Title>
                        <ul>
                        {listaNiveles.map((nivel) => (
                            <li key={nivel.id}>
                            <Link to={'http://127.0.0.1:5173'+NIVEL_DETAIL_URL+nivel.id}>
                              <h1>{nivel.nombre}</h1>
                              <Image alt={nivel.nombre} src={nivel.foto}/>
                              <p>{nivel.precio}</p>
                            </Link>
  {/*                                                         <AdminGameComponent owner={localStorage.getItem('is_admin')} game={nivel}/>
*/}                         </li>
                                ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
