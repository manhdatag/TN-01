import React from 'react';
import { COURSE_DATA } from '../data/courseData';
import { Chapter, LessonContent, UserProgress } from '../types';
import { BookOpen, ChevronRight, GraduationCap, Lock, CheckCircle, Unlock } from 'lucide-react';

interface NavigationProps {
  currentLesson: LessonContent | null;
  onSelectLesson: (lesson: LessonContent) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  userProgress: UserProgress;
  isLessonUnlocked: (lesson: LessonContent) => boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentLesson, 
  onSelectLesson, 
  isOpen, 
  setIsOpen,
  userProgress,
  isLessonUnlocked
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-72 bg-white border-r border-teal-100 shadow-xl transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:shadow-none overflow-y-auto flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-teal-100 flex items-center gap-3 bg-gradient-to-r from-teal-50 to-white">
          <div className="p-2 bg-teal-600 rounded-lg shadow-lg shadow-teal-200">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-teal-900 text-lg leading-tight">Toán K12</h1>
            <p className="text-xs text-teal-600 font-medium">Lộ trình 8.0+ THPT</p>
          </div>
        </div>

        <nav className="p-4 space-y-6 flex-1">
          {COURSE_DATA.map((chapter: Chapter) => (
            <div key={chapter.id}>
              <h3 className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                {chapter.title}
              </h3>
              <ul className="space-y-1">
                {chapter.lessons.map((lesson, idx) => {
                  const isActive = currentLesson?.id === lesson.id;
                  const isUnlocked = isLessonUnlocked(lesson);
                  const score = userProgress[lesson.id] || 0;
                  const isCompleted = score >= 80;

                  return (
                    <li key={lesson.id}>
                      <button
                        disabled={!isUnlocked}
                        onClick={() => {
                          if (isUnlocked) {
                            onSelectLesson(lesson);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }
                        }}
                        className={`
                          w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-teal-600 text-white shadow-md shadow-teal-200' 
                            : isUnlocked 
                              ? 'text-slate-600 hover:bg-teal-50 hover:text-teal-700 hover:pl-4'
                              : 'text-slate-400 bg-slate-50 cursor-not-allowed opacity-70'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {!isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          ) : (
                            <div className={`w-3.5 h-3.5 rounded-full border-2 ${isActive ? 'border-teal-200' : 'border-slate-300'}`} />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        
                        {isUnlocked && !isActive && isCompleted && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">
                            {score}%
                          </span>
                        )}
                        {isActive && <ChevronRight className="w-4 h-4 text-teal-200" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-teal-100 bg-teal-50/50">
          <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-sm mb-2">
            <h4 className="text-xs font-semibold text-teal-800 mb-1">Quy tắc mở khóa</h4>
            <p className="text-[10px] text-slate-500 leading-tight">
              Hoàn thành <span className="text-teal-600 font-bold">80%</span> bài tập trắc nghiệm để mở khóa bài tiếp theo.
            </p>
          </div>
          <p className="text-xs text-center text-teal-400 mt-2">
            © 2025 Math Master AI
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navigation;