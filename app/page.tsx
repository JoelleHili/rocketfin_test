'use client';

import {Trending, Holdings} from "@/components";

export default function Home() {

  return (
    <main>
      <div className="page two-column-grid">
        <Holdings />
        <Trending />
      </div>
    </main>
  );
}