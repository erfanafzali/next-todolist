import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNote } from "../context/NoteContext";
import { useState } from "react";

function MyNote({ note }) {
  const { deleteNote, checkNote, editNote } = useNote();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNoteData, setUpdatedNoteData] = useState(note);

  const handleEdit = async () => {
    await editNote(note.id, updatedNoteData);
    setIsEditing(false);
  };

  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div
      className={`w-full rounded-md px-4 py-2 pt-4 ${
        note.completed ? "line-through" : ""
      }`}
    >
      <div className="flex justify-between items-center pb-2">
        <div className="">
          {isEditing ? (
            <input
              type="text"
              value={updatedNoteData.title}
              maxLength="20"
              onChange={(e) =>
                setUpdatedNoteData({
                  ...updatedNoteData,
                  title: e.target.value,
                })
              }
              className="font-bold text-base lg:text-lg mb-3  bg-slate-800 text-white resize-none border-red-500 border-2 rounded-md px-2 py-1  outline-none"
              placeholder="New Title"
            />
          ) : (
            <h2 className="font-bold text-base lg:text-lg mb-3">
              {note.title}
            </h2>
          )}
          <div className=" text-sm md:text-base max-w-48 md:max-w-72 overflow-x-scroll whitespace-normal">
            {isEditing ? (
              <textarea
                value={updatedNoteData.description}
                maxLength="40"
                onChange={(e) =>
                  setUpdatedNoteData({
                    ...updatedNoteData,
                    description: e.target.value,
                  })
                }
                className="w-full   bg-slate-800 text-white resize-none border-red-500 border-2 rounded-md px-2 py-1  outline-none"
                placeholder="New Description"
              />
            ) : (
              note.description
            )}
            <div className={`${isEditing ? "mt-4 space-x-2" : ""}`}>
              <span>
                {isEditing ? (
                  <button
                    onClick={isEditing ? handleEdit : () => setIsEditing(true)}
                    className="px-3 bg-green-500 text-white py-1 rounded-md"
                  >
                    submit
                  </button>
                ) : null}
              </span>
              <span>
                {isEditing ? (
                  <button
                    onClick={ () => setIsEditing(false)}
                    className="px-3 bg-red-500 rounded-md text-white py-1"
                  >
                    cancel
                  </button>
                ) : null}
              </span>
            </div>
          </div>
        </div>
        <div className="space-x-2 md:space-x-3 whitespace-nowrap">
          <input
            type="checkbox"
            onChange={() => checkNote(note.id)}
            checked={note.completed}
            className="accent-green-500 md:w-5 md:h-5"
          />
          <button onClick={() => deleteNote(note.id)}>
            <FaTrash className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button onClick={isEditing ? handleEdit : () => setIsEditing(true)}>
            <FaEdit
              className={`w-4 h-4 md:w-5 md:h-5 ${
                isEditing ? "text-green-500 animate-bounce" : "text-blue-500"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="mt-4 border-t-4 text-center pt-2 pb-1 text-sm text-slate-600">
        <h3 className="font-bold">
          {new Date(note.createdAt).toLocaleDateString("en-US", option)}
        </h3>
      </div>
    </div>
  );
}

export default MyNote;
