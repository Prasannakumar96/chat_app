import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  sendMessageRoute,
  recieveMessageRoute,
  groupMessages,
  peerMessages,
} from "../utils/APIRoutes";

export default function ChatContainer({
  currentChat,
  socket,
  scon,
 
}) {
  const [messages, setMessages] = useState([]);

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const getMsg = async () => {
    const data = localStorage.getItem("id")
    let response;
  
      response = await axios.post(peerMessages, {
        user: data,
      });
    
    
    setMessages(response.data);
  };

  useEffect(() => {
    getMsg();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
      
          localStorage.getItem("id")
        
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg, img) => {


    const data = localStorage.getItem("id")
  

  
      socket.current.emit("send-peer-msg", {
        to: "peer",
        from: data,
        msg,
        img,
      });
      await axios.post(groupMessages, {
        from: data,
        to: "peer",
        files: img,
        message: msg,
      });
    

    const msgs = [...messages];

    msgs.push({ fromSelf: true, message: msg, files: img });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, img) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
          files: img,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              style={{ borderRadius: "50%", height: "3rem", width: "3rem" }}
              src={currentChat.profile}
              alt=""
            />
          </div>
          <div className="username">
            <h3>
              {currentChat.firstName} {currentChat.lastName}
            </h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages &&
          messages.map((message) => {
         
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div>
                    <p>
                      <p className="content "> {message.message}</p>
                      <br />
                      <img
                        className="images"
              
                        src={message.files}
                        alt=""
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  height: 80vh;
  margin: 3rem 0rem 0rem 5rem;
  overflow: hidden;
  background-color: #efefef;
  border-radius: 0.5rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #000222;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    height: 25rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      position: relative;
      .content {
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.5rem;
        color: black;

        position: relative;
       
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 60%;
        font-size: 1rem;
          .images{
        width:5rem !important;

          }
        }
        @media screen and (min-width: 480px) and (max-width: 720px) {
        font-size: 0.6rem;
        max-width: 60%;
        .images{
        width:1rem !important;
        }

        }
      }
    }
    .images{
      width :15rem; 
      float:right;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        width:10rem ;
          }
        @media screen and (min-width: 480px) and (max-width: 720px) {
  
        width:9rem ;
      
         }
     }
    .sended {
      margin: 0 auto;
      justify-content: flex-end;

      .content {
        color: white;
        float: right;
        background-color: #000222;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        float: left;
        background-color: rgb(96, 96, 226);
      }
    }
  }
`;
