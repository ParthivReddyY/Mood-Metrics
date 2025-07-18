import React from 'react';

const ProductivityChart = () => {
  // Sample data for the chart
  const data = [
    { day: 'Mon', productivity: 85, tasks: 12 },
    { day: 'Tue', productivity: 92, tasks: 15 },
    { day: 'Wed', productivity: 78, tasks: 10 },
    { day: 'Thu', productivity: 95, tasks: 18 },
    { day: 'Fri', productivity: 88, tasks: 14 },
    { day: 'Sat', productivity: 65, tasks: 8 },
    { day: 'Sun', productivity: 45, tasks: 5 }
  ];

  const maxProductivity = Math.max(...data.map(d => d.productivity));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Productivity Metrics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Weekly team productivity overview
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Productivity</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Tasks</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center space-y-1 mb-2">
                {/* Productivity bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="bg-blue-500 transition-all duration-500 ease-out rounded-t-lg"
                    style={{ height: `${(item.productivity / maxProductivity) * 150}px` }}
                  >
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white">
                      {item.productivity}%
                    </div>
                  </div>
                </div>
                
                {/* Tasks indicator */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-b-lg">
                  <div 
                    className="bg-green-500 transition-all duration-500 ease-out rounded-b-lg flex items-center justify-center"
                    style={{ height: `${(item.tasks / 20) * 30}px` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {item.tasks}
                    </span>
                  </div>
                </div>
              </div>
              
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {item.day}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">87%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Productivity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">82</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Peak Day</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
