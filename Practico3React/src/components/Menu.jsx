import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NIVEL_CREATE_URL, HOME_URL, ACTIVIDAD_CREATE_URL, ACTIVIDAD1_JUGAR_URL } from "../navigation/CONSTANTS";//LOGIN_URL
import { useState } from "react";
import { buscarXNombre } from "../services";

export default function Menu () {
    //const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
      event.preventDefault();
      console.log('Realizar búsqueda:', searchQuery);
      buscarXNombre(localStorage.getItem('token'),searchQuery).then((data) => {
        console.log(data);        
        });
      setSearchQuery('');
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem("user");
        window.location.reload()
    }

    const AdminComponent = ({ owner }) => {
        let content = null;
      
        if (owner) {
          content =                      
          <>   
        <Link className="nav-link" to={NIVEL_CREATE_URL}>Crear Nivel</Link>
        <Link className="nav-link" to={ACTIVIDAD_CREATE_URL}>Crear Nivel</Link>
        </>;
        }
      
        return (
            {content}
        );
      };
    const isAdmin = localStorage.getItem('is_superuser') === 'true';
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand to={HOME_URL}>Niveles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form inline onSubmit={handleSearch}>
                </Form>
                    <Nav className="me-auto">
                        <Link className="nav-link" to={HOME_URL}>Inicio</Link>
                        {/*<Link className="nav-link" to={NIVEL_LIST_URL}>Listar Niveles</Link>*/}
{/*                         <AdminComponent owner={isAdmin} />
 */}                        
         <Link className="nav-link" to={NIVEL_CREATE_URL}>Crear Nivel</Link>
        <Link className="nav-link" to={ACTIVIDAD_CREATE_URL}>Crear Actividad</Link>
        <Link className="nav-link" to={'http://127.0.0.1:5173'+ACTIVIDAD1_JUGAR_URL}>Aprender a leer notas</Link>

                        <Link onClick={ logout }>
                            Cerrar sesión
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}