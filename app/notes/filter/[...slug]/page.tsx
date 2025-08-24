
import { fetchNotes } from '../../../../lib/api';
import type { FetchNotesResponse } from '../../../../lib/api';
import Notes from './Notes.client';
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? 'All Notes' : slug[0];
  const title = `Notes filtered by: ${tag} | NoteHub`;
  const description = `Browse notes filtered by "${tag}" on NoteHub. Find your notes by tag or category.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.example.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Filtered Notes",
        },
      ],
    },
  };
}

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  let initialData: FetchNotesResponse = {
    notes: [],
    totalPages: 1,
    currentPage: 1,
  };
  
  try {
    initialData = await fetchNotes(1, 12, tag);
  } catch (error) {
    console.error('Failed to fetch notes for tag:', tag, error);
  }
  return (
    <div>
      <Notes initialData={initialData} tag={tag} />
    </div>
  );
};

export default NotesByTag;
