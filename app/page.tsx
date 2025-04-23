'use client';

import { useApi } from '@/hooks/useApi'
import styles from './page.module.scss'

export default function Home() {
  const { data, loading } = useApi<{ message: string }>({
    endpoint: 'hello',
    autoFetch: true,
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Next.js with TypeScript and SCSS</h1>

      <div className={styles.buttons}>

      </div>

      <div className={styles.apiResponse}>
        {loading ? (
          <p>Loading API data...</p>
        ) : (
          <p>API Response: {data?.message}</p>
        )}
      </div>
    </main>
  );
}