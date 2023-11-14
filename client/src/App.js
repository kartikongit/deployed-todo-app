import ListHeader from "./components/Listheader.js";

import { useEffect, useState } from "react"

import ListItem from "./components/ListItem.js";

import Auth from "./components/Auth.js"

import { useCookies } from 'react-cookie'

function App() {

  const [ cookies , setCookie, removeCookie]= useCookies(null)
  
  const userEmail=cookies.Email;
  const authVoucher= cookies.AuthToken;
  const [tasks, setTasks]= useState(null);


  const getData= async ()=>{
    try{
      const serverResponse= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json= await serverResponse.json();
      setTasks(json)
    }
    catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    if(authVoucher){
      getData()
    }
  },[])

  console.log(tasks)

  const sortedTasks= tasks?.sort((previous,next)=>{
    return new Date(previous.date) - new Date(next.date)
  })

  return (
    <div className="app">

      {!authVoucher && <Auth />}

     {authVoucher && 
     <>
     <ListHeader listName={"🏖️ Hoilday tick list"} getData={getData}/>
     <p className="user-email">You have logged in {userEmail}.</p>
     {sortedTasks?.map((task)=>{
      return <ListItem key={task.id} task={task} getData={getData}/>
     })}
     </>
     }    
     <p className="guided">⍟ Guided by Teacher Ania</p>
    </div>
  );
}

export default App;
