const {Machine} = require("../models/models");
const uuid = require('uuid')
const path = require("path");

class machineController {
    async create(req, res) {
        const {name, description} = req.body
        const {photo} = req.files
        let fileName = uuid.v4() + ".jpg"
        photo.mv(path.resolve(__dirname, '..', 'static/machines', fileName))
        const machine = await Machine.create({name, photo: fileName, description})
        return res.json(machine)
    }

    f

    async update(req, res) {
        const {id, name, description} = req.body
        let photo
        if (req.files) {
            photo = req.files.photo
            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static/machines', fileName))
        }


        try {
            let updatedRowsCount = 0
            if (photo) {
                updatedRowsCount = await Machine.update(
                    {name, photo: fileName, description},
                    {where: {id}}
                );
            } else {
                updatedRowsCount = await Machine.update(
                    {name, description},
                    {where: {id}}
                );
            }

            if (updatedRowsCount > 0) {
                const updatedMachine = await Machine.findByPk(id);
                return res.json(updatedMachine);
            } else {
                return res.status(404).json({error: 'Тренажер с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при обновлении тренажера:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }

    async delete(req, res) {
        const {id} = req.body
        try {
            const deletedRowCount = await Machine.destroy({where: {id}});

            if (deletedRowCount > 0) {
                return res.json({message: 'Запись успешно удалена'});
            } else {
                return res.status(404).json({error: 'Тренажер с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при удалении тренажера:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }

    async getAll(req, res) {
        const machine = await Machine.findAll()
        return res.json(machine)
    }

}

module.exports = new machineController()