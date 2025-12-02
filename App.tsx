import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LessonView from './components/LessonView';
import ChatWidget from './components/ChatWidget';
import { LessonContent, UserProgress } from './types';
import { COURSE_DATA } from './data/courseData';
import { Menu } from 'lucide-react';

// Flatten lessons helper for easy navigation logic
const ALL_LESSONS = COURSE_DATA.flatMap(chapter => chapter.lessons);

const App: React.FC = () => {
  // Restore progress from local storage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('math_k12_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Default to the first lesson
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(COURSE_DATA[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('math_k12_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Responsive handling for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLessonComplete = (score: number) => {
    if (currentLesson) {
      setUserProgress(prev => {
        const currentBest = prev[currentLesson.id] || 0;
        // Only update if score is higher
        if (score > currentBest) {
          return { ...prev, [currentLesson.id]: score };
        }
        return prev;
      });
    }
  };

  // Lock logic: Lesson N is unlocked if Lesson N-1 score >= 80 OR it's the first lesson
  const isLessonUnlocked = (lesson: LessonContent): boolean => {
    const index = ALL_LESSONS.findIndex(l => l.id === lesson.id);
    if (index <= 0) return true; // First lesson always unlocked
    
    const prevLesson = ALL_LESSONS[index - 1];
    const prevScore = userProgress[prevLesson.id] || 0;
    return prevScore >= 80;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-inter">
      <Navigation 
        currentLesson={currentLesson} 
        onSelectLesson={setCurrentLesson} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userProgress={userProgress}
        isLessonUnlocked={isLessonUnlocked}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white border-b border-teal-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-teal-700 hover:bg-teal-50 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-teal-900">Toán K12</span>
          </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth bg-slate-100/50">
          {currentLesson ? (
            <LessonView 
              lesson={currentLesson} 
              onComplete={handleLessonComplete}
              bestScore={userProgress[currentLesson.id] || 0}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-teal-400 flex-col gap-4">
              <p className="text-xl font-medium">Chọn một bài học để bắt đầu</p>
            </div>
          )}
          
          {/* Bottom spacing for aesthetics */}
          <div className="h-24"></div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;