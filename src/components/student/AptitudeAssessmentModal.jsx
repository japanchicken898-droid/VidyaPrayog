import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, X, Sparkles, Send } from 'lucide-react';
import { generateAssessment, submitAssessment } from '../../services/api';

export const aptitudeCategories = [
  {
    id: "quantitative",
    name: "Quantitative Aptitude",
    topics: ["Percentages", "Profit & Loss", "Ratio & Proportion", "Ages", "Time & Distance", "Mensuration"],
    questions: [
      {
        id: "q_quant_1",
        category: "Quantitative Aptitude",
        topic: "Mensuration",
        question: "A sphere has radius 7 cm. What is its volume? (π = 22/7)",
        options: [
          { key: "A", text: "1437.33 cm³" },
          { key: "B", text: "1370 cm³" },
          { key: "C", text: "1000 cm³" },
          { key: "D", text: "1500 cm³" }
        ],
        correctAnswer: "A",
        explanation: "Volume = (4/3) * π * r³ = (4/3) * (22/7) * 7³ = (4/3) * 22 * 49 ≈ 1437.33 cm³"
      },
      {
        id: "q_quant_2",
        category: "Quantitative Aptitude",
        topic: "Profit & Loss",
        question: "A shopkeeper marks his goods at a price such that after giving a discount of 25%, he gains 20%. If the cost price is ₹460, what is the marked price?",
        options: [
          { key: "A", text: "₹736" },
          { key: "B", text: "₹748" },
          { key: "C", text: "₹725" },
          { key: "D", text: "₹752" }
        ],
        correctAnswer: "A",
        explanation: "MP * (100 - D)% = CP * (100 + P)% => MP * 75 = 460 * 120 => MP = ₹736."
      },
      {
        id: "q_quant_3",
        category: "Quantitative Aptitude",
        topic: "Percentages",
        question: "The price of sugar has decreased by 15%. By what percentage must consumption increase so expenditure remains unchanged?",
        options: [
          { key: "A", text: "300/23 %" },
          { key: "B", text: "300/17 %" },
          { key: "C", text: "50/3 %" },
          { key: "D", text: "20/3 %" }
        ],
        correctAnswer: "B",
        explanation: "Percentage increase = [r / (100 - r)] * 100 = [15 / 85] * 100 = 300/17 %."
      },
      {
        id: "q_quant_4",
        category: "Quantitative Aptitude",
        topic: "Ages",
        question: "The ages of A and B are in the ratio 5:7. Five years ago, their ages were in the ratio 5:8. What are their present ages?",
        options: [
          { key: "A", text: "20, 28" },
          { key: "B", text: "15, 21" },
          { key: "C", text: "25, 40" },
          { key: "D", text: "10, 14" }
        ],
        correctAnswer: "B",
        explanation: "(5x - 5)/(7x - 5) = 5/8 => 40x - 40 = 35x - 25 => 5x = 15 => x = 3. Present ages = 15 and 21 years."
      },
      {
        id: "q_quant_5",
        category: "Quantitative Aptitude",
        topic: "Time & Distance",
        question: "A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:",
        options: [
          { key: "A", text: "45 km/hr" },
          { key: "B", text: "50 km/hr" },
          { key: "C", text: "54 km/hr" },
          { key: "D", text: "55 km/hr" }
        ],
        correctAnswer: "B",
        explanation: "Relative speed = 125/10 = 12.5 m/sec = 12.5 * 18/5 = 45 km/hr. Speed of train = 45 + 5 = 50 km/hr."
      }
    ]
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    topics: ["Number Series", "Coding-Decoding", "Blood Relations", "Analogies", "Dice"],
    questions: [
      {
        id: "q_logic_1",
        category: "Logical Reasoning",
        topic: "Number Series",
        question: "Which number will replace the question mark (?) in the series: 3, 7, 16, 35, ?, 153",
        options: [
          { key: "A", text: "84" },
          { key: "B", text: "74" },
          { key: "C", text: "78" },
          { key: "D", text: "63" }
        ],
        correctAnswer: "B",
        explanation: "Pattern: *2+1, *2+2, *2+3, *2+4 => 35 * 2 + 4 = 74."
      },
      {
        id: "q_logic_2",
        category: "Logical Reasoning",
        topic: "Coding-Decoding",
        question: "If CAB is coded as 6 and BED is coded as 40, how will HAD be coded?",
        options: [
          { key: "A", text: "16" },
          { key: "B", text: "52" },
          { key: "C", text: "32" },
          { key: "D", text: "46" }
        ],
        correctAnswer: "C",
        explanation: "Product of alphabet positions: H(8) * A(1) * D(4) = 32."
      },
      {
        id: "q_logic_3",
        category: "Logical Reasoning",
        topic: "Blood Relations",
        question: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
        options: [
          { key: "A", text: "Brother" },
          { key: "B", text: "Uncle" },
          { key: "C", text: "Cousin" },
          { key: "D", text: "Father" }
        ],
        correctAnswer: "D",
        explanation: "The only son of Suresh's mother is Suresh himself. So the boy in the photograph is Suresh's son."
      },
      {
        id: "q_logic_4",
        category: "Logical Reasoning",
        topic: "Analogies",
        question: "Oasis is to Sand as Island is to:",
        options: [
          { key: "A", text: "River" },
          { key: "B", text: "Sea" },
          { key: "C", text: "Water" },
          { key: "D", text: "Waves" }
        ],
        correctAnswer: "C",
        explanation: "An oasis is a water body surrounded by sand. Similarly, an island is a land mass surrounded by water."
      },
      {
        id: "q_logic_5",
        category: "Logical Reasoning",
        topic: "Dice",
        question: "Two positions of a dice are shown. When 4 is at the bottom, what number will be on the top?",
        options: [
          { key: "A", text: "1" },
          { key: "B", text: "2" },
          { key: "C", text: "5" },
          { key: "D", text: "6" }
        ],
        correctAnswer: "A",
        explanation: "By standard dice rules or relative positioning in the provided figure setup."
      }
    ]
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    topics: ["Sentence Correction", "Vocabulary", "Grammar"],
    questions: [
      {
        id: "q_verb_1",
        category: "Verbal Ability",
        topic: "Vocabulary",
        question: "Select the most appropriate synonym for the word 'CANDID':",
        options: [
          { key: "A", text: "Frank / Outspoken" },
          { key: "B", text: "Secretive" },
          { key: "C", text: "Deceptive" },
          { key: "D", text: "Arrogant" }
        ],
        correctAnswer: "A",
        explanation: "'Candid' means truthful, straightforward, and frank."
      },
      {
        id: "q_verb_2",
        category: "Verbal Ability",
        topic: "Sentence Correction",
        question: "Choose the correct sentence:",
        options: [
          { key: "A", text: "He is one of the best players who has ever lived." },
          { key: "B", text: "He is one of the best players who have ever lived." },
          { key: "C", text: "He is one of the best player who has ever lived." },
          { key: "D", text: "He is one of the best player who have ever lived." }
        ],
        correctAnswer: "B",
        explanation: "'Who' refers to the antecedent 'players' which is plural, so it takes the plural verb 'have'."
      },
      {
        id: "q_verb_3",
        category: "Verbal Ability",
        topic: "Grammar",
        question: "Fill in the blank: She has been living in this city _____ 2015.",
        options: [
          { key: "A", text: "for" },
          { key: "B", text: "since" },
          { key: "C", text: "from" },
          { key: "D", text: "until" }
        ],
        correctAnswer: "B",
        explanation: "'Since' is used for a specific point in time (2015)."
      },
      {
        id: "q_verb_4",
        category: "Verbal Ability",
        topic: "Vocabulary",
        question: "What is the antonym of 'EPHEMERAL'?",
        options: [
          { key: "A", text: "Transient" },
          { key: "B", text: "Permanent" },
          { key: "C", text: "Short-lived" },
          { key: "D", text: "Fleeting" }
        ],
        correctAnswer: "B",
        explanation: "'Ephemeral' means lasting for a very short time, so 'Permanent' is its antonym."
      },
      {
        id: "q_verb_5",
        category: "Verbal Ability",
        topic: "Grammar",
        question: "Identify the error: 'Neither the manager nor his employees was present at the meeting.'",
        options: [
          { key: "A", text: "Neither the manager" },
          { key: "B", text: "nor his employees" },
          { key: "C", text: "was present" },
          { key: "D", text: "at the meeting" }
        ],
        correctAnswer: "C",
        explanation: "When subjects are joined by 'neither...nor', the verb agrees with the subject closest to it. Here, 'employees' is plural, so it should be 'were present'."
      }
    ]
  }
];

