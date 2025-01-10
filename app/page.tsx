"use client";
import styles from "./page.module.css";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Home() {
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", "Hello from Next.js!");
    }
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>WebSocket Test</h1>
          <button onClick={sendMessage}>Send Message</button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
