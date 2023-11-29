import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaActividad = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/actividad/", {
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

export const getActividad = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/actividad/"+id+"/", {
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


export const delActividad = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/administracion/actividad/"+id+"/", {
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

export const postSaveActividad = (token, actividad) => {
    const formData = new FormData();

    formData.append("nombre", actividad.nombre);
    formData.append("dificultad", actividad.dificultad);

    console.log(formData);

    return new Promise((resolve, reject) => {
        axios.post(BASE_URL +  "/administracion/actividad/",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'JWT ' + token
                },
            })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const putActividad = (token, actividad) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/administracion/actividad/"+actividad.id+"/", actividad, {
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