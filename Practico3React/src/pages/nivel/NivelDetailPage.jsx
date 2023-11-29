import { Card, Container, Image } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { getNivel, getActividadesXNivel } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";

export default function NivelDetailPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [actividads, setActividades] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [foto, setFoto] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        //loadActividadesGame()
        if(id){
            loadNivel(id);
        }
    }, [])

    const loadActividadesGame = () => {
        getActividadesXNivel(getAuthToken()).then((data) => {
            setActividades(data);
        });
    }

    const loadNivel = (id) => {
        getNivel(getAuthToken(),id).then((data) => {
            console.log(data);
            debugger
            setNombre(data.nombre);
            setActividades(data.actividads);
            setPrecio(data.precio);
            setFoto(data.foto);
/*             getNivelParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesNivel(data);
            }); */
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            {nombre}
                        </Card.Title>
                        <Image src={foto} alt={nombre}></Image>
                        <Card.Text>
                            {precio}
                        </Card.Text>
                        {actividads.map((actividad) => {
                            return (
                                <label key={actividad.id}>
                                {actividad.nombre}
                                </label>
                            )
                            })}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
