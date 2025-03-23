import './App.css'
import React, {useState, useEffect} from 'react'
import TimeCard from "./components/TimeCard.jsx";


const App = () => {
    const [busStation, setBusStation] = useState('');
    const [btn594, setBtn594] = useState(false);
    const [btn648, setBtn648] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchBus = async (busStation) => {
        setLoading(true);
        setError(null); // Resetta gli errori precedenti
        try {
            if (busStation !== '') {
                const endpoint = `http://gpa.madbob.org/query.php?stop=${encodeURIComponent(busStation)}`;
                const response = await fetch(endpoint);
                console.log('awawa');
                // 3. Gestione errori HTTP
                if (!response.ok) {
                    throw new Error(`HTTP error! Failed to fetch bus!`);
                }

                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (err) {
            console.error(`error fetching bus: ${err}`);
            setError(err.message);
        } finally {
            setLoading(false);
            setBusStation('');
        }
    }
    useEffect(() => {
        fetchBus(busStation);
    }, [busStation]);


    // Array vuoto = esegue solo al mount iniziale
    return (
        <main className={"font-sans"}>
            <header className={"static inset-x-0 top-0 h-16"}>
                <h1 className={"font-semibold tracking-wide"}>Pitti<span className="text-gradient">BUS</span></h1>
                <img src="/bus-school.png" className={"object-scale-down max-h-full drop-shadow-md rounded-md m-auto"}
                     alt="Bus Banner"/>

            </header>
            <section>
                <div className="grid h-48 grid-cols-2 gap-4 mt-10 place-content-center">
                    <button onClick={() => {
                        setBusStation('594');
                        setBtn594(true);
                        setBtn648(false);
                    }} disabled={loading || btn594}>594
                    </button>

                    <button onClick={() => {
                        setBusStation('648');
                        setBtn648(true);
                        setBtn594(false);
                    }} disabled={loading || btn648}>648
                    </button>

                </div>
                <div className="relative">
                    {data ? (
                        <ul>
                            {data.map((bus, index) => (
                                <TimeCard key={index} bus={bus}/>
                            ))}
                        </ul>
                    ) : (
                        <div>vuoto</div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default App
