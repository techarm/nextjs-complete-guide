import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/lib/api-util';

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
