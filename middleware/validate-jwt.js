// const jwt = require("jsonwebtoken")
// const { User } = require("../models")

// const validateSession = async (req, res, next) => {
//     if (req.method == "OPTIONS") {
//         next()
//     } else if (
//         req.headers.authorization &&
//         req.headers.authorization.includes("Bearer")
//     ) {
//         const { authorization } = req.headers
//         const payload = authorization
//           ? jwt.verify(
//               authorization.includes("Bearer")
//                 ? authorization.split(" ")[1]
//                 : authorization,
//               process.env.JWT_SECRET
//             )
//           : undefined
//         //   console.log(payload)

//         if (payload) {
//             const foundUser = await User.findOne({ where: { id: payload.id } })
//             if (foundUser) {
//                 req.user = foundUser
//                 next()
//             } else {
//                 res.status(400).send({ message: "Not Authorized" })
//             }
//         } else {
//             res.status(401).send({ message: "Invalid token" })
//         }
//     } else {
//         res.status(403).send({ message: "Forbidden" })
//     }
// }

// module.exports = validateSession

const jwt = require('jsonwebtoken');
// const User = require('../db').import('../models/User');
const { User } = require("../models")

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    if (!user) throw err;
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;