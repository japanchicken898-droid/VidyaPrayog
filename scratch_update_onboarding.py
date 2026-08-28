path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OnboardingFlow.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We need to track answers.
# Let's add a state for questionResults
text = text.replace("const [questions, setQuestions] = useState([]);", "const [questions, setQuestions] = useState([]);\n  const [qResults, setQResults] = useState([]);")

# Update handleNextQuestion to record exactly which questions were correct
new_handleNext = """  const handleNextQuestion = () => {
    const q = questions[currentQIndex];
    const isCorrect = selectedOption === q.correct;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    setQResults(prev => [...prev, isCorrect]);
    
    if (currentQIndex < 4) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      let finalCorrect = correctCount + (isCorrect ? 1 : 0);
      setStep(3);
      setCorrectCount(finalCorrect);
    }
  };"""

text = re.sub(r'const handleNextQuestion = \(\) => \{.*?(?=const renderStep1)', new_handleNext + '\n\n  ', text, flags=re.DOTALL)

# Update renderStep3 to calculate Exact Score instead of random
new_renderStep3 = """  const renderStep3 = () => {
    let baseScore = (correctCount / 5) * 100;
    
    let tier = 'Amateur (Beginner)';
    let startNode = 'Milestone 1: Core Foundations';
    
    if (correctCount >= 3 && correctCount <= 4) {
      tier = 'Intermediate';
      startNode = 'Milestone 2/3: Advanced Applied Track';
    } else if (correctCount === 5) {
      tier = 'Advanced';
      startNode = 'Milestone 4: Capstone & Placement Fast-Track';
    }

    const colorClasses = {
      slate: "bg-slate-100 text-slate-700 border-slate-300",
      amber: "bg-amber-100 text-amber-700 border-amber-300",
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-300",
    };
    const color = correctCount === 5 ? 'emerald' : correctCount >= 3 ? 'amber' : 'slate';"""

text = re.sub(r'const renderStep3 = \(\) => \{.*?(?=const colorClasses =)', new_renderStep3 + '\n\n    ', text, flags=re.DOTALL)

# Also update the onComplete payload to pass qResults
text = text.replace("score: baseScore,", "score: baseScore, qResults,")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated OnboardingFlow.jsx with exact scoring")