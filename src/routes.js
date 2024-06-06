
import Registraion from './pages/ClientRoute/Registration/Registraion';
import SportSelection from './pages/ClientRoute/SportSelection/SportSelection';


import ParticantList from "./pages/ClientRoute/ParticantList/ParticantList";
import ParticantItem from "./pages/ClientRoute/ParticantItem/ParticantItem";
import Admin from "./pages/ClientRoute/Admin/Admin";

import Login from "./pages/ClientRoute/Login/Login";

import {REGISTRATION_ROUTER, LOGIN_ROUTER, SPORT_ROUTER, PARTICANT_ROUTER, ADMIN_ROUTER } from "./utils/const";

export const authRoutes = [
    // {
    //     path: LOGIN_ROUTER,
    //     Component: Registraion
    // },
    
]

export const publicRoutes = [

    {
        path: REGISTRATION_ROUTER,
        Component: Registraion
    },
    
    {
        path: LOGIN_ROUTER,
        Component: Login
    },

    {
        path: SPORT_ROUTER,
        Component: SportSelection
    },
    {
        path: PARTICANT_ROUTER,
        Component: ParticantList
    },
    {
        path: PARTICANT_ROUTER + '/:id',
        Component: ParticantItem
    },

    {
        path: ADMIN_ROUTER,
        Component: Admin
    },
    
]