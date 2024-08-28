import { useState } from "react";
import { useNote } from "../context/NoteContext";
import toast from "react-hot-toast";

function AddNewNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createNote } = useNote();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description)
      return toast.error("please enter title & description");

    const newNote = {
      title,
      description,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    createNote(newNote);
    setTitle("");
    setDescription("");
    if (title || description) return toast.success("perfect");
  };

  return (
    <div className="w-full md:sticky top-24 ">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center gap-y-4 px-4 "
      >
        <input
          className="w-full md:w-[90%] py-1 md:py-1.5 lg:py-2 rounded-md px-4 border-none outline-none font-semibold text-slate-800"
          type="text"
          placeholder="Enter the title ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="20"
        />

        <input
          className="w-full md:w-[90%] py-1 md:py-1.5 lg:py-2 rounded-md px-4 border-none outline-none font-semibold text-slate-800"
          type="text"
          placeholder="Enter the description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="40"
        />
        {!title || !description ? (
          <button
            disabled={true}
            type="submit"
            className="w-full cursor-not-allowed md:w-[90%] py-1 md:py-1.5 lg:py-2 rounded-md  bg-red-700 text-white hover:bg-red-500  font-semibold  "
          >
            please complete form ...
          </button>
        ) : (
          <button
            disabled=""
            type="submit"
            className="w-full md:w-[90%] py-1 md:py-1.5 lg:py-2 rounded-md  bg-blue-500 text-white hover:bg-blue-300  font-semibold  "
          >
            Submit Form
          </button>
        )}
      </form>
    </div>
  );
}

export default AddNewNote;
