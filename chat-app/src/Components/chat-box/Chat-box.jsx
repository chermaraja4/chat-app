import "./style.css"
import { useState } from "react"

export default function ChartBox(props) {
    const { id, selectContact, contactPerson, tittle, Status, sender, receiver, saveMessage, message, contacts, setContactPerson } = props;

    const [inputValue, setInputValue] = useState("")


    const Messagesend = () => {

        const newMessage = {
            "message": inputValue,
            "sender": sender,
            "receiver": receiver,
            "timestamp": 1234566,           
            "id": id
        }
        saveMessage(newMessage)
        setInputValue("")


    }


    const sendMessage = (e) => {
        setInputValue(e.target.value)
    }



    const [selectFriend, setSelectFriend] = useState(false)
    const selectFriendList = () => {
        setSelectFriend(!selectFriend)
        setContactPerson("")
    }


    return (
        <div>
            <div className="wrapper">
                {Status ?
                    <>
                        <div className="title">
                            <div>{tittle ? tittle : "Simple Chatbot"}</div>
                        </div>
                        <div className="box">
                            {message.length > 0 && message.map((list, index) => {
                                return (
                                    <div key={index}>
                                        {list.id === id ?
                                            <div className="item right">
                                                <div className="msg">
                                                    <p>{list.message}</p>
                                                </div>
                                            </div>
                                            : <>
                                                <br clear="both" />
                                                <div className="item left">
                                                    <div className="icon">
                                                        <i className="fa fa-user"></i>
                                                    </div>
                                                    <div className="msg">
                                                        <p>{list.message}</p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </>
                    : <>
                        <div className="title">
                            <div>{tittle ? tittle : "Simple Chatbot"}</div>
                            {<div className="chat-plus" onClick={selectFriendList}>+</div>}
                        </div>
                        <div className="box">
                            {(!selectFriend && contactPerson) &&
                                message.length > 0 && message.map((list, index) => {
                                    return (
                                        <div key={index}>
                                            {list.id === id ?
                                                <div className="item right">
                                                    <div className="msg">
                                                        <p>{list.message}</p>
                                                    </div>
                                                </div>
                                                : <>
                                                    <br clear="both" />
                                                    <div className="item left">
                                                        <div className="icon">
                                                            <i className="fa fa-user"></i>
                                                        </div>
                                                        <div className="msg">
                                                            <p>{list.message}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })
                            }
                            {selectFriend &&
                                <div className="contact-list">
                                    {contacts.length > 0 && contacts.map((list, index) => {
                                        return (
                                            <div className="contact" onClick={() => {
                                                selectContact(list);
                                                setSelectFriend(false)
                                            }
                                            } key={index}>
                                                <div className="icon">
                                                    <i className="fa fa-user"></i>
                                                </div>
                                                <div>
                                                    {list.name}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </>
                }
               
                {((contactPerson && !selectFriend)  || receiver) &&  
                <div className="typing-area">
                    <div className="input-field">
                        <input type="text" placeholder="Type your message" required value={inputValue} onChange={sendMessage} />
                        <button onClick={Messagesend}>Send</button>
                    </div>
                </div>
                 }
            </div>
        </div>
    )
}