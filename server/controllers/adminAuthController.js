const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Admin_auth} = require('../models/models')

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class AdminAuthController{

    // async reg(req, res){
    //     const {login, password} = req.body
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const admin_auth = await Admin_auth.create({login, password: hashPassword})
    //     const token = generateJwt(admin_auth.id, admin_auth.login)
    //     return res.json({token})
    // }
    async login(req, res, next){
        try {
            const {login, password} = req.body

            const admin_auth = await Admin_auth.findOne({where: {login}})
            if (!admin_auth) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, admin_auth.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(admin_auth.id, admin_auth.login)
            return res.json({token})
        }catch (e){
            console.log(e)
            return next(ApiError.internal(e))
        }
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.login)
        return res.json({token})
    }
}

module.exports = new AdminAuthController()