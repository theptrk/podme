"use client";

import Image from "next/image";
import { useState } from "react";

function Tag(props: {
  setCurrentTopic: (arg0: string) => void;
  tagText: string;
  colors: string;
}) {
  let colors = props.colors || "text-pink-600 bg-pink-200";
  return (
    <span
      onClick={() => props.setCurrentTopic(props.tagText)}
      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1 cursor-pointer ${colors}`}
    >
      #{props.tagText}
    </span>
  );
}
export default function Home() {
  const [currentTopic, setCurrentTopic] = useState("");
  return (
    <main className="flex flex-col items-center">
      <h2>Topics</h2>
      <div>
        <Tag
          setCurrentTopic={setCurrentTopic}
          tagText="breakfast"
          colors="text-pink-600 bg-pink-200 "
        />
        <Tag
          setCurrentTopic={setCurrentTopic}
          tagText="bagels"
          colors="text-white bg-gradient-to-r from-cyan-500 to-blue-500"
        />
        <Tag
          setCurrentTopic={setCurrentTopic}
          tagText="donuts"
          colors="text-white bg-gradient-to-r to-slate-800 from-blue-500"
        />
        <Tag
          setCurrentTopic={setCurrentTopic}
          tagText="dogs"
          colors="text-white bg-slate-600"
        />
      </div>
      <div>
        This is a placeholder
        <div>what do I put in here?</div>
        <div>Current Topic: {currentTopic}</div>
      </div>
    </main>
  );
}
