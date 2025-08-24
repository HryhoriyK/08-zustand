'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createNote, Tag, CreateNoteParams } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

type NoteFormTag = {
  id: string;
  title: string;
};

type Props = {
  tags: NoteFormTag[];
};

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [form, setForm] = useState<CreateNoteParams>({
    title: draft.title,
    content: draft.content,
    tag: draft.tag || tags[0]?.title,
  });

  useEffect(() => {
    setForm({
      title: draft.title,
      content: draft.content,
      tag: draft.tag || tags[0]?.title,
    });
  }, [draft, tags]);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes/filter/All'] });
      clearDraft();
      router.push('/notes/filter/All');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setDraft(updatedForm);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };
  
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label>
          Title
          <input 
            className={css.input} 
            type="text" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
          />
        </label>
      </div>

      <div className={css.formGroup}>
        <label>
          Content
          <textarea 
            className={css.textarea} 
            name="content" 
            value={form.content} 
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <div className={css.formGroup}>
        <label>
          Tag
          <select 
            name="tag" 
            className={css.select} 
            value={form.tag} 
            onChange={handleChange}
          >
            {tags.map((tag) => (
              <option value={tag.title} key={tag.id}>
                {tag.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;