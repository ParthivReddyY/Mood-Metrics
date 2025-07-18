import React, { useState } from 'react';
import StatsCard from './StatsCard';
import TeamGrid from './TeamGrid';
import ProductivityChart from './ProductivityChart';
import WellnessChart from './WellnessChart';
import MoodCheckIn from './MoodCheckIn';

const Dashboard = () => {
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);

  // Sample data
  const stats = [
    {
      title: 'Team Productivity',
      value: '87%',
      change: '+5%',
      changeType: 'positive',
      icon: 'productivity',
      description: 'vs last week'
    },
    {
      title: 'Wellness Score',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'positive',
      icon: 'wellness',
      description: 'average rating'
    },
    {
      title: 'Active Members',
      value: '8/8',
      change: '100%',
      changeType: 'neutral',
      icon: 'team',
      description: 'online today'
    },
    {
      title: 'Burnout Risk',
      value: 'Low',
      change: '-2',
      changeType: 'positive',
      icon: 'alert',
      description: 'members at risk'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Monitor your team's productivity and wellness metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowMoodCheckIn(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Quick Check-in
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityChart />
        <WellnessChart />
      </div>

      {/* Team Grid */}
      <TeamGrid />

      {/* Mood Check-in Modal */}
      {showMoodCheckIn && (
        <MoodCheckIn onClose={() => setShowMoodCheckIn(false)} />
      )}
    </div>
  );
};

export default Dashboard;
