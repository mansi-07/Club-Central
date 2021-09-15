import dotenv from 'dotenv'
import connectDatabase from './configurations/databaseConfig.js'
import globalUsers from './databaseFakerScript/globalUsers.js'
import users from './databaseFakerScript/users.js'
import clubs from './databaseFakerScript/clubs.js'
import institutes from './databaseFakerScript/institute.js'
import appMaintainers from './databaseFakerScript/appMaintainers.js'

import GlobalUser from './models/globalUserModel.js'
import User from './models/userModel.js'
import Club from './models/clubModel.js'
import Institute from './models/instituteModel.js'
import AppMaintainer from './models/appMaintainerModel.js'

dotenv.config()

await connectDatabase()


const importData = async () =>{
    try {
        await AppMaintainer.deleteMany()
        await AppMaintainer.insertMany(appMaintainers)

        await Institute.deleteMany()
        const createdInstitutes = await Institute.insertMany(institutes)

        const dummyGlobalUsers = globalUsers.map(user=> {
            return {
                ...user,
                instituteName: createdInstitutes[0]._id
            }
        })

        await GlobalUser.deleteMany()
        const createdUsers = await GlobalUser.insertMany(dummyGlobalUsers)

        const dummyClubs = clubs.map(club => {
            return{
                ...club,
                username: createdUsers[1]._id
            }
        })
        await Club.deleteMany()
        await Club.insertMany(dummyClubs)

        const dummyUsers = users.map(user => {
            return{
                ...user,
                username: createdUsers[2]._id
            }
        })
        await User.deleteMany()
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
        await AppMaintainer.deleteMany()
        await Institute.deleteMany()
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
