"use client";
import { useState } from "react";

export default function Rating({ initial = 0, onChange }) {
  const [rating, setRating] = useState(initial);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-xl cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => {
            setRating(i);
            if (onChange) onChange(i);
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
