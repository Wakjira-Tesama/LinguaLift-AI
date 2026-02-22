export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  pronunciation?: string;
}

export const analyzeSpeech = (text: string, level: string): Correction | null => {
  const lowercaseText = text.toLowerCase();

  // Common grammar mistakes
  const corrections: { [key: string]: Correction } = {
    "i is": {
      original: "i is",
      corrected: "I am",
      explanation: "Use 'am' with the first-person singular pronoun 'I'."
    },
    "he go": {
      original: "he go",
      corrected: "he goes",
      explanation: "Add 's' to the verb for third-person singular (he/she/it) in the present tense."
    },
    "she like": {
      original: "she like",
      corrected: "she likes",
      explanation: "Add 's' to the verb for third-person singular (he/she/it) in the present tense."
    },
    "they was": {
      original: "they was",
      corrected: "they were",
      explanation: "Use 'were' for the plural past tense of 'to be'."
    },
    "we was": {
      original: "we was",
      corrected: "we were",
      explanation: "Use 'were' for the plural past tense of 'to be'."
    },
    "me want": {
      original: "me want",
      corrected: "I want",
      explanation: "Use the subject pronoun 'I' instead of the object pronoun 'me' as the subject of a sentence."
    },
    "more better": {
      original: "more better",
      corrected: "much better",
      explanation: "'Better' is already a comparative. Use 'much' for emphasis, not 'more'.",
      pronunciation: "Focus on the short 'e' sound in 'better' (/ˈbet.ər/)."
    },
    "i am agree": {
      original: "i am agree",
      corrected: "I agree",
      explanation: "'Agree' is a verb, so you don't need 'am' before it in the present tense."
    },
    "people is": {
      original: "people is",
      corrected: "people are",
      explanation: "'People' is a plural noun, so use 'are' instead of 'is'."
    },
    "at the monday": {
      original: "at the monday",
      corrected: "on Monday",
      explanation: "Use 'on' for specific days of the week, and we usually don't use 'the' before individual days."
    },
    "i forgot my phone at home": {
      original: "forgot my phone at home",
      corrected: "left my phone at home",
      explanation: "Use 'leave' when you specify the location where something was forgotten."
    },
    "it's more hot": {
      original: "more hot",
      corrected: "hotter",
      explanation: "For short adjectives like 'hot', use the '-er' suffix for comparatives."
    }
  };

  for (const [key, correction] of Object.entries(corrections)) {
    if (lowercaseText.includes(key)) {
      return {
        ...correction,
        original: text.slice(lowercaseText.indexOf(key), lowercaseText.indexOf(key) + key.length)
      };
    }
  }

  // Intermediate/Advanced level nuances (optional)
  if (level !== "Beginner") {
    if (lowercaseText.includes("i'm doing good")) {
      return {
        original: "doing good",
        corrected: "doing well",
        explanation: "While 'good' is common in casual speech, 'well' is the adverbial form generally preferred when describing how you are performing an action."
      };
    }
  }

  return null;
};
