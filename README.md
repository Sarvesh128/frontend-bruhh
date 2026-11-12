# Romantic Birthday Website

A luxury, stationery-inspired single-page interactive birthday celebration website created with refined aesthetics, smooth motion, and deep romantic sentiment.

---

## 🎨 Color Palette & Visual Style
- **Deep Burgundy (`#5E1622` & `#2E0A11`)**: Luxurious velvet & wood-grain textured background with vignette.
- **Champagne Gold (`#C9A45C` & `#F2DE9F`)**: Fine hairline borders, dividers, 3D wax seals, and foil accents.
- **Ivory Cream (`#F6EBDD` & `#FAF6EE`)**: Stationery cards, deckle-edge torn paper, and lace frames.
- **Blush Rose (`#E3A4AE`)**: Subtle hearts, petals, and rose blossoms.
- **Typography**: *Cormorant Garamond* & *Playfair Display* for serif headings, *Great Vibes* for romantic script accents, and *Lora* for warm body prose.

---

## 🌹 Experience Overview
0. **Loading Screen**: Soft pulsing gold heart with *"Something sweet is coming..."*
1. **Floating Balloons**: 15–20 drifting balloons in burgundy, gold, blush, and ivory. Tap or click to pop them with confetti, playful notes, and sweet sound effects (auto-respawns).
2. **Blow Out The Candles**: A three-tier birthday cake with lit candles. Blow into your device's microphone or tap each flame gently to extinguish them with smoke wisps.
3. **Cut The Cake**: Drag or tap the champagne-gold knife across the cake to reveal the hidden secret birthday message and celebratory confetti.
4. **Continuous Hearts**: A calm, 60 FPS floating hearts background that remains throughout the experience, with celebration bursts upon completing games.
5. **Our Story In Pictures**: Memory timeline with vintage lace oval frames (matching the reference template), caption cards, and an interactive zoom lightbox.
6. **Love Games**:
   - **Game 1**: *"Do you remember how our story began?"* – Interactive romantic quiz with gentle encouragement.
   - **Game 2**: *"Our Favorite Song"* – Vintage rotating vinyl record with gold tonearm, floral decorations, and interactive progress scrubber.
   - **Game 3**: *"Would You Rather"* – Playful romantic dilemmas with sweet reactions.
   - **Game 4**: *"Catch The Hearts"* – 20-second interactive mini-game with score tracking.
7. **The Birthday Letter**: An interactive burgundy envelope with a 3D gold wax seal. Tap to unseal and watch the deckle-edge letter smoothly reveal paragraph by paragraph.
8. **Finale & Love Counter**: Live ticking counter displaying days, hours, minutes, and seconds together since your anniversary date, with closing portrait and a replay journey button.

---

## 🛠️ Customization Guide

All personalization settings live at the top of **`config.js`**. You don't need to touch any HTML or CSS!

### 1. Personal Details & Dates
Open `config.js` in any text editor and edit:
```javascript
herName: "Sarah",              // Her name
yourName: "Alex",              // Your name
birthdayDate: "November 15",   // Displayed birthday date
startDate: "2021-10-24",       // Date your relationship began (YYYY-MM-DD)
```

### 2. Adding Your Photos
Place your photographs inside the **`assets/photos/`** folder:
- `photo1.jpg` – Chapter 1 & Finale Portrait
- `photo2.jpg` – Chapter 2
- `photo3.jpg` – Chapter 3
- `photo4.jpg` – Chapter 4
- `photo5.jpg` – Chapter 5
- `photo6.jpg` – Chapter 6
- `photo7.jpg` – Chapter 7

You can use standard `.jpg` or `.png` images. Portrait orientation works best for the lace oval frames.

### 3. Adding Your Favorite Song
Replace **`assets/song.mp3`** with your special song (MP3 format).
- If no custom MP3 is provided, the website includes a built-in gentle romantic piano chime synthesizer that automatically plays when music is toggled!

### 4. Customizing Text & Quiz Questions
In `config.js`, you can modify:
- `balloonMessages`: Array of sweet, witty notes revealed when popping balloons.
- `cakeMessage`: Romantic note shown after cutting the cake.
- `storyChapters`: Title, date, image path, and caption for each chapter.
- `quiz`: Questions, options, correct answer index, and encouraging feedback.
- `wouldYouRather`: Choices and warm reactions.
- `letter`: Salutation, paragraphs, closing, and signature for the love letter.

---

## 🚀 Running Locally

You can open `index.html` directly in any modern browser, or serve it using a lightweight local server:

### Option A: Using Python (Recommended)
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

---

## 📱 Mobile & Accessibility Support
- **Mobile First**: Optimized touch interactions, large tap targets, and responsive sizing across all screen sizes.
- **Prefers Reduced Motion**: Automatically disables continuous floating and intense transitions if the user has reduced motion enabled in their device settings.
- **Microphone Fallback**: Seamless fallback to tap or button controls if microphone access is unavailable or denied.

