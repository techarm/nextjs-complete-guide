import Link from 'next/link';
import classes from './button.module.css';

function Button({ link, onClick, children }) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        children
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
