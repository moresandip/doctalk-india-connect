import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { AuthScreen } from '@/components/AuthScreen';
import { Dashboard } from '@/components/Dashboard';
import { NetworkingHub } from '@/components/NetworkingHub';
import { CasesScreen } from '@/components/CasesScreen';
import { EventsScreen } from '@/components/EventsScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { BottomNavigation } from '@/components/BottomNavigation';

/**
 * DocTalk India Connect - Main Application
 * 
 * This is a comprehensive mobile-first social networking platform for doctors in India.
 * 
 * Design Philosophy:
 * - Professional-first design with medical credibility at the core
 * - Mobile-optimized for busy doctors who need quick access
 * - Trust-building elements throughout (verification badges, credentials)
 * - Time-saving features with curated, relevant content
 * - Clean, distraction-free interface focused on professional networking
 * 
 * Key Features Implemented:
 * 1. Secure authentication with medical license verification
 * 2. Professional dashboard with curated medical content
 * 3. Networking hub for connecting with peers
 * 4. Professional profile showcasing credentials
 * 5. Mobile-first navigation optimized for one-handed use
 * 
 * Color Strategy:
 * - Primary Blue (#2563eb): Medical trust and authority
 * - Secondary Teal (#0891b2): Calming, medical association
 * - Accent Orange (#ea580c): Attention and notifications
 * - Success Green (#059669): Positive outcomes and verification
 * 
 * Target Audience: Verified medical professionals in India
 * Primary Use Cases: Professional networking, case discussions, CME, medical news
 */
const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // For demonstration, we'll show the auth screen first
  // In production, this would check actual authentication state
  if (!isAuthenticated) {
    return (
      <Layout>
        <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />
      </Layout>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'network':
        return <NetworkingHub />;
      case 'discussions':
        return <CasesScreen />;
      case 'events':
        return <EventsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderActiveScreen()}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </Layout>
  );
};

export default Index;
