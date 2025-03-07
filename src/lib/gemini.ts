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
export async function detectLanguage(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Detect the language of this text and respond with only the ISO 639-1 language code (e.g., 'en' for English, 'hi' for Hindi): "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim().toLowerCase();
    
    // Default to English if the response is not a valid language code
    return response.match(/^[a-z]{2}$/) ? response : 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en'; // Default to English on error
  }
}

// Function to get response from Gemini in English with proper formatting
export async function getGeminiResponse(
  prompt: string,
  language: string
): Promise<string> {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Quick response for greetings
    if (/^(hi|hello|hey|namaste|नमस्ते|हाय|हैलो)/i.test(prompt)) {
      return "👋 Hi! Ask me anything about Mohit or any other topic!";
    }

    // Check if Mohit-related
    const isMohitRelated = /(mohit|mohit goyal|resume|cv|education|experience|skills|projects)/i.test(prompt);

    // Enhanced system prompt with better context and instructions
    const systemPrompt = isMohitRelated
      ? `You are Mohit Goyal's AI assistant. Use this resume data to answer questions:\n${RESUME_CONTEXT}\n\nQuestion: ${prompt}\n\nProvide a natural, conversational response. Use bullet points for lists and highlight key information with **bold**. Keep responses concise and relevant.`
      : `You are a helpful AI assistant. Question: ${prompt}\n\nProvide a clear, concise response. Use bullet points where appropriate and highlight key information with **bold**.`;

    const result = await model.generateContent([systemPrompt]);
    const response = result.response.text();

    if (!response) {
      throw new Error('Empty response from Gemini API');
    }

    return response;
  } catch (error) {
    // Enhanced error logging
    console.error('Gemini API Error:', {
      error,
      prompt,
      language,
      apiKey: import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing'
    });

    // More specific error messages based on the error type
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      return "Sorry, I'm not properly configured right now. Please check the API key configuration. 🔑";
    }

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "There seems to be an issue with my API key. Please try again later. 🔑";
      }
      if (error.message.includes('network')) {
        return "I'm having trouble connecting to my brain right now. Please check your internet connection and try again. 🌐";
      }
    }

    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment. 🙏";
  }
}

// Function to format response based on language
export function formatResponse(text: string, language: string): string {
  try {
    // Add emoji indicators based on content type
    const addEmojis = (text: string) => {
      const patterns = {
        education: ['education', 'study', 'degree', 'university', 'college'],
        experience: ['experience', 'work', 'job', 'intern', 'internship'],
        skills: ['skills', 'technologies', 'programming', 'development'],
        contact: ['contact', 'email', 'phone', 'linkedin'],
        projects: ['projects', 'portfolio', 'built', 'created']
      };

      let modifiedText = text;

      if (patterns.education.some(word => text.toLowerCase().includes(word))) {
        modifiedText = '🎓 ' + modifiedText;
      }
      if (patterns.experience.some(word => text.toLowerCase().includes(word))) {
        modifiedText = '💼 ' + modifiedText;
      }
      if (patterns.skills.some(word => text.toLowerCase().includes(word))) {
        modifiedText = '🛠️ ' + modifiedText;
      }
      if (patterns.contact.some(word => text.toLowerCase().includes(word))) {
        modifiedText = '📫 ' + modifiedText;
      }
      if (patterns.projects.some(word => text.toLowerCase().includes(word))) {
        modifiedText = '🚀 ' + modifiedText;
      }

      return modifiedText;
    };

    // Format the response based on language
    let formattedText = text;
    
    // Add emojis if appropriate
    formattedText = addEmojis(formattedText);

    // Ensure proper spacing after bullet points
    formattedText = formattedText.replace(/•(?!\s)/g, '• ');

    return formattedText;
  } catch (error) {
    console.error('Response formatting error:', error);
    return text; // Return original text if formatting fails
  }
}