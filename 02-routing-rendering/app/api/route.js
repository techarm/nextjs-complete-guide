export function GET(request) {
  console.log(request);

  // return new Response('Hello!');
  return Response.json({ message: 'It works!' });
}

// export function POST(request) {}
