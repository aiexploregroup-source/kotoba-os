import type { VocabItem } from '../types';

export const n4Vocab: VocabItem[] = [
  // ------------------------------------------------------------------
  // Greetings & politeness (N5)
  // ------------------------------------------------------------------
  { word: 'こんにちは', reading: 'こんにちは', meaning: 'hello / good afternoon', level: 'N5', tags: ['greeting'], example: 'こんにちは、元気ですか。' },
  { word: 'おはようございます', reading: 'おはようございます', meaning: 'good morning (polite)', level: 'N5', tags: ['greeting'], example: 'おはようございます。今日もよろしくお願いします。' },
  { word: 'こんばんは', reading: 'こんばんは', meaning: 'good evening', level: 'N5', tags: ['greeting'] },
  { word: 'さようなら', reading: 'さようなら', meaning: 'goodbye', level: 'N5', tags: ['greeting'] },
  { word: 'ありがとう', reading: 'ありがとう', meaning: 'thank you', level: 'N5', tags: ['greeting'], example: 'ありがとう、助かった。' },
  { word: 'ありがとうございます', reading: 'ありがとうございます', meaning: 'thank you (polite)', level: 'N5', tags: ['greeting'] },
  { word: 'すみません', reading: 'すみません', meaning: 'excuse me / sorry', level: 'N5', tags: ['greeting'], example: 'すみません、駅はどこですか。' },
  { word: 'ごめんなさい', reading: 'ごめんなさい', meaning: 'I am sorry', level: 'N5', tags: ['greeting'] },
  { word: 'お願いします', reading: 'おねがいします', meaning: 'please', level: 'N5', tags: ['greeting'] },
  { word: 'どういたしまして', reading: 'どういたしまして', meaning: 'you are welcome', level: 'N5', tags: ['greeting'] },
  { word: 'ただいま', reading: 'ただいま', meaning: 'I am home (said on returning)', level: 'N5', tags: ['greeting'] },
  { word: 'おかえりなさい', reading: 'おかえりなさい', meaning: 'welcome home', level: 'N5', tags: ['greeting'] },
  { word: 'いただきます', reading: 'いただきます', meaning: 'phrase said before eating', level: 'N5', tags: ['greeting'] },
  { word: 'ごちそうさまでした', reading: 'ごちそうさまでした', meaning: 'phrase said after a meal', level: 'N5', tags: ['greeting'] },
  { word: 'おやすみなさい', reading: 'おやすみなさい', meaning: 'good night', level: 'N5', tags: ['greeting'] },
  { word: 'はじめまして', reading: 'はじめまして', meaning: 'nice to meet you', level: 'N5', tags: ['greeting'], example: 'はじめまして、よろしくお願いします。' },

  // ------------------------------------------------------------------
  // People & family (N5)
  // ------------------------------------------------------------------
  { word: 'わたし', reading: 'わたし', meaning: 'I / me', level: 'N5', tags: ['people'] },
  { word: 'あなた', reading: 'あなた', meaning: 'you', level: 'N5', tags: ['people'] },
  { word: '彼', reading: 'かれ', meaning: 'he / boyfriend', level: 'N5', tags: ['people'] },
  { word: '彼女', reading: 'かのじょ', meaning: 'she / girlfriend', level: 'N5', tags: ['people'] },
  { word: 'みんな', reading: 'みんな', meaning: 'everyone', level: 'N5', tags: ['people'] },
  { word: '友達', reading: 'ともだち', meaning: 'friend', level: 'N5', tags: ['people', 'school'], example: '友達と映画を見ました。' },
  { word: '家族', reading: 'かぞく', meaning: 'family', level: 'N5', tags: ['family'], example: '家族と一緒に旅行に行きます。' },
  { word: '父', reading: 'ちち', meaning: 'my father', level: 'N5', tags: ['family'] },
  { word: '母', reading: 'はは', meaning: 'my mother', level: 'N5', tags: ['family'] },
  { word: 'お父さん', reading: 'おとうさん', meaning: 'father (polite)', level: 'N5', tags: ['family'] },
  { word: 'お母さん', reading: 'おかあさん', meaning: 'mother (polite)', level: 'N5', tags: ['family'] },
  { word: '兄', reading: 'あに', meaning: 'my older brother', level: 'N5', tags: ['family'] },
  { word: '姉', reading: 'あね', meaning: 'my older sister', level: 'N5', tags: ['family'] },
  { word: '弟', reading: 'おとうと', meaning: 'younger brother', level: 'N5', tags: ['family'] },
  { word: '妹', reading: 'いもうと', meaning: 'younger sister', level: 'N5', tags: ['family'] },
  { word: '祖父', reading: 'そふ', meaning: 'my grandfather', level: 'N5', tags: ['family'] },
  { word: '祖母', reading: 'そぼ', meaning: 'my grandmother', level: 'N5', tags: ['family'] },
  { word: '子供', reading: 'こども', meaning: 'child', level: 'N5', tags: ['family', 'people'] },
  { word: '名前', reading: 'なまえ', meaning: 'name', level: 'N5', tags: ['people'], example: 'お名前は何ですか。' },
  { word: '先生', reading: 'せんせい', meaning: 'teacher', level: 'N5', tags: ['school', 'people'] },
  { word: '学生', reading: 'がくせい', meaning: 'student', level: 'N5', tags: ['school', 'people'] },
  { word: '医者', reading: 'いしゃ', meaning: 'doctor', level: 'N5', tags: ['people', 'health'] },

  // ------------------------------------------------------------------
  // Numbers & counters (N5)
  // ------------------------------------------------------------------
  { word: '一', reading: 'いち', meaning: 'one', level: 'N5', tags: ['number'] },
  { word: '二', reading: 'に', meaning: 'two', level: 'N5', tags: ['number'] },
  { word: '三', reading: 'さん', meaning: 'three', level: 'N5', tags: ['number'] },
  { word: '四', reading: 'よん', meaning: 'four', level: 'N5', tags: ['number'] },
  { word: '五', reading: 'ご', meaning: 'five', level: 'N5', tags: ['number'] },
  { word: '六', reading: 'ろく', meaning: 'six', level: 'N5', tags: ['number'] },
  { word: '七', reading: 'なな', meaning: 'seven', level: 'N5', tags: ['number'] },
  { word: '八', reading: 'はち', meaning: 'eight', level: 'N5', tags: ['number'] },
  { word: '九', reading: 'きゅう', meaning: 'nine', level: 'N5', tags: ['number'] },
  { word: '十', reading: 'じゅう', meaning: 'ten', level: 'N5', tags: ['number'] },
  { word: '百', reading: 'ひゃく', meaning: 'one hundred', level: 'N5', tags: ['number'] },
  { word: '千', reading: 'せん', meaning: 'one thousand', level: 'N5', tags: ['number'] },
  { word: '万', reading: 'まん', meaning: 'ten thousand', level: 'N5', tags: ['number'] },
  { word: 'ゼロ', reading: 'ぜろ', meaning: 'zero', level: 'N5', tags: ['number'] },
  { word: '数字', reading: 'すうじ', meaning: 'digit / number', level: 'N5', tags: ['number'] },
  { word: '一つ', reading: 'ひとつ', meaning: 'one thing', level: 'N5', tags: ['number', 'counter'] },
  { word: '二つ', reading: 'ふたつ', meaning: 'two things', level: 'N5', tags: ['number', 'counter'] },
  { word: '三つ', reading: 'みっつ', meaning: 'three things', level: 'N5', tags: ['number', 'counter'] },
  { word: '四つ', reading: 'よっつ', meaning: 'four things', level: 'N5', tags: ['number', 'counter'] },
  { word: '一人', reading: 'ひとり', meaning: 'one person', level: 'N5', tags: ['number', 'counter'] },
  { word: '二人', reading: 'ふたり', meaning: 'two people', level: 'N5', tags: ['number', 'counter'] },
  { word: '一杯', reading: 'いっぱい', meaning: 'one cup / one glass (counter)', level: 'N5', tags: ['counter', 'quantity'] },
  { word: '一回', reading: 'いっかい', meaning: 'one time / once', level: 'N5', tags: ['counter', 'frequency'] },
  { word: '一歳', reading: 'いっさい', meaning: 'one year old', level: 'N5', tags: ['counter', 'number'] },
  { word: '半分', reading: 'はんぶん', meaning: 'half', level: 'N5', tags: ['quantity'] },
  { word: '全部', reading: 'ぜんぶ', meaning: 'all / everything', level: 'N5', tags: ['quantity'] },
  { word: 'たくさん', reading: 'たくさん', meaning: 'many / a lot', level: 'N5', tags: ['quantity', 'adverb'], example: 'たくさん本を読みました。' },

  // ------------------------------------------------------------------
  // Time, date, weekday, month & season (N5)
  // ------------------------------------------------------------------
  { word: '今日', reading: 'きょう', meaning: 'today', level: 'N5', tags: ['time', 'date'], example: '今日はいい天気です。' },
  { word: '明日', reading: 'あした', meaning: 'tomorrow', level: 'N5', tags: ['time', 'date'], example: '明日は休みです。' },
  { word: '昨日', reading: 'きのう', meaning: 'yesterday', level: 'N5', tags: ['time', 'date'] },
  { word: '今', reading: 'いま', meaning: 'now', level: 'N5', tags: ['time'] },
  { word: '時間', reading: 'じかん', meaning: 'time / hour', level: 'N5', tags: ['time'], example: '時間がありません。' },
  { word: '時', reading: 'とき', meaning: 'time / moment', level: 'N5', tags: ['time'] },
  { word: '分', reading: 'ふん', meaning: 'minute', level: 'N5', tags: ['time', 'counter'] },
  { word: '秒', reading: 'びょう', meaning: 'second', level: 'N5', tags: ['time', 'counter'] },
  { word: '午前', reading: 'ごぜん', meaning: 'morning / AM', level: 'N5', tags: ['time'] },
  { word: '午後', reading: 'ごご', meaning: 'afternoon / PM', level: 'N5', tags: ['time'] },
  { word: '朝', reading: 'あさ', meaning: 'morning', level: 'N5', tags: ['time'] },
  { word: '昼', reading: 'ひる', meaning: 'noon / daytime', level: 'N5', tags: ['time'] },
  { word: '夜', reading: 'よる', meaning: 'night', level: 'N5', tags: ['time'] },
  { word: '毎日', reading: 'まいにち', meaning: 'every day', level: 'N5', tags: ['frequency', 'time'], example: '毎日日本語を勉強します。' },
  { word: '毎朝', reading: 'まいあさ', meaning: 'every morning', level: 'N5', tags: ['frequency', 'time'] },
  { word: '毎晩', reading: 'まいばん', meaning: 'every evening', level: 'N5', tags: ['frequency', 'time'] },
  { word: '今週', reading: 'こんしゅう', meaning: 'this week', level: 'N5', tags: ['time', 'date'] },
  { word: '来週', reading: 'らいしゅう', meaning: 'next week', level: 'N5', tags: ['time', 'date'], example: '来週試験があります。' },
  { word: '先週', reading: 'せんしゅう', meaning: 'last week', level: 'N5', tags: ['time', 'date'] },
  { word: '月曜日', reading: 'げつようび', meaning: 'Monday', level: 'N5', tags: ['weekday'] },
  { word: '火曜日', reading: 'かようび', meaning: 'Tuesday', level: 'N5', tags: ['weekday'] },
  { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday', level: 'N5', tags: ['weekday'] },
  { word: '木曜日', reading: 'もくようび', meaning: 'Thursday', level: 'N5', tags: ['weekday'] },
  { word: '金曜日', reading: 'きんようび', meaning: 'Friday', level: 'N5', tags: ['weekday'] },
  { word: '土曜日', reading: 'どようび', meaning: 'Saturday', level: 'N5', tags: ['weekday'] },
  { word: '日曜日', reading: 'にちようび', meaning: 'Sunday', level: 'N5', tags: ['weekday'], example: '日曜日に買い物に行きます。' },
  { word: '一月', reading: 'いちがつ', meaning: 'January', level: 'N5', tags: ['month', 'date'] },
  { word: '二月', reading: 'にがつ', meaning: 'February', level: 'N5', tags: ['month', 'date'] },
  { word: '三月', reading: 'さんがつ', meaning: 'March', level: 'N5', tags: ['month', 'date'] },
  { word: '四月', reading: 'しがつ', meaning: 'April', level: 'N5', tags: ['month', 'date'] },
  { word: '五月', reading: 'ごがつ', meaning: 'May', level: 'N5', tags: ['month', 'date'] },
  { word: '六月', reading: 'ろくがつ', meaning: 'June', level: 'N5', tags: ['month', 'date'] },
  { word: '七月', reading: 'しちがつ', meaning: 'July', level: 'N5', tags: ['month', 'date'] },
  { word: '八月', reading: 'はちがつ', meaning: 'August', level: 'N5', tags: ['month', 'date'] },
  { word: '九月', reading: 'くがつ', meaning: 'September', level: 'N5', tags: ['month', 'date'] },
  { word: '十月', reading: 'じゅうがつ', meaning: 'October', level: 'N5', tags: ['month', 'date'] },
  { word: '十一月', reading: 'じゅういちがつ', meaning: 'November', level: 'N5', tags: ['month', 'date'] },
  { word: '十二月', reading: 'じゅうにがつ', meaning: 'December', level: 'N5', tags: ['month', 'date'] },
  { word: '春', reading: 'はる', meaning: 'spring', level: 'N5', tags: ['season', 'nature'], example: '春は花がきれいです。' },
  { word: '夏', reading: 'なつ', meaning: 'summer', level: 'N5', tags: ['season', 'nature'] },
  { word: '秋', reading: 'あき', meaning: 'autumn / fall', level: 'N5', tags: ['season', 'nature'] },
  { word: '冬', reading: 'ふゆ', meaning: 'winter', level: 'N5', tags: ['season', 'nature'] },
  { word: '誕生日', reading: 'たんじょうび', meaning: 'birthday', level: 'N5', tags: ['date', 'family'], example: '明日は妹の誕生日です。' },
  { word: '休み', reading: 'やすみ', meaning: 'holiday / break / rest', level: 'N5', tags: ['time', 'work'] },

  // ------------------------------------------------------------------
  // Basic food & drink (N5)
  // ------------------------------------------------------------------
  { word: 'ご飯', reading: 'ごはん', meaning: 'rice / meal', level: 'N5', tags: ['food'], example: '朝ご飯を食べました。' },
  { word: 'お茶', reading: 'おちゃ', meaning: 'tea', level: 'N5', tags: ['drink'] },
  { word: '水', reading: 'みず', meaning: 'water', level: 'N5', tags: ['drink'], example: '水を一杯飲みました。' },
  { word: '寿司', reading: 'すし', meaning: 'sushi', level: 'N5', tags: ['food'] },
  { word: '肉', reading: 'にく', meaning: 'meat', level: 'N5', tags: ['food'] },
  { word: '魚', reading: 'さかな', meaning: 'fish', level: 'N5', tags: ['food', 'animal'] },
  { word: '野菜', reading: 'やさい', meaning: 'vegetable', level: 'N5', tags: ['food'] },
  { word: '果物', reading: 'くだもの', meaning: 'fruit', level: 'N5', tags: ['food'] },
  { word: '卵', reading: 'たまご', meaning: 'egg', level: 'N5', tags: ['food'] },
  { word: '牛乳', reading: 'ぎゅうにゅう', meaning: 'milk', level: 'N5', tags: ['drink', 'food'] },
  { word: 'パン', reading: 'パン', meaning: 'bread', level: 'N5', tags: ['food'] },
  { word: '米', reading: 'こめ', meaning: 'uncooked rice', level: 'N5', tags: ['food'] },
  { word: '塩', reading: 'しお', meaning: 'salt', level: 'N5', tags: ['food', 'cooking'] },
  { word: '砂糖', reading: 'さとう', meaning: 'sugar', level: 'N5', tags: ['food', 'cooking'] },
  { word: '朝ご飯', reading: 'あさごはん', meaning: 'breakfast', level: 'N5', tags: ['food'] },
  { word: '昼ご飯', reading: 'ひるごはん', meaning: 'lunch', level: 'N5', tags: ['food'] },
  { word: '夜ご飯', reading: 'ばんごはん', meaning: 'dinner', level: 'N5', tags: ['food'] },
  { word: 'お菓子', reading: 'おかし', meaning: 'snack / sweets', level: 'N5', tags: ['food'] },
  { word: 'ラーメン', reading: 'らーめん', meaning: 'ramen', level: 'N5', tags: ['food'] },
  { word: 'コーヒー', reading: 'こーひー', meaning: 'coffee', level: 'N5', tags: ['drink'] },
  { word: 'ジュース', reading: 'じゅーす', meaning: 'juice', level: 'N5', tags: ['drink'] },
  { word: 'お酒', reading: 'おさけ', meaning: 'sake / alcohol', level: 'N5', tags: ['drink'] },

  // ------------------------------------------------------------------
  // N4 verbs (dictionary form) - daily actions
  // ------------------------------------------------------------------
  { word: '会う', reading: 'あう', meaning: 'to meet', level: 'N4', tags: ['verb', 'people'], example: '友達と駅で会います。' },
  { word: '決める', reading: 'きめる', meaning: 'to decide', level: 'N4', tags: ['verb', 'abstract'], example: '旅行の場所を決めました。' },
  { word: '選ぶ', reading: 'えらぶ', meaning: 'to choose', level: 'N4', tags: ['verb', 'shopping'], example: '好きな色を選んでください。' },
  { word: '貸す', reading: 'かす', meaning: 'to lend', level: 'N4', tags: ['verb', 'money'], example: '友達に本を貸しました。' },
  { word: '借りる', reading: 'かりる', meaning: 'to borrow', level: 'N4', tags: ['verb', 'school'], example: '図書館で本を借ります。' },
  { word: '返す', reading: 'かえす', meaning: 'to return a borrowed thing', level: 'N4', tags: ['verb'], example: '借りた本を返しました。' },
  { word: '始める', reading: 'はじめる', meaning: 'to begin / to start (transitive)', level: 'N4', tags: ['verb'], example: '新しい仕事を始めます。' },
  { word: '止める', reading: 'とめる', meaning: 'to stop (transitive)', level: 'N4', tags: ['verb', 'transport'], example: '車を止めてください。' },
  { word: '忘れる', reading: 'わすれる', meaning: 'to forget', level: 'N4', tags: ['verb', 'abstract'], example: '傘を忘れないでください。' },
  { word: '覚える', reading: 'おぼえる', meaning: 'to memorize / to remember', level: 'N4', tags: ['verb', 'school'], example: '漢字をたくさん覚えました。' },
  { word: '調べる', reading: 'しらべる', meaning: 'to check / to investigate', level: 'N4', tags: ['verb', 'school', 'tech'], example: '単語の意味を調べます。' },
  { word: '教える', reading: 'おしえる', meaning: 'to teach / to tell', level: 'N4', tags: ['verb', 'school'], example: '先生が文法を教えてくれました。' },
  { word: '働く', reading: 'はたらく', meaning: 'to work', level: 'N4', tags: ['verb', 'work'], example: '兄は銀行で働いています。' },
  { word: '休む', reading: 'やすむ', meaning: 'to rest / to take time off', level: 'N4', tags: ['verb', 'work', 'health'], example: '今日は風邪なので休みます。' },
  { word: '遅れる', reading: 'おくれる', meaning: 'to be late', level: 'N4', tags: ['verb', 'time'], example: '電車が遅れて、会社に遅れました。' },
  { word: '急ぐ', reading: 'いそぐ', meaning: 'to hurry', level: 'N4', tags: ['verb', 'manner'], example: '急いで駅に行きました。' },
  { word: '探す', reading: 'さがす', meaning: 'to look for / to search for', level: 'N4', tags: ['verb'], example: '鍵を探しています。' },
  { word: '直す', reading: 'なおす', meaning: 'to repair / to fix', level: 'N4', tags: ['verb'], example: '壊れた時計を直しました。' },
  { word: '作る', reading: 'つくる', meaning: 'to make / to prepare', level: 'N4', tags: ['verb', 'cooking'], example: '母が朝ご飯を作りました。' },
  { word: '焼く', reading: 'やく', meaning: 'to bake / to grill', level: 'N4', tags: ['verb', 'cooking'], example: '魚を焼いて食べます。' },
  { word: '切る', reading: 'きる', meaning: 'to cut', level: 'N4', tags: ['verb', 'cooking'], example: '野菜を細かく切ってください。' },
  { word: '入れる', reading: 'いれる', meaning: 'to put in / to include', level: 'N4', tags: ['verb'], example: 'お茶に砂糖を入れます。' },
  { word: '出す', reading: 'だす', meaning: 'to take out / to submit', level: 'N4', tags: ['verb', 'school'], example: '宿題を出しました。' },
  { word: '開ける', reading: 'あける', meaning: 'to open (transitive)', level: 'N4', tags: ['verb', 'house'], example: '窓を開けてください。' },
  { word: '閉める', reading: 'しめる', meaning: 'to close (transitive)', level: 'N4', tags: ['verb', 'house'], example: 'ドアを閉めました。' },
  { word: '乗る', reading: 'のる', meaning: 'to get on / to ride', level: 'N4', tags: ['verb', 'transport'], example: '電車に乗って学校へ行きます。' },
  { word: '降りる', reading: 'おりる', meaning: 'to get off', level: 'N4', tags: ['verb', 'transport'], example: '次の駅で降りてください。' },
  { word: '歩く', reading: 'あるく', meaning: 'to walk', level: 'N4', tags: ['verb', 'direction'], example: '毎朝公園を歩きます。' },
  { word: '座る', reading: 'すわる', meaning: 'to sit', level: 'N4', tags: ['verb', 'manner'], example: 'ここに座ってもいいですか。' },
  { word: '着る', reading: 'きる', meaning: 'to wear (clothes)', level: 'N4', tags: ['verb', 'clothes'], example: '寒いのでコートを着ます。' },
  { word: '持つ', reading: 'もつ', meaning: 'to hold / to have', level: 'N4', tags: ['verb'], example: '重い荷物を持っています。' },
  { word: 'もらう', reading: 'もらう', meaning: 'to receive', level: 'N4', tags: ['verb', 'people'], example: '友達からプレゼントをもらいました。' },
  { word: '約束する', reading: 'やくそくする', meaning: 'to promise', level: 'N4', tags: ['verb', 'suru-verb', 'abstract'], example: '明日また会うと約束しました。' },
  { word: '信じる', reading: 'しんじる', meaning: 'to believe', level: 'N4', tags: ['verb', 'emotion'], example: '彼の話を信じています。' },
  { word: '笑う', reading: 'わらう', meaning: 'to laugh / to smile', level: 'N4', tags: ['verb', 'emotion'], example: '冗談を聞いて笑いました。' },
  { word: '怒る', reading: 'おこる', meaning: 'to get angry', level: 'N4', tags: ['verb', 'emotion'], example: '遅刻して先生に怒られました。' },
  { word: '驚く', reading: 'おどろく', meaning: 'to be surprised', level: 'N4', tags: ['verb', 'emotion'], example: 'ニュースを聞いて驚きました。' },
  { word: '頑張る', reading: 'がんばる', meaning: 'to do ones best / to persevere', level: 'N4', tags: ['verb', 'emotion'], example: '試験まで頑張ります。' },
  { word: '我慢する', reading: 'がまんする', meaning: 'to be patient / to endure', level: 'N4', tags: ['verb', 'suru-verb', 'emotion'], example: '痛みに我慢しました。' },
  { word: '失敗する', reading: 'しっぱいする', meaning: 'to fail / to make a mistake', level: 'N4', tags: ['verb', 'suru-verb', 'abstract'], example: '失敗しても、またやってみます。' },
  { word: '撮る', reading: 'とる', meaning: 'to take (a photograph)', level: 'N4', tags: ['verb', 'media'], example: '友達と写真を撮りました。' },
  { word: '売る', reading: 'うる', meaning: 'to sell', level: 'N4', tags: ['verb', 'shopping', 'money'], example: '古い本を売りました。' },
  { word: '買う', reading: 'かう', meaning: 'to buy', level: 'N4', tags: ['verb', 'shopping', 'money'], example: '新しい靴を買いました。' },
  { word: '払う', reading: 'はらう', meaning: 'to pay', level: 'N4', tags: ['verb', 'money', 'shopping'], example: 'レストランでお金を払いました。' },
  { word: '答える', reading: 'こたえる', meaning: 'to answer', level: 'N4', tags: ['verb', 'school'], example: '質問に答えてください。' },

  // ------------------------------------------------------------------
  // N4 adjectives (い / な)
  // ------------------------------------------------------------------
  { word: '忙しい', reading: 'いそがしい', meaning: 'busy', level: 'N4', tags: ['adjective', 'work', 'emotion'], example: '今週はとても忙しいです。' },
  { word: '楽しい', reading: 'たのしい', meaning: 'enjoyable / fun', level: 'N4', tags: ['adjective', 'emotion'], example: '旅行は楽しかったです。' },
  { word: '嬉しい', reading: 'うれしい', meaning: 'happy / glad', level: 'N4', tags: ['adjective', 'emotion'], example: '合格して嬉しいです。' },
  { word: '悲しい', reading: 'かなしい', meaning: 'sad', level: 'N4', tags: ['adjective', 'emotion'], example: '映画を見て悲しくなりました。' },
  { word: '面白い', reading: 'おもしろい', meaning: 'interesting / funny', level: 'N4', tags: ['adjective', 'emotion'], example: 'この小説は面白いです。' },
  { word: 'つまらない', reading: 'つまらない', meaning: 'boring', level: 'N4', tags: ['adjective', 'emotion'], example: 'その番組はつまらなかった。' },
  { word: '難しい', reading: 'むずかしい', meaning: 'difficult', level: 'N4', tags: ['adjective', 'school'], example: '日本語の漢字は難しいです。' },
  { word: '優しい', reading: 'やさしい', meaning: 'kind / gentle', level: 'N4', tags: ['adjective', 'people', 'emotion'], example: '祖母はとても優しい人です。' },
  { word: 'かわいい', reading: 'かわいい', meaning: 'cute', level: 'N4', tags: ['adjective', 'emotion'], example: '子猫がかわいいです。' },
  { word: '新しい', reading: 'あたらしい', meaning: 'new', level: 'N4', tags: ['adjective'], example: '新しいパソコンを買いました。' },
  { word: '痛い', reading: 'いたい', meaning: 'painful / hurt', level: 'N4', tags: ['adjective', 'health', 'body'], example: '歯が痛いです。' },
  { word: 'おいしい', reading: 'おいしい', meaning: 'delicious', level: 'N4', tags: ['adjective', 'food'], example: 'このケーキはおいしいです。' },
  { word: '元気', reading: 'げんき', meaning: 'lively / healthy (な-adjective)', level: 'N4', tags: ['adjective', 'health', 'emotion'], example: '祖母はいつも元気です。' },
  { word: '綺麗', reading: 'きれい', meaning: 'beautiful / clean (な-adjective)', level: 'N4', tags: ['adjective', 'emotion'], example: '部屋を綺麗に掃除しました。' },
  { word: '静か', reading: 'しずか', meaning: 'quiet (な-adjective)', level: 'N4', tags: ['adjective', 'manner'], example: '図書館は静かです。' },
  { word: 'にぎやか', reading: 'にぎやか', meaning: 'lively / bustling (な-adjective)', level: 'N4', tags: ['adjective', 'place'], example: '駅の前はにぎやかです。' },
  { word: '有名', reading: 'ゆうめい', meaning: 'famous (な-adjective)', level: 'N4', tags: ['adjective', 'place'], example: 'この寺は有名です。' },
  { word: '便利', reading: 'べんり', meaning: 'convenient (な-adjective)', level: 'N4', tags: ['adjective', 'tech'], example: 'このアプリは便利です。' },
  { word: '親切', reading: 'しんせつ', meaning: 'kind / considerate (な-adjective)', level: 'N4', tags: ['adjective', 'people'], example: '店員が親切に案内してくれました。' },
  { word: '真面目', reading: 'まじめ', meaning: 'serious / diligent (な-adjective)', level: 'N4', tags: ['adjective', 'work', 'school'], example: '彼は勉強に真面目です。' },
  { word: '安全', reading: 'あんぜん', meaning: 'safe (な-adjective)', level: 'N4', tags: ['adjective', 'abstract'], example: 'ここは子供にも安全です。' },
  { word: '丁寧', reading: 'ていねい', meaning: 'polite / careful (な-adjective)', level: 'N4', tags: ['adjective', 'manner', 'greeting'], example: '丁寧な言葉で話してください。' },

  // ------------------------------------------------------------------
  // N4 adverbs & frequency
  // ------------------------------------------------------------------
  { word: 'ゆっくり', reading: 'ゆっくり', meaning: 'slowly / leisurely', level: 'N4', tags: ['adverb', 'manner'], example: 'ゆっくり歩いてください。' },
  { word: 'すぐに', reading: 'すぐに', meaning: 'immediately / right away', level: 'N4', tags: ['adverb', 'time'], example: '用事があるので、すぐに帰ります。' },
  { word: 'よく', reading: 'よく', meaning: 'often / well', level: 'N4', tags: ['adverb', 'frequency'], example: '私はよく図書館に行きます。' },
  { word: 'たぶん', reading: 'たぶん', meaning: 'probably', level: 'N4', tags: ['adverb', 'abstract'], example: 'たぶん明日は晴れでしょう。' },
  { word: 'たまに', reading: 'たまに', meaning: 'occasionally', level: 'N4', tags: ['adverb', 'frequency'], example: 'たまに映画を見に行きます。' },
  { word: '時々', reading: 'ときどき', meaning: 'sometimes', level: 'N4', tags: ['adverb', 'frequency'], example: '時々日本語で話します。' },
  { word: 'いつも', reading: 'いつも', meaning: 'always', level: 'N4', tags: ['adverb', 'frequency'], example: '彼はいつも早く来ます。' },
  { word: '最近', reading: 'さいきん', meaning: 'recently', level: 'N4', tags: ['adverb', 'time'], example: '最近、仕事が忙しいです。' },
  { word: 'まだ', reading: 'まだ', meaning: 'still / not yet', level: 'N4', tags: ['adverb', 'time'], example: 'まだ昼ご飯を食べていません。' },
  { word: 'やっと', reading: 'やっと', meaning: 'finally', level: 'N4', tags: ['adverb', 'manner'], example: '二時間待って、やっと電車が来ました。' },
  { word: 'ちょっと', reading: 'ちょっと', meaning: 'a little / slightly', level: 'N4', tags: ['adverb', 'quantity', 'manner'], example: 'ちょっと待ってください。' },
  { word: 'もっと', reading: 'もっと', meaning: 'more', level: 'N4', tags: ['adverb', 'quantity'], example: 'もっと大きい声で話してください。' },

  // ------------------------------------------------------------------
  // N4 conjunctions & particles
  // ------------------------------------------------------------------
  { word: 'そして', reading: 'そして', meaning: 'and / then', level: 'N4', tags: ['conjunction'], example: '起きて、そして朝ご飯を食べました。' },
  { word: 'それで', reading: 'それで', meaning: 'so / therefore', level: 'N4', tags: ['conjunction'], example: '雨が降りました。それで、行きませんでした。' },
  { word: 'だから', reading: 'だから', meaning: 'so / that is why', level: 'N4', tags: ['conjunction'], example: '忙しいです。だから、行けません。' },
  { word: 'でも', reading: 'でも', meaning: 'but / however', level: 'N4', tags: ['conjunction'], example: '難しいです。でも、面白いです。' },
  { word: 'しかし', reading: 'しかし', meaning: 'however', level: 'N4', tags: ['conjunction'], example: 'この店は近い。しかし、高い。' },
  { word: '例えば', reading: 'たとえば', meaning: 'for example', level: 'N4', tags: ['conjunction', 'adverb'], example: '例えば、月曜日に試験があります。' },
  { word: 'は', reading: 'は', meaning: 'topic marker particle', level: 'N4', tags: ['particle'], example: '私は学生です。' },
  { word: 'が', reading: 'が', meaning: 'subject marker particle', level: 'N4', tags: ['particle'], example: '猫がいます。' },
  { word: 'を', reading: 'を', meaning: 'direct object marker particle', level: 'N4', tags: ['particle'], example: '水を飲みます。' },
  { word: 'に', reading: 'に', meaning: 'to / at / for particle', level: 'N4', tags: ['particle'], example: '学校に行きます。' },
  { word: 'で', reading: 'で', meaning: 'at / by means of particle', level: 'N4', tags: ['particle'], example: '電車で行きます。' },

  // ------------------------------------------------------------------
  // N4 abstract nouns & suru-verbs
  // ------------------------------------------------------------------
  { word: '理由', reading: 'りゆう', meaning: 'reason', level: 'N4', tags: ['abstract'], example: '遅れた理由を説明しました。' },
  { word: '目的', reading: 'もくてき', meaning: 'purpose', level: 'N4', tags: ['abstract'], example: '日本へ行く目的は勉強です。' },
  { word: '方法', reading: 'ほうほう', meaning: 'method / way', level: 'N4', tags: ['abstract'], example: 'いい勉強の方法を教えてください。' },
  { word: '予定', reading: 'よてい', meaning: 'plan / schedule', level: 'N4', tags: ['abstract', 'time'], example: '今日の予定を教えてください。' },
  { word: '意味', reading: 'いみ', meaning: 'meaning', level: 'N4', tags: ['abstract', 'school'], example: 'この言葉の意味を知っていますか。' },
  { word: '言葉', reading: 'ことば', meaning: 'word / language', level: 'N4', tags: ['abstract', 'school'], example: '難しい言葉を使わないでください。' },
  { word: '答え', reading: 'こたえ', meaning: 'answer', level: 'N4', tags: ['abstract', 'school'], example: '答えが分かりません。' },
  { word: '質問', reading: 'しつもん', meaning: 'question', level: 'N4', tags: ['abstract', 'school'], example: '質問があります。' },
  { word: '問題', reading: 'もんだい', meaning: 'problem / question', level: 'N4', tags: ['abstract', 'school'], example: 'この問題は難しいです。' },
  { word: '経験', reading: 'けいけん', meaning: 'experience', level: 'N4', tags: ['abstract', 'work'], example: '海外で働いた経験があります。' },
  { word: '努力', reading: 'どりょく', meaning: 'effort', level: 'N4', tags: ['abstract', 'emotion'], example: '毎日努力しています。' },
  { word: '心配', reading: 'しんぱい', meaning: 'worry / concern', level: 'N4', tags: ['abstract', 'emotion', 'suru-verb'], example: '試験が心配です。' },
  { word: '準備', reading: 'じゅんび', meaning: 'preparation', level: 'N4', tags: ['abstract', 'suru-verb'], example: '旅行の準備をしています。' },
  { word: '練習', reading: 'れんしゅう', meaning: 'practice', level: 'N4', tags: ['abstract', 'school', 'suru-verb'], example: '日本語の会話を練習します。' },
  { word: '説明', reading: 'せつめい', meaning: 'explanation', level: 'N4', tags: ['abstract', 'school', 'suru-verb'], example: 'もう一度説明してください。' },
  { word: '相談', reading: 'そうだん', meaning: 'consultation / discussion', level: 'N4', tags: ['abstract', 'work', 'suru-verb'], example: '先生に相談したいです。' },
  { word: '連絡', reading: 'れんらく', meaning: 'contact / communication', level: 'N4', tags: ['abstract', 'work', 'suru-verb'], example: '着いたら連絡してください。' },
  { word: '予約', reading: 'よやく', meaning: 'reservation', level: 'N4', tags: ['abstract', 'travel', 'suru-verb'], example: 'ホテルを予約しました。' },

  // ------------------------------------------------------------------
  // N4 nature & weather
  // ------------------------------------------------------------------
  { word: '空', reading: 'そら', meaning: 'sky', level: 'N4', tags: ['nature', 'weather'], example: '空が青いです。' },
  { word: '太陽', reading: 'たいよう', meaning: 'sun', level: 'N4', tags: ['nature', 'weather'], example: '太陽が出ています。' },
  { word: '月', reading: 'つき', meaning: 'moon', level: 'N4', tags: ['nature', 'date'] },
  { word: '雲', reading: 'くも', meaning: 'cloud', level: 'N4', tags: ['nature', 'weather'], example: '空に雲があります。' },
  { word: '風', reading: 'かぜ', meaning: 'wind', level: 'N4', tags: ['nature', 'weather'], example: '風が強いです。' },
  { word: '雪', reading: 'ゆき', meaning: 'snow', level: 'N4', tags: ['nature', 'weather', 'season'], example: '冬は雪が降ります。' },
  { word: '晴れ', reading: 'はれ', meaning: 'fine weather', level: 'N4', tags: ['weather'], example: '明日は晴れでしょう。' },
  { word: '台風', reading: 'たいふう', meaning: 'typhoon', level: 'N4', tags: ['weather', 'nature'], example: '台風が来ています。' },
  { word: '自然', reading: 'しぜん', meaning: 'nature', level: 'N4', tags: ['nature', 'abstract'], example: '自然の中で過ごしたいです。' },
  { word: '森', reading: 'もり', meaning: 'forest', level: 'N4', tags: ['nature', 'place'], example: '森の中を歩きました。' },
  { word: '川', reading: 'かわ', meaning: 'river', level: 'N4', tags: ['nature', 'place'], example: '川の水はきれいです。' },
  { word: '海', reading: 'うみ', meaning: 'sea / ocean', level: 'N4', tags: ['nature', 'place', 'travel'], example: '夏に海へ行きました。' },

  // ------------------------------------------------------------------
  // N4 animals
  // ------------------------------------------------------------------
  { word: '犬', reading: 'いぬ', meaning: 'dog', level: 'N4', tags: ['animal'], example: '犬と公園を歩きます。' },
  { word: '猫', reading: 'ねこ', meaning: 'cat', level: 'N4', tags: ['animal'], example: '猫がソファで寝ています。' },
  { word: '鳥', reading: 'とり', meaning: 'bird', level: 'N4', tags: ['animal'], example: '鳥が空を飛んでいます。' },
  { word: '動物', reading: 'どうぶつ', meaning: 'animal', level: 'N4', tags: ['animal', 'nature'], example: '動物が好きです。' },

  // ------------------------------------------------------------------
  // N4 body & health
  // ------------------------------------------------------------------
  { word: '体', reading: 'からだ', meaning: 'body', level: 'N4', tags: ['body', 'health'], example: '毎日体を動かします。' },
  { word: '頭', reading: 'あたま', meaning: 'head', level: 'N4', tags: ['body'], example: '頭が痛いです。' },
  { word: '顔', reading: 'かお', meaning: 'face', level: 'N4', tags: ['body'], example: '顔を洗いました。' },
  { word: '目', reading: 'め', meaning: 'eye', level: 'N4', tags: ['body'], example: '目が疲れました。' },
  { word: '手', reading: 'て', meaning: 'hand', level: 'N4', tags: ['body'], example: '手を洗ってください。' },
  { word: '心', reading: 'こころ', meaning: 'heart / mind', level: 'N4', tags: ['body', 'emotion', 'abstract'], example: '彼の言葉は心に残りました。' },
  { word: '風邪', reading: 'かぜ', meaning: 'cold (illness)', level: 'N4', tags: ['health'], example: '風邪をひきました。' },
  { word: '薬', reading: 'くすり', meaning: 'medicine', level: 'N4', tags: ['health'], example: '薬を飲んでください。' },
  { word: '病気', reading: 'びょうき', meaning: 'illness / sickness', level: 'N4', tags: ['health'], example: '病気になって、学校を休みました。' },

  // ------------------------------------------------------------------
  // N4 clothes
  // ------------------------------------------------------------------
  { word: '服', reading: 'ふく', meaning: 'clothes', level: 'N4', tags: ['clothes'], example: '新しい服を買いました。' },
  { word: '着物', reading: 'きもの', meaning: 'kimono', level: 'N4', tags: ['clothes'], example: '結婚式に着物を着ました。' },
  { word: 'シャツ', reading: 'しゃつ', meaning: 'shirt', level: 'N4', tags: ['clothes'], example: '白いシャツを着ています。' },
  { word: 'ズボン', reading: 'ずぼん', meaning: 'trousers / pants', level: 'N4', tags: ['clothes'], example: 'ズボンが少し長いです。' },
  { word: '靴', reading: 'くつ', meaning: 'shoes', level: 'N4', tags: ['clothes'], example: '靴を脱いでから、部屋に入ります。' },
  { word: '帽子', reading: 'ぼうし', meaning: 'hat', level: 'N4', tags: ['clothes'], example: '帽子をかぶって出かけます。' },

  // ------------------------------------------------------------------
  // N4 house & furniture
  // ------------------------------------------------------------------
  { word: '部屋', reading: 'へや', meaning: 'room', level: 'N4', tags: ['house', 'place'], example: 'この部屋は明るいです。' },
  { word: '台所', reading: 'だいどころ', meaning: 'kitchen', level: 'N4', tags: ['house', 'cooking'], example: '母は台所で料理をしています。' },
  { word: 'お風呂', reading: 'おふろ', meaning: 'bath / bathtub', level: 'N4', tags: ['house', 'health'], example: '毎晩お風呂に入ります。' },
  { word: '窓', reading: 'まど', meaning: 'window', level: 'N4', tags: ['house'], example: '窓を開けて、空気を入れます。' },
  { word: '床', reading: 'ゆか', meaning: 'floor', level: 'N4', tags: ['house'], example: '床に本が置いてあります。' },
  { word: '壁', reading: 'かべ', meaning: 'wall', level: 'N4', tags: ['house'], example: '壁に写真をかけました。' },
  { word: 'ベッド', reading: 'べっど', meaning: 'bed', level: 'N4', tags: ['house', 'furniture'], example: 'ベッドで本を読んでいます。' },
  { word: '机', reading: 'つくえ', meaning: 'desk', level: 'N4', tags: ['house', 'furniture', 'school'], example: '机の上にノートがあります。' },
  { word: '冷蔵庫', reading: 'れいぞうこ', meaning: 'refrigerator', level: 'N4', tags: ['house', 'furniture', 'food'], example: '牛乳は冷蔵庫に入れてください。' },
  { word: '鍵', reading: 'かぎ', meaning: 'key', level: 'N4', tags: ['house', 'travel'], example: '鍵をなくしました。' },

  // ------------------------------------------------------------------
  // N4 money & shopping
  // ------------------------------------------------------------------
  { word: 'お金', reading: 'おかね', meaning: 'money', level: 'N4', tags: ['money', 'shopping'], example: 'お金が足りません。' },
  { word: '円', reading: 'えん', meaning: 'yen', level: 'N4', tags: ['money', 'counter'], example: 'この本は千円です。' },
  { word: '財布', reading: 'さいふ', meaning: 'wallet', level: 'N4', tags: ['money', 'shopping'], example: '財布をお店に忘れました。' },
  { word: '値段', reading: 'ねだん', meaning: 'price', level: 'N4', tags: ['money', 'shopping'], example: '値段が少し高いです。' },
  { word: 'レシート', reading: 'れしーと', meaning: 'receipt', level: 'N4', tags: ['money', 'shopping'], example: 'レシートをもらいました。' },
  { word: '買い物', reading: 'かいもの', meaning: 'shopping', level: 'N4', tags: ['shopping', 'money', 'suru-verb'], example: '週末に買い物に行きます。' },

  // ------------------------------------------------------------------
  // N4 media, technology & communication
  // ------------------------------------------------------------------
  { word: '新聞', reading: 'しんぶん', meaning: 'newspaper', level: 'N4', tags: ['media'], example: '毎朝新聞を読みます。' },
  { word: '雑誌', reading: 'ざっし', meaning: 'magazine', level: 'N4', tags: ['media'], example: 'この雑誌は面白いです。' },
  { word: '漫画', reading: 'まんが', meaning: 'manga / comic', level: 'N4', tags: ['media'], example: '漫画を読むのが好きです。' },
  { word: 'ニュース', reading: 'にゅーす', meaning: 'news', level: 'N4', tags: ['media'], example: 'テレビでニュースを見ます。' },
  { word: '映画', reading: 'えいが', meaning: 'movie / film', level: 'N4', tags: ['media'], example: '週末に映画を見に行きます。' },
  { word: '音楽', reading: 'おんがく', meaning: 'music', level: 'N4', tags: ['media'], example: '音楽を聞きながら勉強します。' },
  { word: '写真', reading: 'しゃしん', meaning: 'photograph', level: 'N4', tags: ['media'], example: '写真を撮ってください。' },
  { word: 'パソコン', reading: 'ぱそこん', meaning: 'personal computer', level: 'N4', tags: ['tech'], example: 'パソコンでメールを書きます。' },
  { word: 'メール', reading: 'めーる', meaning: 'email', level: 'N4', tags: ['tech', 'media'], example: '友達にメールを送りました。' },

  // ------------------------------------------------------------------
  // N4 direction, place & transport
  // ------------------------------------------------------------------
  { word: '場所', reading: 'ばしょ', meaning: 'place / location', level: 'N4', tags: ['place', 'direction'], example: '待ち合わせの場所を決めました。' },
  { word: '東', reading: 'ひがし', meaning: 'east', level: 'N4', tags: ['direction'], example: '太陽は東から昇ります。' },
  { word: '西', reading: 'にし', meaning: 'west', level: 'N4', tags: ['direction'], example: '西へ向かって歩きます。' },
  { word: '北', reading: 'きた', meaning: 'north', level: 'N4', tags: ['direction'], example: '北のほうは寒いです。' },
  { word: '右', reading: 'みぎ', meaning: 'right', level: 'N4', tags: ['direction'], example: '右に曲がってください。' },
  { word: '左', reading: 'ひだり', meaning: 'left', level: 'N4', tags: ['direction'], example: '左側にあります。' },
  { word: '前', reading: 'まえ', meaning: 'front / before', level: 'N4', tags: ['direction', 'time'], example: '車の前を歩かないでください。' },
  { word: '後ろ', reading: 'うしろ', meaning: 'back / behind', level: 'N4', tags: ['direction'], example: '家の後ろに庭があります。' },
  { word: '外', reading: 'そと', meaning: 'outside', level: 'N4', tags: ['direction', 'place'], example: '外は寒いです。' },
  { word: '地図', reading: 'ちず', meaning: 'map', level: 'N4', tags: ['direction', 'travel'], example: '地図を見て場所を調べます。' },
  { word: '地下鉄', reading: 'ちかてつ', meaning: 'subway / underground train', level: 'N4', tags: ['transport'], example: '地下鉄で会社へ行きます。' },
  { word: '飛行機', reading: 'ひこうき', meaning: 'airplane', level: 'N4', tags: ['transport', 'travel'], example: '飛行機で日本へ行きます。' },
  { word: '自転車', reading: 'じてんしゃ', meaning: 'bicycle', level: 'N4', tags: ['transport'], example: '自転車に乗って買い物に行きます。' },
  { word: '切符', reading: 'きっぷ', meaning: 'ticket', level: 'N4', tags: ['transport', 'travel'], example: '駅で切符を買いました。' },

  // ------------------------------------------------------------------
  // N4 travel, places, school & work
  // ------------------------------------------------------------------
  { word: '旅行', reading: 'りょこう', meaning: 'travel / trip', level: 'N4', tags: ['travel', 'suru-verb'], example: '来週、旅行に行きます。' },
  { word: '荷物', reading: 'にもつ', meaning: 'luggage / baggage', level: 'N4', tags: ['travel'], example: '荷物が重いです。' },
  { word: '出発', reading: 'しゅっぱつ', meaning: 'departure', level: 'N4', tags: ['travel', 'transport', 'suru-verb'], example: '出発の時間は何時ですか。' },
  { word: '到着', reading: 'とうちゃく', meaning: 'arrival', level: 'N4', tags: ['travel', 'transport', 'suru-verb'], example: '到着したら電話してください。' },
  { word: '空港', reading: 'くうこう', meaning: 'airport', level: 'N4', tags: ['travel', 'place', 'transport'], example: '空港までタクシーで行きました。' },
  { word: 'ホテル', reading: 'ほてる', meaning: 'hotel', level: 'N4', tags: ['travel', 'place'], example: 'ホテルに泊まりました。' },
  { word: 'お土産', reading: 'おみやげ', meaning: 'souvenir', level: 'N4', tags: ['travel', 'shopping'], example: '家族にお土産を買いました。' },
  { word: '病院', reading: 'びょういん', meaning: 'hospital', level: 'N4', tags: ['health', 'place'], example: '病院に行かなければなりません。' },
  { word: '図書館', reading: 'としょかん', meaning: 'library', level: 'N4', tags: ['school', 'place', 'media'], example: '図書館で本を借りました。' },
  { word: '会社', reading: 'かいしゃ', meaning: 'company', level: 'N4', tags: ['work', 'place'], example: '父は会社で働いています。' },
  { word: '大学', reading: 'だいがく', meaning: 'university', level: 'N4', tags: ['school', 'place'], example: '兄は大学で勉強しています。' },
  { word: '授業', reading: 'じゅぎょう', meaning: 'class / lesson', level: 'N4', tags: ['school'], example: '授業が終わってから、図書館へ行きます。' },
  { word: '宿題', reading: 'しゅくだい', meaning: 'homework', level: 'N4', tags: ['school'], example: '毎晩宿題をします。' },
  { word: '勉強', reading: 'べんきょう', meaning: 'study', level: 'N4', tags: ['school', 'suru-verb'], example: '日本語の勉強が好きです。' },
  { word: '仕事', reading: 'しごと', meaning: 'job / work', level: 'N4', tags: ['work'], example: '仕事が終わってから、飲みに行きます。' },
  { word: '会議', reading: 'かいぎ', meaning: 'meeting', level: 'N4', tags: ['work', 'suru-verb'], example: '午後、会議があります。' },

  // ------------------------------------------------------------------
  // N4 cooking, food & drink
  // ------------------------------------------------------------------
  { word: '料理', reading: 'りょうり', meaning: 'cooking / dish', level: 'N4', tags: ['cooking', 'food', 'suru-verb'], example: '母が料理を作りました。' },
  { word: '味', reading: 'あじ', meaning: 'taste / flavor', level: 'N4', tags: ['food', 'cooking'], example: 'このスープは味が薄いです。' },
  { word: '皿', reading: 'さら', meaning: 'plate', level: 'N4', tags: ['cooking', 'house'], example: '皿を洗ってください。' },
  { word: '箸', reading: 'はし', meaning: 'chopsticks', level: 'N4', tags: ['cooking', 'food'], example: '箸でご飯を食べます。' },
  { word: '鍋', reading: 'なべ', meaning: 'pot', level: 'N4', tags: ['cooking'], example: '鍋でスープを作ります。' },
  { word: 'バター', reading: 'ばたー', meaning: 'butter', level: 'N4', tags: ['food', 'cooking'], example: 'パンにバターを乗せました。' },
  { word: 'りんご', reading: 'りんご', meaning: 'apple', level: 'N4', tags: ['food', 'drink'], example: 'りんごを一つ食べました。' },

  // ------------------------------------------------------------------
  // N4 emotion, expression & manner
  // ------------------------------------------------------------------
  { word: '気持ち', reading: 'きもち', meaning: 'feeling / mood', level: 'N4', tags: ['emotion', 'abstract'], example: '嬉しい気持ちです。' },
  { word: '表情', reading: 'ひょうじょう', meaning: 'facial expression', level: 'N4', tags: ['emotion', 'body'], example: '彼の表情から本当の気持ちが分かりました。' },
  { word: '穏やか', reading: 'おだやか', meaning: 'calm / gentle (な-adjective)', level: 'N4', tags: ['adjective', 'emotion', 'manner'], example: '海は穏やかです。' },
];
