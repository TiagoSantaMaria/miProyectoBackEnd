//FUNCION PARA QUE UNAVEZ LOGUEADO NO PUEDAS DIRIGIRTE AL LOGIN O SIGNUP
function auth(req, res, next) {
    if (!!req.session.user?.email) {
        return res.status(401).send('Usted ya esta Logeado')
    }
    return next()
}
//FUNCION PARA QUE SI NO ESTAS LOGUEADO NO PUEDAS DIRIGIRTE AL PROFILE
function authProfile(req, res, next) {
    if (req.session.user?.email) {
        return next()
    }
    return res.status(401).send('Usted debe estar Logeado')
}

// PARA AUTENTIFICAR QUE SEA ROL ADMIN
function authAdmin(req, res, next) {
    if (req.session.user?.email === 'tiago@gmail.com' && req.session.user?.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}
// PARA AUTENTIFICAR QUE SEA ROL USER 
function authUser(req, res, next) {
    if (req.session.user.role) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}
module.exports = {
    auth,
    authProfile
    };