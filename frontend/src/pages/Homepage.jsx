import React from 'react'
import {Container,Box,Text,Tabs,Tab,TabList,TabPanels,TabPanel} from '@chakra-ui/react';
import{useState,useEffect} from 'react'
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useNavigate } from 'react-router-dom';
import './home.css'
const Home = () => {

   const Navigate=useNavigate();
   
  useEffect(() => {
   const userinfo=localStorage.getItem("userInfo")

   if(userinfo)
   {
   Navigate("/chat");
   }
   
}, [Navigate])


  return (
   
         <Container maxWidth='xl' centerContent >

            <Box d='flex' justifyContent='center' p='3' background='white' borderRadius='1g' w='100%' m='10px'className='loginBox'>
               <Text marginLeft="40%" color='black' fontSize="20px"  fontWeight="bolder" >Let's Chat</Text>
            </Box>

      <Box bg="white" w="100%" p={4}  borderWidth="1px" color="black" className='loginBox'>
      
        <Tabs varient="soft-rounded" colorScheme="blue">
               <TabList>
                  <Tab _hover={{
                     color:"white",
                     backgroundColor:"#4ec2f0"
                  }} width="50%">Login</Tab>
                  <Tab _hover={{
                     color:"white",
                     backgroundColor:"#f0af4e"
                  }} width="50%">Sign up</Tab>
               </TabList>
 
               <TabPanels>
                  <TabPanel>  <Login/>  </TabPanel>
                  <TabPanel>  <Signup/>  </TabPanel>
             </TabPanels>
         </Tabs>

         </Box>
         </Container>
  
  )
}

export default Home