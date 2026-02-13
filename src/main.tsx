import React from "react";
import ReactDOM from "react-dom/client"; // Mengubah dari named import menjadi namespace import
import App from "./App.tsx";
import "./globals.css";
import { GamificationProvider } from './context/GamificationContext.tsx';
import { BookmarkProvider } from './context/BookmarkContext.tsx';
import { ApplicationProvider } from './context/ApplicationContext.tsx';

import { UserProvider } from './context/UserContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <UserProvider>
        <GamificationProvider>
          <BookmarkProvider>
            <ApplicationProvider>
              <App />
            </ApplicationProvider>
          </BookmarkProvider>
        </GamificationProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
);