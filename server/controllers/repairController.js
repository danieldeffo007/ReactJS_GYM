const {Repair, Status} = require("../models/models");
class repairController {

    // async create(req, res){
    //     const {status_name} = req.body
    //     const repair = await Status.create({status_name})
    //     return res.json(repair)
    // }

    // async create(req, res){
    //     const {view, defect, clientId, machineId, statusId} = req.body
    //     const repair = await Repair.create({view, defect, clientId, machineId, statusId})
    //     return res.json(repair)
    // }
    async change(req, res) {
        let {id} = req.body
        try {
            let repairInstance = await Repair.findOne({
                attributes: ['statusId'],
                where: {id}
            });
            if (repairInstance.statusId === 2) {
                return res.json('Нельзя менять статус: "Готово"')
            }
            const statusId = repairInstance.statusId+=1
            const updatedRowsCount = await Repair.update(
                {statusId},
                {where: {id}}
            );
            if (updatedRowsCount > 0) {
                const updatedRepair = await Repair.findByPk(id);
                return res.json(updatedRepair);
            } else {
                return res.status(404).json({error: 'Repair с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при обновлении repair:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }

    }

    async delete(req, res) {
        const {id} = req.body
        try {
            const deletedRowCount = await Repair.destroy({where: {id}});

            if (deletedRowCount > 0) {
                return res.json({message: 'Запись успешно удалена'});
            } else {
                return res.status(404).json({error: 'Repair с указанным id не найден.'});
            }
        } catch (error) {
            console.error('Ошибка при удалении Repair:', error);
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    }

    async getAll(req, res) {
        const repair = await Repair.findAll()
        return res.json(repair)
    }
    async getStatus(req, res) {
        const status = await Status.findAll()
        return res.json(status)
    }

}

module.exports = new repairController()