import {QueryClient, HydrationBoundary, dehydrate} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {id} = params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://notehub.example.com/notes/${note.id}`,
      images: [
        {
          url: "[https://ac.goit.global/fullstack/react/notehub-og-meta.jpg](https://ac.goit.global/fullstack/react/notehub-og-meta.jpg)",
          width: 1200,
          height: 630,
          alt: note.title,
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
