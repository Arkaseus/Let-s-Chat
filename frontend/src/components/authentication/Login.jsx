import { FormControl,FormLabel,Input,InputGroup,InputRightElement,VStack,Button} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const Login = () => {

  const toast =useToast();

const Navigate=useNavigate();
  
  let [user_data,setuser_data]=useState({email:"",pass:""});
   const [show,setshow]=useState(false);

  function datachanged(event){
      setuser_data({...user_data,[event.target.name]:event.target.value})
      console.log(user_data);
  }

 const submitHandler=async ()=>{
console.log("inside submit")

    let res= await fetch("http://localhost:4000/login",{
      method:"POST",
      body: JSON.stringify(user_data),
      headers:{"Content-type":"application/json"}
   });

   console.log(res)

   if(res.status===401)
   { 
    toast({
      title:"Invalid credentials !",
      status:"error",
      duration :2000,
      isClosable:true,
      position:"top",
    })
   }
   else
   {
    toast({
      title:"Login sucessfull!",
      status:"success",
      duration :4000,
      isClosable:true,
      position:"top",
    })
    console.log("login sucess")
    res=await res.json();

    localStorage.setItem("userInfo",JSON.stringify(res))
    Navigate("/chat");
   }

  }

  function postDetails(event){

  }

  return (
    <VStack >
      <FormControl isRequired>

         <InputGroup mt="20px">
         <FormLabel >Email</FormLabel>
         <Input placeholder="Enter Email" name="email" value={user_data.email}  onChange={datachanged} />
         </InputGroup>

         <InputGroup mt="20px">
         <FormLabel>Password</FormLabel>
         <Input type={show? "text":"password"} placeholder="Enter Password" name="pass" value={user_data.pass} onChange={datachanged}/>
          <InputRightElement><Button onClick={()=>{ return setshow(!show)}}>{show?"Hide":"Show"}</Button></InputRightElement>
         </InputGroup>

      </FormControl>

      <Button colorScheme="blue" width="100%" style={{marginTop:"50px",}}  onClick={submitHandler}>Login</Button>

    </VStack>
  )

}

export default Login