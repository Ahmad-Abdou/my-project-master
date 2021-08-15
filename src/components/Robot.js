import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "../styling/Robot.css";
import { BiSend } from "react-icons/bi";
import { FaRobot } from "react-icons/fa";

function Robot() {
  const [botClicked, isBotClicked] = useState(false);
  const [BotChatText, setBotChatText] = useState({ text: "" });
  const [userChat, setUserChat] = useState([]);
  const [text, setText] = useState("");

  const botChatChangeHandler = (e) => {
    setBotChatText((e.target.text = e.target.value));
  };
  const botChatSubmit = (e) => {
    e.preventDefault();
    setUserChat((current) => [...current, BotChatText]);
    setBotChatText({ text: "" });
  };

  return (
    <div>
      {botClicked === true ? (
        <div className="whole-container">
          <div className="botchat-container">
            <FaRobot
              onClick={() => isBotClicked(!botClicked)}
              className="chat-bot-clicked"
            ></FaRobot>
            <h6 className="chatbot-header">M-S Bot</h6>
            <br />
            <div className="user-chat-span">
              <p className="first-message">
                Welcome to M-S Bot . please type 'commands' to show more info.
              </p>
              {userChat.map((myText) => {
                return (
                  <div>
                    <div className="aligning-user-text">
                      <span className="user-text-inchat">{myText}</span>
                    </div>
                    <div className="aligning-bot-text">
                      <p className="bot-text-inchat">
                        {myText.toLowerCase() === "hi" ? (
                          <span>Hi</span>
                        ) : myText.toLowerCase() === "hello" ? (
                          <span>Hello</span>
                        ) : myText.toLowerCase() === "service" ? (
                          <span>
                            You can check out our store if you are looking to
                            buy movies.
                            <br />
                            <a className="service-url" href="/">
                              http://localhost:3000/home
                            </a>
                          </span>
                        ) : myText.toLowerCase() === "contact" ? (
                          <span>
                            You can reach out our support by following this
                            link.
                            <br />
                            <a className="service-url" href="/">
                              http://localhost:3000/contact
                            </a>
                          </span>
                        ) : myText.toLowerCase() === "commands" ? (
                          <span>service , contact , discount</span>
                        ) : myText.toLowerCase() === "discount" ? (
                          <span>
                            Unfortunately we dont have discount for the moment!
                          </span>
                        ) : myText === "" ? (
                          <span></span>
                        ) : (
                          <span>Sorry I dont understand what do you mean!</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Form className="botchat-form" onSubmit={botChatSubmit}>
              <input
                className="user-input"
                type="text"
                name="text"
                value={BotChatText.text}
                placeholder="type here.."
                onChange={botChatChangeHandler}
              />
              <BiSend
                onClick={botChatSubmit}
                className="botchat-send-icon"
              ></BiSend>
            </Form>
          </div>
        </div>
      ) : (
        <FaRobot
          className="chat-bot"
          onClick={() => isBotClicked(!botClicked)}
        ></FaRobot>
      )}
    </div>
  );
}

export default Robot;
