import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../graphql";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainerPeer from "../components/ChatContainerPeer";
import ContactsPeer from "../components/ContactsPeer";
import { useSelector, useDispatch } from "react-redux";
import { getMentor } from "../redux/slices/mentor";
import { getStudents } from "../redux/slices/students";
// import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.Mentor.value);
  const students = useSelector((state) => state.students.value);
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [c, setc] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null || token == undefined || token == "" || token == "null") {
      console.log(token);
      navigate("/signin", { replace: true });
    }
    if (!localStorage.getItem("id")) {
      return {
        msg: "",
      };
    } else {
      setCurrentUser(localStorage.getItem("id"));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getMentor());
      dispatch(getStudents());
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <ContactsPeer
            contacts={mentors}
            scon={students}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? null : (
            <ChatContainerPeer
              currentChat={currentChat}
              scon={students}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .container {
    height: 85vh;
    width: 85vw;

    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
