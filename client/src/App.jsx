
import React, { useState } from "react";
import './App.css';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';
import TeamPage from './components/TeamPage';
import ProductivityPage from './components/ProductivityPage';
import WellnessPage from './components/WellnessPage';
import SettingsPage from './components/SettingsPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'team':
        return <TeamPage />;
      case 'productivity':
        return <ProductivityPage />;
      case 'wellness':
        return <WellnessPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-6 py-8">
                {renderActiveView()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
