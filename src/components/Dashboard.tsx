import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Search, 
  Heart, 
  MessageCircle, 
  Share, 
  Calendar, 
  Users, 
  BookOpen, 
  Stethoscope,
  MapPin,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

/**
 * Dashboard Component - Main Feed Screen
 * 
 * Design Decisions:
 * 1. Clean header with search and notifications - quick access to key functions
 * 2. Status cards at top - quick overview of important metrics
 * 3. Mixed content feed - clinical cases, news, events in one stream
 * 4. Professional interaction buttons - like, comment, share for medical context
 * 
 * Rationale: Busy doctors need quick access to relevant information. The dashboard
 * prioritizes clinical content and professional networking over social features.
 * Time-saving design with scannable content cards.
 */
export function Dashboard() {
  const quickStats = [
    { label: "New Connections", value: "12", icon: Users, color: "text-primary" },
    { label: "Case Discussions", value: "5", icon: MessageCircle, color: "text-secondary" },
    { label: "Upcoming CME", value: "3", icon: Calendar, color: "text-accent" },
  ];

  const feedItems = [
    {
      type: "case",
      author: "Dr. Priya Sharma",
      specialty: "Cardiology",
      hospital: "AIIMS Delhi",
      time: "2h ago",
      title: "Complex CAD case - Multi-vessel disease in young patient",
      content: "35-year-old male presented with chest pain. ECG shows ST depression in V4-V6. Seeking opinions on intervention strategy...",
      tags: ["Cardiology", "Intervention", "Young Adult"],
      engagement: { likes: 24, comments: 8, shares: 3 }
    },
    {
      type: "news",
      source: "Indian Medical Journal",
      time: "4h ago",
      title: "New Guidelines for Diabetes Management in Indian Population Released",
      content: "The Indian Diabetes Society has released updated guidelines considering genetic factors specific to South Asian population...",
      tags: ["Diabetes", "Guidelines", "Research"],
      engagement: { likes: 156, comments: 23, shares: 89 }
    },
    {
      type: "event",
      organizer: "Medical Council of India",
      time: "6h ago",
      title: "National CME Conference on Emergency Medicine",
      content: "Join 500+ emergency physicians for the latest protocols and case discussions. CME credits available.",
      location: "Mumbai Convention Center",
      date: "March 15-17, 2024",
      tags: ["CME", "Emergency", "Conference"],
      engagement: { interested: 45, attending: 12 }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-soft sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  DS
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">Good Morning, Dr. Singh</h2>
                <p className="text-sm text-muted-foreground">Orthopedic Surgeon</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs"></span>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-3 text-center">
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Content Feed */}
      <div className="p-4 space-y-4">
        {feedItems.map((item, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {item.type === "case" && (
                    <>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {item.author?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{item.author}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.specialty}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.hospital} • {item.time}</p>
                      </div>
                    </>
                  )}
                  
                  {item.type === "news" && (
                    <>
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{item.source}</h3>
                          <Badge variant="secondary" className="text-xs">
                            News
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </>
                  )}
                  
                  {item.type === "event" && (
                    <>
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{item.organizer}</h3>
                          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                            Event
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <span className="text-lg">⋯</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <h4 className="font-semibold mb-2 leading-tight">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {item.content}
              </p>
              
              {item.location && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 mb-3">
                {item.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">
                      {item.engagement.likes || item.engagement.interested || 0}
                    </span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">
                      {item.engagement.comments || item.engagement.attending || 0}
                    </span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                    <Share className="w-4 h-4" />
                    <span className="text-xs">{item.engagement.shares || 0}</span>
                  </Button>
                </div>
                
                {item.type === "case" && (
                  <Button variant="outline" size="sm" className="h-8">
                    Join Discussion
                  </Button>
                )}
                
                {item.type === "event" && (
                  <Button variant="premium" size="sm" className="h-8">
                    Register
                  </Button>
                )}
                
                {item.type === "news" && (
                  <Button variant="ghost" size="sm" className="h-8">
                    Read More
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}