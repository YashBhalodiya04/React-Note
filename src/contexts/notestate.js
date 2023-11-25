import React, { useState } from 'react'
import Notecontext from './Notecontext'

const Notestate = (props) => {

    const [notes, setnotes] = useState([]);
    const [userdata, setuserdata] = useState({});
    const [notedata, setnotedata] = useState({ id: "", title: "", description: "", tag: ""});

    //    GET ALL NOTES
    const getallnotes = async () => {

        // CALL API
        const response = await fetch("https://colorful-foal-loafers.cyclic.app/api/notes/fetchallnotes", {
            mathod: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const alldnotes = await response.json();
        setnotes(alldnotes);
    };

    //    ADD NOTES
    const addnote = async (title, description, tag) => {

        // CALL API
        const response = await fetch("https://colorful-foal-loafers.cyclic.app/api/notes/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    };

    //      DELETE NOTE
    const deletenote = async (id) => {

        let chance = window.confirm("Are you sure?")
        if (chance) {
            
            // CAL API
            const response = await fetch(`https://colorful-foal-loafers.cyclic.app/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            response.json();
    
            const updatednotes = notes.filter((note) => {
                return note._id !== id;
            });
            setnotes(updatednotes);
        }

    }

    //      UPDATE NOTES
    const updatednote = async (id, title, description, tag) => {

        // CALL API
        const response = await fetch(`https://colorful-foal-loafers.cyclic.app/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        response.json();

        let newnotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newnotes.length; i++) {
            const element = newnotes[i];
            if (element._id === id) {
                newnotes[i].title = title;
                newnotes[i].description = description;
                newnotes[i].tag = tag;
                break;
            }
        }
        setnotes(newnotes);
    };

    //      GET NOTE DATA
    const handleupdate = (note) => {
        setnotedata({
            id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag
        })
    };

    //      GET USER DETAILS
    const userdetail = async () =>{

        // CALL API
        const response = await fetch("https://colorful-foal-loafers.cyclic.app/api/auth/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const usserdata = await response.json();
        setuserdata(usserdata);
    }

    return (
        <Notecontext.Provider value={{ notes, setnotes,getallnotes, addnote, deletenote, updatednote, handleupdate, notedata,userdetail,userdata }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate
