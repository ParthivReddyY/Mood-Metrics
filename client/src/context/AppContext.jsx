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
  const [currentUser, setCurrentUser] = useState({ 
    role: 'manager', 
    id: 1, 
    name: 'Parthiv Reddy',
    email: 'parthivreddy7769@gmail.com'
  });
  
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Parthiv Reddy',
      role: 'Team Manager',
      email: 'parthivreddy7769@gmail.com',
      mood: 'great',
      productivity: 94,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: 'Just now',
      energy: 5,
      stress: 2,
      notes: 'Leading the team and monitoring project progress',
      wellnessScore: 4.5,
      burnoutRisk: 'Low',
      tasksCompleted: 16,
      hoursWorked: 8.0,
      checkIns: [
        { date: '2025-07-18', mood: 'great', energy: 5, stress: 2, notes: 'Great team collaboration today!' },
        { date: '2025-07-17', mood: 'good', energy: 4, stress: 3, notes: 'Productive planning session' }
      ]
    },
    {
      id: 2,
      name: 'Lakshmi Reddy',
      role: 'Full Stack Developer',
      email: 'vlakshmireddy1812@gmail.com',
      mood: 'good',
      productivity: 88,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '3 min ago',
      energy: 4,
      stress: 3,
      notes: 'Working on full stack development tasks',
      wellnessScore: 4.0,
      burnoutRisk: 'Low',
      tasksCompleted: 13,
      hoursWorked: 8.5,
      checkIns: [
        { date: '2025-07-18', mood: 'good', energy: 4, stress: 3, notes: 'Good progress on frontend components' },
        { date: '2025-07-17', mood: 'okay', energy: 3, stress: 4, notes: 'Backend integration challenges' }
      ]
    },
    {
      id: 3,
      name: 'Harshith',
      role: 'Frontend Developer',
      email: 'anchuriharshith323@gmail.com',
      mood: 'great',
      productivity: 91,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '5 min ago',
      energy: 4,
      stress: 2,
      notes: 'Building responsive UI components',
      wellnessScore: 4.3,
      burnoutRisk: 'Low',
      tasksCompleted: 15,
      hoursWorked: 7.5,
      checkIns: [
        { date: '2025-07-18', mood: 'great', energy: 4, stress: 2, notes: 'Excited about new UI designs!' },
        { date: '2025-07-17', mood: 'good', energy: 4, stress: 3, notes: 'CSS animations coming along well' }
      ]
    },
    {
      id: 4,
      name: 'Guru Charan Reddy',
      role: 'Backend Developer',
      email: 'charanreddyguru@gmail.com',
      mood: 'good',
      productivity: 85,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '10 min ago',
      energy: 3,
      stress: 3,
      notes: 'Developing APIs and database optimization',
      wellnessScore: 3.8,
      burnoutRisk: 'Low',
      tasksCompleted: 12,
      hoursWorked: 8.0,
      checkIns: [
        { date: '2025-07-18', mood: 'good', energy: 3, stress: 3, notes: 'API development going smoothly' },
        { date: '2025-07-17', mood: 'okay', energy: 3, stress: 4, notes: 'Database queries need optimization' }
      ]
    },
    {
      id: 5,
      name: 'Chandra Kiran',
      role: 'DevOps Engineer',
      email: 'Chandra6646d@gmail.com',
      mood: 'okay',
      productivity: 82,
      status: 'away',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '30 min ago',
      energy: 3,
      stress: 4,
      notes: 'Setting up CI/CD pipelines and deployment scripts',
      wellnessScore: 3.5,
      burnoutRisk: 'Medium',
      tasksCompleted: 10,
      hoursWorked: 9.0,
      checkIns: [
        { date: '2025-07-18', mood: 'okay', energy: 3, stress: 4, notes: 'Deployment issues need attention' },
        { date: '2025-07-17', mood: 'good', energy: 4, stress: 3, notes: 'CI/CD setup progressing well' }
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
