import {QueryClient, HydrationBoundary, dehydrate} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);
  
  return {
    title: note.title,
    description: "View and edit your notes in NoteHub.",
    openGraph: {
      title: note.title,
      description: "View and edit your notes in NoteHub.",
      url: `https://notehub.example.com/notes/${note.id}`,
      images: [
        {
          url: "[https://ac.goit.global/fullstack/react/notehub-og-meta.jpg](https://ac.goit.global/fullstack/react/notehub-og-meta.jpg)",
          width: 1200,
          height: 630,
          alt: "NoteHub Note",
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
