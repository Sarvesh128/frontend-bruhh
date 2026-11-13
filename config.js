/**
 * ===================================================================
 *  ROMANTIC BIRTHDAY WEBSITE - CONFIGURATION FILE
 * ===================================================================
 *  For: Anwuu Babyy
 *  Date: 13 November 2026
 *  
 *  Edit any text, dates, questions, or images below.
 *  No coding knowledge needed!
 * ===================================================================
 */

const CONFIG = {
  // --- Personal Details ---
  herName: "Anwuu Babyy",               // Her name
  name: "Anwuu Babyy",                  // Alias
  yourName: "Sarvesh",                  // Your name (edit if you have a special nickname)
  birthdayDate: "13 November 2026",     // Birthday date
  
  // Relationship start date (Format: "YYYY-MM-DD")
  // Used by the live "Together for..." counter in the finale
  startDate: "2022-04-18",
  START_DATE: "2022-04-18",

  // --- Background Music ---
  // Placeholder in assets/song.mp3 (plays via tap)
  music: {
    title: "Our Favorite Melody",
    artist: "For Anwuu Babyy",
    src: "assets/song.mp3"
  },

  // --- Scene 1: Balloon Pop Messages (MESSAGES) ---
  // Pops instantly on single tap with confetti and sound; stays 2.5s
  MESSAGES: [
    "Caught you smiling! ✨",
    "Warning: extremely cute overload ahead 🥰",
    "You are my favorite notification in the entire world 💌",
    "Every day with you feels like warm sunshine ☀️",
    "Still can't believe how lucky I am to have you, Anwuu Babyy 💕",
    "My heart does a little dance every time you call 💃",
    "You have the most infectious, adorable laugh ever 🌸",
    "10/10 would choose you again in every universe 🌌",
    "You make even simple grocery runs feel like adventures 🛒✨",
    "Sending you 1,000 warm forehead kisses right now 💋",
    "You look breathtaking today (yes, right this second) 🌹",
    "You're the sweetest part of my day, every day 🍯",
    "My favorite place in the whole world is right next to you 🤍",
    "Certified prettiest birthday girl on Earth 👑",
    "I love you more than words could ever fit on this screen 💖"
  ],

  // --- Scene 2 & 3: Birthday Cake Secret Message ---
  // Revealed when the golden knife cuts the cake
  CAKE_MESSAGE: "You make every single day sweeter and more magical. May all your heartfelt wishes come true today and always, Anwuu Babyy.",
  cakeMessage: "You make every single day sweeter and more magical. May all your heartfelt wishes come true today and always, Anwuu Babyy.",

  // --- Scene 5: Our Story (Exactly 7 Chapters in this exact order) ---
  // On mobile: one chapter at a time in lace oval frame.
  // On desktop: alternating photo-left and photo-right, starting with photo1 on left.
  STORY: [
    {
      image: "assets/photos/photo1.jpg",
      title: "Festive Smiles & Warm Hearts",
      caption: "Dressed up in our vibrant colors, celebrating together under the evening sky. My favorite part of any festival or gathering will always be having you right beside me."
    },
    {
      image: "assets/photos/photo2.jpg",
      title: "Lost in the Music",
      caption: "Surrounded by music and lights, but the whole crowd faded away. In your arms, even the most chaotic room feels like the safest, sweetest sanctuary."
    },
    {
      image: "assets/photos/photo3.jpg",
      title: "By The Serene Waters",
      caption: "Matching in pastel pink against the rolling hills and quiet lake. That gentle glance we shared said more than a thousand spoken words ever could."
    },
    {
      image: "assets/photos/photo4.jpg",
      title: "Our Sparkly Mirror Moments",
      caption: "Face gems, goofy grins, and our endless inside jokes. Loving you is effortless because we can always be our purest, happiest, and silliest selves together."
    },
    {
      image: "assets/photos/photo5.jpg",
      title: "Under The Midnight Palms",
      caption: "The way you look up at me under the golden streetlights makes my heart skip every single time. A memory I replay whenever I miss you."
    },
    {
      image: "assets/photos/photo6.jpg",
      title: "Shy Giggles & Hidden Smiles",
      caption: "Laughing so hard we couldn't even keep our hands off our faces! Life with you is filled with genuine, uncontainable joy and happiness that never fades."
    },
    {
      image: "assets/photos/photo7.jpg",
      title: "A Toast to the Prettiest Girl",
      caption: "Candlelight, warm conversations, and that breathtaking smile that lights up any room. Happy Birthday, Anwuu Babyy—here is to celebrating you today and always."
    }
  ],

  // --- Scene 6: Love Games ---

  // Game 1: The Memory Quiz
  QUIZ: [
    {
      question: "Where did we first meet eyes and say hello?",
      options: [
        "At the corner cafe by the bookstore",
        "In a crowded elevator",
        "During a rainy evening crosswalk",
        "At a friend's birthday party"
      ],
      correctIndex: 0,
      gentleWrong: "A cute guess, but remember the scent of roasted coffee beans? Try again! ☕"
    },
    {
      question: "What did you order on our very first coffee date?",
      options: [
        "A classic caramel macchiato with oat milk",
        "An iced vanilla latte that melted fast",
        "Just a plain black americano",
        "Green matcha tea with extra honey"
      ],
      correctIndex: 0,
      gentleWrong: "Almost! Think caramel sweetness and warm cups. Give it another try! 🤍"
    },
    {
      question: "What is my absolute favorite thing about you?",
      options: [
        "The crinkle by your eyes when you really laugh",
        "How kind you are to every stray kitten and puppy",
        "The soft way you squeeze my hand in a crowd",
        "All of the above, plus a million more things"
      ],
      correctIndex: 3,
      gentleWrong: "That is true, but the real answer is far bigger! Peek again! 🌹"
    }
  ],

  // Game 3: Would You Rather
  WOULD_YOU_RATHER: [
    {
      optionA: "A cozy candlelit picnic under a blanket of stars",
      optionB: "A fancy rooftop dinner in a glowing skyline",
      reaction: "Whatever you pick, as long as you're holding my hand, it's paradise."
    },
    {
      optionA: "A quiet rainy Sunday reading and cooking together",
      optionB: "An impulsive weekend getaway to a coastal town",
      reaction: "Honestly, doing nothing with you is better than doing everything with anyone else."
    },
    {
      optionA: "Matching silk pajamas and endless vintage movies",
      optionB: "Dressing to the nines for a night of jazz and dancing",
      reaction: "You look angelic in oversized hoodies and stunning in evening dresses."
    },
    {
      optionA: "Stealing sips from each other's warm morning coffee",
      optionB: "Sharing a giant dessert and fighting over the last strawberry",
      reaction: "The last bite is always yours, Anwuu Babyy. Always has been, always will be."
    }
  ],

  // Game 4: Catch the Hearts
  catchHearts: {
    durationSeconds: 20,
    sweetMessage: "You caught my heart from the very first day, and you keep it safe and cherished every single second."
  },

  // --- Scene 7: The Birthday Letter (LETTER_TEXT) ---
  // Heading: "Dear Anwuu Babyy,"
  // Signature: "With all my love, [YOUR NAME]"
  LETTER_TEXT: [
    "Happy birthday bachaa, my shonna, my cutuuuu , lots of luv to uhhh. On ur special occasion this is small little gesture from my side , i know its nothin in front of ur beauty and kindness my love, but bachaa uhh are my sunshinee.",
    "I know its a romantic side of mee and its getting wild as the months are passing, but bachaa time fliesss. jus like this one year has passed , i somehow got a better person along with uhh.",
    "Got a gentle elegenace, a charm on my face increased coz the person i m in love with is and will be speciall, this letter will not fully  express my love towards uhh and babyyy u r the first girl in my life who made me feel special everydayy and that made me feel good!!!!",
    "I hope uhh enjoy ur day to the fullest and ha bruhhh ai nhi kiya hai letter khudse likhaa, pyaar krta hu tujhseee, ab kya final decision hai boldena mujhe personally!!!"
  ],

  // --- Scene 8: Finale ---
  finale: {
    title: "Happy Birthday, My Love",
    subtitle: "Always & Forever",
    quote: "my sweet little bachuuu",
    caption: "my sweet little bachuuu",
    closingPhoto: "assets/photos/finale.jpg"
  }
};

// Aliases for compatibility
CONFIG.balloonMessages = CONFIG.MESSAGES;
CONFIG.storyChapters = CONFIG.STORY;
CONFIG.quiz = CONFIG.QUIZ;
CONFIG.wouldYouRather = CONFIG.WOULD_YOU_RATHER;
CONFIG.letter = {
  salutation: "Dear Anwuu Babyy,",
  paragraphs: CONFIG.LETTER_TEXT,
  closing: "With all my love,",
  signature: CONFIG.yourName
};
