import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaNiveles = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/nivel/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getNivel = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/nivel/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getActividadesXNivel = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/nivel/actividades_x_nivel/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getNivelesXActividad = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/nivel/niveles_x_actividad/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}


export const delNivel = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/administracion/nivel/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const postSaveNivel = (token, nivel) => {
    const formData = new FormData();
    formData.append("nombre", nivel.nombre);
    formData.append("actividad_id", nivel.actividades);
    formData.append("puntaje_maximo", nivel.puntaje_maximo);

    // Añade el archivo al FormData
    formData.append("recurso", nivel.recurso);

    formData.append("repeticion_permitida", nivel.repeticion_permitida);
    formData.append("tiempo", nivel.tiempo);


    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/nivel/", formData, {
            headers: {
                // No establezcas Content-Type aquí, Axios lo configurará automáticamente para FormData
                Authorization: `JWT ${token}`
            },
        })
        .then((response) => {
            console.log(response);
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export const buscarXNombre = (token, name) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/nivel/buscar_niveles_x_nombre/", name, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const putNivel = (token, nivel) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/administracion/nivel/"+nivel.id+"/", nivel, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}