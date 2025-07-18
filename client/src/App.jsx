
import React, { useState } from "react";
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              {activeView === 'dashboard' && <Dashboard />}
              {activeView === 'team' && <div className="text-gray-800 dark:text-gray-200">Team Management - Coming Soon</div>}
              {activeView === 'productivity' && <div className="text-gray-800 dark:text-gray-200">Productivity Metrics - Coming Soon</div>}
              {activeView === 'wellness' && <div className="text-gray-800 dark:text-gray-200">Wellness Tracking - Coming Soon</div>}
              {activeView === 'settings' && <div className="text-gray-800 dark:text-gray-200">Settings - Coming Soon</div>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
