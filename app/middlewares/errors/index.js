const { EErrors } = require("../../services/errors/enums");

module.exports = 
(error, req, res, next) =>{
    console.log("entro al middleware del switch");
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({
                status: "error",
                error: error.name,
                });
            break;
        default:
            res.send({
                status: "error",
                error: "unhandled error",
                });
        }
    }

// export default (error, req, res, next) =>{
//     console.log("entro al middleware del switch")
//     console.log(error.cause);
//     switch (error.code) {
//         case EErrors.INVALID_TYPES_ERROR:
//             res.send({
//                 status: "error",
//                 error: error.name,
//                 });
//             break;
//         default:
//             res.send({
//                 status: "error",
//                 error: "unhandled error",
//                 });
//             break;
//         }
//     }