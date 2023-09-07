import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsFillPlusSquareFill } from "react-icons/bs";
import Notes from "./Notes";
import Notecontext from "../contexts/Notecontext";

const Home = () => {
  const context = useContext(Notecontext);
  const { notes, getallnotes, setnotes, userdata } = context;
  const handlelogout = () => {
    localStorage.removeItem("token");
  };

  const searchnote = (note, e) => {
    let string = e.target.value;
    if (string !== "") {
      let data = [];
      for (let i = 0; i < note.length; i++) {
        if (note[i].title.includes(string)) {
          data.push(note[i]);
        }
      }
      setnotes(data);
    } else {
      getallnotes();
    }
  };
  return (
    <div className="homepage d-flex flex-column justify-content-start align-item-center gap-1 p-3 rounded-3">
      <nav className="navbar navbar-expand-sm bg-dark rounded-3 d-flex flex-row justify-content-between align-items-center px-2 ">
        <Link className="navbar-brand text-white " to="/Home">
          MyNotes
        </Link>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-white bg-info rounded-3"
              to=""
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userdata.name}
            </Link>
            <div
              className="dropdown-menu bg-dark rounded-3 mt-2"
              aria-labelledby="navbarDropdown"
            >
              <div className="d-flex flex-column justify-content-between align-items-start">
                <p className=" p-2 text-white bg-dark">{userdata.email}</p>
                <Link
                  type="button"
                  className="btn btn-primary mx-2"
                  to={"/"}
                  onClick={handlelogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div className="searchcom bg-dark d-flex flex-row justify-content-start align-items-center gap-3 rounded-3 p-2">
        <input
          type="text"
          name="search"
          id="search"
          className="searchbar"
          placeholder="Search Notes"
          onChange={(e) => {
            searchnote(notes, e);
          }}
        />
        <BsSearch className="text-light searchicon " />
        <Link to="/Addnote">
          <BsFillPlusSquareFill className=" text-light plusicon " />
        </Link>
      </div>
      <div className="notescom">
        <Notes />
      </div>
    </div>
  );
};

export default Home;
