'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

type Tag = {
  id: string;
  name: string;
};

type Props = {
  tags: Tag[];
};

const TagsMenu = ({ tags }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li key="all-notes" className={css.menuItem}>
            <Link href={"/notes/filter/All"} onClick={toggle} className={css.menuLink}>
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag.id} className={css.menuItem}>
              <Link href={`/notes/filter/${tag.name}`} onClick={toggle} className={css.menuLink}>
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
