import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {check} from "../http/authAPI";
import {Spinner} from "react-bootstrap";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (window.location.pathname !== "/login") {
            check().then(() => {
                    user.setIsAuth(true);
                },
                ()=>{user.setIsAuth(false);}
            ).finally(() => setLoading(false));
        } else {
            setLoading(false); // Если на странице авторизации, устанавливаем loading в false без вызова check
        }
        //console.log('Переход между страницами. Текущий путь:', location.pathname);
    }, [location.pathname]);
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>} exact/>
                ))}
            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} exact/>
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace/>}/>
        </Routes>
    );
});

export default AppRouter;