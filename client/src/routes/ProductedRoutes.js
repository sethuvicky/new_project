import React,{useEffect,useState} from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({component: Component, ...rest}) => {

    let [isAuth,setisAuth] = useState(true)

    useEffect(()=>{

        axios.get("http://localhost:3004/isAuthenticated",{ withCredentials: true }).then((data)=>{
         setisAuth(true)
          
         }).catch((err)=>{
            setisAuth(false)
      
         })
      
      
      
      },[])
    return (
       <>
   
{ isAuth && isAuth === true ? <Outlet /> : <Navigate to="/login" />
}
   
       </>
    )
}

export default ProtectedRoute