import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { useToast } from "@chakra-ui/react";
// import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import { ChatState } from "../../context/chatprovider";
import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import './style.css'
let imgurl="http://localhost:4000/profile_pic/";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);


  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    Navigate("/");

  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res= await fetch(`http://localhost:4000/user?search=${search}`, config);
       let data=await res.json();
   console.log(data)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
   var flag=false,data={};
    try {
      setLoadingChat(true);

       console.log("searched chat :")
  
        chats.forEach(ele => {
          
          if(ele.users[0]._id===userId || ele.users[1]._id === userId)
          { flag=true;
            data=ele;
          }
        });
        if(flag==false)
        {  console.log("inside flag false :")
          const config = {
            method:"POST",
            body: JSON.stringify({userId} ),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          // const { data } = await axios.post(`/chat`, { userId }, config);
          const res2= await fetch(`http://localhost:4000/chat`,config);
            data=await res2.json();
  
            setChats([data, ...chats]);
        }

        setSelectedChat(data);
        setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  return (
    <>
      <Box  className="navbar"  style={{display:"flex", justifyContent:"space-between"}}
        
        alignItems="center"
       
        w="100%"
        p="5px 10px 5px 10px"
      
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="outline" onClick={onOpen} >
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4} >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="3xl" fontFamily="Work sans"  color='white'>
        Let's Chat
        </Text>

              <div>
                <Menu>
                  <MenuButton p={1}>
                    {/* <NotificationBadge
                    
                    /> */}
                    <BellIcon fontSize="2xl" m={1} color='white'/>
                  </MenuButton>
                  {/* <MenuList pl={2}>
                  
                      <MenuItem
                      
                      >
                        
                      </MenuItem>
        
                  </MenuList> */}
                </Menu>
                <Menu  >
                  <MenuButton type="outline" as={Button} bg="transparent" border="1px solid white" rightIcon={<ChevronDownIcon />}  >
                    <Avatar
                      size="sm"
                      cursor="pointer"
                      name={user.name}
                      src={imgurl+user.pic}
                    />
                  </MenuButton>
                  <MenuList>
                    <ProfileModal user={user}>
                      <MenuItem>My Profile</MenuItem>{" "}
                    </ProfileModal>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </div>

      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button   onClick={handleSearch} >Go</Button>  
            
            </Box>
            {loading ? (
              // "Loading..."
              <Spinner ml="auto" d="flex" />
              // <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
