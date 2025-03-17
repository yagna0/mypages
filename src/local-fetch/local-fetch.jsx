
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function LocalFetchDemo() {
    const [numbers, setNumbers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3003/")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then(data => setNumbers(data))
            .catch(err => setError("API is not running. Please start the Express server."));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Local Fetch Demo</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <ul>
                    <h2>Random Numbers from API</h2>
                    {numbers.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<LocalFetchDemo />);
