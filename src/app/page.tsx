"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function getRandomElement(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
function Tag(props: {
  setCurrentTopic: (arg0: string) => void;
  tagText: string;
  colors?: string;
}) {
  let colorOptions = [
    "text-pink-600 bg-pink-200",
    // "text-white bg-gradient-to-r from-cyan-500 to-blue-500",
    // "text-white bg-gradient-to-r to-green-500 from-green-800",
  ];
  let colors = props.colors || getRandomElement(colorOptions);
  return (
    <span
      onClick={() => props.setCurrentTopic(props.tagText)}
      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1 cursor-pointer ${colors}`}
    >
      #{props.tagText}
    </span>
  );
}
function Passage(props: { passage: PassageObject }) {
  return (
    <div className="flex flex-col mt-5">
      <div>
        <strong>{props.passage.podcast} - </strong>
        {props.passage.episode}
      </div>
      <div>transcript: {props.passage.transcript}</div>
    </div>
  );
}

interface PassageObject {
  transcript: string;
  podcast: string;
  episode: string;
}

function getData() {
  const topicObjects = {
    breakfast: [
      {
        transcript: "I had a bagel for breakfast",
        podcast: "The Daily",
        episode: "The Daily Episode 1",
      },
      {
        transcript: "I had a donut for breakfast",
        podcast: "The Weekly",
        episode: "The Weekly Episode 88",
      },
    ],
    lunch: [
      {
        transcript: "I had a bagel for lunch",
        podcast: "The Daily",
        episode: "The Daily Episode 1",
      },
      {
        transcript: "I had a donut for lunch",
        podcast: "The Weekly",
        episode: "The Weekly Episode 88",
      },
    ],
    dinner: [
      {
        transcript: "Do you want to get dinner?",
        podcast: "The All In Podcast",
        episode: "The All In Podcast Episode 1000",
      },
    ],
  };
  return Promise.resolve(topicObjects);
}

export default function Home() {
  const [currentTopic, setCurrentTopic] = useState("");
  const [topicObjects, setTopicObjects] = useState({});
  useEffect(() => {
    getData().then((data) => {
      setTopicObjects(data);
    });
  }, []);

  useEffect(() => {
    console.log("kale kale content view loaded");

    fetch("http://10.10.245.96::8080/get_summarized_topics/", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoid: "2SORT6-Fv8s" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("KALE");
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);

  let topics = Object.keys(topicObjects);
  let topicPassages = [];
  if (currentTopic !== "" && topicObjects[currentTopic] !== undefined) {
    topicPassages = topicObjects[currentTopic];
  }
  // let topicPassages = currentTopic === "" ? [] : topicObjects[currentTopic];
  return (
    <main className="flex flex-col items-center">
      <div className="w-3/4 max-w-screen-xl">
        <h2 className="text-xl">Topics</h2>
        {topics.map((topic) => {
          return (
            <Tag
              setCurrentTopic={setCurrentTopic}
              tagText={topic}
              key={topic}
            />
          );
        })}
        <h3>
          Passages for <strong>#{currentTopic}</strong>
        </h3>
        {topicPassages.map((passage: PassageObject, i: number) => {
          return <Passage passage={passage} key={i} />;
        })}
      </div>
    </main>
  );
}
