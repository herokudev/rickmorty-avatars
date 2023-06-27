import "./page.css";

//localhost:3000/characters/id

async function getData(id) {
  console.log(id);
  const dataUrl = "https://rickandmortyapi.com/api/character/" + id;
  const res = await fetch(dataUrl);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page({ params }) {
  console.log(params);
  const data = await getData(params.id);
  console.log(data);
  return (
    <main className='card'>
      {" "}
      <img
        src={data.image}
        alt='avatar-img'
        style={{ width: "200px", height: "200px" }}
      ></img>
      <h3>
        <span className='infoLabel'>Name: </span>
        {data.name}
      </h3>
      <h4>
        <span className='infoLabel'>Status: </span>
        {data.status}
      </h4>
      <h4>
        <span className='infoLabel'>Species: </span>
        {data.species}
      </h4>
      <h4>
        <span className='infoLabel'>Gender: </span>
        {data.gender}
      </h4>
      <h4>
        <span className='infoLabel'>Created: </span>
        {data.created}
      </h4>
    </main>
  );
}
