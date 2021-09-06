import dotenv from 'dotenv'
import connectDatabase from './configurations/databaseConfig.js'
import globalUsers from './databaseFakerScript/globalUsers.js'
import users from './databaseFakerScript/users.js'
import clubs from './databaseFakerScript/clubs.js'

import GlobalUser from './models/globalUserModel.js'
import User from './models/userModel.js'
import Club from './models/clubModel.js'

dotenv.config()

await connectDatabase()


const importData = async () =>{
    try {
        await GlobalUser.deleteMany()
        const createdUsers = await GlobalUser.insertMany(globalUsers)

        const dummyClubs = clubs.map(club => {
            return{
                ...club,
                username: createdUsers[1]._id
            }
        })
        await Club.insertMany(dummyClubs)

        const dummyUsers = users.map(user => {
            return{
                ...user,
                username: createdUsers[2]._id
            }
        })
        await User.insertMany(dummyUsers)

        console.log("Data Imported")

        process.exit()

    } catch (error) {
        console.log(`Error:${error}`)
        process.exit(1)
    }
}


const deleteData = async () =>{
    try {

        await GlobalUser.deleteMany()
        await User.deleteMany()
        await Club.deleteMany()

        console.log("Data deleted")

        process.exit()

    } catch (error) {
        console.log(`Error:${error}`)
        process.exit(1)
    }
}


if(process.argv[2]==='-del'){
    deleteData()
}else{
    importData()
}
