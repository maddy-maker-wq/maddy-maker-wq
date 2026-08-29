import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Header } from './components/common/Header';
import { BottomNav, TabType } from './components/common/BottomNav';
import { LanguageModal } from './components/common/LanguageModal';
import { SOSModal } from './components/common/SOSModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';

// Worker Views
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { WorkerApplications } from './components/worker/WorkerApplications';
import { LiveShiftWorker } from './components/worker/LiveShiftWorker';
import { WorkerProfileView } from './components/worker/WorkerProfileView';

// Employer Views
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { WorkerSearch } from './components/employer/WorkerSearch';
import { EmployerShifts } from './components/employer/EmployerShifts';
import { EmployerProfileView } from './components/employer/EmployerProfileView';
import { PostJobModal } from './components/employer/PostJobModal';

// Safety Views
import { SafetyHub } from './components/safety/SafetyHub';
import { SafetyTrainingView } from './components/safety/SafetyTrainingView';

export const AppContent: React.FC = () => {
  const { isOnboarded, role } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState<boolean>(false);
  const [inTrainingView, setInTrainingView] = useState<boolean>(false);

  // If user hasn't completed first-time language/role onboarding, render full onboarding
  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  const handleTabChange = (tab: TabType) => {
    if (tab === 'post') {
      setIsPostJobModalOpen(true);
    } else {
      setInTrainingView(false);
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Universal Top Header */}
      <Header onOpenNotifications={() => setIsNotifOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {role === 'worker' ? (
          <>
            {activeTab === 'home' && <WorkerDashboard />}
            {activeTab === 'jobs' && <WorkerApplications />}
            {activeTab === 'shifts' && <LiveShiftWorker />}
            {activeTab === 'safety' && (
              inTrainingView ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setInTrainingView(false)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 px-4 pt-2"
                  >
                    ← Back to Safety Hub
                  </button>
                  <SafetyTrainingView />
                </div>
              ) : (
                <SafetyHub onNavigateToTraining={() => setInTrainingView(true)} />
              )
            )}
            {activeTab === 'profile' && <WorkerProfileView />}
          </>
        ) : (
          <>
            {activeTab === 'home' && (
              <EmployerDashboard onNavigateTab={handleTabChange} />
            )}
            {activeTab === 'workers' && <WorkerSearch />}
            {activeTab === 'shifts' && <EmployerShifts />}
            {activeTab === 'profile' && <EmployerProfileView />}
            {activeTab === 'safety' && (
              <SafetyHub onNavigateToTraining={() => setInTrainingView(true)} />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={handleTabChange} />

      {/* Global Modals & Drawers */}
      <LanguageModal />
      <SOSModal />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
      />
    </div>
  );
};

export default AppContent;
