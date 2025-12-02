import { GoogleGenAI, ChatSession, GenerativeModel } from "@google/genai";
import { ChatMessage } from "../types";
import { COURSE_DATA } from "../data/courseData";

// Context construction for the AI
const getSystemPrompt = (): string => {
  const contextData = COURSE_DATA.map(chapter => 
    `Chương: ${chapter.title}\n` + 
    chapter.lessons.map(l => 
      `- Bài: ${l.title}\n` +
      `  + Lý thuyết: ${l.theory.join(' ')}\n` +
      `  + Công thức: ${l.formulas.map(f => `${f.label}: ${f.formula}`).join(', ')}\n` +
      `  + Ví dụ có sẵn: ${l.examples.map(e => e.title + ": " + e.problem).join('; ')}\n` +
      `  + Câu hỏi trắc nghiệm có sẵn: ${l.quizzes.map(q => q.question).join('; ')}`
    ).join('\n')
  ).join('\n\n');

  return `
    Bạn là một gia sư Toán lớp 12 chuyên nghiệp, thân thiện và kiên nhẫn.
    Tên của bạn là "K12 Mentor".
    
    Nhiệm vụ của bạn là giúp học sinh hiểu bài, giải bài tập và ôn thi THPT Quốc Gia.
    
    Hãy sử dụng dữ liệu sau đây làm kiến thức nền tảng chính xác:
    ---
    ${contextData}
    ---
    
    Quy tắc trả lời BẮT BUỘC:
    1. Trả lời bằng tiếng Việt rõ ràng, mạch lạc.
    2. KHI VIẾT CÔNG THỨC TOÁN, BẮT BUỘC PHẢI DÙNG ĐỊNH DẠNG LATEX ĐẶT TRONG DẤU $.
       Ví dụ đúng: "Ta có phương trình $x^2 + 2x + 1 = 0$."
       Ví dụ sai: "Ta có phương trình x^2 + 2x + 1 = 0" hoặc dùng code block.
    3. Công thức phức tạp nên để dòng riêng với $$...$$.
    4. Nếu học sinh hỏi về bài tập trắc nghiệm trong bài, hãy giải thích chi tiết đáp án.
    5. Luôn khích lệ tinh thần học tập.
  `;
};

let chatSession: ChatSession | null = null;

export const initializeChat = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing in process.env.API_KEY");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemPrompt(),
      temperature: 0.7,
      maxOutputTokens: 2000, 
    }
  });
};

export const sendMessageToGemini = async (
  message: string, 
  onChunk: (text: string) => void
): Promise<void> => {
  if (!chatSession) {
    initializeChat();
    if (!chatSession) {
        onChunk("Lỗi: Chưa cấu hình API Key. Vui lòng kiểm tra cài đặt.");
        return;
    }
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n\n(Xin lỗi, đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.)");
  }
};