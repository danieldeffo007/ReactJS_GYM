const {Subscribe} = require("../models/models");
class subscribeController{
    // async create(req, res){
    //     try{
    //         const {trainerId, clientId} = req.body
    //         const subscribe = await Subscribe.create({trainerId, clientId})
    //         return res.json(subscribe)
    //     } catch (error){
    //         console.error('Ошибка при создании subscribe:', error);
    //         return res.status(500).json({error: 'Внутренняя ошибка сервера'});
    //     }
    //}
    async delete(req, res){
        const {id} = req.body
        try {
            const deletedRowCount = await Subscribe.destroy({where: {id}});

            if (deletedRowCount > 0) {
                return res.json({message: 'Запись успешно удалена'});
            } else {
                return res.status(404).json({error: 'Subscribe с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при удалении Subscribe:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }
    async getAll(req, res){
        const subscribe = await Subscribe.findAll()
        return res.json(subscribe)
    }
}

module.exports = new subscribeController()