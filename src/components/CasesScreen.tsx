import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CaseViewDialog } from './CaseViewDialog';
import { 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share, 
  Plus,
  Clock,
  Star,
  Eye,
  Bookmark,
  Send,
  Image,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Cases Screen Component - Clinical Case Discussions
 * 
 * Design Decisions:
 * 1. Case-first layout - clinical cases are the main content
 * 2. Specialty filtering - doctors need to find relevant cases quickly
 * 3. Professional discussion format - medical context with proper terminology
 * 4. Create case button - encourages knowledge sharing
 * 
 * Rationale: This is the core value of the platform - doctors sharing clinical
 * expertise and discussing complex cases. The interface prioritizes readability
 * of medical content and encourages professional collaboration.
 */
export function CasesScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const cases = [
    {
      id: 1,
      title: "Complex Arrhythmia in Young Athlete",
      author: "Dr. Priya Sharma",
      specialty: "Cardiology",
      hospital: "AIIMS Delhi",
      timeAgo: "2h ago",
      description: "24-year-old professional cricket player presented with recurrent palpitations during training. ECG shows intermittent VT episodes. Looking for treatment recommendations and return-to-play protocols.",
      tags: ["Cardiology", "Sports Medicine", "Arrhythmia"],
      difficulty: "Complex",
      engagement: { likes: 34, comments: 12, views: 156, bookmarks: 8 },
      isFollowing: false,
      imageCount: 3
    },
    {
      id: 2,
      title: "Pediatric Fever of Unknown Origin - 6 Weeks",
      author: "Dr. Rajesh Kumar",
      specialty: "Pediatrics",
      hospital: "KEM Hospital Mumbai",
      timeAgo: "4h ago",
      description: "8-year-old child with persistent fever >6 weeks. Multiple investigations done including cultures, imaging. Considering rare infectious diseases vs. autoimmune conditions.",
      tags: ["Pediatrics", "Infectious Disease", "Diagnostic Challenge"],
      difficulty: "Challenging",
      engagement: { likes: 28, comments: 18, views: 203, bookmarks: 15 },
      isFollowing: true,
      imageCount: 2
    },
    {
      id: 3,
      title: "Post-operative Complications in Elderly Patient",
      author: "Dr. Meera Joshi",
      specialty: "Surgery",
      hospital: "Fortis Bangalore",
      timeAgo: "6h ago",
      description: "75-year-old patient post laparoscopic cholecystectomy developing persistent abdominal pain and fever. CT shows fluid collection. Discussing management options.",
      tags: ["Surgery", "Geriatrics", "Post-op Care"],
      difficulty: "Moderate",
      engagement: { likes: 19, comments: 9, views: 134, bookmarks: 6 },
      isFollowing: false,
      imageCount: 1
    }
  ];

  const filterTabs = [
    { id: 'all', label: 'All Cases', count: 156 },
    { id: 'following', label: 'Following', count: 23 },
    { id: 'my-cases', label: 'My Cases', count: 8 },
    { id: 'urgent', label: 'Urgent', count: 5 }
  ];

  const specialtyFilters = [
    'All', 'Cardiology', 'Neurology', 'Pediatrics', 'Surgery', 'Emergency', 'Internal Medicine'
  ];

  const handleCreateCase = () => {
    toast({
      title: "Case submitted successfully!",
      description: "Your case has been posted and colleagues will be notified.",
    });
    setIsCreateDialogOpen(false);
  };

  const CaseCard = ({ caseData }: { caseData: any }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {caseData.author.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{caseData.author}</h3>
                <Badge variant="outline" className="text-xs">
                  {caseData.specialty}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{caseData.hospital} • {caseData.timeAgo}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs ${caseData.isFollowing ? 'text-primary' : ''}`}
          >
            {caseData.isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold leading-tight flex-1">{caseData.title}</h4>
          <Badge 
            variant={caseData.difficulty === 'Complex' ? 'destructive' : 
                   caseData.difficulty === 'Challenging' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {caseData.difficulty}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {caseData.description}
        </p>
        
        <div className="flex gap-2 mb-3 flex-wrap">
          {caseData.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {caseData.imageCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Image className="w-3 h-3" />
            <span>{caseData.imageCount} medical image{caseData.imageCount > 1 ? 's' : ''}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{caseData.engagement.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{caseData.engagement.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{caseData.engagement.views}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
              <Bookmark className="w-4 h-4" />
              <span className="text-xs">{caseData.engagement.bookmarks}</span>
            </Button>
          </div>
          
          <div className="flex gap-1">
            <CaseViewDialog caseData={caseData}>
              <Button variant="outline" size="sm" className="h-8">
                View Case
              </Button>
            </CaseViewDialog>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="w-4 h-4" />
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
            <h1 className="text-xl font-bold">Clinical Cases</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="premium" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  New Case
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>Share Clinical Case</DialogTitle>
                  <DialogDescription>
                    Share an interesting case for peer discussion and learning
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Case title (e.g., Unusual presentation of...)" />
                  <Textarea 
                    placeholder="Describe the case, patient history, symptoms, and your questions for the community..."
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Your specialty" />
                    <Input placeholder="Patient age/gender" />
                  </div>
                  <Input placeholder="Tags (comma separated)" />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Image className="w-4 h-4 mr-1" />
                      Add Images
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      Add Files
                    </Button>
                  </div>
                  <Button onClick={handleCreateCase} className="w-full">
                    <Send className="w-4 h-4 mr-1" />
                    Share Case
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filter */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search cases, symptoms, treatments..."
                className="pl-10 h-10"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {filterTabs.map((tab) => (
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
        {/* Specialty Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {specialtyFilters.map((specialty) => (
            <Button
              key={specialty}
              variant={specialty === 'All' ? 'default' : 'outline'}
              size="pill"
              className="shrink-0"
            >
              {specialty}
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center p-3">
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Active Cases</p>
          </Card>
          <Card className="text-center p-3">
            <MessageCircle className="w-5 h-5 text-secondary mx-auto mb-1" />
            <p className="text-lg font-bold text-secondary">89</p>
            <p className="text-xs text-muted-foreground">Discussions</p>
          </Card>
          <Card className="text-center p-3">
            <Star className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-bold text-accent">45</p>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </Card>
        </div>

        {/* Cases Feed */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="all" className="space-y-4 mt-0">
            <div className="space-y-4">
              {cases.map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-4 mt-0">
            <div className="space-y-4">
              {cases.filter(c => c.isFollowing).map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-cases" className="space-y-4 mt-0">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">No Cases Shared Yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                Share your first clinical case to start discussions with colleagues
              </p>
              <Button 
                variant="premium" 
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Share First Case
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4 mt-0">
            <div className="space-y-4">
              {cases.filter(c => c.difficulty === 'Complex').map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}