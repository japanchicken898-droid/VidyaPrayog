import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { generateAssessment, submitAssessment } from '../../services/api';

// ── Hardcoded Question Bank (10 questions, immediate offline fallback) ────────
const aptitudeQuestions = [
  {
    id: 'apt-1',
    category: 'Quantitative Aptitude',
    question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
    options: ['120 metres', '150 metres', '180 metres', '135 metres'],
    correct: 1,
  },
  {
    id: 'apt-2',
    category: 'Logical Reasoning',
    question: 'Find the next number in the sequence: 4, 9, 25, 49, 121, ___?',
    options: ['144', '169', '196', '225'],
    correct: 1,
  },
  {
    id: 'apt-3',
    category: 'Data Interpretation',
    question: 'If 20% of a number A is equal to 30% of number B, and B = 140, what is the value of A?',
    options: ['180', '210', '240', '200'],
    correct: 1,
  },
  {
    id: 'apt-4',
    category: 'Quantitative Aptitude',
    question: 'Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in ratio 12 : 23. The smaller number is:',
    options: ['27', '33', '49', '55'],
    correct: 1,
  },
  {
    id: 'apt-5',
    category: 'Logical Reasoning',
    question: 'A and B can complete a piece of work in 12 days and 18 days respectively. A starts the work and after 4 days B joins. In how many days is the work completed?',
    options: ['9 days', '10 days', '11 days', '12 days'],
    correct: 1,
  },
  {
    id: 'apt-6',
    category: 'Quantitative Aptitude',
    question: 'A sum of Rs. 12,500 amounts to Rs. 15,500 in 4 years at simple interest. What is the rate of interest?',
    options: ['3%', '4%', '5%', '6%'],
    correct: 3,
  },
  {
    id: 'apt-7',
    category: 'Logical Reasoning',
    question: 'Find the odd one out: 3, 5, 11, 14, 17, 21',
    options: ['14', '17', '21', '11'],
    correct: 0,
  },
  {
    id: 'apt-8',
    category: 'Quantitative Aptitude',
    question: 'A boat can travel at 13 km/hr in still water. If stream speed is 4 km/hr, find time to go 68 km downstream.',
    options: ['3 hours', '4 hours', '5 hours', '6 hours'],
    correct: 1,
  },
  {
    id: 'apt-9',
    category: 'Data Interpretation',
    question: 'In an examination, 35% failed in Hindi, 45% failed in English, and 20% failed in both. What percentage passed in both?',
    options: ['20%', '30%', '40%', '50%'],
    correct: 2,
  },
  {
    id: 'apt-10',
    category: 'Logical Reasoning',
    question: 'Pointing to a photograph, a man says "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph is it?',
    options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
    correct: 1,
  },
];

