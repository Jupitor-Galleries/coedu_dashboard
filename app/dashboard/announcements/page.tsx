import React, { Suspense } from 'react';

function AnnouncementsComponent() {
  return (
    <div>Announcements</div>
  );
}

export default function Announcements() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnnouncementsComponent />
    </Suspense>
  );
}
