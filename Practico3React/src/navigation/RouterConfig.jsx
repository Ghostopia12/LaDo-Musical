import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BuscadorPage from "../pages/BuscadorPage";
import { HOME_URL, LOGIN_URL, NIVEL_CREATE_URL, REGISTER_URL, ACTIVIDAD_CREATE_URL, NIVEL_DETAIL_URL, BUSCADOR_URL, NIVEL_LIST_URL } from "./CONSTANTS";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NivelFormPage from "../pages/nivel/NivelFormPage";
import NivelDetailPage from "../pages/nivel/NivelDetailPage";
import NivelListPage from "../pages/nivel/NivelDetailPage";
import ActividadFormPage from "../pages/ActividadFormPage";

export const router = createBrowserRouter([
    {
        path: LOGIN_URL,
        element: <LoginPage/>,
    },
    {
        path: REGISTER_URL,
        element: <RegisterPage/>,
    },
    {
        path: HOME_URL,
        element: <HomePage/>,
    },
    {
        path: NIVEL_CREATE_URL,
        element: <NivelFormPage/>,
    },
    {
        path: '/nivel/editar/:id',
        element: <NivelFormPage/>,
    },
    {
        path: NIVEL_DETAIL_URL,
        element: <NivelDetailPage/>,
    },
    {
        path: ACTIVIDAD_CREATE_URL,
        element: <ActividadFormPage/>,
    },
    {
        path: '/actividad/editar/:id',
        element: <ActividadFormPage/>,
    },
    {
        path: BUSCADOR_URL,
        element: <BuscadorPage/>,
    },
    {
        path: NIVEL_LIST_URL,
        element: <NivelListPage/>,
    }
]);