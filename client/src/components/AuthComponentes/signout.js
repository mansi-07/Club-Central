import {React,useEffect} from 'react'
import {  useHistory } from 'react-router-dom'

const SignOut = ({setSigninUser}) => {
    const history = useHistory()

    useEffect(() => {
        alert("Sign Out Successful!")
        setSigninUser({})
        history.push("/signup")
    }, []);

    return null
}
export default SignOut;