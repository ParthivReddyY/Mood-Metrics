import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ role: 'manager', id: 1 }); // Toggle between 'manager' and 'member'
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      email: 'sarah.johnson@company.com',
      mood: 'great',
      productivity: 92,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '2 min ago',
      energy: 4,
      stress: 2,
      notes: 'Working on new dashboard features',
      wellnessScore: 4.2,
      burnoutRisk: 'Low',
      tasksCompleted: 15,
      hoursWorked: 7.5,
      checkIns: [
        { date: '2025-07-18', mood: 'great', energy: 4, stress: 2, notes: 'Great day, very productive!' },
        { date: '2025-07-17', mood: 'good', energy: 3, stress: 3, notes: 'Good progress on projects' }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Backend Developer',
      email: 'mike.chen@company.com',
      mood: 'good',
      productivity: 87,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '5 min ago',
      energy: 3,
      stress: 3,
      notes: 'API development going well',
      wellnessScore: 3.8,
      burnoutRisk: 'Low',
      tasksCompleted: 12,
      hoursWorked: 8.0,
      checkIns: [
        { date: '2025-07-18', mood: 'good', energy: 3, stress: 3, notes: 'Solid day of coding' },
        { date: '2025-07-17', mood: 'okay', energy: 2, stress: 4, notes: 'Some challenging bugs' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      email: 'emily.rodriguez@company.com',
      mood: 'okay',
      productivity: 78,
      status: 'away',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '1 hour ago',
      energy: 2,
      stress: 4,
      notes: 'Design reviews taking longer than expected',
      wellnessScore: 3.2,
      burnoutRisk: 'Medium',
      tasksCompleted: 8,
      hoursWorked: 9.0,
      checkIns: [
        { date: '2025-07-18', mood: 'okay', energy: 2, stress: 4, notes: 'Busy day with multiple reviews' },
        { date: '2025-07-17', mood: 'good', energy: 3, stress: 3, notes: 'Good design progress' }
      ]
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'DevOps Engineer',
      email: 'david.kim@company.com',
      mood: 'great',
      productivity: 95,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: 'Just now',
      energy: 5,
      stress: 1,
      notes: 'Successfully deployed new infrastructure',
      wellnessScore: 4.7,
      burnoutRisk: 'Low',
      tasksCompleted: 18,
      hoursWorked: 7.0,
      checkIns: [
        { date: '2025-07-18', mood: 'great', energy: 5, stress: 1, notes: 'Excellent deployment day!' },
        { date: '2025-07-17', mood: 'great', energy: 4, stress: 2, notes: 'Infrastructure optimization complete' }
      ]
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Product Manager',
      email: 'lisa.park@company.com',
      mood: 'good',
      productivity: 89,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '10 min ago',
      energy: 4,
      stress: 3,
      notes: 'Product roadmap planning session was productive',
      wellnessScore: 4.0,
      burnoutRisk: 'Low',
      tasksCompleted: 14,
      hoursWorked: 8.5,
      checkIns: [
        { date: '2025-07-18', mood: 'good', energy: 4, stress: 3, notes: 'Great stakeholder meeting' },
        { date: '2025-07-17', mood: 'okay', energy: 3, stress: 4, notes: 'Long planning session' }
      ]
    }
  ]);

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'GitHub', connected: true, icon: 'github', status: 'Active' },
    { id: 2, name: 'Jira', connected: false, icon: 'jira', status: 'Inactive' },
    { id: 3, name: 'Slack', connected: true, icon: 'slack', status: 'Active' },
    { id: 4, name: 'Notion', connected: false, icon: 'notion', status: 'Inactive' },
    { id: 5, name: 'Trello', connected: false, icon: 'trello', status: 'Inactive' }
  ]);

  const addCheckIn = (memberId, checkInData) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            mood: checkInData.mood,
            energy: checkInData.energy,
            stress: checkInData.stress,
            notes: checkInData.notes,
            lastActive: 'Just now',
            checkIns: [checkInData, ...member.checkIns]
          }
        : member
    ));
  };

  const updateMemberStatus = (memberId, status) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, status } : member
    ));
  };

  const addTeamMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Math.max(...teamMembers.map(m => m.id)) + 1,
      checkIns: [],
      lastActive: 'Just now'
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const removeMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const toggleIntegration = (integrationId) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: !integration.connected, status: integration.connected ? 'Inactive' : 'Active' }
        : integration
    ));
  };

  const switchUserRole = (role) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const value = {
    currentUser,
    teamMembers,
    integrations,
    addCheckIn,
    updateMemberStatus,
    addTeamMember,
    removeMember,
    toggleIntegration,
    switchUserRole
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
