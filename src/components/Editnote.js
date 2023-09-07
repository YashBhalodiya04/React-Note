import React, { useContext, useState } from "react";
import Notecontext from '../contexts/Notecontext';
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Editnote = () => {
  const navigate = useNavigate();
  const context = useContext(Notecontext);
  const { updatednote, notedata } = context;

  const [note, setnote] = useState({
    id: notedata.id,
    etitle: notedata.title,
    edescription: notedata.description,
    etag: notedata.tag,
  });

  const handleClick = () => {
    updatednote(note.id, note.etitle, note.edescription, note.etag);
    navigate('/Home')
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleback = () => {
    navigate('/Home')
  }
  return (
    <div className="d-flex flex-column gap-3 addnotecom rounded-4">

      <form className="addform">
        <div className="addformhead">
          <BsFillArrowLeftSquareFill className="backarrow text-light" onClick={handleback} />
          <button type="submit" className="btn p-2 btn-primary" onClick={handleClick} disabled={note.etitle.length < 3 || note.edescription.length < 5} >
            Save
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label fs-5 ">
            Title
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={3}
            required
            value={note.etitle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label fs-5">
            Description
          </label>
          <textarea
            type="textarea"
            className="form-control p-2 textarea"
            name="edescription"
            id="edescription"
            onChange={onchange}
            minLength={5}
            required
            value={note.edescription}
            rows={12}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label fs-5">
            tag
          </label>
          <input
            type="text"
            className="form-control p-2"
            name="etag"
            id="etag"
            onChange={onchange}
            value={note.etag}
          />
        </div>

      </form>
    </div>
  )
}

export default Editnote