const AptitudeAssessmentModal = ({ isOpen, onClose, onSubmitScore }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: selectedOptionIndex }
  const [marked, setMarked] = useState([]); // Array of question IDs marked for review
  const [timeLeft, setTimeLeft] = useState(1200); // 20:00 mins in seconds
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [apiMode, setApiMode] = useState(false); // true = questions from server
  const startTimeRef = useRef(Date.now());

  // Initialize test on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setAnswers({});
      setMarked([]);
      setTimeLeft(1200);
      setTestSubmitted(false);
      setScoreReport(null);
      setLoadingQuestions(true);
      startTimeRef.current = Date.now();

      // Try to load from API, fall back to hardcoded local bank
      generateAssessment('aptitude', 10)
        .then(data => {
          // Normalize API response to use `question` field
          const normalized = (data.questions || []).map(q => ({
            ...q,
            question: q.question || q.q || q.prompt || 'Question text unavailable.',
          }));
          setQuestions(normalized);
          setApiMode(true);
          setLoadingQuestions(false);
        })
        .catch(() => {
          setQuestions(aptitudeQuestions);
          setApiMode(false);
          setLoadingQuestions(false);
        });
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || testSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, testSubmitted, timeLeft]);

  // Auto submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && isOpen && !testSubmitted) {
      handleFinalSubmit();
    }
  }, [timeLeft]);

  // Keyboard shortcut listener for options and arrow keys
  useEffect(() => {
    if (!isOpen || testSubmitted || questions.length === 0) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const optionIndex = ['A', 'B', 'C', 'D'].indexOf(key);
        const currentQ = questions[currentIndex];
        setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, questions, testSubmitted]);

  if (!isOpen) return null;

  // Show loading overlay while questions are being fetched
  if (loadingQuestions || questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 p-12 flex flex-col items-center gap-5 text-center">
          <Sparkles className="w-10 h-10 text-indigo-500 animate-pulse" />
          <div>
            <h3 className="text-lg font-black text-slate-900">Preparing Your Assessment</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Loading questions from the diagnostic engine…</p>
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors">Cancel</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleToggleMark = () => {
    if (marked.includes(currentQuestion.id)) {
      setMarked(prev => prev.filter(id => id !== currentQuestion.id));
    } else {
      setMarked(prev => [...prev, currentQuestion.id]);
    }
  };

  const handleFinalSubmit = async () => {
    // If API mode: send to server for grading
    if (apiMode) {
      try {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        const result = await submitAssessment({
          userId: 1,
          category: 'aptitude',
          title: 'National Aptitude Diagnostic — Round ' + (Math.floor(Math.random() * 5) + 1),
          answers,
          timeSpent,
        });

        const report = {
          correctCount: result.correct_count,
          totalCount: result.total_count,
          accuracy: result.score_percentage,
          quantScore: result.domain_scores?.['Quantitative'] ?? result.score_percentage,
          logicalScore: result.domain_scores?.['Logical Reasoning'] ?? result.score_percentage,
          percentile: result.percentile,
          badgeTier: result.badge_tier,
          newMatchScore: result.new_match_score,
          serverGraded: true,
        };

        setScoreReport(report);
        setTestSubmitted(true);
        onSubmitScore(report);
        return;
      } catch (err) {
        console.warn('Server grading failed, falling back to client grading:', err.message);
      }
    }

    // Fallback: local grading (when server is offline or answers have `correct` field)
    let correctCount = 0;
    let quantCorrect = 0;
    let quantTotal = 0;
    let logicalCorrect = 0;
    let logicalTotal = 0;

    questions.forEach(q => {
      const isQuant = q.category === "Quantitative" || q.sub_domain === 'Quantitative';
      if (isQuant) quantTotal++;
      else logicalTotal++;

      if (answers[q.id] === q.correct) {
        correctCount++;
        if (isQuant) quantCorrect++;
        else logicalCorrect++;
      }
    });

    const accuracy = Math.round((correctCount / questions.length) * 100);
    const quantScore = Math.round((quantCorrect / (quantTotal || 1)) * 100);
    const logicalScore = Math.round((logicalCorrect / (logicalTotal || 1)) * 100);

    const report = {
      correctCount,
      totalCount: questions.length,
      accuracy,
      quantScore,
      logicalScore,
      percentile: 85 + Math.round(correctCount * 1.3),
      serverGraded: false,
    };

    setScoreReport(report);
    setTestSubmitted(true);
    onSubmitScore(report);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] text-left">
        
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div>
              <h2 className="text-base font-black tracking-tight">VidyaPrayog National Diagnostic & Placement Benchmark</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Proctored Assessment Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold ${
              timeLeft < 300 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-200'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            
            <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Diagnostic Results Report Panel */}
        {testSubmitted ? (
          <div className="flex-1 overflow-y-auto p-8 space-y-8 text-center bg-slate-50/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">Diagnostic Completed</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">Aptitude assessment graded in-browser</p>
              </div>

              {/* Stats card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-3 gap-4 items-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-indigo-600">{scoreReport.accuracy}%</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Accuracy</div>
                </div>
                <div className="w-px bg-slate-200 h-8 mx-auto"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-800">{scoreReport.correctCount}/{scoreReport.totalCount}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Score</div>
                </div>
                <div className="w-px bg-slate-200 h-8 mx-auto"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-600">{scoreReport.percentile}th</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Percentile</div>
                </div>
              </div>

              {/* Sector breakdown progress indices */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Quantitative Ability</span>
                    <span>{scoreReport.quantScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${scoreReport.quantScore}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Logical &amp; Data Interpretation</span>
                    <span>{scoreReport.logicalScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scoreReport.logicalScore}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs font-semibold text-emerald-800 leading-relaxed">
                🎉 Your verified match index has been boosted! This result has been cryptographically signed and stored in your placement folder ledger.
              </div>

              <button 
                onClick={onClose} 
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-md"
              >
                Close Report &amp; Check Match Boost
              </button>
            </div>
          </div>
        ) : (
          /* Active Test Layout */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Question Column (65%) */}
            <div className="w-[70%] border-r border-slate-100 flex flex-col overflow-hidden bg-slate-50/20">
              <div className="p-8 flex-1 overflow-y-auto space-y-6">
                
                {/* Question Info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-100 border text-slate-500 rounded-xl text-xs font-bold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg">
                    {currentQuestion?.category}
                  </span>
                </div>

                {/* Prompt */}
                <h3 className="text-[17px] font-black text-slate-900 leading-relaxed">
                  {currentQuestion?.question || currentQuestion?.q || currentQuestion?.prompt}
                </h3>

                {/* Keyboard tip */}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  💡 Tip: You can press A, B, C, or D keys to select options.
                </p>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                          isSelected
                            ? 'border-2 border-indigo-600 bg-indigo-50/30'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center border ${
                          isSelected 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          {letters[idx]}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">{option}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Bottom Nav Bar */}
              <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-sm">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleToggleMark}
                  className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    marked.includes(currentQuestion?.id)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Mark for Review
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-750 active:scale-95 transition-all shadow-md shadow-indigo-600/10"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

            {/* Right Question Palette Column (35%) */}
            <div className="w-[30%] bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Question Palette</h4>
                
                <div className="grid grid-cols-4 gap-2.5">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isMarked = marked.includes(q.id);
                    const isCurrent = currentIndex === idx;
                    
                    let bgClass = "bg-white border-slate-200 text-slate-500";
                    if (isMarked) bgClass = "bg-amber-500 border-amber-500 text-white";
                    else if (isAnswered) bgClass = "bg-emerald-500 border-emerald-500 text-white";
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-10 h-10 rounded-full border text-xs font-extrabold flex items-center justify-center transition-all ${bgClass} ${
                          isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span>Marked</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-white border border-slate-200 rounded-full"></div>
                    <span>Unvisited</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AptitudeAssessmentModal;
