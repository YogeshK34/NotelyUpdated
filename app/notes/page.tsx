"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subtitle } from "@/components/primitives";

// Define the shape of a note
interface SubmittedNote {
  id: number;
  title: string;
  note: string;
}

export default function Notes() {
  const [inputTitle, setInputTitle] = useState<string>("");
  const [note, setNotes] = useState<string>("");
  const [allNotes, setAllNotes] = useState<SubmittedNote[]>([]);
  const [error, setError] = useState("");

  // Function to fetch all notes for the user
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes", {
        withCredentials: true, // Ensure cookies or session are sent
      });
      console.log("Fetched notes:", response.data);

      if (Array.isArray(response.data)) {
        setAllNotes(response.data);
      } else {
        setAllNotes([]); // Set as an empty array if the response is not an array
        setError("Invalid data format received from API");
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes");
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  // Function to submit a new note
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes",
        {
          title: inputTitle,
          note,
        },
        {
          withCredentials: true, // Ensure cookies or session are sent
        }
      );

      console.log("Note added:", response.data);

      if (response.status === 201) {
        setInputTitle("");
        setNotes("");
        fetchNotes(); // Refresh notes list after adding a new note
      }
    } catch (err) {
      console.error("Error adding note:", err);
      setError("An error occurred while adding the note");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div>
        <div className={subtitle()}>
          Capture your thoughts, one note at a time with Notely
        </div>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Add Title"
            type="text"
            value={inputTitle}
            onChange={handleTitleChange}
          />
          <Input
            placeholder="Add Note"
            type="text"
            value={note}
            onChange={handleNoteChange}
          />
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="mt-4">
          {allNotes.map((note) => (
            <div key={note.id} className="border-b pb-2 mb-2">
              <div className={subtitle({ class: "font-bold" })}>
                {note.title}
              </div>
              <div>{note.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
