'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Typography from '@/components/ui/Typography'
import ProgressDots from '@/components/onboarding/ProgressDots'
import QuizOptionCard from '@/components/onboarding/QuizOptionCard'
import { quizQuestions } from '@/lib/recommendation/quizConfig'

export default function QuizPage() {
  const router = useRouter()
  const { update } = useSession()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b'>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'in' | 'out'>('in')

  const question = quizQuestions[currentQuestion]

  const handleSelect = useCallback(async (option: 'a' | 'b') => {
    const questionId = question.id
    const newAnswers = { ...answers, [questionId]: option }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      // Auto-advance after short delay
      setSlideDirection('out')
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSlideDirection('in')
      }, 300)
    } else {
      // Last question — submit
      setIsProcessing(true)
      try {
        const res = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })

        if (!res.ok) throw new Error('Failed to submit')

        const data = await res.json()

        // Update session to reflect onboarding completion
        await update({ onboardingCompleted: true })

        // Wait for the processing animation to feel right
        setTimeout(() => {
          router.push(`/onboarding/reveal?p=${data.personality}`)
        }, 2000)
      } catch {
        setIsProcessing(false)
      }
    }
  }, [answers, currentQuestion, question.id, router, update])

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce" />
        </div>
        <Typography variant="body" className="text-text-secondary">
          Analyzing your taste...
        </Typography>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Progress */}
      <div className="mb-12">
        <ProgressDots total={quizQuestions.length} current={currentQuestion} />
      </div>

      {/* Question */}
      <div
        className={`flex-1 flex flex-col gap-8 max-w-md mx-auto w-full transition-all duration-300 ${
          slideDirection === 'in'
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8'
        }`}
      >
        <Typography variant="h2" className="text-center">
          {question.question}
        </Typography>

        <div className="flex flex-col gap-4">
          <QuizOptionCard
            title={question.optionA.title}
            description={question.optionA.description}
            selected={answers[question.id] === 'a'}
            onSelect={() => handleSelect('a')}
          />
          <QuizOptionCard
            title={question.optionB.title}
            description={question.optionB.description}
            selected={answers[question.id] === 'b'}
            onSelect={() => handleSelect('b')}
          />
        </div>

        <Typography variant="caption" className="text-center mt-4">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Typography>
      </div>
    </div>
  )
}
