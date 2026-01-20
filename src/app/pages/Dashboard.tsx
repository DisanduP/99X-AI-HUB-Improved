'use client';

import { useState, useEffect } from 'react';
import { StatusBadge } from '@/app/components/StatusBadge';
import { mockAgents, getFilteredAgents, getUniqueTeams, getUniqueEnvironments, getUniqueModels } from '@/app/data/mockData';
import { Agent } from '@/app/types';
import { Plus, MoreVertical, Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { formatDistanceToNow } from 'date-fns';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState({
    team: 'all',
    environment: 'all',
    model: 'all',
    status: 'all'
  });
  const [sortField, setSortField] = useState<keyof Agent>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAgents = getFilteredAgents(mockAgents, filters).filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Agent) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Agent) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const teams = getUniqueTeams(mockAgents);
  const environments = getUniqueEnvironments(mockAgents);
  const models = getUniqueModels(mockAgents);

  // Stats
  const healthyCount = mockAgents.filter(a => a.status === 'healthy').length;
  const degradedCount = mockAgents.filter(a => a.status === 'degraded').length;
  const failedCount = mockAgents.filter(a => a.status === 'failed').length;
  const avgSuccessRate = mockAgents.reduce((acc, a) => acc + a.successRate, 0) / mockAgents.length;

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-8 py-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Agents</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage your AI agents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Total Agents</div>
            <div className="text-3xl font-semibold text-foreground">{mockAgents.length}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Healthy</div>
            <div className="text-3xl font-semibold text-green-600">{healthyCount}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Issues</div>
            <div className="text-3xl font-semibold text-yellow-600">{degradedCount + failedCount}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Avg Success Rate</div>
            <div className="text-3xl font-semibold text-foreground">{avgSuccessRate.toFixed(1)}%</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'rgba(13, 144, 178)' } as any}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={filters.team}
              onChange={(e) => setFilters({ ...filters, team: e.target.value })}
              className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>

            <select
              value={filters.environment}
              onChange={(e) => setFilters({ ...filters, environment: e.target.value })}
              className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Environments</option>
              {environments.map(env => (
                <option key={env} value={env}>{env}</option>
              ))}
            </select>

            <select
              value={filters.model}
              onChange={(e) => setFilters({ ...filters, model: e.target.value })}
              className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Models</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Statuses</option>
              <option value="healthy">Healthy</option>
              <option value="degraded">Degraded</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <button 
            className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{ backgroundColor: 'rgba(13, 144, 178)', color: 'white' }}
          >
            <Plus className="w-4 h-4" />
            Add Agent
          </button>
        </div>

        {/* Agents Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Agent
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Status
                      {getSortIcon('status')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('team')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Team
                      {getSortIcon('team')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('environment')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Environment
                      {getSortIcon('environment')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('model')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Model
                      {getSortIcon('model')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Run
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('successRate')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Success Rate
                      {getSortIcon('successRate')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div className="cursor-help">
                              <div className="text-sm font-medium text-foreground">{agent.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{agent.description}</div>
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs border border-border"
                              sideOffset={5}
                            >
                              {agent.description}
                              <Tooltip.Arrow className="fill-border" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={agent.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{agent.team}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex px-2 py-1 rounded text-xs font-medium
                        ${agent.environment === 'production' ? 'bg-blue-50 text-blue-700' : ''}
                        ${agent.environment === 'staging' ? 'bg-purple-50 text-purple-700' : ''}
                        ${agent.environment === 'development' ? 'bg-gray-100 text-gray-700' : ''}
                      `}>
                        {agent.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground font-mono">{agent.model}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {mounted ? formatDistanceToNow(agent.lastRun, { addSuffix: true }) : 'Loading...'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-1.5 w-16">
                          <div
                            className={`h-full rounded-full ${
                              agent.successRate >= 95 ? 'bg-green-500' :
                              agent.successRate >= 85 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${agent.successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{agent.successRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAgents.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-sm">No agents found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
