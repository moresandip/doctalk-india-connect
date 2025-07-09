import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Bookmark, 
  Share, 
  Download,
  Send,
  Clock,
  User,
  FileText,
  Image as ImageIcon,
  ThumbsUp,
  Reply
} from 'lucide-react';

interface CaseComment {
  id: string;
  author: string;
  specialty: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: number;
}

interface CaseViewDialogProps {
  caseData: any;
  children: React.ReactNode;
}

export function CaseViewDialog({ caseData, children }: CaseViewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [comments, setComments] = useState<CaseComment[]>([
    {
      id: '1',
      author: 'Dr. Ananya Reddy',
      specialty: 'Cardiology',
      content: 'Have you considered 24-hour Holter monitoring? In young athletes, we often see exercise-induced arrhythmias that might not show up in resting ECG.',
      timeAgo: '1h ago',
      likes: 8,
      replies: 2
    },
    {
      id: '2',
      author: 'Dr. Vikram Shah',
      specialty: 'Sports Medicine',
      content: 'Agree with Dr. Reddy. Also recommend echo with strain imaging and exercise stress test. Return-to-play protocols should be very conservative in VT cases.',
      timeAgo: '45m ago',
      likes: 12,
      replies: 1
    },
    {
      id: '3',
      author: 'Dr. Sarah Khan',
      specialty: 'Electrophysiology',
      content: 'Consider genetic testing for channelopathies. Family history of sudden cardiac death? VT in young athletes warrants comprehensive evaluation.',
      timeAgo: '30m ago',
      likes: 15,
      replies: 0
    }
  ]);
  const { toast } = useToast();

  const handleJoinDiscussion = () => {
    setIsJoined(true);
    toast({
      title: "Joined Discussion",
      description: "You are now participating in this case discussion.",
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: CaseComment = {
      id: Date.now().toString(),
      author: 'Dr. You',
      specialty: 'Your Specialty',
      content: newComment,
      timeAgo: 'Just now',
      likes: 0,
      replies: 0
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the discussion.",
    });
  };

  const handleDownload = (type: 'case' | 'images' | 'reports') => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Downloading ${type === 'case' ? 'case summary' : type === 'images' ? 'medical images' : 'reports'}...`,
    });
    
    // Create a dummy download
    const element = document.createElement('a');
    const file = new Blob([`Case: ${caseData.title}\n\nAuthor: ${caseData.author}\nSpecialty: ${caseData.specialty}\n\nDescription: ${caseData.description}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${caseData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg leading-tight pr-8">
                {caseData.title}
              </DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {caseData.author.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{caseData.author}</p>
                    <p className="text-xs text-muted-foreground">{caseData.hospital}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {caseData.specialty}
                </Badge>
                <Badge 
                  variant={caseData.difficulty === 'Complex' ? 'destructive' : 
                         caseData.difficulty === 'Challenging' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {caseData.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex gap-4 flex-1 min-h-0">
            {/* Case Details - Left Side */}
            <div className="flex-1 flex flex-col min-w-0">
              <ScrollArea className="flex-1">
                <div className="space-y-4 pr-4">
                  {/* Case Description */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Case Description</h3>
                    <p className="text-sm leading-relaxed">{caseData.description}</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Tags</h3>
                    <div className="flex gap-2 flex-wrap">
                      {caseData.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medical Images */}
                  {caseData.imageCount > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Medical Images</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: caseData.imageCount }).map((_, index) => (
                          <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Options */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Downloads</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('case')}>
                        <Download className="w-3 h-3 mr-1" />
                        Case Summary
                      </Button>
                      {caseData.imageCount > 0 && (
                        <Button variant="outline" size="sm" onClick={() => handleDownload('images')}>
                          <Download className="w-3 h-3 mr-1" />
                          Images ({caseData.imageCount})
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleDownload('reports')}>
                        <Download className="w-3 h-3 mr-1" />
                        Reports
                      </Button>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-4 py-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{caseData.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{comments.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{caseData.engagement.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      <span className="text-sm">{caseData.engagement.bookmarks}</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            <Separator orientation="vertical" />

            {/* Discussion - Right Side */}
            <div className="w-80 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Discussion ({comments.length})</h3>
                {!isJoined && (
                  <Button size="sm" onClick={handleJoinDiscussion}>
                    Join Discussion
                  </Button>
                )}
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-xs">{comment.author}</p>
                            <Badge variant="outline" className="text-xs">
                              {comment.specialty}
                            </Badge>
                          </div>
                          <p className="text-sm leading-relaxed">{comment.content}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Reply className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Add Comment */}
              {isJoined && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your medical opinion or ask questions..."
                      rows={3}
                      className="text-sm"
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                        <Send className="w-3 h-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}