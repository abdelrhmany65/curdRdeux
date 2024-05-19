import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const WithGurd = ({children}) => {

    const navigate= useNavigate()
    const { isLoggedIn } = useSelector((state) => state.isLoggedIn)
    useEffect(()=>{
        if(!isLoggedIn)navigate("/")
    },[isLoggedIn,navigate])
  return (

    <div>WithGurd</div>
  )
}

export default WithGurd