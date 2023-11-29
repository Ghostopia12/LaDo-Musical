import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { postSaveActividad, getActividad, putActividad, getListaActividad } from "../services"; //, getActividadParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../navigation/CONSTANTS";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";

export default function ActividadFormPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [dificultad, setDificultad] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        if(id){
            loadActividad(id);
        }
    }, [])


    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadActividad = (id) => {
        getActividad(getAuthToken(),id).then((data) => {
            console.log(data);
            //debugger
            setNombre(data.nombre);
            setDificultad(data.dificultad);
/*             getActividadParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesActividad(data);
            }); */
        });
    }

    const onActividadesFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        if(id){
            updateActividades();
        }else{
            createActividades();
        }
    }
    
    const updateActividades = () => {
        setShowAlertError(false);
        putActividad(getAuthToken(), {
            nombre,
            dificultad,
            id
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(HOME_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const onDificultadoSeleccionada = (e) => {
        setDificultad(e.target.value);
        console.log(dificultad)
    }

    const createActividades = () => {
        setShowAlertError(false);
        postSaveActividad(getAuthToken(), {
            nombre,
            dificultad
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(HOME_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }
    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de actividad
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onActividadesFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombre</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                <label>Dificultad</label>
                                <Form.Control as="select" value={dificultad} onChange={onDificultadoSeleccionada}>
                                <option value="">Seleccione una opción</option>
                                <option value="1">Fácil</option>
                                <option value="2">Intermedio</option>
                                <option value="3">Difícil</option>
                                </Form.Control>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar actividad</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
