"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const showCharacter = (charId) => {
    console.log("you click on a character --> " + charId);
  };

  useEffect(() => {
    const request_headers = new Headers();

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch("https://rickandmortyapi.com/api/character/?page=7", request_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);

  console.log(items.results);

  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return <>loading...</>;
  } else {
    return (
      <main className='App'>
        <h1 className='title'>Ricky and morty Avatars</h1>
        <hr />
        <div className='users-list'>
          {items.results.map((item) => (
            <Link key={item.id} href={`/characters/${item.id}`}>
              <div onClick={() => showCharacter(item.id)} className='user-card'>
                {" "}
                <img
                  src={item.image}
                  alt='avatar-img'
                  style={{ width: "200px", height: "200px" }}
                ></img>
                <h3>{item.name}</h3>
                <h4>{item.status}</h4>
                <h4>{item.species}</h4>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }
}
