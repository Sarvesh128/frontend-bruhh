/**
 * ===================================================================
 *  ROMANTIC BIRTHDAY WEBSITE - MAIN JAVASCRIPT ENGINE
 * ===================================================================
 *  For: Anwuu Babyy
 *  Date: 13 November 2026
 *
 *  Engine Modules:
 *    1. Sound Synthesizer & Audio Engine (Web Audio API + HTML5 Audio)
 *    2. Continuous Floating Hearts & Confetti Particles (Canvas 60fps)
 *    3. Scene 0: Loading Transition
 *    4. Scene 1: Floating Balloons Sky (Instant pop, 2.5s message card)
 *    5. Scene 2: Birthday Cake (One-breath mic blow & tap all-out fallback)
 *    6. Scene 3: Cake Cutting Interaction (Touch drag & tap to cut)
 *    7. Scene 5: Our Story Timeline (7 Chapters & Swipe Lightbox)
 *    8. Scene 6: Love Games (Quiz, Vinyl Record Player, WYR, Catch Hearts)
 *    9. Scene 7: Birthday Letter (Interactive Wax Seal Envelope)
 *   10. Scene 8: Finale Live Love Counter & Journey Replay
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure CONFIG is loaded
  if (typeof CONFIG === "undefined") {
    console.error("Configuration file config.js was not loaded properly.");
    return;
  }

  /* ===================================================================
     1. SOUND SYNTHESIZER & AUDIO ENGINE
     =================================================================== */
  const AudioEngine = (() => {
    let audioCtx = null;
    let sfxEnabled = true;
    let musicPlaying = false;
    const bgAudio = document.getElementById("bg-audio");
    const btnMusicToggle = document.getElementById("btn-music-toggle");
    const btnSfxToggle = document.getElementById("btn-sfx-toggle");

    // Initialize Web Audio Context on first user touch/click
    function getContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Playful, instant balloon pop sound synthesized via Web Audio oscillator
    function playPopSound() {
      if (!sfxEnabled) return;
      try {
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";

        // Snappy frequency drop: 520Hz down to 90Hz in 70ms
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.07);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      } catch (err) {}
    }

    // Gentle candle blow / airy puff sound
    function playBlowSound() {
      if (!sfxEnabled) return;
      try {
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const bufferSize = ctx.sampleRate * 0.28;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, now);
        filter.frequency.linearRampToValueAtTime(140, now + 0.28);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
      } catch (e) {}
    }

    // Melodic celebration chime for correct answers and magic moments
    function playChimeSound(freq = 587.33) {
      if (!sfxEnabled) return;
      try {
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        [freq, freq * 1.25, freq * 1.5].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now + idx * 0.05);

          gain.gain.setValueAtTime(0.2, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.65);
        });
      } catch (e) {}
    }

    // Gentle harp strum for knife cake slice
    function playCakeCutSound() {
      if (!sfxEnabled) return;
      playChimeSound(659.25);
    }

    // Generative romantic piano ambient melody fallback
    let synthTimer = null;
    const pianoNotes = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25];
    function startRomanticSynth() {
      if (synthTimer) return;
      let noteIndex = 0;
      synthTimer = setInterval(() => {
        if (!musicPlaying) return;
        try {
          const ctx = getContext();
          if (!ctx) return;
          const note = pianoNotes[noteIndex % pianoNotes.length];
          noteIndex++;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.9);
        } catch (e) {}
      }, 1200);
    }

    function stopRomanticSynth() {
      if (synthTimer) {
        clearInterval(synthTimer);
        synthTimer = null;
      }
    }

    // Music playback control (must be triggered by tap on mobile)
    function initMusic() {
      if (CONFIG.music && CONFIG.music.src) {
        bgAudio.src = CONFIG.music.src;
      }

      btnMusicToggle.addEventListener("click", () => {
        toggleMusic();
      });

      btnSfxToggle.addEventListener("click", () => {
        sfxEnabled = !sfxEnabled;
        btnSfxToggle.classList.toggle("active", sfxEnabled);
        btnSfxToggle.style.opacity = sfxEnabled ? "1" : "0.5";
      });
    }

    function toggleMusic(forceState) {
      getContext();
      const shouldPlay = forceState !== undefined ? forceState : !musicPlaying;

      if (shouldPlay) {
        musicPlaying = true;
        btnMusicToggle.classList.add("active");
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {})
            .catch(() => {
              // If browser blocks audio or MP3 is placeholder, use generative romantic piano
              startRomanticSynth();
            });
        }
      } else {
        musicPlaying = false;
        btnMusicToggle.classList.remove("active");
        bgAudio.pause();
        stopRomanticSynth();
      }
    }

    return {
      init: initMusic,
      getContext,
      playPop: playPopSound,
      playBlow: playBlowSound,
      playChime: playChimeSound,
      playCut: playCakeCutSound,
      toggleMusic,
      isMusicPlaying: () => musicPlaying
    };
  })();

  /* ===================================================================
     2. CONTINUOUS FLOATING HEARTS & CONFETTI CANVAS (60 FPS)
     =================================================================== */
  const CanvasFX = (() => {
    const canvas = document.getElementById("hearts-canvas");
    const ctx = canvas.getContext("2d");
    let width, height;
    let hearts = [];
    let confetti = [];
    let isRunning = true;
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    // Restrained romantic palette: Blush rose, Champagne gold, Warm ivory
    const heartColors = [
      "rgba(227, 164, 174, ", // Blush rose
      "rgba(201, 164, 92, ",  // Champagne gold
      "rgba(246, 235, 221, ", // Ivory cream
      "rgba(242, 222, 159, "  // Soft gold
    ];

    class FloatingHeart {
      constructor(burstX, burstY) {
        this.reset(burstX, burstY);
      }

      reset(burstX, burstY) {
        if (burstX !== undefined && burstY !== undefined) {
          this.x = burstX + (Math.random() * 40 - 20);
          this.y = burstY + (Math.random() * 40 - 20);
          this.vx = (Math.random() - 0.5) * 4;
          this.vy = -(Math.random() * 4 + 2);
          this.alpha = 0.9;
          this.size = Math.random() * 14 + 10;
        } else {
          this.x = Math.random() * width;
          this.y = height + Math.random() * 50;
          this.vx = (Math.random() - 0.5) * 0.7;
          this.vy = -(Math.random() * 0.8 + 0.5);
          this.alpha = Math.random() * 0.35 + 0.15;
          this.size = Math.random() * 12 + 8;
        }
        this.baseColor = heartColors[Math.floor(Math.random() * heartColors.length)];
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.swingOffset = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.swingOffset += this.swingSpeed;
        this.x += this.vx + Math.sin(this.swingOffset) * 0.5;
        this.y += this.vy;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `${this.baseColor}${this.alpha})`;
        
        const s = this.size / 15;
        ctx.beginPath();
        ctx.moveTo(0, -5 * s);
        ctx.bezierCurveTo(-6 * s, -14 * s, -16 * s, -8 * s, -16 * s, 2 * s);
        ctx.bezierCurveTo(-16 * s, 10 * s, -8 * s, 18 * s, 0, 24 * s);
        ctx.bezierCurveTo(8 * s, 18 * s, 16 * s, 10 * s, 16 * s, 2 * s);
        ctx.bezierCurveTo(16 * s, -8 * s, 6 * s, -14 * s, 0, -5 * s);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    class ConfettiParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.8) * 9;
        this.size = Math.random() * 6 + 4;
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)] + "0.9)";
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.2;
        this.life = 1.0;
        this.decay = Math.random() * 0.025 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.22;
        this.rotation += this.vRot;
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
      }
    }

    function init() {
      resize();
      window.addEventListener("resize", resize);

      // Mobile optimization: fewer hearts on smaller screens for smooth 60fps
      const count = window.innerWidth < 600 ? 12 : 20;
      for (let i = 0; i < count; i++) {
        const h = new FloatingHeart();
        h.y = Math.random() * height;
        hearts.push(h);
      }

      if (!prefersReducedMotion) {
        canvas.classList.add("visible");
        animate();
      }
    }

    function animate() {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
      }

      for (let i = confetti.length - 1; i >= 0; i--) {
        confetti[i].update();
        confetti[i].draw();
        if (confetti[i].life <= 0) {
          confetti.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    function triggerBurst(x, y, count = 24) {
      if (prefersReducedMotion) return;
      const originX = x !== undefined ? x : width / 2;
      const originY = y !== undefined ? y : height / 2;

      for (let i = 0; i < count; i++) {
        confetti.push(new ConfettiParticle(originX, originY));
        if (hearts.length < 45) {
          hearts.push(new FloatingHeart(originX, originY));
        }
      }
    }

    return {
      init,
      triggerBurst
    };
  })();

  /* ===================================================================
     3. SCENE 0: LOADING TRANSITION
     =================================================================== */
  function initLoader() {
    const loader = document.getElementById("scene-loader");
    
    // Set personal names and dates
    const herName = CONFIG.herName || CONFIG.name || "Anwuu Babyy";
    const yourName = CONFIG.yourName || "[YOUR NAME]";
    const birthdayDate = CONFIG.birthdayDate || "13 November 2026";

    const navMonogram = document.getElementById("nav-monogram");
    if (navMonogram) {
      navMonogram.textContent = `${herName.charAt(0)} & ${yourName.charAt(0) === "[" ? "♥" : yourName.charAt(0)}`;
    }
    const navDate = document.getElementById("nav-date");
    if (navDate) navDate.textContent = birthdayDate;
    
    const balloonHerName = document.getElementById("balloon-her-name");
    if (balloonHerName) balloonHerName.textContent = herName;

    // Gracefully fade out loader after soft pause
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    }, 1100);
  }

  /* ===================================================================
     4. SCENE 1: BALLOONS SKY & POPPING INTERACTION
     =================================================================== */
  const BalloonsScene = (() => {
    const sky = document.getElementById("balloons-sky");
    const noteCard = document.getElementById("balloon-note-card");
    const noteText = document.getElementById("balloon-note-text");
    const counterText = document.getElementById("balloon-counter-text");
    const btnSkip = document.getElementById("btn-skip-balloons");
    
    let poppedCount = 0;
    let noteTimer = null;
    const TOTAL_BALLOONS = window.innerWidth < 600 ? 15 : 18;
    const balloonPalette = [
      { bg: "linear-gradient(135deg, #7A1C2C 0%, #4A101A 100%)", knot: "#3B0A13" },   // Burgundy
      { bg: "linear-gradient(135deg, #E5CA8F 0%, #C9A45C 100%)", knot: "#9E7B35" },   // Champagne Gold
      { bg: "linear-gradient(135deg, #F3C3CC 0%, #E3A4AE 100%)", knot: "#C47784" },   // Blush Rose
      { bg: "linear-gradient(135deg, #FAF6EE 0%, #E8D9C5 100%)", knot: "#C9BAA3" }    // Ivory
    ];

    const messages = CONFIG.MESSAGES || CONFIG.balloonMessages || [
      "Caught you smiling! ✨",
      "Warning: extremely cute overload ahead 🥰",
      "You are my favorite notification in the entire world 💌"
    ];

    function showNote(message) {
      if (noteTimer) clearTimeout(noteTimer);
      noteText.textContent = message;
      noteCard.classList.add("active");

      // Per specification: message stays for about 2.5 seconds, then fades
      noteTimer = setTimeout(() => {
        hideNote();
      }, 2500);
    }

    function hideNote() {
      noteCard.classList.remove("active");
    }

    function spawnBalloon(initialY) {
      const item = document.createElement("div");
      item.className = "balloon-item";

      const color = balloonPalette[Math.floor(Math.random() * balloonPalette.length)];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      item.dataset.msg = msg;

      item.innerHTML = `
        <div class="balloon-body" style="background: ${color.bg}"></div>
        <div class="balloon-knot" style="background: ${color.knot}"></div>
        <div class="balloon-string"></div>
      `;

      const leftPercent = Math.random() * 82 + 9;
      item.style.left = `${leftPercent}%`;

      const duration = Math.random() * 7 + 12;
      let currentY = initialY !== undefined ? initialY : window.innerHeight + 100;
      let swayOffset = Math.random() * Math.PI * 2;
      const speed = (window.innerHeight + 200) / (duration * 60);

      sky.appendChild(item);

      let animId;
      function floatStep() {
        currentY -= speed;
        swayOffset += 0.03;
        const swayX = Math.sin(swayOffset) * 16;

        item.style.transform = `translate3d(${swayX}px, ${currentY}px, 0)`;

        if (currentY < -160) {
          cancelAnimationFrame(animId);
          item.remove();
          setTimeout(() => spawnBalloon(), Math.random() * 2000 + 1000);
        } else {
          animId = requestAnimationFrame(floatStep);
        }
      }
      animId = requestAnimationFrame(floatStep);

      // Instant Pop Handler - Single tap / click pops immediately
      let isPopped = false;
      function handlePop() {
        if (isPopped) return;
        isPopped = true;

        cancelAnimationFrame(animId);
        item.classList.add("popping");
        
        AudioEngine.playPop();

        // Confetti burst at balloon coordinates
        const rect = item.getBoundingClientRect();
        CanvasFX.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);

        // Instant message display (stays 2.5s)
        showNote(item.dataset.msg);

        poppedCount++;
        counterText.textContent = `Balloons Popped: ${poppedCount}`;

        // Quick removal and respawn after a few seconds
        setTimeout(() => {
          item.remove();
          setTimeout(() => spawnBalloon(), 4000);
        }, 120);

        // When 6 or more are popped, offer prominent entrance to the cake
        if (poppedCount >= 6) {
          btnSkip.classList.remove("btn-gold-outline");
          btnSkip.classList.add("btn-gold-solid");
          btnSkip.textContent = "Your Birthday Cake Awaits! Tap to Enter 🎂";
        }

        // When 12 balloons popped, smoothly transition to the cake scene
        if (poppedCount >= 12) {
          setTimeout(() => {
            document.getElementById("scene-candles").scrollIntoView({ behavior: "smooth" });
          }, 1800);
        }
      }

      // Distinguish clean tap from scroll swipe
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      item.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      }, { passive: true });

      item.addEventListener("touchend", (e) => {
        if (e.changedTouches && e.changedTouches.length > 0) {
          const distX = Math.abs(e.changedTouches[0].clientX - touchStartX);
          const distY = Math.abs(e.changedTouches[0].clientY - touchStartY);
          const elapsed = Date.now() - touchStartTime;
          // Only pop on intentional tap, let vertical scroll swipes pass through!
          if (distX < 15 && distY < 15 && elapsed < 400) {
            handlePop();
          }
        }
      }, { passive: true });

      item.addEventListener("click", () => {
        handlePop();
      });
    }

    function init() {
      for (let i = 0; i < TOTAL_BALLOONS; i++) {
        const initY = Math.random() * (window.innerHeight + 180);
        spawnBalloon(initY);
      }

      document.addEventListener("click", (e) => {
        if (noteCard.classList.contains("active") && !e.target.closest(".balloon-item")) {
          hideNote();
        }
      });

      btnSkip.addEventListener("click", () => {
        document.getElementById("scene-candles").scrollIntoView({ behavior: "smooth" });
      });
    }

    return { init };
  })();

  /* ===================================================================
     5. SCENE 2: CANDLE BLOWING (One Normal Breath & Tap Fallback)
     =================================================================== */
  const CandlesScene = (() => {
    const candles = document.querySelectorAll("#candles-group .candle");
    const btnMic = document.getElementById("btn-mic-listen");
    const micLabel = document.getElementById("mic-status-label");
    const btnTapBlow = document.getElementById("btn-tap-blow");
    const wishBanner = document.getElementById("wish-banner");
    const btnGotoCut = document.getElementById("btn-goto-cut");
    const candleHint = document.getElementById("candle-hint");

    let isAllExtinguished = false;
    let micStream = null;
    let micAnalyser = null;
    let isListening = false;
    let sustainedBreathFrames = 0;

    // Extinguishes ALL candles at once with delicate smoke wisps rising
    function extinguishAllCandles() {
      if (isAllExtinguished) return;
      isAllExtinguished = true;
      stopMicListening();

      AudioEngine.playBlow();

      // Wave extinguish all candles together
      candles.forEach((candle, idx) => {
        setTimeout(() => {
          candle.classList.add("extinguished");
          const rect = candle.getBoundingClientRect();
          CanvasFX.triggerBurst(rect.left + rect.width / 2, rect.top, 8);
        }, idx * 40);
      });

      setTimeout(() => {
        onAllCandlesOut();
      }, 350);
    }

    function onAllCandlesOut() {
      candleHint.textContent = "All candles are gently extinguished. ✨";
      wishBanner.style.display = "block";
      AudioEngine.playChime(659.25);
      CanvasFX.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.42, 35);
    }

    // Microphone blow detection: tuned so ONE normal breath (150-250ms) is enough!
    async function initMicrophone() {
      if (isListening) {
        stopMicListening();
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micLabel.textContent = "Mic Not Supported (Tap Below)";
        candleHint.textContent = "Microphone is unavailable — tap the button or any candle flame!";
        return;
      }

      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const ctx = AudioEngine.getContext();
        const source = ctx.createMediaStreamSource(micStream);
        micAnalyser = ctx.createAnalyser();
        micAnalyser.fftSize = 512;
        source.connect(micAnalyser);

        isListening = true;
        btnMic.classList.add("active");
        micLabel.textContent = "Listening... Blow into Mic! 💨";
        candleHint.textContent = "Blow softly into your microphone now!";
        listenLoop();
      } catch (err) {
        micLabel.textContent = "Mic Access Denied (Tap Below)";
        candleHint.textContent = "Microphone permission denied — please tap the button or flame!";
        console.warn("Microphone access not granted:", err);
      }
    }

    function listenLoop() {
      if (!isListening || !micAnalyser || isAllExtinguished) return;

      const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
      micAnalyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;

      // Moderate volume threshold (>24) with short sustained window (around 150-250ms = 9 frames)
      if (avg > 24) {
        sustainedBreathFrames++;
        if (sustainedBreathFrames >= 8) {
          extinguishAllCandles();
          return;
        }
      } else {
        sustainedBreathFrames = Math.max(0, sustainedBreathFrames - 2);
      }

      requestAnimationFrame(listenLoop);
    }

    function stopMicListening() {
      isListening = false;
      if (btnMic) btnMic.classList.remove("active");
      if (micLabel) micLabel.textContent = "Wish Made ✨";
      if (micStream) {
        micStream.getTracks().forEach((track) => track.stop());
        micStream = null;
      }
    }

    function init() {
      // Tap ANY candle flame extinguishes all candles at once
      candles.forEach((candle) => {
        candle.addEventListener("click", extinguishAllCandles);
        candle.addEventListener("touchstart", extinguishAllCandles, { passive: true });
      });

      btnMic.addEventListener("click", initMicrophone);

      // Fallback "Blow Out Candles" button extinguishes all candles at once
      btnTapBlow.addEventListener("click", extinguishAllCandles);
      btnTapBlow.addEventListener("touchstart", extinguishAllCandles, { passive: true });

      // Move on to cake cutting
      btnGotoCut.addEventListener("click", () => {
        document.getElementById("scene-cut").scrollIntoView({ behavior: "smooth" });
      });
    }

    return { init };
  })();

  /* ===================================================================
     6. SCENE 3: CAKE CUTTING INTERACTION (Touch Drag & Tap to Cut)
     =================================================================== */
  const CakeCutScene = (() => {
    const knife = document.getElementById("gold-knife");
    const sliceLifting = document.getElementById("cake-slice-lifting");
    const messageCard = document.getElementById("cake-message-card");
    const messageText = document.getElementById("cake-message-text");
    const wholeCake = document.getElementById("whole-cake");
    let isCut = false;

    function performCut() {
      if (isCut) return;
      isCut = true;

      AudioEngine.playCut();

      // Knife stroke down
      gsap.to(knife, {
        y: 75,
        rotation: 12,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(knife, { opacity: 0, duration: 0.35 });
          
          // Slice lifts out smoothly
          sliceLifting.classList.add("lifted");

          // Confetti shower
          const rect = wholeCake.getBoundingClientRect();
          CanvasFX.triggerBurst(rect.left + rect.width / 2, rect.top + 60, 32);

          // Reveal hidden cake message
          setTimeout(() => {
            const cakeMsg = CONFIG.CAKE_MESSAGE || CONFIG.cakeMessage || "You make every day sweeter...";
            messageText.textContent = cakeMsg;
            messageCard.style.display = "block";
            AudioEngine.playChime(523.25);
          }, 700);
        }
      });
    }

    function init() {
      // Support both tap and touch drag
      knife.addEventListener("click", performCut);
      wholeCake.addEventListener("click", performCut);

      // Desktop drag
      let isDragging = false;
      let startY = 0;

      knife.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.clientY;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging || isCut) return;
        if (e.clientY - startY > 40) {
          isDragging = false;
          performCut();
        }
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
      });

      // Mobile Tap or Swipe to Cut
      knife.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });

      knife.addEventListener("touchend", (e) => {
        const delta = e.changedTouches[0].clientY - startY;
        if (delta > 25 || Math.abs(delta) < 10) {
          performCut();
        }
      }, { passive: true });
    }

    return { init };
  })();

  /* ===================================================================
     7. SCENE 5: OUR STORY TIMELINE & LIGHTBOX (With Mobile Swipe)
     =================================================================== */
  const StoryScene = (() => {
    const listContainer = document.getElementById("story-chapters-list");
    const lightbox = document.getElementById("photo-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDate = document.getElementById("lightbox-date");
    const lightboxDesc = document.getElementById("lightbox-desc");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxBackdrop = document.getElementById("lightbox-backdrop");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentStoryIndex = 0;
    const chapters = CONFIG.STORY || CONFIG.storyChapters || [];

    function renderChapters() {
      listContainer.innerHTML = "";

      // Exactly 7 chapters in exact order
      chapters.forEach((ch, index) => {
        const item = document.createElement("article");
        // Desktop: alternating layout starting with photo1 on the left (index 0 = not alternate, index 1 = alternate)
        item.className = `story-chapter-item ${index % 2 === 1 ? "alternate" : ""}`;
        item.dataset.index = index;

        const dateDisplay = ch.date || `Chapter ${index + 1}`;

        item.innerHTML = `
          <div class="story-photo-col">
            <div class="vintage-oval-frame" data-index="${index}">
              <img src="${ch.image}" alt="${ch.title}" loading="lazy">
            </div>
          </div>
          <div class="story-text-col">
            <span class="chapter-date-badge">${dateDisplay}</span>
            <h3 class="chapter-title">${ch.title}</h3>
            <p class="chapter-caption">${ch.caption}</p>
            <button class="btn-view-photo" data-index="${index}">
              View Photograph &nearr;
            </button>
          </div>
        `;

        listContainer.appendChild(item);
      });

      // Bind Lightbox triggers
      listContainer.querySelectorAll(".vintage-oval-frame, .btn-view-photo").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.index, 10);
          openLightbox(idx);
        });
      });

      // Soft fade reveals on scroll (reduced strength on mobile)
      const isMobile = window.innerWidth < 768;
      if (typeof ScrollTrigger !== "undefined" && gsap) {
        gsap.utils.toArray(".story-chapter-item").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: isMobile ? 20 : 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            }
          });
        }, { threshold: 0.15 });

        document.querySelectorAll(".story-chapter-item").forEach((el) => observer.observe(el));
      }
    }

    function openLightbox(index) {
      if (index < 0 || index >= chapters.length) return;
      currentStoryIndex = index;
      const ch = chapters[index];

      lightboxImg.src = ch.image;
      lightboxTitle.textContent = ch.title;
      lightboxDate.textContent = ch.date || `Chapter ${index + 1}`;
      lightboxDesc.textContent = ch.caption;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    }

    function showPrev() {
      const prev = (currentStoryIndex - 1 + chapters.length) % chapters.length;
      openLightbox(prev);
    }

    function showNext() {
      const next = (currentStoryIndex + 1) % chapters.length;
      openLightbox(next);
    }

    function init() {
      renderChapters();

      lightboxClose.addEventListener("click", closeLightbox);
      lightboxBackdrop.addEventListener("click", closeLightbox);

      if (lightboxPrev) lightboxPrev.addEventListener("click", showPrev);
      if (lightboxNext) lightboxNext.addEventListener("click", showNext);

      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      });

      // Mobile Touch Swipe Support
      let touchStartX = 0;
      let touchStartY = 0;
      const dialog = document.querySelector(".lightbox-dialog");

      dialog.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      dialog.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Horizontal swipe: next/prev
        if (Math.abs(deltaX) > 45 && Math.abs(deltaY) < 60) {
          if (deltaX < 0) {
            showNext();
          } else {
            showPrev();
          }
        }
        // Downward swipe: close
        if (deltaY > 80 && Math.abs(deltaX) < 50) {
          closeLightbox();
        }
      }, { passive: true });
    }

    return { init };
  })();

  /* ===================================================================
     8. SCENE 6: LOVE GAMES (Memory Quiz, Would You Rather, Catch Hearts)
     =================================================================== */

  const LoveGames = (() => {
    const tabs = document.querySelectorAll(".game-tab-btn");
    const panels = document.querySelectorAll(".game-card");

    function switchGame(targetIndex) {
      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.game == targetIndex);
      });
      panels.forEach((p) => {
        p.classList.toggle("active", p.id === `game-panel-${targetIndex}`);
      });
    }

    // --- GAME 1: Quiz (Large Touch-Friendly Buttons) ---
    let currentQuizIndex = 0;
    const quizData = CONFIG.QUIZ || CONFIG.quiz || [];

    function initQuiz() {
      const qProgress = document.getElementById("quiz-progress-text");
      const qTitle = document.getElementById("quiz-question-title");
      const optGrid = document.getElementById("quiz-options-grid");
      const feedback = document.getElementById("quiz-feedback-box");

      function loadQuestion(idx) {
        const q = quizData[idx];
        if (!q) return;

        qProgress.textContent = `Question ${idx + 1} of ${quizData.length}`;
        qTitle.textContent = q.question;
        feedback.textContent = "";
        optGrid.innerHTML = "";

        const letters = ["A", "B", "C", "D"];
        q.options.forEach((optText, i) => {
          const btn = document.createElement("button");
          btn.className = "quiz-option-btn";
          btn.innerHTML = `<span class="quiz-option-letter">${letters[i]}</span><span>${optText}</span>`;

          btn.addEventListener("click", () => {
            if (i === q.correctIndex) {
              btn.classList.add("correct");
              feedback.innerHTML = "You remembered! You have the sweetest heart! 💖";
              AudioEngine.playChime(659.25);
              const rect = btn.getBoundingClientRect();
              CanvasFX.triggerBurst(rect.left + rect.width / 2, rect.top, 20);

              setTimeout(() => {
                if (currentQuizIndex + 1 < quizData.length) {
                  currentQuizIndex++;
                  loadQuestion(currentQuizIndex);
                } else {
                  feedback.innerHTML = "Quiz complete! You scored 100% in my heart! ✨";
                }
              }, 1600);
            } else {
              btn.classList.add("wrong");
              feedback.textContent = q.gentleWrong;
              setTimeout(() => btn.classList.remove("wrong"), 2000);
            }
          });

          optGrid.appendChild(btn);
        });
      }

      loadQuestion(0);
    }

    // --- GAME 3: Would You Rather ---
    let wyrIndex = 0;
    const wyrData = CONFIG.WOULD_YOU_RATHER || CONFIG.wouldYouRather || [];

    function initWYR() {
      const counter = document.getElementById("wyr-counter");
      const btnA = document.getElementById("wyr-btn-a");
      const btnB = document.getElementById("wyr-btn-b");
      const textA = document.getElementById("wyr-text-a");
      const textB = document.getElementById("wyr-text-b");
      const reactionBox = document.getElementById("wyr-reaction-box");
      const reactionText = document.getElementById("wyr-reaction-text");
      const btnNextWYR = document.getElementById("wyr-btn-next");

      function loadWYR(idx) {
        const item = wyrData[idx];
        if (!item) return;
        counter.textContent = `Dilemma ${idx + 1} of ${wyrData.length}`;
        textA.textContent = item.optionA;
        textB.textContent = item.optionB;
        reactionBox.classList.remove("active");
      }

      function handleChoice() {
        const item = wyrData[wyrIndex];
        reactionText.textContent = item.reaction;
        reactionBox.classList.add("active");
        AudioEngine.playChime(587.33);
        CanvasFX.triggerBurst();
      }

      btnA.addEventListener("click", handleChoice);
      btnB.addEventListener("click", handleChoice);

      btnNextWYR.addEventListener("click", () => {
        wyrIndex = (wyrIndex + 1) % wyrData.length;
        loadWYR(wyrIndex);
      });

      loadWYR(0);
    }

    // --- GAME 4: Catch The Hearts (20-Second Mobile Touch Arena) ---
    function initCatchHearts() {
      const arena = document.getElementById("catch-playfield");
      const timerLabel = document.getElementById("catch-timer");
      const scoreLabel = document.getElementById("catch-score");
      const startOverlay = document.getElementById("catch-start-overlay");
      const btnStart = document.getElementById("btn-start-catch");
      const endBox = document.getElementById("catch-end-box");
      const resultText = document.getElementById("catch-result-text");

      let score = 0;
      let timeLeft = (CONFIG.catchHearts && CONFIG.catchHearts.durationSeconds) || 20;
      let gameInterval = null;
      let spawnInterval = null;

      btnStart.addEventListener("click", () => {
        startOverlay.style.display = "none";
        score = 0;
        timeLeft = (CONFIG.catchHearts && CONFIG.catchHearts.durationSeconds) || 20;
        scoreLabel.textContent = score;
        timerLabel.textContent = timeLeft;
        endBox.classList.remove("active");

        gameInterval = setInterval(() => {
          timeLeft--;
          timerLabel.textContent = timeLeft;
          if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(spawnInterval);
            arena.querySelectorAll(".floating-catch-heart").forEach((el) => el.remove());
            
            const sweetMsg = (CONFIG.catchHearts && CONFIG.catchHearts.sweetMessage) || "You caught my heart from day one!";
            resultText.textContent = `${sweetMsg} (Score: ${score} hearts)`;
            endBox.classList.add("active");
            AudioEngine.playChime(659.25);
            CanvasFX.triggerBurst();
          }
        }, 1000);

        spawnInterval = setInterval(() => {
          spawnHeartTarget();
        }, 650);
      });

      function spawnHeartTarget() {
        const h = document.createElement("div");
        h.className = "floating-catch-heart";
        h.innerHTML = `<span style="font-size: 2.2rem; color: #E3A4AE; filter: drop-shadow(0 2px 8px rgba(201,164,92,0.5));">&#10084;</span>`;

        const xPos = Math.random() * 80 + 10;
        h.style.left = `${xPos}%`;
        const dur = Math.random() * 2 + 2.4;
        h.style.animationDuration = `${dur}s`;

        function catchTap(e) {
          e.stopPropagation();
          score++;
          scoreLabel.textContent = score;
          AudioEngine.playPop();
          h.remove();
        }

        h.addEventListener("pointerdown", catchTap);
        h.addEventListener("touchstart", catchTap, { passive: true });

        arena.appendChild(h);

        setTimeout(() => {
          if (h.parentNode) h.remove();
        }, dur * 1000);
      }
    }

    function init() {
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => switchGame(tab.dataset.game));
      });

      document.querySelectorAll(".btn-next-game").forEach((btn) => {
        btn.addEventListener("click", () => switchGame(btn.dataset.next));
      });

      initQuiz();
      initWYR();
      initCatchHearts();
    }

    return { init };
  })();

  /* ===================================================================
     9. SCENE 7: BIRTHDAY LETTER & INTERACTIVE ENVELOPE
     =================================================================== */
  const LetterScene = (() => {
    const envelopeCase = document.getElementById("envelope-case");
    const btnSeal = document.getElementById("btn-unseal-envelope");
    const btnOpenPrompt = document.getElementById("btn-open-prompt");
    const letterBody = document.getElementById("letter-body");

    function openEnvelope() {
      if (envelopeCase.classList.contains("opened")) return;
      envelopeCase.classList.add("opened");
      AudioEngine.playChime(523.25);
      CanvasFX.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.45, 25);

      const paragraphs = letterBody.querySelectorAll(".letter-paragraph");
      paragraphs.forEach((p, idx) => {
        setTimeout(() => {
          p.classList.add("revealed");
        }, idx * 700 + 400);
      });
    }

    function renderLetter() {
      const salutation = (CONFIG.letter && CONFIG.letter.salutation) || "Dear Anwuu Babyy,";
      const closing = (CONFIG.letter && CONFIG.letter.closing) || "With all my love,";
      const signature = CONFIG.yourName || "[YOUR NAME]";

      document.getElementById("letter-salutation").textContent = salutation;
      document.getElementById("letter-closing").textContent = closing;
      document.getElementById("letter-signature").textContent = signature;

      letterBody.innerHTML = "";
      const paras = CONFIG.LETTER_TEXT || (CONFIG.letter && CONFIG.letter.paragraphs) || ["[LETTER TEXT]"];
      paras.forEach((pText) => {
        const p = document.createElement("p");
        p.className = "letter-paragraph";
        p.textContent = pText;
        letterBody.appendChild(p);
      });
    }

    function init() {
      renderLetter();

      btnSeal.addEventListener("click", openEnvelope);
      btnOpenPrompt.addEventListener("click", openEnvelope);
    }

    return { init };
  })();

  /* ===================================================================
     10. SCENE 8: FINALE LIVE COUNTER & REPLAY
     =================================================================== */
  const FinaleScene = (() => {
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minsEl = document.getElementById("count-mins");
    const secsEl = document.getElementById("count-secs");
    const btnReplay = document.getElementById("btn-replay");

    const startDateStr = CONFIG.START_DATE || CONFIG.startDate || "2022-04-18";

    function updateCounter() {
      const start = new Date(startDateStr).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = days.toLocaleString();
      hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
      minsEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
      secsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    function init() {
      const title = (CONFIG.finale && CONFIG.finale.title) || "Happy Birthday, my love";
      const quote = (CONFIG.finale && (CONFIG.finale.quote || CONFIG.finale.subtitle || CONFIG.finale.caption)) || "my sweet little bachuuu";
      const caption = (CONFIG.finale && CONFIG.finale.caption) || "my sweet little bachuuu";
      
      document.getElementById("finale-title").textContent = title;
      document.getElementById("finale-quote").textContent = `"${quote}"`;

      const captionEl = document.getElementById("finale-photo-caption");
      if (captionEl) {
        captionEl.textContent = caption;
      }

      if (CONFIG.finale && CONFIG.finale.closingPhoto) {
        document.getElementById("finale-photo").src = CONFIG.finale.closingPhoto;
      }

      updateCounter();
      setInterval(updateCounter, 1000);

      btnReplay.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        CanvasFX.triggerBurst();
      });
    }

    return { init };
  })();

  /* ===================================================================
     INITIALIZE ALL MODULES
     =================================================================== */
  initLoader();
  AudioEngine.init();
  CanvasFX.init();
  BalloonsScene.init();
  CandlesScene.init();
  CakeCutScene.init();
  StoryScene.init();
  LoveGames.init();
  LetterScene.init();
  FinaleScene.init();
});
