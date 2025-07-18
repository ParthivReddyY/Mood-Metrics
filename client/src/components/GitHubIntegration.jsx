import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const GitHubIntegration = () => {
  const { integrations, toggleIntegration } = useApp();
  const [gitHubData, setGitHubData] = useState({
    pullRequests: [],
    commits: [],
    repositories: [],
    loading: false,
    error: null
  });
  
  const [gitHubConfig, setGitHubConfig] = useState({
    token: '',
    owner: '',
    repo: '',
    author: ''
  });

  const [showTokenInput, setShowTokenInput] = useState(false);
  const isGitHubConnected = integrations.find(i => i.name === 'GitHub')?.connected;

  const handleConfigChange = (field, value) => {
    setGitHubConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchGitHubData = async () => {
    if (!gitHubConfig.token || !gitHubConfig.owner || !gitHubConfig.repo || !gitHubConfig.author) {
      setGitHubData(prev => ({ ...prev, error: 'All fields are required.' }));
      return;
    }

    setGitHubData(prev => ({ ...prev, loading: true, error: null }));

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${gitHubConfig.token}`
    };

    try {
      const [prResponse, commitResponse] = await Promise.all([
        fetch(`https://api.github.com/search/issues?q=repo:${gitHubConfig.owner}/${gitHubConfig.repo}+is:pr+author:${gitHubConfig.author}`, { headers }),
        fetch(`https://api.github.com/repos/${gitHubConfig.owner}/${gitHubConfig.repo}/commits?author=${gitHubConfig.author}`, { headers })
      ]);

      let pullRequests = [];
      let commits = [];

      if (prResponse.ok) {
        const prData = await prResponse.json();
        pullRequests = prData.items || [];
      } else {
        const errorData = await prResponse.json();
        throw new Error(`Failed to fetch Pull Requests: ${errorData.message || prResponse.statusText}`);
      }

      if (commitResponse.ok) {
        const commitData = await commitResponse.json();
        commits = commitData || [];
      } else {
        const errorData = await commitResponse.json();
        throw new Error(`Failed to fetch Commits: ${errorData.message || commitResponse.statusText}`);
      }

      setGitHubData(prev => ({
        ...prev,
        pullRequests,
        commits,
        loading: false,
        error: null
      }));

    } catch (error) {
      setGitHubData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const connectGitHub = () => {
    const gitHubIntegration = integrations.find(i => i.name === 'GitHub');
    if (gitHubIntegration && !gitHubIntegration.connected) {
      toggleIntegration(gitHubIntegration.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (state) => {
    switch (state) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'merged': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  // Sample GitHub metrics for dashboard display
  const gitHubMetrics = {
    totalCommits: gitHubData.commits.length,
    totalPRs: gitHubData.pullRequests.length,
    openPRs: gitHubData.pullRequests.filter(pr => pr.state === 'open').length,
    closedPRs: gitHubData.pullRequests.filter(pr => pr.state === 'closed').length,
    recentActivity: Math.max(gitHubData.commits.length, gitHubData.pullRequests.length)
  };

  return (
    <div className="space-y-6">
      {/* GitHub Integration Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">GitHub Integration</h3>
              <p className="text-sm text-gray-600">Connect and monitor GitHub repositories</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isGitHubConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isGitHubConnected ? 'Connected' : 'Not Connected'}
            </span>
            {!isGitHubConnected && (
              <button
                onClick={connectGitHub}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Connect GitHub
              </button>
            )}
          </div>
        </div>

        {/* GitHub Metrics Overview */}
        {isGitHubConnected && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{gitHubMetrics.totalCommits}</div>
              <div className="text-sm text-gray-600">Total Commits</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{gitHubMetrics.totalPRs}</div>
              <div className="text-sm text-gray-600">Pull Requests</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{gitHubMetrics.openPRs}</div>
              <div className="text-sm text-gray-600">Open PRs</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{gitHubMetrics.closedPRs}</div>
              <div className="text-sm text-gray-600">Closed PRs</div>
            </div>
          </div>
        )}

        {/* Configuration Form */}
        {isGitHubConnected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-900">Repository Configuration</h4>
              <button
                onClick={() => setShowTokenInput(!showTokenInput)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showTokenInput ? 'Hide Configuration' : 'Show Configuration'}
              </button>
            </div>

            {showTokenInput && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={gitHubConfig.token}
                    onChange={(e) => handleConfigChange('token', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your GitHub PAT"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Required for API authentication. 
                    <a href="https://github.com/settings/tokens/new?scopes=repo,read:org" target="_blank" className="text-blue-600 hover:underline ml-1">
                      Create one here
                    </a>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repository Owner</label>
                    <input
                      type="text"
                      value={gitHubConfig.owner}
                      onChange={(e) => handleConfigChange('owner', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., facebook"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repository Name</label>
                    <input
                      type="text"
                      value={gitHubConfig.repo}
                      onChange={(e) => handleConfigChange('repo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., react"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Username</label>
                    <input
                      type="text"
                      value={gitHubConfig.author}
                      onChange={(e) => handleConfigChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., gaearon"
                    />
                  </div>
                </div>

                <button
                  onClick={fetchGitHubData}
                  disabled={gitHubData.loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {gitHubData.loading ? 'Fetching Data...' : 'Fetch GitHub Data'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {gitHubData.loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error Message */}
        {gitHubData.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error fetching GitHub data</h3>
                <p className="text-sm text-red-700 mt-1">{gitHubData.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isGitHubConnected && !gitHubData.loading && !gitHubData.error && (gitHubData.pullRequests.length > 0 || gitHubData.commits.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Pull Requests */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Pull Requests</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {gitHubData.pullRequests.length === 0 ? (
                  <p className="text-gray-500 text-sm">No pull requests found for this user.</p>
                ) : (
                  gitHubData.pullRequests.map((pr) => (
                    <div key={pr.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {pr.title}
                      </a>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>#{pr.number}</span> • 
                        <span className={`font-medium ml-1 ${getStatusColor(pr.state)}`}>
                          {pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}
                        </span> • 
                        <span className="ml-1">Created on {formatDate(pr.created_at)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Commits */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Commits</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {gitHubData.commits.length === 0 ? (
                  <p className="text-gray-500 text-sm">No commits found for this user.</p>
                ) : (
                  gitHubData.commits.map((commitData) => (
                    <div key={commitData.sha} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="font-mono text-sm text-gray-800 truncate">
                        {commitData.commit.message.split('\n')[0]}
                      </p>
                      <div className="text-xs text-gray-600 mt-2">
                        <a
                          href={commitData.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-mono"
                        >
                          {commitData.sha.substring(0, 7)}
                        </a>
                        <span className="ml-2">
                          by {commitData.commit.author.name} on {formatDate(commitData.commit.author.date)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubIntegration;
