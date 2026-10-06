import type { Language } from './types'

export const notice: Record<Language, string> = {
  en: 'Information provided by this assistant is for general informational purposes. Please verify important legal or government matters with the relevant official authority.',
  hi: 'इस सहायक द्वारा दी गई जानकारी केवल सामान्य सूचना के लिए है। महत्वपूर्ण कानूनी या सरकारी मामलों की पुष्टि संबंधित आधिकारिक प्राधिकरण से करें।',
}

export const ui = {
  en: { placeholder: 'Type your question…', send: 'Send', newChat: '+ New Chat', sources: 'Sources', retry: 'Retry', empty: 'Ask a question to begin, or pick a suggestion below.' },
  hi: { placeholder: 'अपना प्रश्न लिखें…', send: 'भेजें', newChat: '+ नई चैट', sources: 'स्रोत', retry: 'फिर कोशिश करें', empty: 'शुरू करने के लिए प्रश्न पूछें, या नीचे सुझाव चुनें।' },
}

// Example questions (UI text, not answers)
export const suggestions: Record<Language, string[]> = {
  en: [
    'How can I become a member of a cooperative society?',
    'What documents are required for cooperative membership?',
    'What are the rights of cooperative members?',
  ],
  hi: [
    'सहकारी समिति का सदस्य कैसे बन सकते हैं?',
    'सदस्यता के लिए कौन से दस्तावेज़ चाहिए?',
    'सहकारी सदस्यों के अधिकार क्या हैं?',
  ],
}