
"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Section } from './Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { webEvolutionQuiz, type WebEvolutionQuizInput, type WebEvolutionQuizOutput } from '@/ai/flows/web-evolution-quiz';
import { Loader2, LightbulbIcon, CheckCircleIcon, XCircleIcon, RefreshCwIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type QuizHistoryItem = NonNullable<WebEvolutionQuizInput['quizHistory']>[0];

export function KnowledgeQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'hint' | 'info'; message: string; explanation?: string } | null>(null);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 0, y: 50 }); // Atur keadaan awal
        gsap.to(cardRef.current, { // Animasikan ke keadaan akhir
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }
    }, cardRef);
    return () => ctx.revert();
  }, []);


  const startQuiz = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);
    setQuizComplete(false);
    setQuizHistory([]);
    setUserAnswer('');
    try {
      const initialInput: WebEvolutionQuizInput = {
        question: "Mulai kuis tentang evolusi web.",
        quizHistory: [],
      };
      const response = await webEvolutionQuiz(initialInput);
      setCurrentQuestion(response.question);
      setQuizStarted(true);
    } catch (error) {
      console.error("Kesalahan memulai kuis:", error);
      toast({ title: "Kesalahan", description: "Tidak dapat memulai kuis. Silakan coba lagi.", variant: "destructive" });
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
          message: response.isCorrect ? "Benar!" : "Kurang tepat. Mari kita lihat...",
          explanation: response.explanation,
        });
      }
      
      if (response.quizComplete) {
        setQuizComplete(true);
        setCurrentQuestion('');
        if(!response.isCorrect && response.explanation) {
            setFeedback(prev => ({...(prev ?? {type: 'info', message: ''}), message: "Kuis Selesai!", explanation: response.explanation || prev?.explanation}));
        } else {
            setFeedback(prev => ({...(prev ?? {type: 'info', message: ''}), message: "Kuis Selesai!", explanation: response.explanation || prev?.explanation}));
        }
      } else {
        setCurrentQuestion(response.question);
      }
      setUserAnswer(''); 

    } catch (error) {
      console.error("Kesalahan mengirim jawaban:", error);
      toast({ title: "Kesalahan", description: "Tidak dapat memproses jawaban Anda. Silakan coba lagi.", variant: "destructive" });
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
    <Section id="quiz" title="Uji Pengetahuan Web Anda" className="bg-gradient-to-br from-background to-secondary/30">
      {/* Dihapus: opacity-0 dari Card */}
      <Card ref={cardRef} className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm shadow-2xl border-border">
        {!quizStarted ? (
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-6">Siap menjelajahi kedalaman evolusi web? Uji pengetahuan Anda dengan kuis bertenaga AI kami!</p>
            <Button size="lg" onClick={startQuiz} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LightbulbIcon className="mr-2 h-5 w-5" />}
              Mulai Kuis
            </Button>
          </CardContent>
        ) : quizComplete ? (
          <CardContent className="pt-6 text-center">
            <CardTitle className="text-3xl font-headline mb-4 text-primary">Kuis Selesai!</CardTitle>
            {feedback?.explanation && <p className="text-muted-foreground mb-4">{feedback.explanation}</p>}
            <p className="text-lg text-muted-foreground mb-6">Anda telah menavigasi era web. Kerja bagus!</p>
            <Button onClick={startQuiz} disabled={isLoading} className="font-semibold">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCwIcon className="mr-2 h-4 w-4" />}
              Main Lagi
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90">{currentQuestion || "Memuat pertanyaan..."}</CardTitle>
              <CardDescription className="text-muted-foreground">Masukkan jawaban Anda di bawah atau minta petunjuk.</CardDescription>
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
                  placeholder="Jawaban Anda..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isLoading}
                  className="text-lg py-6 bg-background/70 border-border focus:ring-primary"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={isLoading || !userAnswer.trim()} className="flex-1 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isLoading && !feedback?.hint ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Kirim Jawaban
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSubmitAnswer(true)}
                    disabled={isLoading}
                    className="flex-1 font-semibold border-primary text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {isLoading && feedback?.hint ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LightbulbIcon className="mr-2 h-4 w-4" />}
                    Dapatkan Petunjuk
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <p>Kuis didukung oleh AI. Pertanyaan dan petunjuk menyesuaikan dengan perjalanan belajar Anda.</p>
            </CardFooter>
          </>
        )}
      </Card>
    </Section>
  );
}
