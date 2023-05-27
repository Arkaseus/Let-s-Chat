import { createContext, useContext,useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
 const ChatContext=createContext();

const ChatProvider=({children})=>{
 
    
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  
    const Navigate=useNavigate();


    useEffect(() => {
      const userinfo=JSON.parse(localStorage.getItem("userInfo"));
      setUser(userinfo);

     if(!userinfo)
     {   Navigate("/")
     }

    
    }, [Navigate])

     return   <ChatContext.Provider value={{
      selectedChat,
      setSelectedChat,
      user,
      setUser,
      notification,
      setNotification,
      chats,
      setChats,
     }}>
      {children}
      </ChatContext.Provider>;
};
 
export const ChatState = () => {
    return useContext(ChatContext);
  };
  
  export default ChatProvider;
