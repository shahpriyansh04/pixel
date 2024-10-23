"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const targetTime = new Date(now.getFullYear(), 9, 23, 15, 30, 0);

      const diff = targetTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / 1000 / 60 / 60)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diff / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((diff / 1000) % 60)
          .toString()
          .padStart(2, "0");

        setTime(`${hours}:${minutes}:${seconds}`);
      } else {
        clearInterval(intervalId);
        setTime("Time is up!");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="h-screen flex flex-col gap-12 text-white items-center justify-center py-20"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the RGBA value as needed
        backgroundImage: "url(pixel.png)",
        backgroundSize: "contain",
        backgroundBlendMode: "darken", // Blend mode to dim the image
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <AnimatePresence>
          {time != "Time is up!" ? (
            <div
              className="font-brick-sans"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${time?.length}, 1fr)`,
              }}
            >
              {time?.split("").map((char, index) => (
                <motion.p
                  key={char + index}
                  className="text-9xl"
                  initial={{ opacity: 0, y: -50 }} // incoming digit starts from top with opacity 0
                  animate={{ opacity: 1, y: 0 }} // incoming digit ends at its original position with opacity 1
                  exit={{ opacity: 0, y: 50 }} // outgoing digit moves to bottom with opacity 0
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {char}
                </motion.p>
              ))}
            </div>
          ) : (
            <motion.p
              className="text-8xl font-medium"
              initial={{ opacity: 0, y: -50 }} // incoming digit starts from top with opacity 0
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {time}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
