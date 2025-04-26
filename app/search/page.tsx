'use client';
import InstrumentSearch from '@/components/InstrumentSearch';
import { useSearchParams } from 'next/navigation';

const Search = () => {

  const searchParams = useSearchParams();

  const ticker = searchParams.get('ticker');

  return (
    <main>
      <InstrumentSearch ticker={ticker || undefined} />
    </main>
  );
}

export default Search