import { User } from '../lib/firebase'

interface ScoringPageProps {
  user?: User | null
  testItems?: TestItem[]
  currentItem?: TestItem
  score?: number
  maxScore?: number
}

interface TestItem {
  id: string
  type: 'multiple_choice' | 'essay' | 'practical' | 'oral'
  question: string
  options?: string[]
  correctAnswer?: string | number
  maxPoints: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit?: number
}

export const ScoringPage = ({ user, testItems = [], currentItem, score = 0, maxScore = 100 }: ScoringPageProps) => {
  const progress = testItems.length > 0 ? ((testItems.length - (testItems.length - 1)) / testItems.length) * 100 : 0

  return (
    <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Header */}
      <header class="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <i class="fas fa-graduation-cap text-white text-2xl"></i>
              <h1 class="text-xl font-bold text-white">採点システム</h1>
            </div>
            
            {/* Score Display */}
            <div class="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <i class="fas fa-star"></i>
              <span class="font-bold">{score} / {maxScore}</span>
            </div>
            
            {/* User Info */}
            {user && (
              <div class="flex items-center space-x-3 text-white">
                <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-sm"></i>
                </div>
                <span class="text-sm">{user.name || user.email}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Progress & Controls */}
          <div class="lg:col-span-1">
            {/* Progress Card */}
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 shadow-2xl">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center">
                <i class="fas fa-chart-line mr-2 text-blue-400"></i>
                進捗状況
              </h3>
              
              {/* Circular Progress */}
              <div class="flex justify-center mb-4">
                <div class="relative w-24 h-24">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="45" 
                           stroke="rgb(156 163 175)" 
                           stroke-width="6" 
                           fill="transparent"/>
                    <circle cx="48" cy="48" r="45" 
                           stroke="rgb(59 130 246)" 
                           stroke-width="6" 
                           fill="transparent"
                           stroke-dasharray="283"
                           stroke-dashoffset={283 - (283 * progress / 100)}
                           class="transition-all duration-500 ease-in-out"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-blue-400">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
              
              <div class="text-center text-gray-300">
                <p class="text-sm">問題 1 / {testItems.length}</p>
                <p class="text-xs mt-1">残り {testItems.length - 1} 問</p>
              </div>
            </div>

            {/* Timer Card */}
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 shadow-2xl">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center">
                <i class="fas fa-clock mr-2 text-orange-400"></i>
                制限時間
              </h3>
              
              <div class="flex justify-center mb-4">
                <div class="relative w-20 h-20">
                  <svg class="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" 
                           stroke="rgb(254 243 199)" 
                           stroke-width="4" 
                           fill="transparent"/>
                    <circle cx="40" cy="40" r="36" 
                           stroke="rgb(245 158 11)" 
                           stroke-width="4" 
                           fill="transparent"
                           stroke-dasharray="226"
                           stroke-dashoffset="0"
                           class="timer-ring"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span id="timer" class="text-lg font-bold text-orange-400">5:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Info */}
            {currentItem && (
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
                <h3 class="text-lg font-bold text-white mb-3 flex items-center">
                  <i class="fas fa-tags mr-2 text-purple-400"></i>
                  問題情報
                </h3>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-300">カテゴリ</span>
                    <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                      {currentItem.category}
                    </span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-300">難易度</span>
                    <span class={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentItem.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                      currentItem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {currentItem.difficulty === 'easy' ? '初級' :
                       currentItem.difficulty === 'medium' ? '中級' : '上級'}
                    </span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-300">配点</span>
                    <span class="font-bold text-blue-400">{currentItem.maxPoints}点</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Question Area */}
          <div class="lg:col-span-2">
            {currentItem ? (
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                {/* Question Header */}
                <div class="flex justify-between items-start mb-6">
                  <h2 class="text-2xl font-bold text-white flex items-center">
                    <span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    問題
                  </h2>
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-question-circle text-blue-400"></i>
                    <span class="text-sm text-gray-300 capitalize">{currentItem.type.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Question Content */}
                <div class="mb-8">
                  <div class="bg-white/5 rounded-lg p-6 mb-6">
                    <p class="text-lg text-white leading-relaxed">{currentItem.question}</p>
                  </div>
                </div>

                {/* Answer Options */}
                {currentItem.type === 'multiple_choice' && currentItem.options && (
                  <div class="space-y-4 mb-8">
                    <h3 class="text-lg font-semibold text-white mb-4">選択肢</h3>
                    {currentItem.options.map((option, index) => (
                      <div key={index} class="answer-option bg-white/5 border-2 border-gray-500 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300" 
                           data-option={index} 
                           onclick={`selectOption(${index})`}>
                        <div class="flex items-center">
                          <div class="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mr-3">
                            <span class="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                          </div>
                          <p class="text-white">{option}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentItem.type === 'essay' && (
                  <div class="mb-8">
                    <h3 class="text-lg font-semibold text-white mb-4">解答記入欄</h3>
                    <textarea 
                      class="w-full h-48 p-4 bg-white/10 border border-gray-500 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="こちらに解答を記入してください..."
                      id="essayAnswer"></textarea>
                    <div class="flex justify-between mt-2 text-sm text-gray-400">
                      <span>最大文字数: 500文字</span>
                      <span id="charCount">0 / 500</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div class="flex justify-between items-center">
                  <button class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                    <i class="fas fa-chevron-left mr-2"></i>
                    前の問題
                  </button>

                  <div class="flex space-x-4">
                    <button class="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center">
                      <i class="fas fa-bookmark mr-2"></i>
                      保存
                    </button>
                    
                    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center" 
                            onclick="submitAnswer()">
                      <i class="fas fa-chevron-right mr-2"></i>
                      次の問題
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl text-center">
                <i class="fas fa-clipboard-list text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-300 mb-2">問題を読み込み中...</h3>
                <p class="text-gray-400">しばらくお待ちください</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div class="mt-8 flex justify-center">
          <div class="bg-white/10 backdrop-blur-lg rounded-lg px-6 py-3 shadow-lg">
            <div class="flex items-center space-x-4">
              {Array.from({length: testItems.length}, (_, i) => (
                <button key={i} class={`w-10 h-10 rounded-full ${i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'} flex items-center justify-center text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      <div id="submitModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden flex items-center justify-center z-50">
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 m-4 max-w-md w-full shadow-2xl">
          <div class="text-center">
            <i class="fas fa-check-circle text-6xl text-green-400 mb-4"></i>
            <h3 class="text-2xl font-bold text-white mb-2">解答完了</h3>
            <p class="text-gray-300 mb-6">回答が正常に送信されました</p>
            
            <div class="bg-white/5 rounded-lg p-4 mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-300">今回の得点</span>
                <span class="font-bold text-blue-400">85 / 100</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">正解率</span>
                <span class="font-bold text-green-400">85%</span>
              </div>
            </div>
            
            <div class="flex space-x-4">
              <button class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                結果詳細
              </button>
              <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                次の問題へ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script dangerouslySetInnerHTML={{__html: `
        // Global state
        let currentQuestionIndex = 0;
        let testData = null;
        let userAnswers = {};
        let totalScore = 0;
        let timeLeft = ${currentItem?.timeLimit || 300};
        let timerInterval;
        let selectedOption = null;
        let startTime = Date.now();

        // Initialize test
        async function initializeTest() {
            try {
                const response = await axios.get('/api/scoring/test-data');
                if (response.data.success) {
                    testData = response.data;
                    loadQuestion(0);
                }
            } catch (error) {
                console.error('Failed to load test data:', error);
            }
        }

        // Timer functionality
        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                timerElement.textContent = minutes + ':' + seconds.toString().padStart(2, '0');
            }
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitAnswer();
            }
            timeLeft--;
        }

        // Answer selection
        function selectOption(index) {
            // Remove previous selection
            document.querySelectorAll('.answer-option').forEach(option => {
                option.classList.remove('bg-blue-600');
                option.classList.add('bg-white/5');
            });
            
            // Add selection to clicked option
            const option = document.querySelector('[data-option="' + index + '"]');
            if (option) {
                option.classList.remove('bg-white/5');
                option.classList.add('bg-blue-600');
                selectedOption = index;
            }
        }

        // Submit answer
        async function submitAnswer() {
            if (timerInterval) clearInterval(timerInterval);
            
            const questionId = '1'; // currentItem?.id
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            let answer = selectedOption;
            const essayAnswer = document.getElementById('essayAnswer');
            if (essayAnswer) {
                answer = essayAnswer.value;
            }
            
            try {
                const response = await axios.post('/api/scoring/submit-answer', {
                    questionId,
                    answer,
                    timeSpent
                });
                
                if (response.data.success) {
                    const result = response.data.result;
                    
                    // Show visual feedback
                    showAnswerFeedback(result);
                    
                    // Show modal after delay
                    setTimeout(() => {
                        document.getElementById('submitModal').classList.remove('hidden');
                    }, 2000);
                }
            } catch (error) {
                console.error('Failed to submit answer:', error);
                alert('回答の送信に失敗しました');
            }
        }

        // Show answer feedback
        function showAnswerFeedback(result) {
            if (result.correctAnswer !== null) {
                document.querySelectorAll('.answer-option').forEach((option, index) => {
                    if (index === result.correctAnswer) {
                        option.classList.add('bg-green-600');
                    } else if (index === selectedOption && index !== result.correctAnswer) {
                        option.classList.add('bg-red-600');
                    }
                });
            }
        }

        // Start timer
        timerInterval = setInterval(updateTimer, 1000);

        // Modal close functionality
        document.getElementById('submitModal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });

        // Character count for essay questions
        const essayTextarea = document.getElementById('essayAnswer');
        if (essayTextarea) {
            essayTextarea.addEventListener('input', function() {
                const charCount = this.value.length;
                const charCountElement = document.getElementById('charCount');
                if (charCountElement) {
                    charCountElement.textContent = charCount + ' / 500';
                    if (charCount > 500) {
                        charCountElement.style.color = '#ef4444';
                        this.value = this.value.substring(0, 500);
                    } else {
                        charCountElement.style.color = '#9ca3af';
                    }
                }
            });
        }

        // Initialize test when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeTest();
        });
      `}}></script>
    </div>
  )
}