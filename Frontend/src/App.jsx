import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [dis, setDis] = useState("");

  function fetchNotes() {
    axios.get("https://chort-2-0-backends-all-days.onrender.com/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://chort-2-0-backends-all-days.onrender.com/notes", {
      title,
      dis,
    });
    setTitle("");
    setDis("");
  };

  const deleteNote = (noteId) => {
    axios.delete(`https://chort-2-0-backends-all-days.onrender.com/notes/${noteId}`).then(() => {
      fetchNotes(); // Refresh the notes list after deletion
    });
  };

  return (
    <div
      style={{ backgroundColor: "#FFFDD0" }}
      className="w-full min-h-screen p-8 font-sans"
    >
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 bg-white p-6 rounded-2xl shadow-xl border border-[#D4AF37]/20"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          style={{ border: "1px solid #D4AF37" }}
          className="flex-1 p-3 bg-white text-[#676D47] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#676D47] font-bold placeholder-[#676D47]/50"
          placeholder="Patient Name / Case Title"
        />
        <input
          value={dis}
          onChange={(e) => setDis(e.target.value)}
          type="text"
          style={{ border: "1px solid #D4AF37" }}
          className="flex-1 p-3 bg-white text-[#676D47] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#676D47] font-medium placeholder-[#676D47]/50"
          placeholder="Diagnosis / Treatment Details"
        />
        <button
          style={{ backgroundColor: "#676D47" }}
          className="text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-lg"
        >
          Add Record
        </button>
      </form>

      {/* Notes Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[2.5rem] shadow-xl border-l-8 border-[#D4AF37] hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            {/* Decorative medical icon in background */}
            <i className="fa-solid fa-notes-medical absolute -right-4 -top-4 text-gray-50 text-6xl group-hover:text-[#FFFDD0] transition-colors"></i>

            <div className="relative z-10">
              <h2
                style={{ color: "#676D47" }}
                className="text-2xl font-black italic mb-3 uppercase tracking-tight"
              >
                {note.title}
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-6">
                {note.dis}
              </p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <span
                  style={{ color: "#D4AF37" }}
                  className="text-[10px] font-black uppercase tracking-widest"
                >
                  Medical History
                </span>
                <button
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                  className="text-red-500 cursor-pointer hover:text-red-700 font-bold text-xs uppercase flex items-center gap-1 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
