import MainPage from "./pages/MainPage/MainPage";
import Registraion from './pages/ClientRoute/Registration/Registraion';
import ServiceSelection from './pages/ClientRoute/ServiceSelection/ServiceSelection';
import ParticipantSelect from './pages/ClientRoute/ParticipantSelect/ParticipantSelect';


import OrganizationSelect from "./pages/ClientRoute/OrganizationSelect/OrganizationSelect";
import OrganizationItem from "./pages/ClientRoute/OrganizationItem/OrganizationItem";
import OrganizationConfirm from "./pages/ClientRoute/OrganizationConfirm/OrganizationConfirm";
import Login from "./pages/ClientRoute/Login/Login";

import { MAINPAGE_ROUTER, REGISTRATION_ROUTER, LOGIN_ROUTER, SERVICES_ROUTER, ORGANIZATION_ROUTER, CONFIRM_ROUTER, PARTICIPANT_ROUTER } from "./utils/const";

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
        path: SERVICES_ROUTER,
        Component: ServiceSelection
    },

    {
        path: PARTICIPANT_ROUTER,
        Component: ParticipantSelect
    },
    {
        path: ORGANIZATION_ROUTER,
        Component: OrganizationSelect
    },
    {
        path: ORGANIZATION_ROUTER + '/:id',
        Component: OrganizationItem
    },

    {
        path: CONFIRM_ROUTER,
        Component: OrganizationConfirm
    },
    
]