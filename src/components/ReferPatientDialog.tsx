import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Users, Search, Star, MapPin, GraduationCap } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  experience: string;
}

interface ReferPatientDialogProps {
  children: React.ReactNode;
}

export function ReferPatientDialog({ children }: ReferPatientDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    medicalHistory: '',
    currentSymptoms: '',
    referralReason: '',
    urgency: 'routine',
    patientPhone: ''
  });
  const { toast } = useToast();

  const suggestedDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Ananya Reddy',
      specialty: 'Cardiology',
      hospital: 'Fortis Hospital',
      location: 'Bangalore',
      rating: 4.9,
      experience: '12 years'
    },
    {
      id: '2',
      name: 'Dr. Vikram Khanna',
      specialty: 'Neurology',
      hospital: 'Apollo Hospital',
      location: 'Chennai',
      rating: 4.8,
      experience: '15 years'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatology',
      hospital: 'Max Healthcare',
      location: 'Delhi',
      rating: 4.7,
      experience: '10 years'
    }
  ];

  const filteredDoctors = suggestedDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReferral = async () => {
    if (!formData.patientName || !formData.referralReason || !selectedDoctor) {
      toast({
        title: "Missing Information",
        description: "Please fill in patient details, select a doctor, and provide referral reason.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Referral Sent",
        description: `Patient ${formData.patientName} has been referred to ${selectedDoctor.name}`,
      });
      
      // Reset form
      setFormData({
        patientName: '',
        patientAge: '',
        patientGender: '',
        medicalHistory: '',
        currentSymptoms: '',
        referralReason: '',
        urgency: 'routine',
        patientPhone: ''
      });
      setSelectedDoctor(null);
      setSearchQuery('');
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send referral. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Refer Patient
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Patient Information</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="patientAge">Age</Label>
                <Input
                  id="patientAge"
                  value={formData.patientAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Gender</Label>
                <Select value={formData.patientGender} onValueChange={(value) => setFormData(prev => ({ ...prev, patientGender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="patientPhone">Phone</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientPhone: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="currentSymptoms">Current Symptoms</Label>
              <Textarea
                id="currentSymptoms"
                value={formData.currentSymptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, currentSymptoms: e.target.value }))}
                placeholder="Describe current symptoms..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                placeholder="Relevant medical history..."
                rows={2}
              />
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Select Specialist</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name or specialty..."
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedDoctor?.id === doctor.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{doctor.name}</h4>
                      <Badge variant="outline" className="text-xs mb-1">
                        {doctor.specialty}
                      </Badge>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{doctor.hospital}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Referral Details</h3>
            
            <div>
              <Label>Urgency</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="referralReason">Referral Reason *</Label>
              <Textarea
                id="referralReason"
                value={formData.referralReason}
                onChange={(e) => setFormData(prev => ({ ...prev, referralReason: e.target.value }))}
                placeholder="Reason for referral and specific requirements..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleReferral} disabled={isLoading}>
              {isLoading ? "Sending Referral..." : "Send Referral"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}