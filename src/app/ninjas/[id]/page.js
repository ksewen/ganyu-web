async function getData(id) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function Details(context) {
  const id = context.params.id;
  const ninja = await getData(id);

  return (
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.email}</p>
      <p>{ninja.website}</p>
      <p>{ninja.address.city}</p>
    </div>
  );
}

export default Details;
