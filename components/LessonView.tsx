import React, { useEffect, useRef, useState } from 'react';
import { LessonContent, QuizQuestion, Example } from '../types';
import { BookOpen, Calculator, Lightbulb, Puzzle, CheckCircle, XCircle, Trophy, ArrowRight, Star } from 'lucide-react';

interface LessonViewProps {
  lesson: LessonContent;
  onComplete: (score: number) => void;
  bestScore: number;
}

const MathContent: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  return <span className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};

const QuizComponent: React.FC<{ 
  quiz: QuizQuestion; 
  onAnswer: (isCorrect: boolean) => void;
  index: number;
}> = ({ quiz, onAnswer, index }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === quiz.correctIndex);
  };

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [quiz]);

  const isCorrect = selected === quiz.correctIndex;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
        <span className="font-bold text-slate-700">Câu {index + 1}</span>
        {submitted && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isCorrect ? 'Chính xác' : 'Chưa đúng'}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="text-slate-800 font-medium mb-4 text-lg">
          <MathContent content={quiz.question} />
        </div>
        <div className="space-y-2">
          {quiz.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => setSelected(idx)}
              className={`
                w-full text-left p-3 rounded-lg border flex items-center gap-3 transition-all
                ${submitted && idx === quiz.correctIndex ? 'bg-green-50 border-green-300 ring-1 ring-green-300' : ''}
                ${submitted && selected === idx && idx !== quiz.correctIndex ? 'bg-red-50 border-red-300' : ''}
                ${!submitted && selected === idx ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500' : 'border-slate-200 hover:bg-slate-50'}
              `}
            >
              <div className={`
                w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
                ${submitted && idx === quiz.correctIndex ? 'border-green-500 bg-green-500 text-white' : ''}
                ${submitted && selected === idx && idx !== quiz.correctIndex ? 'border-red-500 bg-red-500 text-white' : ''}
                ${!submitted && selected === idx ? 'border-teal-500' : 'border-slate-300'}
              `}
              >
                {submitted && idx === quiz.correctIndex && <CheckCircle className="w-3 h-3" />}
                {submitted && selected === idx && idx !== quiz.correctIndex && <XCircle className="w-3 h-3" />}
                {!submitted && selected === idx && <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />}
              </div>
              <span className="text-slate-700"><MathContent content={opt} /></span>
            </button>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Kiểm tra
          </button>
        ) : (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2">
            <h5 className="font-bold text-blue-800 text-sm mb-1 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Giải thích:
            </h5>
            <div className="text-blue-900 text-sm">
              <MathContent content={quiz.explanation} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, bestScore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizResults({});
  }, [lesson.id]);

  // Trigger MathJax typeset whenever lesson content changes
  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      requestAnimationFrame(() => {
        window.MathJax.typesetPromise([containerRef.current!])
          .catch((err: any) => console.error('MathJax typeset failed: ', err));
      });
    }
  }, [lesson, quizResults]); // Re-render when quiz answers are revealed (explanations)

  const handleQuizAnswer = (quizId: string, isCorrect: boolean) => {
    const newResults = { ...quizResults, [quizId]: isCorrect };
    setQuizResults(newResults);
    
    // Check if all quizzes are answered
    if (Object.keys(newResults).length === lesson.quizzes.length && lesson.quizzes.length > 0) {
      const correctCount = Object.values(newResults).filter(v => v).length;
      const score = Math.round((correctCount / lesson.quizzes.length) * 100);
      onComplete(score);
    }
  };

  const completedQuizCount = Object.keys(quizResults).length;
  const currentCorrectCount = Object.values(quizResults).filter(v => v).length;
  const currentScore = lesson.quizzes.length > 0 ? Math.round((currentCorrectCount / lesson.quizzes.length) * 100) : 0;
  const isFinished = completedQuizCount === lesson.quizzes.length && lesson.quizzes.length > 0;

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 transform translate-x-10 -translate-y-10">
          <BookOpen className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-teal-50 text-xs font-semibold mb-3 backdrop-blur-sm border border-white/10">
            <BookOpen className="w-3 h-3" />
            Kiến thức trọng tâm
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{lesson.title}</h2>
          <div className="flex items-center gap-4 mt-4 text-teal-100 text-sm">
             <div className="flex items-center gap-1">
               <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
               <span>Điểm cao nhất: {bestScore}%</span>
             </div>
             {bestScore >= 80 && (
               <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                 <CheckCircle className="w-3 h-3" /> Đã hoàn thành
               </span>
             )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Theory & Formulas */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Theory Section - Bootstrap Card Style */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
              <div className="p-1.5 bg-teal-100 rounded text-teal-700">
                 <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Lý thuyết cần nhớ</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {lesson.theory.map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <div className="pt-1 text-slate-700 leading-relaxed text-base">
                      <MathContent content={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Formulas Grid */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 rounded text-indigo-700">
                <Calculator className="w-5 h-5" />
              </div>
              Công thức & Định lý
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {lesson.formulas.map((f, idx) => (
                <div key={idx} className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                  <div className="bg-indigo-50/50 px-4 py-2 border-b border-slate-100 text-xs font-bold text-indigo-600 uppercase tracking-wide group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {f.label}
                  </div>
                  <div className="p-4 flex items-center justify-center min-h-[80px]">
                    <div className="text-lg text-slate-800 font-medium">
                      <MathContent content={f.formula} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Examples Section */}
          {lesson.examples && lesson.examples.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                 <div className="p-1.5 bg-orange-100 rounded text-orange-700">
                    <Lightbulb className="w-5 h-5" />
                 </div>
                 Ví dụ minh họa
              </h3>
              <div className="space-y-6">
                {lesson.examples.map((ex, idx) => (
                   <div key={idx} className="bg-white border-l-4 border-orange-400 rounded-r-xl shadow-sm p-6 relative">
                      <h4 className="font-bold text-slate-800 mb-2">{ex.title}</h4>
                      <div className="mb-4 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                         <span className="font-semibold text-orange-600 mr-2">Đề bài:</span>
                         <MathContent content={ex.problem} />
                      </div>
                      <div className="text-slate-600 text-sm leading-relaxed pl-2 border-l border-slate-200">
                         <span className="font-semibold text-teal-600 block mb-1">Lời giải:</span>
                         <MathContent content={ex.solution} />
                      </div>
                   </div>
                ))}
              </div>
            </section>
          )}

          {/* Method (Legacy support) */}
          {lesson.method && (
             <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-slate-200 mb-2 uppercase text-xs tracking-wider">Phương pháp tổng quát</h4>
                <div className="leading-relaxed">
                   <MathContent content={lesson.method} />
                </div>
             </div>
          )}
        </div>

        {/* Right Column: Quiz */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden">
               <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Puzzle className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Luyện tập</h3>
                  </div>
                  <p className="text-teal-100 text-xs opacity-90">
                    Hoàn thành 80% để mở khóa bài sau.
                  </p>
               </div>
               
               <div className="p-6 bg-slate-50/50 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  {lesson.quizzes && lesson.quizzes.length > 0 ? (
                    <>
                      {lesson.quizzes.map((quiz, idx) => (
                        <QuizComponent 
                          key={quiz.id} 
                          index={idx} 
                          quiz={quiz} 
                          onAnswer={(isCorrect) => handleQuizAnswer(quiz.id, isCorrect)} 
                        />
                      ))}
                      
                      {isFinished && (
                        <div className={`mt-6 p-6 rounded-xl text-center border-2 animate-in zoom-in duration-300 ${currentScore >= 80 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                           {currentScore >= 80 ? (
                             <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3 drop-shadow-sm" />
                           ) : (
                             <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                           )}
                           <h4 className={`text-xl font-bold mb-1 ${currentScore >= 80 ? 'text-green-700' : 'text-red-700'}`}>
                             Kết quả: {currentScore}%
                           </h4>
                           <p className="text-slate-600 text-sm mb-4">
                             {currentScore >= 80 
                               ? 'Chúc mừng! Bạn đã mở khóa bài học tiếp theo.' 
                               : 'Hãy cố gắng làm lại để đạt trên 80% nhé.'}
                           </p>
                           {currentScore < 80 && (
                             <button 
                               onClick={() => setQuizResults({})}
                               className="px-4 py-2 bg-white border border-red-200 text-red-600 font-semibold rounded-lg shadow-sm hover:bg-red-50"
                             >
                               Làm lại
                             </button>
                           )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-10 text-slate-400">
                      <Puzzle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Chưa có bài tập trắc nghiệm cho bài này.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;