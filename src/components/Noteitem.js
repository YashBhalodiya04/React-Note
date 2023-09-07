import React, { useContext } from 'react'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Notecontext from '../contexts/Notecontext';
import { useNavigate } from 'react-router-dom';

const Noteitem = (props) => {
  const context = useContext(Notecontext);
  const {deletenote,handleupdate} = context;
  const navigate = useNavigate();

  const {notes}= props

  const passdata = (notes) => {
    handleupdate(notes);
    navigate('/Editnote')
  }
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{notes.title} - {notes.tag}</h5>
        <p className="card-text">{notes.description}</p>
        <div className='d-flex flex-column align-items-start justify-content-start'>
        <p className="card-text">: - {(notes.date).slice(0,10)}</p>
        <div className='d-flex gap-3 align-items-center justify-content-start'>
          <AiFillDelete className='deleteicon fs-5' onClick={()=>{deletenote(notes._id)}} />
          <AiFillEdit className='editicon fs-5 ' onClick={()=>{passdata(notes)} } />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
