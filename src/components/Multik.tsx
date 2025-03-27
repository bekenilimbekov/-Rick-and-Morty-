import { useState, useEffect } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

const CharacterSearch = () => {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (search.length < 3) {
      setCharacters([]);
      return;
    }

    const fetchCharacters = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${search}`
        );

        if (!response.ok) throw new Error("Персонаж не найден");

        const data = await response.json();
        console.log(data);
        
        setCharacters(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка запроса");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [search]);

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Поиск персонажа..."
        className="w-full p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 mt-4">
        {characters.map((char) => (
          <div key={char.id} className="flex items-center border p-2 rounded">
            <img src={char.image} alt={char.name} className="w-16 h-16 rounded-full" />
            <div className="ml-4">
              <h2 className="text-lg font-bold">{char.name}</h2>
              <p>{char.status} - {char.species}</p>
              <p className="text-sm text-gray-500">{char.location.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSearch;
