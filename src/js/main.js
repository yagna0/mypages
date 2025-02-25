// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

// Optionally, import specific Bootstrap components
import Dropdown from 'bootstrap/js/dist/dropdown';
import Modal from 'bootstrap/js/dist/modal';

// Example usage of imported plugins
document.addEventListener('DOMContentLoaded', () => {
    const dropdownElement = document.querySelector('.dropdown-toggle');
    if (dropdownElement) {
        new Dropdown(dropdownElement);
    }

    const modalElement = document.querySelector('#myModal');
    if (modalElement) {
        new Modal(modalElement);
    }
});

// Example React component
function App() {
    return (
        <div>
            <h1>Hello, world! (from React)</h1>
        </div>
    );
}

// Render the React component
const rootElement = document.getElementById('react-root-main');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}