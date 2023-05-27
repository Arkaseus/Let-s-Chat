import ChatContext from "./chatprovider";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const ChatProvider=(props)=>{
 
    const [user,setUser]=useState();
    const Navigate=useNavigate();


    useEffect(() => {
      const userinfo=JSON.stringify(localStorage.getItem("userInfo"));
      setUser(userinfo);

     if(!userinfo)
     {   Navigate("/")
     }
    
    }, [Navigate])
    

     return (  <ChatContext.Provider value={{user,setUser}}>{props.children}</ChatContext.Provider>);
};
 
export default ChatProvider;