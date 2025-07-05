import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Award,
  BarChart3,
  Clock,
  Zap,
  Volume2,
  Brain,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  Home,
  Book,
  GraduationCap,
  Lightbulb,
  CheckSquare,
  Square,
  AlertCircle,
  FileText,
  Newspaper,
  ScrollText,
  Settings
} from 'lucide-react';

// Reading materials data
const readingMaterials = [
  {
    id: 1,
    type: 'news',
    title: '日本の経済ニュース',
    subtitle: 'Japanese Economic News',
    difficulty: 'Intermediate',
    readingTime: '5-7 minutes',
    content: `日本の経済は現在、安定した成長を続けています。最新の統計によると、国内総生産（GDP）は前年比で2.3%の成長を記録しました。

この成長の主な要因として、輸出の増加と国内消費の回復が挙げられます。特に、自動車産業と電子機器産業が好調な業績を示しています。

政府は、この成長を維持するために、様々な政策を実施しています。例えば、企業の研究開発投資に対する税制優遇措置や、中小企業への資金支援などです。

また、労働市場も改善されており、失業率は過去10年間で最低水準を記録しています。これにより、個人消費も増加し、経済全体の好循環が生まれています。

専門家たちは、今後もこの成長傾向が続くと予想しています。ただし、海外の経済情勢や為替レートの変動には注意が必要だと指摘しています。`,
    questions: [
      {
        question: '日本のGDPの成長率は何パーセントでしたか？',
        options: ['1.8%', '2.3%', '2.8%', '3.2%'],
        correct: '2.3%',
        explanation: '文章の中で「国内総生産（GDP）は前年比で2.3%の成長を記録しました」と明記されています。'
      },
      {
        question: '成長の主な要因として挙げられていないものはどれですか？',
        options: ['輸出の増加', '国内消費の回復', '政府の政策', '為替レートの安定'],
        correct: '為替レートの安定',
        explanation: '文章では輸出の増加、国内消費の回復、政府の政策が要因として挙げられていますが、為替レートの安定については言及されていません。'
      },
      {
        question: '失業率について正しい記述はどれですか？',
        options: ['過去5年間で最低', '過去10年間で最低', '過去15年間で最低', '過去20年間で最低'],
        correct: '過去10年間で最低',
        explanation: '文章で「失業率は過去10年間で最低水準を記録しています」と述べられています。'
      }
    ]
  },
  {
    id: 2,
    type: 'formal',
    title: '会社の就業規則',
    subtitle: 'Company Work Regulations',
    difficulty: 'Intermediate',
    readingTime: '8-10 minutes',
    content: `第1条（目的）
この就業規則は、労働基準法第89条に基づき、従業員の労働条件を定めるものである。

第2条（適用範囲）
この規則は、当社に雇用される全ての従業員に適用する。

第3条（勤務時間）
1. 通常の勤務時間は、午前9時から午後6時までとする。
2. 休憩時間は、午後12時から午後1時までとする。
3. 残業は、事前に上司の承認を得て行うものとする。

第4条（休日・休暇）
1. 週休2日制を採用する。
2. 年末年始、お盆期間は特別休暇とする。
3. 年次有給休暇は、入社後6ヶ月経過した者に10日付与する。

第5条（給与）
1. 給与は、毎月25日に支払う。
2. 基本給のほか、通勤手当、住宅手当を支給する。
3. 昇給は、年1回、4月に行う。

第6条（退職）
1. 退職を希望する者は、1ヶ月前に申し出ること。
2. 退職金は、勤続年数に応じて支給する。`,
    questions: [
      {
        question: '通常の勤務時間は何時から何時までですか？',
        options: ['午前8時から午後5時', '午前9時から午後6時', '午前9時から午後7時', '午前10時から午後6時'],
        correct: '午前9時から午後6時',
        explanation: '第3条1項で「通常の勤務時間は、午前9時から午後6時までとする」と定められています。'
      },
      {
        question: '年次有給休暇は何日付与されますか？',
        options: ['5日', '10日', '15日', '20日'],
        correct: '10日',
        explanation: '第4条3項で「年次有給休暇は、入社後6ヶ月経過した者に10日付与する」と定められています。'
      },
      {
        question: '給与の支払日はいつですか？',
        options: ['毎月20日', '毎月25日', '毎月30日', '毎月末'],
        correct: '毎月25日',
        explanation: '第5条1項で「給与は、毎月25日に支払う」と定められています。'
      }
    ]
  },
  {
    id: 3,
    type: 'literary',
    title: '春の訪れ',
    subtitle: 'The Arrival of Spring',
    difficulty: 'Advanced',
    readingTime: '6-8 minutes',
    content: `桜の花びらが舞い散る中、私は古い寺の境内を歩いていた。石畳の上に積もった淡いピンクの花びらが、まるで絨毯のように見える。

この寺は、私の祖父がよく訪れていた場所だ。祖父は生前、「春になると、ここに来て桜を見るのが楽しみだった」と言っていた。今、私も同じ場所に立ち、同じ景色を見ている。

境内の奥には、小さな池がある。水面に桜の花びらが浮かび、まるで絵画のような美しさだ。池の周りには、ベンチがいくつか置かれている。その一つに腰かけて、しばらくの間、春の風に身を任せていた。

遠くから、子供たちの笑い声が聞こえてくる。学校帰りの子供たちが、桜の下で遊んでいるのだろう。その声が、この静寂な空間に温かさを添えている。

ふと、祖父の言葉を思い出した。「春は、新しい始まりの季節だ。どんなに辛い冬を過ごしても、必ず春は来る。それが自然の摂理だ」と。

確かに、この美しい桜の花は、冬の厳しさを乗り越えて咲いたものだ。私も、人生の困難を乗り越えて、新しい道を歩んでいこうと思う。

夕日が西の空に沈み始めた。桜の花びらが、夕陽に照らされて、より一層美しく見える。この瞬間を、永遠に記憶に留めておきたい。`,
    questions: [
      {
        question: '作者が訪れている場所はどこですか？',
        options: ['公園', '古い寺', '学校', '池'],
        correct: '古い寺',
        explanation: '文章の冒頭で「古い寺の境内を歩いていた」と述べられています。'
      },
      {
        question: '祖父がこの寺を訪れる理由は何でしたか？',
        options: ['お参りをするため', '桜を見るため', '散歩するため', '写真を撮るため'],
        correct: '桜を見るため',
        explanation: '祖父の言葉として「春になると、ここに来て桜を見るのが楽しみだった」と引用されています。'
      },
      {
        question: '作者が祖父から学んだ教訓は何ですか？',
        options: ['桜の美しさ', '春の訪れ', '困難を乗り越えること', '自然の美しさ'],
        correct: '困難を乗り越えること',
        explanation: '祖父の言葉として「どんなに辛い冬を過ごしても、必ず春は来る」という教訓が述べられています。'
      }
    ]
  },
  {
    id: 4,
    type: 'technical',
    title: 'スマートフォンの操作方法',
    subtitle: 'Smartphone Operation Manual',
    difficulty: 'Intermediate',
    readingTime: '7-9 minutes',
    content: `このスマートフォンは、最新の技術を採用した高性能なデバイスです。安全で快適にご利用いただくために、以下の操作方法をよくお読みください。

【基本操作】
1. 電源の入れ方
   - 電源ボタンを3秒間長押ししてください
   - ロゴが表示されたら、電源が入ったことを示します

2. 画面のロック解除
   - 画面を上にスワイプしてください
   - PINコードまたは指紋認証でロックを解除できます

3. アプリの起動
   - ホーム画面からアプリアイコンをタップしてください
   - 最近使用したアプリは、画面下部のナビゲーションバーからアクセスできます

【設定の変更】
1. 画面の明るさ調整
   - 設定アプリを開く
   - 「ディスプレイ」を選択
   - 「明るさ」を調整

2. Wi-Fi接続
   - 設定アプリを開く
   - 「Wi-Fi」を選択
   - 利用可能なネットワークから選択

3. バッテリー節約
   - 設定アプリを開く
   - 「バッテリー」を選択
   - 「バッテリー節約」を有効にする

【トラブルシューティング】
・画面が反応しない場合：電源ボタンと音量下ボタンを同時に10秒間押してください
・アプリが動作しない場合：アプリを強制終了して再起動してください
・バッテリーの消耗が早い場合：不要なアプリを終了し、画面の明るさを下げてください`,
    questions: [
      {
        question: '電源を入れるには、電源ボタンを何秒間押す必要がありますか？',
        options: ['1秒間', '2秒間', '3秒間', '5秒間'],
        correct: '3秒間',
        explanation: '「電源ボタンを3秒間長押ししてください」と明記されています。'
      },
      {
        question: '画面のロック解除方法として正しくないものはどれですか？',
        options: ['画面を上にスワイプ', 'PINコード入力', '指紋認証', '音声認証'],
        correct: '音声認証',
        explanation: '文章では「PINコードまたは指紋認証」と述べられており、音声認証については言及されていません。'
      },
      {
        question: 'バッテリーの消耗が早い場合の対処法として正しいものはどれですか？',
        options: ['アプリを強制終了', '画面の明るさを下げる', 'Wi-Fiを無効にする', 'すべて正しい'],
        correct: 'すべて正しい',
        explanation: '文章で「不要なアプリを終了し、画面の明るさを下げてください」と述べられており、これらはすべて有効な対処法です。'
      }
    ]
  }
];

