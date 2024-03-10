
import {makeAutoObservable} from "mobx";

export default class DescriptionStore {
    constructor() {
        this._client = []
        this._clientEdit = []
        this._trainer = []
        this._trainerEdit = []
        makeAutoObservable(this)
    }

    setClient(client) {
        this._client = client
    }
    setClientEdit(clientEdit) {
        this._clientEdit = clientEdit
    }
    setTrainer(trainer) {
        this._trainer = trainer
    }
    setTrainerEdit(trainerEdit) {
        this._trainerEdit = trainerEdit
    }
    setLogin(login) {
        this._login = login
    }
    setPass(pass) {
        this._pass = pass
    }


    get ClientGet() {
        return this._client
    }
    get ClientEditGet() {
        return this._clientEdit
    }
    get TrainerGet() {
        return this._trainer
    }
    get TrainerEditGet() {
        return this._trainerEdit
    }
    get Login() {
        return this._login
    }
    get Pass() {
        return this._pass
    }

}