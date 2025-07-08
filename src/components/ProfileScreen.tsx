import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  MessageCircle,
  Edit,
  Share,
  Settings,
  CheckCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';

/**
 * Profile Screen Component
 * 
 * Design Decisions:
 * 1. Medical credentials prominently displayed - builds trust and authority
 * 2. Professional achievements over social metrics - focuses on medical expertise
 * 3. Profile completion progress - encourages comprehensive professional profiles
 * 4. Research and publications section - academic achievements important in medicine
 * 
 * Rationale: A doctor's profile is their professional reputation. The design emphasizes
 * medical credentials, experience, and achievements over follower counts or social metrics.
 * This builds trust and helps other doctors assess professional credibility for networking.
 */
export function ProfileScreen() {
  const profileData = {
    name: "Dr. Rajesh Singh",
    specialty: "Orthopedic Surgeon",
    hospital: "All India Institute of Medical Sciences",
    location: "New Delhi, India",
    experience: "15 years",
    rating: 4.8,
    consultations: 2400,
    almaMater: "AIIMS Delhi",
    graduationYear: "2009",
    registrationNumber: "DMC-12345-2009",
    profileCompletion: 85
  };

  const achievements = [
    { title: "Fellowship in Joint Replacement", year: "2015", institution: "Johns Hopkins" },
    { title: "Best Young Surgeon Award", year: "2018", institution: "Indian Orthopedic Association" },
    { title: "Research Excellence Award", year: "2021", institution: "AIIMS Delhi" }
  ];

  const publications = [
    {
      title: "Minimally Invasive Knee Replacement Techniques",
      journal: "Indian Journal of Orthopedics",
      year: "2023",
      citations: 45
    },
    {
      title: "Post-operative Care Protocols in Indian Settings",
      journal: "Asian Orthopedic Review",
      year: "2022",
      citations: 32
    }
  ];

  const stats = [
    { label: "Connections", value: "248", icon: Users },
    { label: "Case Discussions", value: "156", icon: MessageCircle },
    { label: "CME Points", value: "320", icon: Award },
    { label: "Publications", value: "12", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pt-12">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarFallback className="bg-white text-primary text-xl">
                RS
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{profileData.name}</h1>
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/90 text-sm">{profileData.specialty}</p>
              <p className="text-white/80 text-xs">{profileData.hospital}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/90 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{profileData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{profileData.experience}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span>{profileData.rating}</span>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm">{profileData.profileCompletion}%</span>
          </div>
          <Progress value={profileData.profileCompletion} className="h-2" />
          <p className="text-xs text-white/80 mt-1">
            Complete your profile to get better networking opportunities
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-soft">
              <CardContent className="p-4">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Details */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Professional Details</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{profileData.almaMater}</p>
                <p className="text-xs text-muted-foreground">
                  MBBS • Graduated {profileData.graduationYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium text-sm">Medical Registration</p>
                <p className="text-xs text-muted-foreground">
                  {profileData.registrationNumber} • Verified
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-medium text-sm">{profileData.consultations} Consultations</p>
                <p className="text-xs text-muted-foreground">
                  {profileData.rating}/5.0 Patient Rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.institution} • {achievement.year}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Publications */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Recent Publications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {publications.map((publication, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <h4 className="font-medium text-sm mb-1">{publication.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {publication.journal} • {publication.year}
                </p>
                <Badge variant="outline" className="text-xs">
                  {publication.citations} citations
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              View All Publications
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="premium" className="h-12">
            <Users className="w-4 h-4 mr-2" />
            Refer Patient
          </Button>
        </div>
      </div>
    </div>
  );
}