import css from "../components/Main/Main.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "https://notehub.example.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found Image",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;