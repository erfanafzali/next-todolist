import AddNewNote from "../template/AddNewNote";
import NoteList from "../template/NoteList";

function HomePage() {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center justify-start md:items-start items-center gap-x-8 gap-y-8 mt-32">
      <AddNewNote />
      <NoteList />
    </div>
  );
}

export default HomePage;
