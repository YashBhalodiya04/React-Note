import React, { useContext, useState } from "react";
import Notecontext from '../contexts/Notecontext';
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

function Addnote() {
  const context = useContext(Notecontext);
  const { addnote } = context;
  const navigate = useNavigate()

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({title: "",
    description: "",
    tag: "",})
    navigate('/Home')
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleback = () =>{
    navigate('/Home')
  }
  return (
    <div className="d-flex flex-column gap-3 addnotecom rounded-4">
      
      <form className="addform">
      <div className="addformhead">
      <BsFillArrowLeftSquareFill className="backarrow text-light" onClick={handleback}/>
      <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn p-2 btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fs-5 ">
            Title
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="exampleInputEmail1"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={3}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-5">
            Description
          </label>
          <textarea
            type="textarea"
            className="form-control p-2 textarea"
            name="description"
            id="description"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
            rows={12}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label fs-5">
            tag
          </label>
          <input
            type="text"
            className="form-control p-2"
            name="tag"
            id="tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>
        
      </form>
    </div>
  )
}

export default Addnote
