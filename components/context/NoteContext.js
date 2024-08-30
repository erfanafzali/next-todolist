import { createContext, useEffect, useReducer, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// const BASE_URL = "http://localhost:4000";
const NoteContext = createContext();


//initial state
const initialState = {
  addNote: [] || null,
  isLoading: false,
  error: null,
};


//reducer function + switchCase
function NoteReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "addNotes/loaded":
      return {
        ...state,
        isLoading: false,
        addNote: action.payload,
      };
    case "addNote/loaded":
      return {
        ...state,
        isLoading: false,
      };
    case "addNote/created":
      return {
        ...state,
        isLoading: false,
        addNote: [...state.addNote, action.payload],
      };
    case "addNote/checked":
      return {
        ...state,
        isLoading: false,
        addNote: state.addNote.map((note) =>
          note.id === action.payload.id
            ? { ...note, completed: !note.completed }
            : note
        ),
      };
      case "addNote/edit":
        return {
          ...state,
          isLoading: false,
          addNote: state.addNote.map((note) =>
            note.id === action.payload.id
              ? { ...note, ...action.payload } 
              : note
          ),
        };
    case "addNote/deleted":
      return {
        ...state,
        isLoading: false,
        addNote: state.addNote.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}



//Provider => wrap on project
function NoteProvider({ children }) {
  const [{ isLoading, addNote }, dispatch] = useReducer(
    NoteReducer,
    initialState
  );


  // First mount fetchData
  useEffect(() => {
    async function fetchNoteList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/note`
        );
        dispatch({ type: "addNotes/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in loading NoteList",
        });
      }
    }
    fetchNoteList();
  }, []);


  // Get note if we need page for each note
  async function getNote(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`
      );
      dispatch({ type: "addNote/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }

  // Create new notes
  async function createNote(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/note/`,
        newBookmark
      );
      dispatch({ type: "addNote/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }



  // Delete each note
  async function deleteNote(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`);
      dispatch({ type: "addNote/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }


  // Checed note
  async function checkNote(id) {
    dispatch({ type: "loading" });
    try {
      const { data: newData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`
      );
      const updatedNote = { ...newData, completed: !newData.completed };
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`,
        updatedNote
      );

      dispatch({ type: "addNote/checked", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }



  // Edit each note
  async function editNote(id, updatedNoteData) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`,
        updatedNoteData
      );
  
      dispatch({ type: "addNote/edit", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }
 
 

  return (
    <NoteContext.Provider
      value={{
        addNote,
        isLoading,
        createNote,
        deleteNote,
        getNote,
        checkNote,
        editNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteProvider;


// create custom hook for note context
export function useNote() {
  return useContext(NoteContext);
}
 