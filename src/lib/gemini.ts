import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Resume data context
const RESUME_CONTEXT = `
Personal Information:
- Name: Mohit Goyal
- Location: Noida, Uttar Pradesh
- Contact: +91 9354978215
- Email: goyalm453@gmail.com
- LinkedIn: https://lnkd.in/d4w5_r8q
- Behance: https://www.behance.net/mohitgoyal453
- Twitter: https://x.com/goyalm453

Education:
1. Institute Of Technology And Management, Gwalior (Dec 2020 - Jun 2024)
   - Bachelor of Technology in Computer Science and Engineering
   - CGPA: 7.7/10
2. Innobuzz, Delhi (2019 - 2020)
   - Advance Diploma in Security
   - CGPA: 8.3/10

Work Experience:
1. TSP- The Silicon Partners (Sep 2024 - Dec 2024)
   - Role: RPA Developer Intern
   - Responsibilities:
     • Developed automated business processes using UiPath Studio
     • Handled data extraction and processing
     • Managed RPA bot deployment and maintenance

2. Senselearner Technologies pvt. ltd. (Jun 2023 - Aug 2023)
   - Role: Cybersecurity Intern
   - Responsibilities:
     • Performed vulnerability assessments and penetration testing
     • Conducted security monitoring and auditing

3. Splushindia (Oct 2022 - Mar 2023)
   - Role: UI/UX Designer Intern
   - Responsibilities:
     • Created wireframes, prototypes, and user flows
     • Conducted user research and usability testing
     • Designed interfaces for web and mobile applications

Technical Skills:
- RPA: UiPath, Automation
- Database: SQL, MySQL
- Design: UI/UX, Figma, Adobe Xd, Adobe Creative Suite
- Security: Pentesting
- Development: HTML, CSS, JavaScript, Python, WordPress
- Tools: Git, AWS EC2, Oracle Cloud Infrastructure, VS Code
- Languages: English and Hindi

Projects:
1. Resumer - AI-powered Resume Builder Toolkit
   - Created an AI-powered resume builder with ATS optimization
   - Focused on user experience and interactive interface design
   - Conducted user research and created wireframes to define the user flow and information architecture for an intuitive
and efficient resume building experience
  -  Focused on user experience (UX) by designing an interactive interface that guides users through the resume creation
process

2. Monster Energy Website Reimagining
   - Conducted competitor analysis and user research
   - Created wireframes and interactive prototypes
   - Implemented Monster's brand identity in the design
`;

// Function to detect language using Gemini
export async function detectLanguage(_text: string): Promise<string> {
  return 'en';
}

// Function to get response from Gemini in English with proper formatting
export async function getGeminiResponse(
  prompt: string,
  _language: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Quick response for greetings
    if (/^(hi|hello|hey|namaste|नमस्ते|हाय|हैलो)/i.test(prompt)) {
      return "👋 Hi! Ask me anything about Mohit or any other topic!";
    }

    // Check if Mohit-related
    const isMohitRelated = /(mohit|mohit goyal)/i.test(prompt);

    // Simplified prompts for faster processing
    const systemPrompt = isMohitRelated
      ? `Answer using ONLY this resume data:\n${RESUME_CONTEXT}\n\nQuestion: ${prompt}`
      : `Be concise and helpful. Question: ${prompt}`;

    const result = await model.generateContent([
      systemPrompt,
      'Format: Use **bold**, bullet points, relevant emojis. Be brief.'
    ]);

    return result.response.text();
  } catch (error) {
    console.error('Error:', error);
    return "I'm having trouble right now. Please try again. 🙏";
  }
}

// Function to format response based on language
export function formatResponse(text: string, _language: string): string {
  return text;
}