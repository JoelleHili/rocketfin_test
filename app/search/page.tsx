'use client';
import InstrumentSearch from '@/components/InstrumentSearch';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get('ticker');

  return <InstrumentSearch ticker={ticker || undefined} />;
};

const Search = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
};

export default Search;