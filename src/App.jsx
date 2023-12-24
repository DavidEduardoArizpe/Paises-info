import { useState, useEffect } from "react";

function App() {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(res => {
        setData(res.filter(n => { return n.independent }));
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  
    const newData = Data.filter(n => (
      n.name.common.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(n.name.common.toLowerCase())
    ));
    setFilteredData(newData);
  }, [name, Data]);

  return (
    <>
      <h1>Countries</h1>
       <input type="text" placeholder="Search country" value={name} onChange={(e) => setName(e.target.value)} />

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <main className="countries">
          {filteredData.map((n, index) => (
            <div className="country" key={index}>
              <h3>Name: {n.name.common}</h3>
               <h4>Capital: {n.capital}</h4>
                <h4>Continent: {n.region}</h4>
               <img src={n.flags.svg} alt={n.flags.alt} />
                 
            </div>
          ))}
        </main>
      )}
    </>
  );
}

export default App;
