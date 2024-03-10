import React, {useContext, useEffect} from 'react';
import ClientList from "../components/Client/ClientList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DescriptionStore from "../store/DescriptionStore";
import {clientGetALL} from "../http/clientAPI";
const Clients = observer( () => {
    const {description} = useContext(Context)

    useEffect(() => {
        clientGetALL().then(data => description.setClient(data))

    }, [])
    //console.log(description.ClientGet)
    return (
        <div>
            <ClientList />
        </div>
    );
});

export default Clients;