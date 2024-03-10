import {CLIENTS_ROUTE, LOGIN_ROUTE, MACHINES_ROUTE, MAIN_ROUTE, REPAIRS_ROUTE, SUBSCRIBES_ROUTE, SUGGESTIONS_ROUTE, TRAINERS_ROUTE} from "./utils/consts";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Machines from "./pages/Machines";
import Trainers from "./pages/Trainers";
import Repairs from "./pages/Repairs";
import Subscribes from "./pages/Subscribes";
import Suggestions from "./pages/Suggestions";
import Clients from "./pages/Clients";


export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: CLIENTS_ROUTE,
        Component: Clients
    },
    {
        path: MACHINES_ROUTE,
        Component: Machines
    },
    {
        path: TRAINERS_ROUTE,
        Component: Trainers
    },
    {
        path: REPAIRS_ROUTE,
        Component: Repairs
    },
    {
        path: SUBSCRIBES_ROUTE,
        Component: Subscribes
    },
    {
        path: SUGGESTIONS_ROUTE,
        Component: Suggestions
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
]