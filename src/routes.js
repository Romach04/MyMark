import MainPage from "./pages/MainPage/MainPage";
import Registraion from './pages/ClientRoute/Registration/Registraion';
import SportSelection from './pages/ClientRoute/SportSelection/SportSelection';


import ParticantList from "./pages/ClientRoute/ParticantList/ParticantList";
import ParticantItem from "./pages/ClientRoute/ParticantItem/ParticantItem";
import OrganizationConfirm from "./pages/ClientRoute/OrganizationConfirm/OrganizationConfirm";
import Login from "./pages/ClientRoute/Login/Login";

import { MAINPAGE_ROUTER, REGISTRATION_ROUTER, LOGIN_ROUTER, SPORT_ROUTER, PARTICANT_ROUTER, CONFIRM_ROUTER } from "./utils/const";

export const authRoutes = [
    // {
    //     path: LOGIN_ROUTER,
    //     Component: Registraion
    // },
    
]

export const publicRoutes = [
    {
        path:MAINPAGE_ROUTER,
        Component: MainPage
    },
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
        path: CONFIRM_ROUTER,
        Component: OrganizationConfirm
    },
    
]