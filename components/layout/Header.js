import { useNote } from "../context/NoteContext";

function Header() {
  const { addNote } = useNote();

  return (
    <header className="w-full min-h-16 mb-24 fixed top-0 bg-slate-400 flex justify-around items-center">
      <h1 className="font-bold text-2xl text-white ">Todo List</h1>
      <p className="font-bold text-white text-lg ">
        All Notes &nbsp;{addNote.length}
      </p>
    </header>
  );
}

export default Header;
