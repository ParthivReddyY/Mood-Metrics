import React from 'react';

const TeamGrid = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      mood: 'great',
      productivity: 92,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '2 min ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Backend Developer',
      mood: 'good',
      productivity: 87,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '5 min ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      mood: 'okay',
      productivity: 78,
      status: 'away',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'DevOps Engineer',
      mood: 'great',
      productivity: 95,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: 'Just now'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Product Manager',
      mood: 'good',
      productivity: 89,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '10 min ago'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      role: 'QA Engineer',
      mood: 'stressed',
      productivity: 65,
      status: 'busy',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '3 hours ago'
    },
    {
      id: 7,
      name: 'Rachel Green',
      role: 'Data Analyst',
      mood: 'great',
      productivity: 91,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '1 min ago'
    },
    {
      id: 8,
      name: 'Tom Wilson',
      role: 'Tech Lead',
      mood: 'good',
      productivity: 88,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '15 min ago'
    }
  ];

  const getMoodEmoji = (mood) => {
    const moods = {
      great: '😊',
      good: '🙂',
      okay: '😐',
      stressed: '😰',
      tired: '😴'
    };
    return moods[mood] || '😐';
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-green-400',
      away: 'bg-yellow-400',
      busy: 'bg-red-400',
      offline: 'bg-gray-400'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getProductivityColor = (productivity) => {
    if (productivity >= 90) return 'text-green-600 dark:text-green-400';
    if (productivity >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Current mood and productivity status
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${getStatusColor(member.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mood</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{getMoodEmoji(member.mood)}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300 capitalize">{member.mood}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Productivity</span>
                  <span className={`text-xs font-medium ${getProductivityColor(member.productivity)}`}>
                    {member.productivity}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Last active</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {member.lastActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamGrid;
