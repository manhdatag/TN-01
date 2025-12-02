import { Chapter } from '../types';

export const COURSE_DATA: Chapter[] = [
  {
    id: 'khao-sat-ham-so',
    title: 'Chương 1: Ứng dụng Đạo hàm',
    lessons: [
      {
        id: 'c1-l1-bac-ba',
        title: 'Hàm số bậc ba',
        theory: [
          'Dạng tổng quát: $y = ax^3 + bx^2 + cx + d$ ($a \\neq 0$).',
          'Đạo hàm: $y\' = 3ax^2 + 2bx + c$.',
          'Để xét sự biến thiên, ta xét dấu của $y\'$.',
          'Điều kiện đồng biến trên $\\mathbb{R}$: $\\begin{cases} a > 0 \\\\ \\Delta_{y\'} \\le 0 \\end{cases}$.',
          'Điều kiện nghịch biến trên $\\mathbb{R}$: $\\begin{cases} a < 0 \\\\ \\Delta_{y\'} \\le 0 \\end{cases}$.'
        ],
        formulas: [
          { label: '2 Cực trị', formula: '$b^2 - 3ac > 0$ ($y\'=0$ có 2 nghiệm pb)' },
          { label: 'Không cực trị', formula: '$b^2 - 3ac \\le 0$ ($y\'=0$ vô nghiệm hoặc kép)' }
        ],
        examples: [
          {
            title: 'Ví dụ 1: Tìm khoảng đồng biến',
            problem: 'Cho hàm số $y = x^3 - 3x^2 + 2$. Tìm các khoảng đồng biến của hàm số.',
            solution: '1. TXĐ: $D = \\mathbb{R}$.<br/>2. $y\' = 3x^2 - 6x$.<br/>3. Cho $y\' = 0 \\Leftrightarrow 3x(x-2)=0 \\Leftrightarrow x=0$ hoặc $x=2$.<br/>4. Bảng xét dấu: $y\' > 0$ khi $x \\in (-\\infty; 0) \\cup (2; +\\infty)$.<br/>5. Kết luận: Hàm số đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$.'
          }
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'Hàm số $y = x^3 - 3x + 1$ nghịch biến trên khoảng nào?',
            options: ['$(-\\infty; -1)$', '$(-1; 1)$', '$(1; +\\infty)$', '$(0; 2)$'],
            correctIndex: 1,
            explanation: 'Tính $y\' = 3x^2 - 3$. Cho $y\' < 0 \\Leftrightarrow x^2 < 1 \\Leftrightarrow -1 < x < 1$.'
          },
          {
            id: 'q2',
            question: 'Tìm $m$ để hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m+2)x$ có 2 cực trị?',
            options: ['$m > 2$', '$m < -1$', '$m > 2$ hoặc $m < -1$', '$-1 < m < 2$'],
            correctIndex: 2,
            explanation: '$y\' = x^2 - 2mx + m + 2$. Để có 2 cực trị thì $\\Delta\' > 0 \\Leftrightarrow m^2 - (m+2) > 0 \\Leftrightarrow m^2 - m - 2 > 0 \\Leftrightarrow m > 2$ hoặc $m < -1$.'
          }
        ],
        method: 'Để xét sự biến thiên: 1. Tìm TXĐ. 2. Tính $y\'$. 3. Tìm nghiệm $y\'=0$. 4. Lập BBT. 5. Kết luận.'
      },
      {
        id: 'c1-l2-phan-thuc',
        title: 'Hàm số phân thức',
        theory: [
          'Hàm bậc nhất/bậc nhất: $y = \\frac{ax+b}{cx+d}$ ($ad-bc \\neq 0$). Đạo hàm $y\' = \\frac{ad-bc}{(cx+d)^2}$.',
          'Đồ thị hàm số luôn nhận giao điểm hai tiệm cận làm tâm đối xứng.'
        ],
        formulas: [
          { label: 'Tiệm cận đứng', formula: '$x = -d/c$ (nghiệm mẫu)' },
          { label: 'Tiệm cận ngang', formula: '$y = a/c$' }
        ],
        examples: [
           {
            title: 'Ví dụ: Tìm tiệm cận',
            problem: 'Tìm tiệm cận đứng và ngang của hàm số $y = \\frac{2x-1}{x+1}$.',
            solution: 'Tiệm cận đứng: $x = -1$. Tiệm cận ngang: $y = 2/1 = 2$.'
          }
        ],
        quizzes: [
           {
            id: 'q3',
            question: 'Tiệm cận ngang của đồ thị hàm số $y = \\frac{3x+2}{x-1}$ là đường thẳng:',
            options: ['$y=3$', '$y=1$', '$x=1$', '$x=3$'],
            correctIndex: 0,
            explanation: 'Hàm số dạng $y=\\frac{ax+b}{cx+d}$ có TCN là $y=\\frac{a}{c} = \\frac{3}{1} = 3$.'
          }
        ]
      },
      {
        id: 'c1-l3-gtln-gtnn',
        title: 'GTLN - GTNN',
        theory: [
          'Trên đoạn $[a; b]$, GTLN/GTNN luôn tồn tại.',
          'Quy tắc: Tính $y\'$, tìm các nghiệm $x_i \\in (a; b)$. So sánh $f(a), f(b), f(x_i)$.'
        ],
        formulas: [
          { label: 'Max trên [a;b]', formula: '$\\max_{[a;b]} y = \\max \\{ f(a), f(b), f(x_i) \\}$' },
          { label: 'Min trên [a;b]', formula: '$\\min_{[a;b]} y = \\min \\{ f(a), f(b), f(x_i) \\}$' }
        ],
        examples: [],
        quizzes: [
             {
            id: 'q4',
            question: 'Giá trị lớn nhất của hàm số $y = x^4 - 2x^2 + 1$ trên đoạn $[0; 2]$ là:',
            options: ['$1$', '$9$', '$0$', '$2$'],
            correctIndex: 1,
            explanation: '$y\' = 4x^3 - 4x$. $y\'=0 \\Leftrightarrow x=0, x=1, x=-1$ (loại). Tính $f(0)=1, f(1)=0, f(2)=9$. Vậy Max là 9.'
          }
        ]
      }
    ]
  },
  {
    id: 'mu-logarit',
    title: 'Chương 2: Mũ và Logarit',
    lessons: [
      {
        id: 'c2-l1-luy-thua',
        title: 'Lũy thừa',
        theory: [
          'Các tính chất cơ bản với số mũ thực.',
        ],
        formulas: [
          { label: 'Nhân/Chia', formula: '$a^m . a^n = a^{m+n}$; $\\frac{a^m}{a^n} = a^{m-n}$' },
          { label: 'Lũy thừa tầng', formula: '$(a^m)^n = a^{m.n}$' },
          { label: 'Căn thức', formula: '$\\sqrt[n]{a^m} = a^{\\frac{m}{n}}$' }
        ],
        examples: [],
        quizzes: [
            {
            id: 'q5',
            question: 'Rút gọn biểu thức $P = x^{\\frac{1}{3}} . \\sqrt[6]{x}$ với $x > 0$.',
            options: ['$P = x^{\\frac{1}{2}}$', '$P = x^{\\frac{1}{8}}$', '$P = x^{2}$', '$P = x^{\\frac{2}{9}}$'],
            correctIndex: 0,
            explanation: '$P = x^{\\frac{1}{3}} . x^{\\frac{1}{6}} = x^{\\frac{1}{3} + \\frac{1}{6}} = x^{\\frac{3}{6}} = x^{\\frac{1}{2}}$.'
          }
        ]
      },
      {
        id: 'c2-l2-logarit',
        title: 'Logarit',
        theory: [
          'Định nghĩa: $a^\\alpha = b \\Leftrightarrow \\alpha = \\log_a b$ ($0 < a \\neq 1, b > 0$)'
        ],
        formulas: [
          { label: 'Tích/Thương', formula: '$\\log_a(xy) = \\log_a x + \\log_a y$' },
          { label: 'Lũy thừa', formula: '$\\log_a b^n = n \\log_a b$' },
          { label: 'Đổi cơ số', formula: '$\\log_a b = \\frac{\\log_c b}{\\log_c a}$' }
        ],
        examples: [],
        quizzes: []
      },
      {
        id: 'c2-l3-dao-ham-mu-log',
        title: 'Đạo hàm Mũ - Logarit',
        theory: [
          'Công thức đạo hàm quan trọng.'
        ],
        formulas: [
          { label: '(e^x)\'', formula: '$e^x$' },
          { label: '(a^x)\'', formula: '$a^x \\ln a$' },
          { label: '(ln x)\'', formula: '$\\frac{1}{x}$' },
          { label: '(log_a x)\'', formula: '$\\frac{1}{x \\ln a}$' }
        ],
        examples: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'nguyen-ham-tich-phan',
    title: 'Chương 3: Nguyên hàm - Tích phân',
    lessons: [
      {
        id: 'c3-l1-nguyen-ham',
        title: 'Nguyên hàm cơ bản',
        theory: [
          '$\\int f(x)dx = F(x) + C$ khi $F\'(x) = f(x)$'
        ],
        formulas: [
          { label: 'Hàm lũy thừa', formula: '$\\int x^\\alpha dx = \\frac{x^{\\alpha+1}}{\\alpha+1} + C$ ($\\alpha \\neq -1$)' },
          { label: 'Hàm 1/x', formula: '$\\int \\frac{1}{x} dx = \\ln|x| + C$' },
          { label: 'Lượng giác', formula: '$\\int \\cos x dx = \\sin x + C$; $\\int \\sin x dx = -\\cos x + C$' },
          { label: 'Hàm mũ', formula: '$\\int e^x dx = e^x + C$; $\\int a^x dx = \\frac{a^x}{\\ln a} + C$' }
        ],
        examples: [],
        quizzes: []
      },
      {
        id: 'c3-l2-tich-phan',
        title: 'Tích phân & Ứng dụng',
        theory: [
          'Newton-Leibniz: $\\int_a^b f(x)dx = F(b) - F(a)$'
        ],
        formulas: [
          { label: 'Diện tích phẳng', formula: '$S = \\int_a^b |f(x) - g(x)| dx$' },
          { label: 'Thể tích tròn xoay', formula: '$V = \\pi \\int_a^b [f(x)]^2 dx$' }
        ],
        examples: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'hinh-khong-gian-oxyz',
    title: 'Chương 4: Hình học Oxyz',
    lessons: [
      {
        id: 'c4-l1-toa-do',
        title: 'Tọa độ & Vectơ',
        theory: [
          'Vectơ $\\vec{u} = (x; y; z)$.'
        ],
        formulas: [
          { label: 'Độ dài', formula: '$|\\vec{u}| = \\sqrt{x^2+y^2+z^2}$' },
          { label: 'Tích vô hướng', formula: '$\\vec{a}.\\vec{b} = x_1x_2 + y_1y_2 + z_1z_2$' },
          { label: 'Góc', formula: '$\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a}.\\vec{b}}{|\\vec{a}|.|\\vec{b}|}$' },
          { label: 'Tích có hướng', formula: '$[\\vec{a}, \\vec{b}] = (y_1z_2-z_1y_2; z_1x_2-x_1z_2; x_1y_2-y_1x_2)$' }
        ],
        examples: [],
        quizzes: []
      },
      {
        id: 'c4-l2-mat-cau-mat-phang',
        title: 'Mặt cầu & Mặt phẳng',
        theory: [
          'Phương trình mặt cầu tâm $I(a;b;c)$ bán kính $R$.',
          'Phương trình mặt phẳng qua $M(x_0;y_0;z_0)$ có VTPT $\\vec{n}(A;B;C)$.'
        ],
        formulas: [
          { label: 'Mặt cầu (S)', formula: '$(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2$' },
          { label: 'Mặt phẳng (P)', formula: '$A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$' },
          { label: 'Khoảng cách d(M, P)', formula: '$d = \\frac{|Ax_M + By_M + Cz_M + D|}{\\sqrt{A^2+B^2+C^2}}$' }
        ],
        examples: [],
        quizzes: []
      },
      {
        id: 'c4-l3-duong-thang',
        title: 'Đường thẳng',
        theory: [
          'Đường thẳng đi qua $M_0(x_0; y_0; z_0)$ và có VTCP $\\vec{u}(a; b; c)$.'
        ],
        formulas: [
          { label: 'Tham số', formula: '$\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}$' },
          { label: 'Chính tắc', formula: '$\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}$' }
        ],
        examples: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'thong-ke',
    title: 'Chương 5: Thống kê',
    lessons: [
      {
        id: 'c5-l1-so-dac-trung',
        title: 'Số đặc trưng mẫu ghép nhóm',
        theory: [
          'Cho mẫu số liệu ghép nhóm: $[u_i; u_{i+1})$ với tần số $n_i$.',
          'Giá trị đại diện $c_i = \\frac{u_i + u_{i+1}}{2}$.'
        ],
        formulas: [
          { label: 'Số trung bình', formula: '$\\bar{x} = \\frac{1}{n} (n_1c_1 + ... + n_kc_k)$' },
          { label: 'Trung vị (Me)', formula: '$M_e = u_m + \\frac{\\frac{n}{2} - C}{n_m} (u_{m+1} - u_m)$' },
          { label: 'Mốt (Mo)', formula: '$M_0 = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} (u_{m+1} - u_m)$' }
        ],
        examples: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'dai-so-to-hop',
    title: 'Chương 6: Xác suất',
    lessons: [
      {
        id: 'c6-l1-xac-suat',
        title: 'Công thức xác suất',
        theory: [
          'Biến cố $A$, không gian mẫu $\\Omega$.',
          'Xác suất $P(A) = \\frac{n(A)}{n(\\Omega)}$.'
        ],
        formulas: [
          { label: 'Cộng xác suất', formula: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$' },
          { label: 'Xác suất có điều kiện', formula: '$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$' },
          { label: 'Bernoulli', formula: '$P_k = C_n^k p^k (1-p)^{n-k}$' }
        ],
        method: '1. Xác định không gian mẫu. 2. Xác định biến cố A. 3. Dùng quy tắc cộng/nhân hoặc hoán vị/chỉnh hợp/tổ hợp để đếm.',
        examples: [],
        quizzes: []
      }
    ]
  }
];