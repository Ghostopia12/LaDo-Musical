import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaNiveles, delNivel } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import {  useNavigate } from "react-router-dom";
import { NIVEL_DETAIL_URL, NIVEL_EDIT_URL, ACTIVIDAD_EDIT_URL } from "../navigation/CONSTANTS";


export default function NivelListPage(){
    const navigate = useNavigate();
    const [listaNiveles, setListaNiveles] = useState([]);

    const AdminGameComponent = ({ owner, game }) => {
        let content = <></>;
      
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
      
    const AdminNivelComponent = ({ owner, nivel }) => {
      
    
      
        return (owner ?
              <>   
              <Button onClick={()=> {
                      deleteNivel(nivel.id)
              }}>Eliminar</Button>
              <Link to={'http://127.0.0.1:5173'+ACTIVIDAD_EDIT_URL+nivel.id}>Editar</Link>
            </> : <></>
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
        getListaNiveles(getAuthToken()).then((data) => {
            setListaNiveles(data);
            console.log(data);
        });
    }

    const deleteNivel = (id) => {
        delNivel(getAuthToken(),id).then((data) => {
            //setListaNiveles(data);
        });
    }

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
                                      <Navbar  expand="lg">
                                <Container fluid>
                                    <Navbar.Brand >
                                    {nivel.nombre}
                                    <Button onClick={()=> {
                                            deleteNivel(nivel.id)
                                    }}>Eliminar</Button>
                                    <Link to={'http://127.0.0.1:5173'+ACTIVIDAD_EDIT_URL+nivel.id}>Editar</Link>
                                    <AdminNivelComponent owner={localStorage.getItem('is_admin')} nivel={nivel}/>
                                    </Navbar.Brand>
                                </Container>
                            </Navbar>
                            </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
