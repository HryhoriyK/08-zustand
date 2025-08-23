
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import Notes from './Notes.client';

interface Props {
  params: Promise<{ slug: string[] }>;
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
