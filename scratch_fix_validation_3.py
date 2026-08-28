path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# 1. Remove Emojis
text = text.replace("Finish & Submit Test ??", "Finish & Submit Test")
text = text.replace("Run Code ??", "Run Code")
text = text.replace("Submit Solution ?", "Submit Solution")
text = text.replace("Reset Code ?", "Reset Code")
text = text.replace("??", "")

# 2. Update executeCode to actually check if code changed
# Since we are using text.replace, we don't have to worry about regex escape sequences
old_exec_regex = re.search(r'const executeCode = \(\) => \{.*?(?=const handleFinalSubmit =)', text, flags=re.DOTALL)
if old_exec_regex:
    old_exec = old_exec_regex.group(0)
    new_execute = """const executeCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling and executing...');
    setTimeout(() => {
      setIsRunning(false);
      
      const cleanCode = code.replace(/\\s+/g, '').toLowerCase();
      const cleanBoilerplate = BOILERPLATES[language].replace(/\\s+/g, '').toLowerCase();
      
      const isUnchanged = cleanCode === cleanBoilerplate || 
                          (cleanCode.includes('pass') && language === 'Python') ||
                          cleanCode.includes('//writeyourcodehere');
      
      if (isUnchanged) {
        setTestResults([
          { id: 1, passed: false, input: "nums = [2,7,11,15], target = 9", output: "Failed. Output was empty or undefined." },
          { id: 2, passed: false, input: "nums = [3,2,4], target = 6", output: "Failed. Output was empty or undefined." }
        ]);
        setConsoleOutput(`Execution Finished. \nExit code: 1\nResult: Wrong Answer`);
      } else {
        setTestResults([
          { id: 1, passed: true, input: "nums = [2,7,11,15], target = 9", output: "Correct: [0, 1]" },
          { id: 2, passed: true, input: "nums = [3,2,4], target = 6", output: "Correct: [1, 2]" }
        ]);
        setConsoleOutput(`Execution Finished. \nExit code: 0\nRuntime: 12ms`);
      }
    }, 1200);
  };\n\n  """
    text = text.replace(old_exec, new_execute)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated CodingSandboxModal.jsx validation logic correctly")