import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    CLIENTS_ROUTE,
    MACHINES_ROUTE,
    REPAIRS_ROUTE,
    SUBSCRIBES_ROUTE,
    SUGGESTIONS_ROUTE,
    TRAINERS_ROUTE
} from "../utils/consts";

const MainPage = () => {
    return (
        <Container>
            <ListGroup>
                <Link to={CLIENTS_ROUTE}>
                    <ListGroup.Item>Клиенты</ListGroup.Item>
                </Link>
                <Link to={MACHINES_ROUTE}>
                    <ListGroup.Item>Тренажеры</ListGroup.Item>
                </Link>
            <Link to={REPAIRS_ROUTE}>
                    <ListGroup.Item>Заявки на ремонт</ListGroup.Item>
                </Link>
                <Link to={SUBSCRIBES_ROUTE}>
                    <ListGroup.Item>Запись к тренерам</ListGroup.Item>
                </Link>
                <Link to={TRAINERS_ROUTE}>
                    <ListGroup.Item>Тренера</ListGroup.Item>
                </Link>
                <Link to={SUGGESTIONS_ROUTE}>
                    <ListGroup.Item>Предложения и пожелания</ListGroup.Item>
                </Link>
            </ListGroup>
        </Container>
    );
};

export default MainPage;