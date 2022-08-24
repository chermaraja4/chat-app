import ChartBox from "../chat-box/Chat-box"
import { useState } from "react"
import "./style.css"

export default function Home(){

    const [MessageMetaData,setMessageMetaData]=useState({
        "bond":[
        { id:"Aaron_uuid_1",name:"Aaron" ,},
        { id:"Brayden_uuid_2",name:"Brayden"}],
        "Adele" :[
        { id:"Bennu_uuid_2",name:"Bennu"},
        { id:"Briony__uuid_4",name:"Briony"}],
        meta_Data:[]    
    })

    const [seletedUser,setselectedUser]=useState("chooseOne")
    const [chatOne,setChatOne]  = useState(false)
    const [contactPerson,setContactPerson]=useState("")
    const [contacts,setContacts]=useState([ ])
    const [message,setMessage]=useState([])
    

    const [user,setUser]=useState([
        {id:"",name:"SelectUser"},        
        {id:"uuid_bone",name:"bond"},
        {id:"uuid_jeck",name:"Adele"},
     
    
    ])
  
    const selectUser=(e)=>{  
        setselectedUser(e.target.value);
        const name=e.target.value;
        setContacts(MessageMetaData[name])  ;    
        setChatOne(true);
    }
    const selectContact=(item)=>{            
        setContactPerson(item.name); 
        
      let result;
        result=MessageMetaData.meta_Data.length>0 && MessageMetaData.meta_Data.map((list)=>{
           
            if((list.receiver===item.name && list.sender===seletedUser) ||( list.receiver===seletedUser && list.sender===item.name ) )     {       
                return list
            }

        })
        result = result.length>0&&result.filter(function( element ) {
            return element !== undefined;
         });             
        setMessage(result);

    }

    const saveMessage =(newMessage)=>{      
        MessageMetaData.meta_Data=[...MessageMetaData.meta_Data,newMessage]
        if(message.length>0){
            setMessage([...message,newMessage])
        }  else{
            setMessage([newMessage])

        }     
       
    }

    

    return(
 <div className="Home_page"> 
 {!chatOne &&
 
        <div className="box">
           <select  value={seletedUser} onChange={(e)=>{selectUser(e)}}>
              {user.map((list,index)=>{
                return( <option  key={index}  value={list.name} hidden={list.name==="chooseOne"? true :false}
                 selected={list.name==="SelectOne"? true :false}>{list.name}</option>)
                  })}    
            </select>
         </div>
 }
  <div className="chat-wraper">
    {chatOne &&  <ChartBox id={"uuid_1"} selectContact={(list)=>selectContact(list)} contactPerson={contactPerson} tittle={contactPerson} sender={seletedUser} receiver={contactPerson} saveMessage={(newMessage)=>saveMessage(newMessage)}  message={message} contacts={contacts} setContactPerson={setContactPerson}/>  }
     {contactPerson &&   <ChartBox id={"uuid_2"} tittle={seletedUser} Status={true} sender={contactPerson} receiver={seletedUser} saveMessage={(newMessage)=>saveMessage(newMessage)} message={message} /> } 
        </div>           
 </div>
    )   
}