const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin_auth = sequelize.define('admin_auth', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    //role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Client = sequelize.define('client', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
    number_phone: {type: DataTypes.STRING(11), allowNull: false},
    birth_date: {type: DataTypes.DATE, allowNull: false},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const Trainer = sequelize.define('trainer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const Machine = sequelize.define('machine', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status_name: {type: DataTypes.STRING, allowNull: false}
})

const Subscribe = sequelize.define('subscribe', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Suggestion = sequelize.define('suggestion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Repair = sequelize.define('repair', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    view: {type: DataTypes.STRING, allowNull: false},
    defect: {type: DataTypes.STRING, allowNull: false},
})


Client.hasMany(Subscribe)
Subscribe.belongsTo(Client)

Client.hasMany(Suggestion)
Suggestion.belongsTo(Client)

Client.hasMany(Repair)
Repair.belongsTo(Client)

Trainer.hasMany(Subscribe)
Subscribe.belongsTo(Trainer)

Machine.hasMany(Repair)
Repair.belongsTo(Machine)

Status.hasMany(Repair)
Repair.belongsTo(Status)


module.exports = {
    Admin_auth,
    Client,
    Trainer,
    Machine,
    Status,
    Subscribe,
    Suggestion,
    Repair
}