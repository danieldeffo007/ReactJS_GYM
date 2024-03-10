import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LOGIN_ROUTE, MAIN_ROUTE,} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink, useLocation} from "react-router-dom"

const NavBar = observer (() => {
    const {user} = useContext(Context)

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{height: '60px'}}>
            <Container>
                <NavLink style={{color: 'white'}} to={MAIN_ROUTE} >Главная</NavLink>
                {user.isAuth &&
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;