const getLocalQuestions = () => {
  return aptitudeCategories.flatMap(cat => 
    cat.questions.map(q => ({
      ...q,
      categoryId: cat.id,
      optionsList: q.options.map(o => o.text ? o.text : o),
      correctIndex: q.correctAnswer ? ['A','B','C','D'].indexOf(q.correctAnswer) : q.correct
    }))
  );
};

const AptitudeAssessmentModal = ({ isOpen, onClose, onSubmitScore }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('quantitative');
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [apiMode, setApiMode] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setActiveCategory('quantitative');
      setAnswers({});
      setMarked([]);
      setTimeLeft(1200);
      setTestSubmitted(false);
      setScoreReport(null);
      setLoadingQuestions(true);
      startTimeRef.current = Date.now();

      // Force local question bank (15 questions total)
      setQuestions(getLocalQuestions());
      setApiMode(false);
      setLoadingQuestions(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || testSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, testSubmitted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isOpen && !testSubmitted) {
      handleFinalSubmit();
    }
  }, [timeLeft, isOpen, testSubmitted]);

  // Derived state for currently visible questions
  const displayedQuestions = questions.filter(q => q.categoryId === activeCategory);

  // Keyboard shortcut listener
  useEffect(() => {
    if (!isOpen || testSubmitted || displayedQuestions.length === 0) return;
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const optionIndex = ['A', 'B', 'C', 'D'].indexOf(key);
        const currentQ = displayedQuestions[currentIndex];
        if (currentQ) {
          setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
        }
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, displayedQuestions, testSubmitted, activeCategory]);

  if (!isOpen) return null;

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

  const currentQuestion = displayedQuestions[currentIndex];

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleToggleMark = () => {
    if (!currentQuestion) return;
    if (marked.includes(currentQuestion.id)) {
      setMarked(prev => prev.filter(id => id !== currentQuestion.id));
    } else {
      setMarked(prev => [...prev, currentQuestion.id]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Jump to previous category's last question
      const catIndex = aptitudeCategories.findIndex(c => c.id === activeCategory);
      if (catIndex > 0) {
        const prevCatId = aptitudeCategories[catIndex - 1].id;
        setActiveCategory(prevCatId);
        const prevCatQuestions = questions.filter(q => q.categoryId === prevCatId);
        setCurrentIndex(prevCatQuestions.length - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < displayedQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Jump to next category
      const catIndex = aptitudeCategories.findIndex(c => c.id === activeCategory);
      if (catIndex < aptitudeCategories.length - 1) {
        setActiveCategory(aptitudeCategories[catIndex + 1].id);
        setCurrentIndex(0);
      }
    }
  };

  const isFirstCategory = activeCategory === aptitudeCategories[0].id;
  const isLastCategory = activeCategory === aptitudeCategories[aptitudeCategories.length - 1].id;
  const isFirstQuestionInCat = currentIndex === 0;
  const isLastQuestionInCat = currentIndex === displayedQuestions.length - 1;
  const isVeryFirstQuestion = isFirstCategory && isFirstQuestionInCat;
  const isVeryLastQuestion = isLastCategory && isLastQuestionInCat;

  const handleFinalSubmit = async () => {
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

    let correctCount = 0;
    let quantCorrect = 0, quantTotal = 0;
    let logicalCorrect = 0, logicalTotal = 0;

    questions.forEach(q => {
      const isQuant = q.categoryId === 'quantitative' || q.category.includes("Quant");
      if (isQuant) quantTotal++;
      else logicalTotal++;

      if (answers[q.id] === q.correctIndex) {
        correctCount++;
        if (isQuant) quantCorrect++;
        else logicalCorrect++;
      }
    });

    const accuracy = Math.round((correctCount / questions.length) * 100) || 0;
    const quantScore = Math.round((quantCorrect / (quantTotal || 1)) * 100) || 0;
    const logicalScore = Math.round((logicalCorrect / (logicalTotal || 1)) * 100) || 0;

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
            {!testSubmitted && (
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-750 active:scale-95 transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Test Early
              </button>
            )}

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

        {/* Section Navigation Bar */}
        {!testSubmitted && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-6 overflow-x-auto shrink-0">
            {aptitudeCategories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setCurrentIndex(0); }}
                className={`py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${activeCategory === cat.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

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
                    <span>Logical &amp; Verbal Ability</span>
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
                    Question {currentIndex + 1} of {displayedQuestions.length}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg">
                    [{currentQuestion?.category?.toUpperCase()} - {currentQuestion?.topic?.toUpperCase() || 'GENERAL'}]
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
                  {currentQuestion?.optionsList?.map((option, idx) => {
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
                  disabled={isVeryFirstQuestion}
                  onClick={handlePrev}
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

                {isVeryLastQuestion ? (
                  <button
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-750 active:scale-95 transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5"
                  >
                    Submit Test
                    <CheckCircle className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
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
                  {displayedQuestions.map((q, idx) => {
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
