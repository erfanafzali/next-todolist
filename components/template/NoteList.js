import { useNote } from "../context/NoteContext";
import MyNote from "./MyNote";

function NoteList() {
  const { addNote } = useNote();

  if (!addNote.length)
    return (
      <div className="w-full text-center font-bold text-xl text-red-500">
        You have not written a note yet 🥲
      </div>
    );

  return (
    <div className="w-full px-4">
      {addNote.map((note) => (
        <div
          className="flex flex-col justify-center items-center  odd:bg-slate-100 even:bg-slate-400 mb-4 rounded-md "
          key={note.id}
        >
          <MyNote note={note} />
        </div>
      ))}
    </div>
  );
}

export default NoteList;
