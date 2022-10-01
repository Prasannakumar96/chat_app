import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../media/Image.png";

export default function Contacts({
  contacts,
  changeChat,
  scon,
  type = "peer",
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const data = localStorage.getItem("id")
    setCurrentUserName(data);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserName && (
        <Container>
          <div className="contacts">
            {contacts && contacts.map((contact, index) => {
              // console.log(contacts);
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.profile} alt="" />
                  </div>
                  <div className="username">
                    <h3>
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <span>Timings</span>
                    <span>10AM - 5PM</span>
                    <span> 🟢 Online</span>
                  </div>
                </div>
              );
            })}
            <div className="studennt">
              {scon &&
                scon.map((e) => {
                  if (type === "peer") {
                    return (
                      <div className="eachs">
                        <img src={e.profile} />
                        {e.firstName} {e.lastName}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 85% 15%;
  overflow: scroll;
  height: 90vh;
  background-color: #f9f6f7;
  width: 80%;
  .contacts {
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #efefef;
      margin-top: 1rem;
      cursor: pointer;
      width: 80%;
      height: fit-content;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 4rem;

          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: #000222;
          text-align: center;
          padding: 0.3rem 0rem;
        }
        span {
          text-align: center;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .avatar {
    img {
      height: 3rem;
      width: 4rem;
    }
  }
  .studennt {
    margin: 0 auto;
    width: 85%;

    div {
      padding: 0rem 0.4rem;
      display: flex;
      justify-content: space-between;
      background-color: #efefef;
      cursor: pointer;
      padding: 0.5rem 0.5rem;
      margin-top: 1rem;
      font-size: 1.3rem;
      border-radius: 0.5rem;
    }
  }

  .immgg {
    height: 2rem;
    border-radius: 50%;
  }
  hr {
    width: 80%;
  }
`;
