export interface QuizQuestion {
  id: string;
  question: string; // Có thể chứa Latex
  options: string[];
  correctIndex: number;
  explanation: string; // Giải thích chi tiết
}

export interface Example {
  title: string;
  problem: string;
  solution: string;
}

export interface LessonContent {
  id: string; // Unique ID để tracking progress
  title: string;
  theory: string[]; // HTML/Markdown strings
  formulas: Array<{ label: string; formula: string }>;
  examples: Example[]; // Ví dụ minh họa
  quizzes: QuizQuestion[]; // Bài tập trắc nghiệm
  method?: string; 
}

export interface Chapter {
  id: string;
  title: string;
  lessons: LessonContent[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface UserProgress {
  [lessonId: string]: number; // Lưu điểm số cao nhất (0-100)
}

declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements?: HTMLElement[]) => Promise<void>;
      tex: any;
      svg: any;
      startup: any;
    };
  }
}