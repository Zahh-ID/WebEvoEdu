"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Section } from './Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { webEvolutionQuiz, type WebEvolutionQuizInput, type WebEvolutionQuizOutput } from '@/ai/flows/web-evolution-quiz';
import { Loader2, LightbulbIcon, CheckCircleIcon, XCircleIcon, RefreshCwIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type QuizHistoryItem = WebEvolutionQuizInput['quizHistory'][0];

export function KnowledgeQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'hint' | 'info'; message: string; explanation?: string } | null>(null);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const { toast } = useToast();

  const startQuiz = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);
    setQuizComplete(false);
    setQuizHistory([]);
    setUserAnswer('');
    try {
      const initialInput: WebEvolutionQuizInput = {
        question: "Start quiz about web evolution.",
        quizHistory: [],
      };
      const response = await webEvolutionQuiz(initialInput);
      setCurrentQuestion(response.question);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error starting quiz:", error);
      toast({ title: "Error", description: "Could not start the quiz. Please try again.", variant: "destructive" });
      setQuizStarted(false);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleSubmitAnswer = async (hintRequested: boolean = false) => {
    if (!currentQuestion && !hintRequested) return;
    setIsLoading(true);
    setFeedback(null);

    const input: WebEvolutionQuizInput = {
      question: currentQuestion,
      userAnswer: hintRequested ? undefined : userAnswer,
      hintRequest: hintRequested,
      quizHistory: quizHistory,
    };

    try {
      const response = await webEvolutionQuiz(input);
      
      let newHistoryItem: QuizHistoryItem = {
        question: currentQuestion,
        userAnswer: hintRequested ? undefined : userAnswer,
        isCorrect: response.isCorrect,
        hintGiven: hintRequested || !!response.hint,
      };
      setQuizHistory(prev => [...prev, newHistoryItem]);

      if (response.hint) {
        setFeedback({ type: 'hint', message: response.hint });
      } else if (response.isCorrect !== undefined) {
        setFeedback({
          type: response.isCorrect ? 'correct' : 'incorrect',
          message: response.isCorrect ? "Correct!" : "Not quite. Let's see...",
          explanation: response.explanation,
        });
      }
      
      if (response.quizComplete) {
        setQuizComplete(true);
        setCurrentQuestion('');
        if(!response.isCorrect && response.explanation) {
             // If quiz ends on an incorrect answer, ensure explanation is prominent
            setFeedback(prev => ({...prev, message: "Quiz Complete!", explanation: response.explanation || prev?.explanation}));
        } else {
            setFeedback(prev => ({...prev, message: "Quiz Complete!", explanation: response.explanation || prev?.explanation}));
        }
      } else {
        setCurrentQuestion(response.question);
      }
      setUserAnswer(''); // Clear input after submission

    } catch (error) {
      console.error("Error submitting answer:", error);
      toast({ title: "Error", description: "Could not process your answer. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      handleSubmitAnswer(false);
    }
  };
  
  const renderFeedbackIcon = () => {
    if (!feedback) return null;
    switch (feedback.type) {
      case 'correct': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'incorrect': return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'hint': return <LightbulbIcon className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
  };


  return (
    <Section id="quiz" title="Test Your Web Knowledge" className="bg-gradient-to-br from-background to-secondary/30">
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm shadow-2xl border-border">
        {!quizStarted ? (
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-6">Ready to explore the depths of web evolution? Test your knowledge with our AI-powered quiz!</p>
            <Button size="lg" onClick={startQuiz} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LightbulbIcon className="mr-2 h-5 w-5" />}
              Start Quiz
            </Button>
          </CardContent>
        ) : quizComplete ? (
          <CardContent className="pt-6 text-center">
            <CardTitle className="text-3xl font-headline mb-4 text-primary">Quiz Complete!</CardTitle>
            {feedback?.explanation && <p className="text-muted-foreground mb-4">{feedback.explanation}</p>}
            <p className="text-lg text-muted-foreground mb-6">You've navigated the eras of the web. Well done!</p>
            <Button onClick={startQuiz} disabled={isLoading} className="font-semibold">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCwIcon className="mr-2 h-4 w-4" />}
              Play Again
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90">{currentQuestion || "Loading question..."}</CardTitle>
              <CardDescription className="text-muted-foreground">Enter your answer below or ask for a hint.</CardDescription>
            </CardHeader>
            <CardContent>
              {feedback && (
                <Alert className={cn(
                  "mb-6 border-2",
                  feedback.type === 'correct' && "border-green-500/50 bg-green-500/10",
                  feedback.type === 'incorrect' && "border-red-500/50 bg-red-500/10",
                  feedback.type === 'hint' && "border-yellow-500/50 bg-yellow-500/10",
                  feedback.type === 'info' && "border-blue-500/50 bg-blue-500/10"
                )}>
                  <div className="flex items-center gap-2">
                    {renderFeedbackIcon()}
                    <AlertTitle className={cn(
                       "font-semibold",
                       feedback.type === 'correct' && "text-green-400",
                       feedback.type === 'incorrect' && "text-red-400",
                       feedback.type === 'hint' && "text-yellow-400",
                       feedback.type === 'info' && "text-blue-400"
                    )}>{feedback.message}</AlertTitle>
                  </div>
                  {feedback.explanation && <AlertDescription className="mt-2 text-muted-foreground">{feedback.explanation}</AlertDescription>}
                </Alert>
              )}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isLoading}
                  className="text-lg py-6 bg-background/70 border-border focus:ring-primary"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={isLoading || !userAnswer.trim()} className="flex-1 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isLoading && !feedback?.hint ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Submit Answer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSubmitAnswer(true)}
                    disabled={isLoading}
                    className="flex-1 font-semibold border-primary text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {isLoading && feedback?.hint ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LightbulbIcon className="mr-2 h-4 w-4" />}
                    Get Hint
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <p>Quiz powered by AI. Questions and hints adapt to your learning journey.</p>
            </CardFooter>
          </>
        )}
      </Card>
    </Section>
  );
}
