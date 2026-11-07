import React, { useState } from 'react';
import { PageContainer } from './components/layout/PageContainer';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { GoalSettingView } from './components/views/GoalSettingView';
import { TrainingPlanView } from './components/views/TrainingPlanView';
import { ScheduleView } from './components/views/ScheduleView';
import { WorkoutDetailView } from './components/views/WorkoutDetailView';
import { ProgressView } from './components/views/ProgressView';
import { EvaluationView } from './components/views/EvaluationView';
import { CommunityView } from './components/views/CommunityView';
import { CoursesView } from './components/views/CoursesView';
import { ProfileView } from './components/views/ProfileView';

export function App() {
  // Aktuell vy: 'home' | 'goals' | 'plan' | 'schedule' | 'detail' | 'progress' | 'evaluation' | 'completed' | 'upcoming' | 'community' | 'kurser' | 'profil'
  const [currentView, setCurrentView] = useState('home');

  // Aktiv flik i bottenmenyn
  const getActiveTab = () => {
    switch (currentView) {
      case 'home':
        return 'home';
      case 'goals':
      case 'plan':
      case 'schedule':
      case 'detail':
        return 'planering';
      case 'community':
        return 'community';
      case 'kurser':
        return 'kurser';
      case 'profil':
        return 'profil';
      case 'progress':
      case 'evaluation':
      case 'completed':
      case 'upcoming':
        return 'planering';
      default:
        return 'home';
    }
  };

  const handleTabChange = (tabId) => {
    switch (tabId) {
      case 'home':
        setCurrentView('home');
        break;
      case 'planering':
        // Om man klickar på Planering, navigera till träningsplanen
        setCurrentView('plan');
        break;
      case 'community':
        setCurrentView('community');
        break;
      case 'kurser':
        setCurrentView('kurser');
        break;
      case 'profil':
        setCurrentView('profil');
        break;
      default:
        setCurrentView('home');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'goals':
        return <GoalSettingView onNavigate={setCurrentView} />;
      case 'plan':
        return <TrainingPlanView onNavigate={setCurrentView} />;
      case 'schedule':
        return <ScheduleView onNavigate={setCurrentView} />;
      case 'detail':
        return <WorkoutDetailView onNavigate={setCurrentView} />;
      case 'progress':
        return <ProgressView onNavigate={setCurrentView} />;
      case 'evaluation':
        return <EvaluationView onNavigate={setCurrentView} initialStep="form" />;
      case 'completed':
        return <EvaluationView onNavigate={setCurrentView} initialStep="completed" />;
      case 'upcoming':
        return <EvaluationView onNavigate={setCurrentView} initialStep="upcoming" />;
      case 'community':
        return <CommunityView onNavigate={setCurrentView} />;
      case 'kurser':
        return <CoursesView onNavigate={setCurrentView} />;
      case 'profil':
        return <ProfileView onNavigate={setCurrentView} />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <PageContainer currentView={currentView} onNavigate={setCurrentView}>
      {/* Vyinnehåll */}
      <div className="flex-1 flex flex-col">
        {renderView()}
      </div>

      {/* Fast bottennavigering */}
      <BottomNav
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
      />
    </PageContainer>
  );
}

export default App;

