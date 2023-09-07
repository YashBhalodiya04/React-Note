import React, { useContext, useEffect } from "react";
import Noteitem from "./Noteitem";
import Notecontext from "../contexts/Notecontext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(Notecontext);
  const { notes, getallnotes, userdetail } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallnotes();
      userdetail();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="notes">
        {notes && notes.length > 0
          ? notes.map((note) => {
            return (
              <Noteitem key={note._id} notes={note} />
            );
          })
          : ""}
      </div>
    </div>
  );
};

export default Notes;
