
import Modal from "./Modal.js"
import { useState } from "react"

import { useCookies } from 'react-cookie'

const Listheader = ({listName, getData}) => {


  const [ showModal, setModal ]= useState(false);

  const [ cookies, setCookie, removeCookie]= useCookies(false);

  function signOut(){
    removeCookie('email');
    removeCookie('AuthToken');
    window.location.reload()
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="addTask" onClick={()=>{setModal(true)}}>ADD TASK</button>
        <button className="logout" onClick={signOut} >SIGN OUT</button>
      </div>

      {showModal && <Modal Mode={'create'} setModal={setModal} getData={getData}/>}
      

    </div>
  )
}

export default Listheader