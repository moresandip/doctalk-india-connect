import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Star,
  MessageCircle,
  UserPlus,
  CheckCircle
} from 'lucide-react';

/**
 * Networking Hub Component
 * 
 * Design Decisions:
 * 1. Search-first approach - doctors need to find specific professionals quickly
 * 2. Multiple filter options - specialty, location, alma mater for precise networking
 * 3. Professional card design - credentials front and center, not social metrics
 * 4. Quick connect actions - minimal friction for professional networking
 * 
 * Rationale: Medical networking is purpose-driven. Doctors connect for consultations,
 * referrals, and professional collaboration. The interface prioritizes credentials
 * and professional information over social engagement metrics.
 */
export function NetworkingHub() {
  const [activeTab, setActiveTab] = useState('discover');

  const suggestedConnections = [
    {
      id: 1,
      name: "Dr. Ananya Reddy",
      specialty: "Pediatric Cardiology",
      hospital: "Fortis Hospital, Bangalore",
      almaMater: "AIIMS Delhi",
      experience: "12 years",
      location: "Bangalore",
      connectionReason: "Same specialty",
      mutualConnections: 8,
      verified: true,
      rating: 4.9,
      consultations: 1200
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Orthopedic Surgery",
      hospital: "Apollo Hospital, Chennai",
      almaMater: "CMC Vellore",
      experience: "15 years",
      location: "Chennai",
      connectionReason: "Similar cases discussed",
      mutualConnections: 12,
      verified: true,
      rating: 4.8,
      consultations: 2100
    },
    {
      id: 3,
      name: "Dr. Meera Joshi",
      specialty: "Neurology",
      hospital: "KEM Hospital, Mumbai",
      almaMater: "Grant Medical College",
      experience: "8 years",
      location: "Mumbai",
      connectionReason: "Nearby location",
      mutualConnections: 5,
      verified: true,
      rating: 4.7,
      consultations: 890
    }
  ];

  const recentConnections = [
    {
      name: "Dr. Sanjay Patel",
      specialty: "Emergency Medicine",
      status: "Connected yesterday",
      lastActive: "2h ago"
    },
    {
      name: "Dr. Kavitha Singh",
      specialty: "Dermatology",
      status: "Connected 3 days ago",
      lastActive: "1d ago"
    }
  ];

  const ConnectionCard = ({ doctor }: { doctor: any }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {doctor.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{doctor.name}</h3>
                {doctor.verified && (
                  <CheckCircle className="w-4 h-4 text-success" />
                )}
              </div>
              <Badge variant="outline" className="text-xs mb-1">
                {doctor.specialty}
              </Badge>
              <p className="text-xs text-muted-foreground">{doctor.hospital}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="w-3 h-3" />
            <span>{doctor.almaMater}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{doctor.location} • {doctor.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="w-3 h-3" />
            <span>{doctor.consultations} consultations</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{doctor.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{doctor.mutualConnections} mutual</span>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-2 mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Connection reason:</span> {doctor.connectionReason}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="premium" size="sm" className="flex-1">
            <UserPlus className="w-3 h-3 mr-1" />
            Connect
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-soft sticky top-0 z-10">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Professional Network</h1>
          
          {/* Search and Filter */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search doctors, specialties, hospitals..."
                className="pl-10 h-10"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="connections">My Network</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="discover" className="space-y-4 mt-0">
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Same Specialty', 'Same City', 'Alumni', 'Nearby'].map((filter) => (
                <Button
                  key={filter}
                  variant={filter === 'All' ? 'default' : 'outline'}
                  size="pill"
                  className="shrink-0"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="text-center p-3">
                <p className="text-lg font-bold text-primary">156</p>
                <p className="text-xs text-muted-foreground">Suggested</p>
              </Card>
              <Card className="text-center p-3">
                <p className="text-lg font-bold text-secondary">23</p>
                <p className="text-xs text-muted-foreground">Same City</p>
              </Card>
              <Card className="text-center p-3">
                <p className="text-lg font-bold text-accent">12</p>
                <p className="text-xs text-muted-foreground">Alumni</p>
              </Card>
            </div>

            {/* Suggested Connections */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Suggested for You</h2>
              {suggestedConnections.map((doctor) => (
                <ConnectionCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-4 mt-0">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">My Connections</h2>
              <Badge variant="secondary">248 connections</Badge>
            </div>

            {/* Recent Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentConnections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm">{connection.name}</h3>
                        <p className="text-xs text-muted-foreground">{connection.specialty}</p>
                        <p className="text-xs text-muted-foreground">{connection.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">{connection.lastActive}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-0">
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">No Pending Requests</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Connection requests from other medical professionals will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}