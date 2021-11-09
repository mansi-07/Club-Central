import bcrypt from 'bcryptjs'
const rounds = 12

const globalUsers = [
    {
        username: 'Jignesh',
        email: 'jignesh@gmail.com',
        password: bcrypt.hashSync('Jignesh'),
    },
    {
        username: 'Seetha',
        email: 'seetha@gmail.com',
        password: bcrypt.hashSync('Seetha'),
    },
    {
        username: 'IEEEAdmin',
        email: 'ieeenitk@gmail.com',
        password: bcrypt.hashSync('IEEEAdmin'),
        isAdmin: true
    },
    {
        username: 'NIT',
        email: 'userDummy@gmail.com',
        password: bcrypt.hashSync('userDummy'),
    }
]

export default globalUsers