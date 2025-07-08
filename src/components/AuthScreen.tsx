import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, Users, Stethoscope, CheckCircle } from 'lucide-react';

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
export function AuthScreen() {
  const [activeTab, setActiveTab] = useState('login');

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
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Medical Registration Number" 
                  className="h-12"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="h-12"
                />
                <Button variant="premium" className="w-full h-12 text-base">
                  Sign In
                </Button>
                <Button variant="ghost" className="w-full">
                  Forgot Password?
                </Button>
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="First Name" className="h-12" />
                  <Input placeholder="Last Name" className="h-12" />
                </div>
                <Input 
                  placeholder="Medical Registration Number" 
                  className="h-12"
                />
                <Input 
                  type="email" 
                  placeholder="Professional Email" 
                  className="h-12"
                />
                <Input 
                  placeholder="Medical College/University" 
                  className="h-12"
                />
                <Input 
                  type="password" 
                  placeholder="Create Password" 
                  className="h-12"
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

                <Button variant="premium" className="w-full h-12 text-base">
                  Create Account & Verify
                </Button>
                
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By registering, you agree to our Terms of Service and Privacy Policy. 
                  Account subject to medical license verification.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}