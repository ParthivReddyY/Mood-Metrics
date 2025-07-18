import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import WellnessChart from './WellnessChart';

const WellnessPage = () => {
  const { teamMembers } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getWellnessStats = () => {
    const totalWellness = teamMembers.reduce((sum, m) => sum + m.wellnessScore, 0);
    const avgWellness = teamMembers.length > 0 ? totalWellness / teamMembers.length : 0;
    const totalEnergy = teamMembers.reduce((sum, m) => sum + m.energy, 0);
    const avgEnergy = teamMembers.length > 0 ? totalEnergy / teamMembers.length : 0;
    const totalStress = teamMembers.reduce((sum, m) => sum + m.stress, 0);
    const avgStress = teamMembers.length > 0 ? totalStress / teamMembers.length : 0;
    const burnoutRisk = teamMembers.filter(m => m.burnoutRisk === 'High' || m.burnoutRisk === 'Medium').length;

    return {
      avgWellness: Math.round(avgWellness * 10) / 10,
      avgEnergy: Math.round(avgEnergy * 10) / 10,
      avgStress: Math.round(avgStress * 10) / 10,
      burnoutRisk
    };
  };

  const stats = getWellnessStats();

  const getMoodDistribution = () => {
    const moodCounts = teamMembers.reduce((acc, member) => {
      acc[member.mood] = (acc[member.mood] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Great', count: moodCounts.great || 0, color: 'bg-green-500', emoji: '😊' },
      { name: 'Good', count: moodCounts.good || 0, color: 'bg-blue-500', emoji: '🙂' },
      { name: 'Okay', count: moodCounts.okay || 0, color: 'bg-yellow-500', emoji: '😐' },
      { name: 'Stressed', count: moodCounts.stressed || 0, color: 'bg-orange-500', emoji: '😰' },
      { name: 'Tired', count: moodCounts.tired || 0, color: 'bg-red-500', emoji: '😴' }
    ];
  };

  const getWellnessRecommendations = () => {
    const recommendations = [];
    
    if (stats.avgStress > 3) {
      recommendations.push({
        type: 'stress',
        title: 'High Stress Levels Detected',
        description: 'Consider implementing stress management techniques',
        action: 'Schedule wellness check-ins',
        priority: 'high'
      });
    }
    
    if (stats.avgEnergy < 3) {
      recommendations.push({
        type: 'energy',
        title: 'Low Energy Levels',
        description: 'Team may need more breaks or workload adjustment',
        action: 'Review work schedules',
        priority: 'medium'
      });
    }
    
    if (stats.burnoutRisk > 2) {
      recommendations.push({
        type: 'burnout',
        title: 'Burnout Risk Alert',
        description: `${stats.burnoutRisk} team members at risk of burnout`,
        action: 'Immediate intervention needed',
        priority: 'high'
      });
    }

    return recommendations;
  };

  const recommendations = getWellnessRecommendations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wellness Tracking</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Monitor team mental health and well-being
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Wellness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wellness Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgWellness}/5</p>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm text-green-600">+0.2 from last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Energy Level</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgEnergy}/5</p>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.avgEnergy / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stress Level</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgStress}/5</p>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${(stats.avgStress / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Burnout Risk</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.burnoutRisk}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">members at risk</span>
              </div>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wellness Trend</h3>
          <WellnessChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Distribution</h3>
          <div className="space-y-4">
            {getMoodDistribution().map((mood, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{mood.emoji}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{mood.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                    <div
                      className={`h-2 rounded-full ${mood.color}`}
                      style={{ width: `${(mood.count / teamMembers.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{mood.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wellness Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className={`border-l-4 pl-4 ${
                rec.priority === 'high' ? 'border-red-500' : 'border-yellow-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.description}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    {rec.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Wellness Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Individual Wellness</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Mood
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Energy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Wellness Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Burnout Risk
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getMoodDistribution().find(m => m.name.toLowerCase() === member.mood)?.emoji}</span>
                      <span className="text-sm text-gray-900 dark:text-white capitalize">{member.mood}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 w-16">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(member.energy / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{member.energy}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 w-16">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${(member.stress / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{member.stress}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {member.wellnessScore}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.burnoutRisk === 'Low' ? 'bg-green-100 text-green-800' :
                      member.burnoutRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.burnoutRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WellnessPage;
