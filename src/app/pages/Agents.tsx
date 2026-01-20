'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockAgents, getFilteredAgents, getUniqueTeams, getUniqueEnvironments, getUniqueModels } from '@/app/data/mockData';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Plus, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Agents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState({
    team: 'all',
    environment: 'all',
    model: 'all',
    status: 'all'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAgents = getFilteredAgents(mockAgents, filters).filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teams = getUniqueTeams(mockAgents);
  const environments = getUniqueEnvironments(mockAgents);
  const models = getUniqueModels(mockAgents);

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-8 py-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your AI agent registry</p>
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
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: 'rgba(13, 144, 178)', color: 'white' }}
          >
            <Plus className="w-4 h-4" />
            Add Agent
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                </div>
                <StatusBadge status={agent.status} showLabel={false} />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Team</span>
                  <span className="text-foreground font-medium">{agent.team}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Environment</span>
                  <span className={`
                    inline-flex px-2 py-0.5 rounded text-xs font-medium
                    ${agent.environment === 'production' ? 'bg-blue-50 text-blue-700' : ''}
                    ${agent.environment === 'staging' ? 'bg-purple-50 text-purple-700' : ''}
                    ${agent.environment === 'development' ? 'bg-gray-100 text-gray-700' : ''}
                  `}>
                    {agent.environment}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Model</span>
                  <span className="text-foreground font-mono text-xs">{agent.model}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Success Rate</span>
                  <span className="font-medium text-foreground">{agent.successRate.toFixed(1)}%</span>
                </div>
                <div className="bg-muted rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      agent.successRate >= 95 ? 'bg-green-500' :
                      agent.successRate >= 85 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${agent.successRate}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Last run: {mounted ? formatDistanceToNow(agent.lastRun, { addSuffix: true }) : 'Loading...'}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">No agents found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
