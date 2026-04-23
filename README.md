# 🥊 Iron Fist Matchup Tracker

A full-stack mobile application designed for competitive Tekken 8 players to track set results and store character-specific execution notes. Built with a focus on high-performance learning and matchup knowledge retention.

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo) - Cross-platform mobile UI.
- **Backend:** Node.js & Express - RESTful API architecture.
- **Database:** MongoDB Atlas - Cloud-based NoSQL storage.
- **State Management:** React Hooks (`useState`, `useEffect`).

---

## 💡 Key Features

- **Matchup Logging:** Record opponent characters, ranks (e.g., Ganryu), and set outcomes.
- **Execution Notes:** Dedicated space for frame data, optimal punishes, and habit tracking (e.g., "Duck Victor's gun string").
- **Real-time Synchronization:** Data is fetched and updated instantly from a cloud database.
- **Gaming-Centric UI:** Custom dark-mode interface optimized for high-intensity gaming sessions.

---

## 🏗️ System Architecture



[Image of MERN stack architecture diagram]


The application follows a classic client-server model:
1. The **React Native** frontend sends JSON payloads via HTTP requests.
2. The **Express** server processes requests and communicates with **MongoDB** via Mongoose.
3. The **Cloud Database** ensures that notes are accessible across any device running the app.

---

## 🚀 Future Roadmap

- [ ] **Advanced Analytics:** Win-rate percentages per character.
- [ ] **Image Support:** Attach screenshots of optimal combo routes.
- [ ] **Tekken API Integration:** Automatically fetch current frame data for referenced characters.

---

## 🛠️ Local Setup

1. **Backend:**
   - `cd backend`
   - `npm install`
   - Create a `.env` file with your `MONGO_URI`.
   - `node server.js`

2. **Frontend:**
   - `cd frontend`
   - `npm install`
   - `npx expo start`