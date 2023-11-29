import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaNiveles, delNivel, getListaActividad, getNivelesXActividad, delActividad } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import {  useNavigate } from "react-router-dom";
import { ACTIVIDAD_JUGAR_URL, NIVEL_EDIT_URL, ACTIVIDAD_EDIT_URL } from "../navigation/CONSTANTS";


export default function HomePage(){
    const navigate = useNavigate();
    const [listaActividades, setListaActividades] = useState([]);
    const [listaNiveles, setListaNiveles] = useState({});

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
      
    const AdminActividadComponent = ({ owner, actividad }) => {
      
    
      
        return (owner ?
              <>   
              <Button onClick={()=> {
                      deleteActividad(actividad.id)
              }}>Eliminar</Button>
              <Link to={'http://127.0.0.1:5173'+ACTIVIDAD_EDIT_URL+actividad.id}>Editar</Link>
            </> : <></>
      );    

    };

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadNiveles()
        loadActividades()
    }, [])
    

    const loadNiveles = () => {
        getListaNiveles(getAuthToken()).then((data) => {
            setListaNiveles(data);
            console.log(data);
        });
    }
    const loadActividades = () => {
        getListaActividad(getAuthToken()).then((data) => {
            setListaActividades(data);
            let index = 0;
            listaActividades.forEach(actividad => {
              //debugger
              getNivelesXActividad(getAuthToken(),actividad.id).then((data) => {
                console.log(data);
                listaNiveles[index] = data;
              })
              index++;
            });
            console.log(data);
        });
    }

    const deleteNivel = (id) => {
        delNivel(getAuthToken(),id).then((data) => {
            //setListaNiveles(data);
        });
    }

    const deleteActividad = (id) => {
      delActividad(getAuthToken(),id).then((data) => {
          //setListaActividades(data);
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
                            Actividades
                        </Card.Title>
                        <ul>
                            {listaActividades.map((actividad) => (
                            <li key={actividad.id}>
                                      <Navbar  expand="lg">
                                <Container fluid>
                                    <Navbar.Brand >
                                    {actividad.nombre}
                                    <Button onClick={()=> {
                                            deleteActividad(actividad.id)
                                    }}>Eliminar</Button>
                                    <Link to={'http://127.0.0.1:5173'+ACTIVIDAD_EDIT_URL+actividad.id}>Editar</Link>
                                    <Link to={'http://127.0.0.1:5173'+ACTIVIDAD_JUGAR_URL+actividad.id}>Jugar</Link>
                                    <AdminActividadComponent owner={localStorage.getItem('is_admin')} actividad={actividad}/>
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