const ReadingComprehensionN4: React.FC = () => {
  const [currentMaterial, setCurrentMaterial] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [questionResults, setQuestionResults] = useState<{[key: string]: boolean}>({});
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const currentReading = readingMaterials[currentMaterial];

  // Calculate progress
  useEffect(() => {
    const completedMaterials = Object.keys(questionResults).filter(key => questionResults[key]).length;
    const totalMaterials = readingMaterials.length;
    setProgress(Math.round((completedMaterials / totalMaterials) * 100));
  }, [questionResults]);

  // Reading timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReading) {
      interval = setInterval(() => {
        setReadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  const startReading = () => {
    setIsReading(true);
    setReadingTime(0);
  };



  const handleAnswerSubmit = (questionIndex: number, answer: string) => {
    const question = currentReading.questions[questionIndex];
    const isCorrect = answer === question.correct;
    
    setUserAnswers(prev => ({ ...prev, [`${currentMaterial}-${questionIndex}`]: answer }));
    setQuestionResults(prev => ({ ...prev, [`${currentMaterial}-${questionIndex}`]: isCorrect }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalQuestions(prev => prev + 1);
  };

  const nextMaterial = () => {
    if (currentMaterial < readingMaterials.length - 1) {
      setCurrentMaterial(currentMaterial + 1);
      setIsReading(false);
      setReadingTime(0);
    }
  };

  const prevMaterial = () => {
    if (currentMaterial > 0) {
      setCurrentMaterial(currentMaterial - 1);
      setIsReading(false);
      setReadingTime(0);
    }
  };

  const resetProgress = () => {
    setUserAnswers({});
    setQuestionResults({});
    setScore(0);
    setTotalQuestions(0);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return <Newspaper className="w-5 h-5" />;
      case 'formal': return <FileText className="w-5 h-5" />;
      case 'literary': return <Book className="w-5 h-5" />;
      case 'technical': return <Settings className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'text-blue-600 bg-blue-100';
      case 'formal': return 'text-green-600 bg-green-100';
      case 'literary': return 'text-purple-600 bg-purple-100';
      case 'technical': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/language/jlpt-n4" className="text-purple-600 hover:text-purple-800">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reading Comprehension N4</h1>
                <p className="text-gray-600">Advanced Reading Skills for N4 Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-bold text-purple-600">{progress}%</div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Material Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(currentReading.type)}`}>
                {getTypeIcon(currentReading.type)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentReading.title}</h2>
                <p className="text-gray-600">{currentReading.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevMaterial}
                disabled={currentMaterial === 0}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600">
                {currentMaterial + 1} of {readingMaterials.length}
              </span>
              <button
                onClick={nextMaterial}
                disabled={currentMaterial === readingMaterials.length - 1}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentMaterial + 1) / readingMaterials.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reading Material Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Reading Material</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Difficulty: <span className="font-medium">{currentReading.difficulty}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated time: <span className="font-medium">{currentReading.readingTime}</span>
                  </div>
                  {isReading && (
                    <div className="text-sm text-purple-600 font-medium">
                      Reading time: {formatTime(readingTime)}
                    </div>
                  )}
                </div>
              </div>

              {!isReading ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Read?</h4>
                  <p className="text-gray-600 mb-4">
                    Read the material below and answer the questions on the right.
                  </p>
                  <button
                    onClick={startReading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Start Reading
                  </button>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
                    {currentReading.content}
                  </div>
                </div>
              )}
            </div>

            {/* Questions Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Comprehension Questions</h3>
              <div className="space-y-6">
                {currentReading.questions.map((question, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-gray-900">Question {index + 1}</h4>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-900 mb-4">{question.question}</p>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSubmit(index, option)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors text-black ${
                            userAnswers[`${currentMaterial}-${index}`] === option
                              ? questionResults[`${currentMaterial}-${index}`]
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {userAnswers[`${currentMaterial}-${index}`] && (
                      <div className={`mt-3 p-3 rounded-lg ${
                        questionResults[`${currentMaterial}-${index}`]
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2">
                          {questionResults[`${currentMaterial}-${index}`] ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`font-medium ${
                            questionResults[`${currentMaterial}-${index}`] ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {questionResults[`${currentMaterial}-${index}`] ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Material Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Material Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Material:</span>
                  <span className="font-medium">{currentMaterial + 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{currentReading.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{currentReading.questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-medium">{score}/{totalQuestions}</span>
                </div>
              </div>
            </div>

            {/* Material List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Materials</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {readingMaterials.map((material, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentMaterial(index);
                      setIsReading(false);
                      setReadingTime(0);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      index === currentMaterial
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded ${getTypeColor(material.type)}`}>
                          {getTypeIcon(material.type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{material.title}</div>
                          <div className="text-xs text-gray-600">{material.type}</div>
                        </div>
                      </div>
                      {questionResults[`${index}-0`] && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={resetProgress}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Progress</span>
                </button>
                <Link
                  to="/language/jlpt-n4"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to N4 Course</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionN4; 