import TickIcon from './TickIcon.js'
import ProgressBar from './ProgressBar.js'

import Modal from './Modal.js'

import { useState } from "react"

const ListItem = ({task, getData}) => {

  const [ showModal, setModal ]= useState(false)


  async function handleDelete(){
    try{
      const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method:'DELETE'
      })
      if(response.status===200){
        getData()
      }
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <div className="list-item">
      <div className="information-box">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar 
        progress={task.progress} 
        />
      </div>

      <div className="button-container">
        <button className="edit" onClick={()=>{setModal(true)}}>EDIT</button>
        <button className="delete" onClick={handleDelete}>DELETE</button>
      </div>


      {showModal && <Modal Mode={"edit"} setModal={setModal} task={task} getData={getData} />}
      
    </div>
  )
}

export default ListItem 