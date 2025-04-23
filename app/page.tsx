'use client';

import styles from './page.module.scss'
import InstrumentSearch from '@/components/InstrumentSearch';

export default function Home() {

  return (
    <main className={styles.main}>
      <InstrumentSearch/>
    </main>
  );
}