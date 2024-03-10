const {Suggestion} = require("../models/models");
class suggestionController {
    async create(req, res){
        try{
            const {clientId, description} = req.body
            const suggestion = await Suggestion.create({clientId, description})
            return res.json(suggestion)
        } catch (error){
            console.error('Ошибка при создании Suggestion:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }
    async delete(req, res){
        const {id} = req.body
        try {
            const deletedRowCount = await Suggestion.destroy({where: {id}});

            if (deletedRowCount > 0) {
                return res.json({message: 'Запись успешно удалена'});
            } else {
                return res.status(404).json({error: 'Suggestion с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при удалении Suggestion:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }

    async getAll(req, res){
        const suggestion = await Suggestion.findAll()
        return res.json(suggestion)
    }

}

module.exports = new suggestionController()