import bcrypt from 'bcryptjs'
const rounds = 12

const globalUsers = [
    {
        username: 'supperDummy',
        email: 'supperDummy@gmail.com',
        password: bcrypt.hashSync('supperDummy'),
        isSuperAdmin: true
    },
    {
        username: 'clubDummy',
        email: 'clubDummy@gmail.com',
        password: bcrypt.hashSync('clubDummy'),
        isAdmin: true
    },
    {
        username: 'userDummy',
        email: 'userDummy@gmail.com',
        password: bcrypt.hashSync('userDummy'),
    }
]

export default globalUsers