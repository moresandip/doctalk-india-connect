import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, Users, Stethoscope, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

/**
 * Authentication Screen Component
 * 
 * Design Decisions:
 * 1. Combined login/register in tabs - reduces cognitive load
 * 2. Medical license verification emphasis - builds trust immediately
 * 3. Trust indicators (shield, verification badges) - critical for medical platform
 * 4. Professional color scheme - medical blue + clean white
 * 
 * Rationale: Doctors need to trust the platform immediately. The verification
 * process must feel secure and professional, not like a social media app.
 */
export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [loginForm, setLoginForm] = useState({
    registrationNumber: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    email: '',
    medicalCollege: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (loginForm.registrationNumber && loginForm.password) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });
        onAuthSuccess();
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your registration number and password.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with validation
    setTimeout(() => {
      if (registerForm.firstName && registerForm.lastName && 
          registerForm.registrationNumber && registerForm.email && 
          registerForm.medicalCollege && registerForm.password) {
        toast({
          title: "Account created successfully!",
          description: "Your medical credentials are being verified. Welcome to DocTalk!",
        });
        onAuthSuccess();
      } else {
        toast({
          title: "Registration failed",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const trustIndicators = [
    { icon: Shield, text: "Medical License Verified", color: "bg-success" },
    { icon: Heart, text: "HIPAA Compliant", color: "bg-primary" },
    { icon: Users, text: "10,000+ Doctors", color: "bg-secondary" },
    { icon: Stethoscope, text: "India Medical Council Approved", color: "bg-accent" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-primary">
      {/* Header with branding */}
      <div className="text-center pt-12 pb-8 px-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">DocTalk</h1>
            <p className="text-sm text-white/80">India Connect</p>
          </div>
        </div>
        <p className="text-white/90 text-sm max-w-xs mx-auto leading-relaxed">
          The trusted professional network for verified medical practitioners in India
        </p>
      </div>

      {/* Trust indicators */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className={`w-8 h-8 ${indicator.color} rounded-full flex items-center justify-center`}>
                <indicator.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-white/90 font-medium">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication form */}
      <div className="flex-1 bg-background rounded-t-3xl p-6 shadow-strong">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your verified medical professional account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input 
                    placeholder="Medical Registration Number" 
                    className="h-12"
                    value={loginForm.registrationNumber}
                    onChange={(e) => setLoginForm(prev => ({ 
                      ...prev, 
                      registrationNumber: e.target.value 
                    }))}
                    required
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="h-12"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="premium" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                  <Button variant="ghost" className="w-full" type="button">
                    Forgot Password?
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Join DocTalk</CardTitle>
                <CardDescription>
                  Create your verified professional account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      placeholder="First Name" 
                      className="h-12"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm(prev => ({ 
                        ...prev, 
                        firstName: e.target.value 
                      }))}
                      required
                    />
                    <Input 
                      placeholder="Last Name" 
                      className="h-12"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm(prev => ({ 
                        ...prev, 
                        lastName: e.target.value 
                      }))}
                      required
                    />
                  </div>
                  <Input 
                    placeholder="Medical Registration Number" 
                    className="h-12"
                    value={registerForm.registrationNumber}
                    onChange={(e) => setRegisterForm(prev => ({ 
                      ...prev, 
                      registrationNumber: e.target.value 
                    }))}
                    required
                  />
                  <Input 
                    type="email" 
                    placeholder="Professional Email" 
                    className="h-12"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    required
                  />
                  <Input 
                    placeholder="Medical College/University" 
                    className="h-12"
                    value={registerForm.medicalCollege}
                    onChange={(e) => setRegisterForm(prev => ({ 
                      ...prev, 
                      medicalCollege: e.target.value 
                    }))}
                    required
                  />
                  <Input 
                    type="password" 
                    placeholder="Create Password" 
                    className="h-12"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                    required
                  />
                  
                  {/* Verification badge */}
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-sm font-medium text-success">Instant Verification</p>
                      <p className="text-xs text-muted-foreground">
                        Your credentials will be verified with Indian Medical Council
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account & Verify"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    By registering, you agree to our Terms of Service and Privacy Policy. 
                    Account subject to medical license verification.
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}