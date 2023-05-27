import { FormControl,FormLabel,Input,InputGroup,InputRightElement,VStack,Button} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  let toast=useToast();
  const Navigate=useNavigate();
  
  let [user_data,setuser_data]=useState({name:"",email:"",pass:"",cpass:"",pic:""});
  let [pic,setpic]=useState(null);
   const [show,setshow]=useState(false);

  function datachanged(event){
      setuser_data({...user_data,[event.target.name]:event.target.value})
      console.log(user_data);
  }

  async function submitHandler(){

    if (!user_data.name || !user_data.email || !user_data.pass || !user_data.cpass) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
        try{         
          console.log(pic)
        let filedata=new FormData();
        filedata.append("profile_pic",pic);
        console.log(filedata)

        let res=await fetch("http://localhost:4000/upload_pic",{
            method:'POST',
            body:filedata,
        })       
        res=await res.json();
        let filename= await res.filename;

        setuser_data({...user_data,pic:filename});    
      
                let response= await fetch("http://localhost:4000/register",{
                  method:"POST",
                  body: JSON.stringify(user_data),
                  headers:{"Content-type":"application/json"}
               });

               if(response.status==400)
               {
                toast({
                  title: "User Account already present !",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
                });
                
               }else
               {
                toast({
                  title:"Registration sucessfull!",
                  status:"success",
                  duration :5000,
                  isClosable:true,
                  position:"top",
                })

                response=await response.json();

                localStorage.setItem("userInfo",JSON.stringify(response))
                Navigate("/chat");

               }
        }
        catch(exception)
        {
           console.log(exception)
          toast({
            title:"Registration failed !",
            status:"error",
            duration :5000,
            isClosable:true,
            position:"top",
          })
        }
  }

  function postpic(event){
    if(event.target.files[0].type==='image/jpeg' || event.target.files[0].type==='image/png' ){
      setpic(pic=>event.target.files[0]);
    } 
    console.log(pic)
  }

  return (
    <VStack>
      <FormControl isRequired>
      <InputGroup mt="20px">
         <FormLabel >Name</FormLabel>
         <Input placeholder="Enter name" name="name" value={user_data.name} onChange={datachanged} />
         </InputGroup>

         <InputGroup mt="20px">
         <FormLabel >Email</FormLabel>
         <Input placeholder="Enter Email" name="email" value={user_data.email}  onChange={datachanged} />
         </InputGroup>

         <InputGroup mt="20px">
         <FormLabel>Password</FormLabel>
         <Input type={show? "text":"password"} placeholder="Enter Password" name="pass" value={user_data.pass} onChange={datachanged}/>
          <InputRightElement><Button onClick={()=>{ return setshow(!show)}}>{show?"Hide":"Show"}</Button></InputRightElement>
         </InputGroup>

         <InputGroup mt="20px">
         <FormLabel>Confirm Password</FormLabel>
         <Input type={show? "text":"password"} placeholder="Enter Password" name="cpass" value={user_data.cpass} onChange={datachanged}/>
          <InputRightElement><Button onClick={()=>{ return setshow(!show)}}>{show?"Hide":"Show"}</Button></InputRightElement>
         </InputGroup>

         <Input type="file" width="100%" mt="20px" name="profile_pic"  onChange={()=>{ return postpic(event)}}/>


      </FormControl>

      <Button colorScheme="orange" width="100%" style={{marginTop:"50px",}}  onClick={submitHandler}>Sign Up</Button>

    </VStack>
  )
}

export default Signup