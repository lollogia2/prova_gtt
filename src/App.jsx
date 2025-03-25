import './App.css'
import React, {useState, useEffect} from 'react'
import TimeCard from "./components/TimeCard.jsx";


const App = () => {
    const [busStation, setBusStation] = useState('');
    const [btn594, setBtn594] = useState(false);
    const [btn3287, setBtn3287] = useState(false);
    const [btn3286, setBtn3286] = useState(false);
    const [btn648, setBtn648] = useState(false);
    const [btn629, setBtn629] = useState(false);
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
                <img src="/bus-school.png"
                     className={"object-scale-down max-h-full drop-shadow-md rounded-md m-auto cursor-pointer"}
                     alt="Bus Banner" onClick={() => {
                    setBtn648(false);
                    setBtn594(false);
                    setBtn3287(false);
                    setBtn3286(false);
                    setBtn629(false);
                    setData(null);
                }}/>

            </header>
            <section className={"static mt-25"}>
                <div className="grid h-48 grid-cols-3 gap-4  place-content-center">
                    <div className="text-gradient font-bold">Dante di Nanni</div>
                    <button onClick={() => {
                        setBusStation('594');
                        setBtn594(true);
                        setBtn648(false);
                        setBtn3287(false);
                        setBtn3286(false);
                        setBtn629(false);
                    }} disabled={loading || btn594}>594
                    </button>

                    <button onClick={() => {
                        setBusStation('648');
                        setBtn648(true);
                        setBtn594(false);
                        setBtn3287(false);
                        setBtn3286(false);
                        setBtn629(false);
                    }} disabled={loading || btn648}>648
                    </button>
                    <div className="text-gradient font-bold">Vittorio Emanuele II</div>
                    <button onClick={() => {
                        setBusStation('3287');
                        setBtn3287(true);
                        setBtn594(false);
                        setBtn3286(false);
                        setBtn629(false);
                        setBtn648(false);
                    }} disabled={loading || btn3287}>3287
                    </button>
                    <button onClick={() => {
                        setBusStation('3286');
                        setBtn3286(true);
                        setBtn594(false);
                        setBtn3287(false);
                        setBtn629(false);
                        setBtn648(false);
                    }} disabled={loading || btn3286}>3286
                    </button>
                    <div className="text-gradient font-bold">Valentino</div>
                    <button onClick={() => {
                        setBusStation('629');
                        setBtn629(true);
                        setBtn3287(false);
                        setBtn594(false);
                        setBtn3286(false);
                    }} disabled={loading || btn629}>629
                    </button>
                </div>
                <div className="static mt-10">
                    {data ? (
                        <ul>
                            {data.map((bus, index) => (
                                <TimeCard key={index} bus={bus}/>
                            ))}
                        </ul>
                    ) : (
                        <div className="italic">Corri alla fermata!</div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default App
