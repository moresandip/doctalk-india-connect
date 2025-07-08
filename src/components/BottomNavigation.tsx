import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Calendar, 
  User,
  Plus
} from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Bottom Navigation Component
 * 
 * Design Decisions:
 * 1. 5 core sections + floating action button - essential medical networking functions
 * 2. Badge notifications on relevant icons - doctors need to stay updated
 * 3. Professional iconography - medical and networking focused icons
 * 4. Floating action button for quick case sharing - primary action for engagement
 * 
 * Rationale: Mobile-first navigation optimized for one-handed use. The floating action
 * button encourages content creation (case sharing) which is core to the platform's value.
 * Clean, professional design that doesn't distract from medical content.
 */
export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', notifications: 0 },
    { id: 'network', icon: Users, label: 'Network', notifications: 3 },
    { id: 'discussions', icon: MessageSquare, label: 'Cases', notifications: 5 },
    { id: 'events', icon: Calendar, label: 'Events', notifications: 2 },
    { id: 'profile', icon: User, label: 'Profile', notifications: 0 },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <Button
          variant="premium"
          size="icon"
          className="w-14 h-14 rounded-full shadow-strong hover:scale-110 transition-transform duration-200"
          onClick={() => {/* Handle new case creation */}}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-strong z-10">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto p-2 relative ${
                  activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <div className="relative">
                  <item.icon className={`w-5 h-5 ${
                    activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  {item.notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 w-4 h-4 p-0 text-xs flex items-center justify-center"
                    >
                      {item.notifications}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs ${
                  activeTab === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}