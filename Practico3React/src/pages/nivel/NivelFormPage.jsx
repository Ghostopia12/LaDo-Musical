import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { postSaveNivel, getNivel, putNivel, getListaActividad } from "../../services"; //, getNivelParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";

export default function NivelFormPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [actividades, setActividades] = useState([]);
    const [listaActividades, setListaActividades] = useState([]);
    const [owner_id, setOwner] = useState('');
    const [puntaje_maximo, setPuntajeMaximo] = useState(0);
    const [repeticion_permitida, setRepeticionPermitida] = useState(0);
    const [recurso, setRecurso] = useState(null);
    const [tiempo, setTiempo] = useState(0);

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadActividades()
        if(id){
            loadNivel(id);
        }
    }, [])

    const loadActividades = () => {
        getListaActividad(getAuthToken()).then((data) => {
            setListaActividades(data);
            console.log(listaActividades)
        });
    }

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadNivel = (id) => {
        getNivel(getAuthToken(),id).then((data) => {
            console.log(data);
            debugger
            setNombre(data.nombre);
            setActividades(data.actividades);
            setOwner(data.owner_id);
            setPuntajeMaximo(data.puntaje_maximo);
            setRepeticionPermitida(data.repeticion_permitida);
            setRecurso(data.recurso);
            setTiempo(data.tiempo);
/*             getNivelParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesNivel(data);
            }); */
        });
    }

    const onNivelesFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        if(id){
            updateNiveles();
        }else{
            createNiveles();
        }
    }
    
    const updateNiveles = () => {
        setShowAlertError(false);
        const actividad_id = listaActividades.map((actividad) => actividad.id);
        putNivel(getAuthToken(), {
            nombre,
            actividades: actividad_id,
            puntaje_maximo,
            repeticion_permitida,
            recurso,
            tiempo,
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

    const onActividadSeleccionada = (e) => {
        setActividades(e.target.value);
        console.log(actividades)
    }

    const createNiveles = () => {
        setShowAlertError(false);
        const actividad_id = listaActividades.map((actividad) => actividad.id);
        postSaveNivel(getAuthToken(), {
            nombre,
            puntaje_maximo,
            repeticion_permitida,
            recurso,
            tiempo,
            owner_id: localStorage.getItem("user_id"),
            actividades: actividad_id
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
                            Formulario de nivel
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onNivelesFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombre</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Puntaje maximo</label>
                                    <FormControl value={puntaje_maximo} required
                                        onChange={(e) => {
                                            setPuntajeMaximo(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un puntaje maximo</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Repeticion permitida</label>
                                    <FormControl value={repeticion_permitida} required
                                        onChange={(e) => {
                                            setRepeticionPermitida(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un repeticion permitida</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Tiempo del Recurso(segundos)</label>
                                    <FormControl value={tiempo} required
                                        onChange={(e) => {
                                            setTiempo(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un tiempo para tu recursos</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                <label>Actividad</label>
                                <Form.Control as="select" value={actividades} onChange={onActividadSeleccionada}>
                                <option value="">Seleccione una opción</option>
                                {listaActividades.map((actividad) => (
                                    <option key={actividad.id} value={actividad.id}>{actividad.nombre}</option>
                                ))}
                                </Form.Control>
                                </FormGroup>
                                <FormGroup>
                                    <label>Recurso</label>
                                    <FormControl required
                                        onChange={(e) => {
                                            setRecurso(e.target.files[0]);
                                        }} type="file"/>
                                    <Form.Control.Feedback type="invalid">Necesitas una recurso</Form.Control.Feedback>
                                </FormGroup>
                                {/* lista de participantes, es decir usuarios marcados por un checkbox los que esten parcados son participantes y los que no no */}
                                <div className="mt-3">
                                    <Button type="submit">Guardar nivel</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
