const injectSocketMiddleWare = (req, res, next) => {
    req.socket = socketServer;
}

module.exports = {
    injectSocketMiddleWare,
    };