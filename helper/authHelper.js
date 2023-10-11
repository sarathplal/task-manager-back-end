const bcrypt = require('bcrypt')

exports.hashPassword = async (password) => {

    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword
    } catch (error) {
        console.log(error);
    }

}

exports.comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}