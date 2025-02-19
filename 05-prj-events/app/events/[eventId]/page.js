import { getEventById } from '@/dummy-data';

async function EventDetail({ params }) {
  const eventId = await params.eventId;
  const event = getEventById(eventId);

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
}

export default EventDetail;
