const {Trainer, Machine} = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class trainerController{

    async create(req, res){
        const {lastname,name,patronymic,description} = req.body
        const {photo} = req.files
        let fileName = uuid.v4() + ".jpg"
        photo.mv(path.resolve(__dirname, '..', 'static/trainers', fileName))
        const trainer = await Trainer.create({lastname,name,patronymic,photo: fileName, description})

        return res.json(trainer)
    }

    async update(req, res){
        const {id ,lastname,name,patronymic, description} = req.body
        let photo
        if (req.files) {
            photo = req.files.photo
            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static/trainers', fileName))
        }
        try {
            let updatedRowsCount = 0
            if (photo) {
                updatedRowsCount = await Trainer.update(
                    {lastname,name,patronymic,photo: fileName, description},
                    {where: {id}}
                );
            } else {
                updatedRowsCount = await Trainer.update(
                    {lastname,name,patronymic, description},
                    {where: {id}}
                );
            }

            if (updatedRowsCount > 0) {
                const updatedTrainer = await Trainer.findByPk(id);
                return res.json(updatedTrainer);
            } else {
                return res.status(404).json({ error: 'Тренер с указанным id не найден.' });
            }
        } catch (error) {
            console.error('Ошибка при обновлении тренера:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async delete(req, res){
        const {id} = req.body
        try {
            const deletedRowCount = await Trainer.destroy({ where: { id } });

            if (deletedRowCount > 0) {
                return res.json({ message: 'Запись успешно удалена' });
            } else {
                return res.status(404).json({ error: 'Тренер с указанным id не найден.' });
            }
        } catch (error) {
            console.error('Ошибка при удалении тренера:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async getAll(req, res){
        const trainer = await Trainer.findAll()
        return res.json(trainer)
    }
}

module.exports = new trainerController()