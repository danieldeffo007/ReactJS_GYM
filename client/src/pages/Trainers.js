import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import TrainerList from "../components/Trainer/TrainerList";
import {trainerGetALL} from "../http/trainerAPI";

const Trainers = observer( () => {
    const {description} = useContext(Context)

    useEffect(() => {
        trainerGetALL().then(data => description.setTrainer(data))

    }, [])
    return (
        <div>
            <TrainerList />
        </div>
    );
});

export default Trainers;