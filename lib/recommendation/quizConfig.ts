export interface QuizOption {
  id: 'a' | 'b'
  title: string
  description: string
}

export interface QuizQuestion {
  id: number
  question: string
  optionA: QuizOption
  optionB: QuizOption
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When life gives you lemons...',
    optionA: {
      id: 'a',
      title: 'Squeeze them on everything',
      description: 'I love that sharp, zingy kick',
    },
    optionB: {
      id: 'b',
      title: 'Make lemonade with extra sugar',
      description: 'Smooth and sweet is more my thing',
    },
  },
  {
    id: 2,
    question: 'Your ideal Saturday dinner:',
    optionA: {
      id: 'a',
      title: 'A big, hearty steak',
      description: 'Bold flavors, full plate',
    },
    optionB: {
      id: 'b',
      title: 'Fresh seafood or a light salad',
      description: 'Keep it clean and fresh',
    },
  },
  {
    id: 3,
    question: 'At a coffee shop, you order:',
    optionA: {
      id: 'a',
      title: 'Black coffee or espresso',
      description: 'No frills, just the good stuff',
    },
    optionB: {
      id: 'b',
      title: 'A creamy latte or cappuccino',
      description: 'Smooth and comforting',
    },
  },
  {
    id: 4,
    question: 'Your approach to trying new food:',
    optionA: {
      id: 'a',
      title: 'The weirder, the better',
      description: 'Fermented, funky, unusual — sign me up',
    },
    optionB: {
      id: 'b',
      title: 'Classic and well-made',
      description: 'I know what I like and I like it good',
    },
  },
  {
    id: 5,
    question: 'How do you like your chocolate?',
    optionA: {
      id: 'a',
      title: 'Dark and intense',
      description: '70%+ cacao, bitter and complex',
    },
    optionB: {
      id: 'b',
      title: 'Milk or white chocolate',
      description: 'Sweet, creamy, and indulgent',
    },
  },
]
