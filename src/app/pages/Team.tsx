'use client';

import { useState, useEffect } from 'react';
import { mockTeamMembers } from '@/app/data/mockData';
import { Plus, Mail, MoreVertical, Shield, Code, Eye, Search } from 'lucide-react';
import { format } from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog';

export function Team() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'developer' | 'viewer'>('developer');
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMembers = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.teams.some(team => team.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'developer':
        return <Code className="w-4 h-4 text-blue-600" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const config = {
      admin: 'bg-purple-50 text-purple-700',
      developer: 'bg-blue-50 text-blue-700',
      viewer: 'bg-gray-100 text-gray-700'
    };
    return config[role as keyof typeof config] || config.viewer;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-8 py-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Team</h1>
            <p className="text-sm text-muted-foreground">Manage team members and their access</p>
          </div>

      
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'rgba(13, 144, 178)' } as any}
            />
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: 'rgba(13, 144, 178)', color: 'white' }}
          >
            <Plus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Total Members</div>
            <div className="text-3xl font-semibold text-foreground">{filteredMembers.length}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Admins</div>
            <div className="text-3xl font-semibold text-purple-600">
              {filteredMembers.filter(m => m.role === 'admin').length}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Developers</div>
            <div className="text-3xl font-semibold text-blue-600">
              {filteredMembers.filter(m => m.role === 'developer').length}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm text-muted-foreground mb-1">Viewers</div>
            <div className="text-3xl font-semibold text-gray-600">
              {filteredMembers.filter(m => m.role === 'viewer').length}
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Teams
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-medium"
                          style={{ backgroundColor: 'rgba(13, 144, 178)', color: 'white' }}
                        >
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadge(member.role)}`}>
                        {getRoleIcon(member.role)}
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {member.teams.map((team, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs"
                            style={{ backgroundColor: 'rgba(201, 232, 246)', color: '#000' }}
                          >
                            {team}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {format(member.joinedDate, 'MMM dd, yyyy')}
                      </span>
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
        </div>
      </div>

      {/* Invite Modal */}
      <Dialog.Root open={showInviteModal} onOpenChange={setShowInviteModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-6 w-full max-w-md z-50 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Invite Team Member
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 text-gray-900"
                  style={{ '--tw-ring-color': 'rgba(13, 144, 178)' } as any}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle invite
                    setShowInviteModal(false);
                    setInviteEmail('');
                  }}
                  className="flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'rgba(13, 144, 178)' }}
                >
                  <Mail className="w-4 h-4" />
                  Send Invite
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
