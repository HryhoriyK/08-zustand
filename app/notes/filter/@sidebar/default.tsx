import Link from 'next/link';
import css from './default.module.css';

const NotesSidebar = () => {
  const menuItems = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      {menuItems.map((item) => (
        <li key={item} className={css.menuItem}>
          <Link href={`/notes/filter/${item}`}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;