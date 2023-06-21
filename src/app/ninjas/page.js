import styles from './page.module.css';
import Link from 'next/link';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function Ninjas() {
  const ninjas = await getData();

  return (
    <div>
      <h1>All Ninjas</h1>
      {ninjas.map((ninja) => (
        <Link
          href={'/ninjas/' + ninja.id}
          key={ninja.id}
          className={styles.single}
        >
          <h3>{ninja.name}</h3>
        </Link>
      ))}
    </div>
  );
}

export default Ninjas;
