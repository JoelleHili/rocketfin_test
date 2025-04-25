'use client';

import { Trending, Holdings, TransactionHistory } from "@/components";

export default function Home() {

  return (
    <main>
      <div className="page two-column-grid">
        <div className="column">
          <Holdings />
          <Trending />
        </div>
        <TransactionHistory />

      </div>
    </main>
  );
}