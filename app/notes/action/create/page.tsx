import type { Metadata } from "next";
import css from "./page.module.css";
import  NoteForm  from "@/components/NoteForm/NoteForm";
import { getTags } from "@/lib/api";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub to organize your thoughts and ideas.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub to organize your thoughts and ideas.",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
  },
};

const CreateNote = async () => {
    const tags = await getTags();

    const mappedTags = tags.map(tag => ({
    id: tag.id,
    title: tag.name,
  }));

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
              <NoteForm tags={mappedTags} />
      </div>
    </main>
  );
};

export default CreateNote;