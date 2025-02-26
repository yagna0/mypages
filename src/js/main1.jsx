// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/sitewide.scss'; //
//  ✅ Import SCSS
import "./js/main1.jsx";  // ✅ Correct way to import



// Import Bootstrap correctly
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Modal from 'bootstrap/js/dist/modal';

// Import React Component
import App from '.js/App.js'; // Ensure App.jsx or App.js exists in the same folder

// Example usage of imported Bootstrap plugins
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
