import React from 'react';

const WellnessChart = () => {
  // Sample wellness data
  const moodData = [
    { mood: 'Great', count: 12, color: 'bg-green-500', emoji: '😊' },
    { mood: 'Good', count: 18, color: 'bg-blue-500', emoji: '🙂' },
    { mood: 'Okay', count: 8, color: 'bg-yellow-500', emoji: '😐' },
    { mood: 'Stressed', count: 4, color: 'bg-orange-500', emoji: '😰' },
    { mood: 'Tired', count: 2, color: 'bg-red-500', emoji: '😴' }
  ];

  const totalResponses = moodData.reduce((sum, item) => sum + item.count, 0);
  const averageScore = 4.2;

  const weeklyTrends = [
    { day: 'Mon', score: 4.1 },
    { day: 'Tue', score: 4.3 },
    { day: 'Wed', score: 3.9 },
    { day: 'Thu', score: 4.5 },
    { day: 'Fri', score: 4.2 },
    { day: 'Sat', score: 4.0 },
    { day: 'Sun', score: 3.8 }
  ];

  const maxScore = 5;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wellness Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Team mood and wellness metrics
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {averageScore}/5
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Average Score</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Mood Distribution */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Mood Distribution</h4>
          <div className="space-y-2">
            {moodData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.mood}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.count / totalResponses) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 w-8 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Weekly Trend</h4>
          <div className="h-32 flex items-end justify-between space-x-1">
            {weeklyTrends.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative">
                  <div 
                    className="bg-gradient-to-t from-green-500 to-green-400 transition-all duration-500 ease-out rounded-t-lg flex items-start justify-center pt-1"
                    style={{ height: `${(day.score / maxScore) * 80}px` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {day.score}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Insights */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Wellness Insights</span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Team wellness is trending upward! 68% of team members report feeling great or good. 
            Consider scheduling team activities for continued positive momentum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellnessChart;
