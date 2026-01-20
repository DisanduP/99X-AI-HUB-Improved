'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  Users,
  Activity,
  Settings
} from 'lucide-react';interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    path: '/agents',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    path: '/metrics',
    label: 'Metrics',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    path: '/',
    label: 'Agents',
    icon: <Bot className="w-5 h-5" />
  },
  {
    path: '/team',
    label: 'Team',
    icon: <Users className="w-5 h-5" />
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(13, 144, 178)' }}
          >
            <Activity className="w-5 h-5" style={{ color: 'white' }} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">99x AI Hub</h1>
            <p className="text-xs text-muted-foreground">AI Observability Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${isActive
                      ? 'text-white shadow-md'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                  style={isActive ? { backgroundColor: 'rgba(13, 144, 178)', color: 'white' } : {}}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © 2026 99x AI Hub
        </p>
      </div>
    </div>
  );
}
