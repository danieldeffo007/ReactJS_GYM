const {Client} = require('../models/models')
const ApiError = require('../error/ApiError')
class clientController{
    async create(req, res){
        try {
            const {lastname, name, patronymic, number_phone, birth_date, login, password} = req.body
            const client = await Client.create({lastname, name, patronymic, number_phone, birth_date, login, password})
            if (client) {
                return res.json(client)
            }
            else{
                const isLoginUnique = await Client.findByPk(login);
                if (isLoginUnique)
                    return res.status(400).json({error: 'Логин уже используется'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async update(req, res){
        const {id, lastname, name, patronymic, number_phone, birth_date, login, password} = req.body
        try {
            const updatedRowsCount = await Client.update(
                { lastname, name, patronymic, number_phone, birth_date, login, password },
                { where: { id } }
            );

// Проверяем, были ли строки обновлены
            if (updatedRowsCount > 0) {
                // Если обновлено, можем снова загрузить клиента
                const updatedClient = await Client.findByPk(id);
                return res.json(updatedClient);
            } else {
                return res.status(404).json({ error: 'Клиент с указанным id не найден.' });
            }
        } catch (error) {
            console.error('Ошибка при обновлении клиента:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async delete(req, res){
        const {id} = req.body
        try {
            const deletedRowCount = await Client.destroy({ where: { id } });

            if (deletedRowCount > 0) {
                return res.json({ message: 'Запись успешно удалена' });
            } else {
                return res.status(404).json({ error: 'Клиент с указанным id не найден.' });
            }
        } catch (error) {
            console.error('Ошибка при удалении клиента:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async getAll(req, res){
        const clients = await Client.findAll()
        return res.json(clients)
    }
}

module.exports = new clientController()