import React, { useState, useEffect } from "react";
import imgg from "../media/1.png";
import img3 from "../media/4.png";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import InputEmoji from "react-input-emoji";
import "../styles/chats.scss";
import clip from "../media/icon.png";
import DropZone from "react-dropzone";
import Dropzone from "react-dropzone";

export default function ChatInput({ handleSendMsg }) {
  const [img, setImg] = useState("");
  const [val, setVal] = useState("");
  const [image, setImage] = useState("");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "messages");

      fetch("https://api.cloudinary.com/v1_1/cliqtick/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.url);
          if (data.url !== "") {
            const uploadedFileUrl = data.url;

            handleSendMsg(image[0].name, uploadedFileUrl);
            setImg(uploadedFileUrl);
          }
        });
      console.log(image[0]);
      setImage("");
    } catch (error) {
      console.log(error);
    } finally {
      setImage("");
    }
  };
  const [msg, setMsg] = useState([""]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    let files = img;
    message += emojiObject.emoji;
    setMsg(message);
    setVal(files);
  };

  const sendChat = (event) => {
    event.preventDefault();

    if (image[0]) {
      handleSendMsg(img);

      uploadImage();
    } else {
      if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
      }
    }
  };
  var valu;

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <img src={imgg} onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div className="gridIn">
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <div className="file">
            <input
              className="fileupload"
              type="file"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
            <img src={clip} alt="" className="btn-upload" />
          </div>
          <input
            type="text"
            placeholder="Enter your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </form>

        <button type="submit" onClick={sendChat}>
          Send
          <img src={img3} alt="" />
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;

  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: white;
  padding: 0 2rem;
  width: 85%;
  height: 3.5rem;
  left: 0;
  margin: 0 auto;

  margin-top: -0.5rem;
  border-radius: 0.5rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      img {
        height: 2rem;
        cursor: pointer;
      }

      svg {
        font-size: 1.5rem;
        color: rgb(248, 203, 0);
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;

        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          color: white;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 85%;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white;
    border: 3px solid #efefef;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 0rem;
      font-size: 1.2rem;
      color: #000222;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    .file {
      img {
        cursor: pointer;
      }
    }
  }
  button {
    font-size: 1.3rem;
    padding: 0.2rem 1rem 0.1rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    background-color: #000222;
    align-items: center;
    background-color: ;
    border: none;
    color: white;
    cursor: pointer;
    img {
      margin: -0.2rem 0rem 0rem 0.8rem;
      height: 1.3rem;
      cursor: pointer;
      font-size: 2rem;
      color: white;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      img {
        font-size: 1rem;
      }
    }
  }
  .gridIn {
    display: flex;
    column-gap: 1rem;
  }

  .file {
    width: 2rem;
    margin: 0.1rem 0.2rem 0rem 0.9rem;
    display: inline-block;
    position: relative;
    overflow: hidden;
    float: right;
    cursor: pointer;
  }

  .gridIn input[type="file"] {
    left: 0;
    top: 0;
    opacity: 0;
    position: absolute;
    font-size: 50px;
    border: 2px solid;
  }
  .btn-upload {
    height: 1.8rem;
    background-color: #fff;
    border-radius: 10px;
  }
`;
