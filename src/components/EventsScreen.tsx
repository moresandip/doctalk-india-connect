import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Calendar,
  MapPin, 
  Clock, 
  Users, 
  Star,
  Bookmark,
  Share,
  Plus,
  Video,
  Award,
  Coffee,
  Building,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Events Screen Component - CME, Conferences, and Professional Events
 * 
 * Design Decisions:
 * 1. Event-focused cards with clear date/time prominence
 * 2. CME credit tracking - important for medical license maintenance
 * 3. Registration and interest tracking - professional event engagement
 * 4. Category filtering - different types of medical events
 * 
 * Rationale: Medical professionals need continuous education for license maintenance.
 * The interface makes it easy to find relevant events, track CME credits, and
 * register for professional development opportunities.
 */
export function EventsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "National Emergency Medicine Conference 2024",
      organizer: "Indian Society of Emergency Medicine",
      date: "March 15-17, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Mumbai Convention Center",
      type: "Conference",
      mode: "Hybrid",
      category: "Emergency Medicine",
      cmeCredits: 15,
      price: "₹5,500",
      earlyBird: "₹4,500",
      attendees: 450,
      maxAttendees: 500,
      speakers: ["Dr. Ramesh Agarwal", "Dr. Priya Nair", "Dr. Suresh Kumar"],
      topics: ["Trauma Management", "Cardiac Emergencies", "Pediatric Emergency"],
      isRegistered: false,
      isBookmarked: true,
      rating: 4.8,
      image: "conference-bg"
    },
    {
      id: 2,
      title: "Advanced Cardiac Interventions Workshop",
      organizer: "Cardiological Society of India",
      date: "March 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "AIIMS Delhi",
      type: "Workshop",
      mode: "In-person",
      category: "Cardiology",
      cmeCredits: 8,
      price: "₹3,200",
      earlyBird: null,
      attendees: 45,
      maxAttendees: 50,
      speakers: ["Dr. Ashok Seth", "Dr. Upendra Kaul"],
      topics: ["TAVR Procedures", "Complex PCI", "Structural Heart Disease"],
      isRegistered: true,
      isBookmarked: false,
      rating: 4.9,
      image: "workshop-bg"
    },
    {
      id: 3,
      title: "Digital Health & AI in Medicine Webinar Series",
      organizer: "Medical Technology Association",
      date: "Every Thursday",
      time: "7:00 PM - 8:30 PM",
      location: "Online",
      type: "Webinar",
      mode: "Virtual",
      category: "Technology",
      cmeCredits: 2,
      price: "Free",
      earlyBird: null,
      attendees: 1200,
      maxAttendees: 2000,
      speakers: ["Dr. Rajesh Khurana", "Dr. Anita Sharma"],
      topics: ["AI Diagnostics", "Telemedicine", "Digital Therapeutics"],
      isRegistered: false,
      isBookmarked: true,
      rating: 4.6,
      image: "webinar-bg"
    },
    {
      id: 4,
      title: "Pediatric Surgery Masterclass",
      organizer: "Indian Association of Pediatric Surgeons",
      date: "April 5-6, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Chennai Medical College",
      type: "Masterclass",
      mode: "In-person",
      category: "Pediatric Surgery",
      cmeCredits: 12,
      price: "₹8,500",
      earlyBird: "₹7,000",
      attendees: 78,
      maxAttendees: 100,
      speakers: ["Dr. Devendra Gupta", "Dr. Mukesh Agarwal"],
      topics: ["Neonatal Surgery", "Minimally Invasive Techniques"],
      isRegistered: false,
      isBookmarked: false,
      rating: 4.7,
      image: "masterclass-bg"
    }
  ];

  const eventTabs = [
    { id: 'upcoming', label: 'Upcoming', count: 12 },
    { id: 'registered', label: 'Registered', count: 3 },
    { id: 'past', label: 'Past Events', count: 28 },
    { id: 'bookmarked', label: 'Saved', count: 8 }
  ];

  const categoryFilters = [
    'All', 'Cardiology', 'Emergency', 'Surgery', 'Pediatrics', 'Technology', 'Internal Medicine'
  ];

  const eventTypes = [
    'All Types', 'Conference', 'Workshop', 'Webinar', 'Masterclass', 'CME Course'
  ];

  const handleRegister = (eventId: number) => {
    toast({
      title: "Registration Successful!",
      description: "You'll receive event details and reminders via email.",
    });
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={event.type === 'Conference' ? 'default' : 
                        event.type === 'Workshop' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {event.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
              {event.mode === 'Virtual' && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  <Video className="w-3 h-3 mr-1" />
                  Virtual
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-sm leading-tight mb-2">{event.title}</h3>
            <p className="text-xs text-muted-foreground">{event.organizer}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${event.isBookmarked ? 'text-accent' : ''}`}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Date and Time */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{event.time}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{event.location}</span>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-3 h-3 text-accent" />
                <span className="text-xs font-medium">CME Credits</span>
              </div>
              <p className="text-sm font-bold text-accent">{event.cmeCredits}</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-3 h-3 text-secondary" />
                <span className="text-xs font-medium">Attendees</span>
              </div>
              <p className="text-sm font-bold text-secondary">{event.attendees}/{event.maxAttendees}</p>
            </div>
          </div>

          {/* Topics */}
          <div>
            <p className="text-xs font-medium mb-2">Key Topics:</p>
            <div className="flex gap-1 flex-wrap">
              {event.topics.slice(0, 3).map((topic: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {event.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{event.topics.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Speakers */}
          <div>
            <p className="text-xs font-medium mb-2">Featured Speakers:</p>
            <div className="flex items-center gap-2">
              {event.speakers.slice(0, 2).map((speaker: string, index: number) => (
                <div key={index} className="flex items-center gap-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {speaker.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{speaker}</span>
                </div>
              ))}
              {event.speakers.length > 2 && (
                <span className="text-xs text-muted-foreground">+{event.speakers.length - 2} more</span>
              )}
            </div>
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium">{event.rating}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                ({event.attendees} reviews)
              </div>
            </div>
            <div className="text-right">
              {event.earlyBird && (
                <p className="text-xs text-muted-foreground line-through">{event.price}</p>
              )}
              <p className="text-sm font-bold text-primary">
                {event.earlyBird || event.price}
              </p>
              {event.earlyBird && (
                <p className="text-xs text-accent">Early Bird</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {event.isRegistered ? (
              <Button variant="outline" className="flex-1" disabled>
                <CheckCircle className="w-4 h-4 mr-1" />
                Registered
              </Button>
            ) : (
              <Button 
                variant="premium" 
                className="flex-1"
                onClick={() => handleRegister(event.id)}
              >
                Register Now
              </Button>
            )}
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-soft sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Medical Events</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>Create Medical Event</DialogTitle>
                  <DialogDescription>
                    Organize a conference, workshop, or educational event for medical professionals
                  </DialogDescription>
                </DialogHeader>
                <div className="text-center py-4">
                  <Building className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Event creation feature coming soon! Contact support for assistance with organizing events.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filter */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search events, topics, organizers..."
                className="pl-10 h-10"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {eventTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="p-4">
        {/* Filter Pills */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryFilters.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="pill"
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {eventTypes.map((type) => (
              <Button
                key={type}
                variant={type === 'All Types' ? 'secondary' : 'outline'}
                size="pill"
                className="shrink-0"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* CME Progress Card */}
        <Card className="mb-6 bg-gradient-primary text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">CME Progress 2024</h3>
                <p className="text-sm text-white/90">35 of 50 credits earned</p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <span className="text-xl font-bold">70%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="upcoming" className="space-y-4 mt-0">
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registered" className="space-y-4 mt-0">
            <div className="space-y-4">
              {events.filter(e => e.isRegistered).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-0">
            <div className="text-center py-8">
              <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Past Events</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your attended events and their certificates will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4 mt-0">
            <div className="space-y-4">
              {events.filter(e => e.isBookmarked).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}