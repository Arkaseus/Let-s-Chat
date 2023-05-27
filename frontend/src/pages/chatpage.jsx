import React, { useContext } from 'react'
import {useEffect,useState} from 'react'
//"http://localhost:4000/profile_pic/"
import {ChatState}  from '../context/chatprovider';
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import Chatbox from '../components/Chatbox'
import {Box} from '@chakra-ui/react'




const chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
   const {user}= ChatState();
   
   return (
    <div style={{width:"100%", height:"90%"}} color='green'>
     {user && <SideDrawer/>}
    <Box style={{display:"flex",justifyContent:"space-between"}}  w="99%" h="91.5vh" p="10px" color="black">

    {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
    </Box>
    </div>
   )
}

export default chatpage