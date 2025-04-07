import { useState } from "react";
import { notesContext } from "./notescontext";
import { toast } from "react-toastify";

const NoteState = ({ children }) => {
  const allNotesData = [];

  const [allNotes, setAllNotes] = useState(allNotesData);

  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/getnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setAllNotes(data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const addNotes = async (userNotes, image) => {
    console.log(userNotes, image, 12);
    const { title, description, tag } = userNotes;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      const response = await fetch("http://localhost:5000/api/notes/addnotes", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setAllNotes(allNotes.concat(data.usernotes));
      if (data.success) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const addNotes = async (userNotes) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/notes/addnotes", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify(userNotes),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setAllNotes(allNotes.concat(data.usernotes));
  //     if (data.success) {
  //       toast.success(data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     } else {
  //       toast.error(data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const updateNotes = async (noteId, note) => {
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenotes/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      let newNotes = JSON.parse(JSON.stringify(allNotes));

      for (let i = 0; i < newNotes.length; i++) {
        let elements = newNotes[i];
        if (noteId === elements._id) {
          elements.title = note.title;
          elements.description = note.description;
          elements.tag = note.tag;
          break;
        }
      }
      setAllNotes(newNotes);

      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteNotes = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/deletenotes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAllNotes(allNotes.filter((note) => note._id !== noteId));
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <notesContext.Provider
      value={{
        allNotes,
        setAllNotes,
        addNotes,
        getNotes,
        updateNotes,
        deleteNotes,
      }}
    >
      {children}
    </notesContext.Provider>
  );
};

export default NoteState;
