import { useState, useEffect } from "react";
import QuizModal from "./quist";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"| "NONE";
type Position = [number, number];

const GRID_SIZE = 20;

const initialSnake: Position[] = [
  [8, 8]
];

const questions = [
  { question: "¿Capital de España?", options: ["Madrid", "Barcelona"], answer: "Madrid" },
  { question: "¿2 * 2?", options: ["4", "8"], answer: "4" },
  { question: "¿Color primario?", options: ["Rojo", "Verde"], answer: "Rojo" },
];

function getRandomPosition(): Position {
  return [
    Math.floor(Math.random() * GRID_SIZE),
    Math.floor(Math.random() * GRID_SIZE),
  ];
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState<Direction>("NONE");
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Captura teclas
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Movimiento de la serpiente
  useEffect(() => {
    if (showQuiz) return; // Detén el movimiento si hay pregunta
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const newHead: Position = [...head];
        if (direction === "UP") newHead[1] -= 1;
        if (direction === "DOWN") newHead[1] += 1;
        if (direction === "LEFT") newHead[0] -= 1;
        if (direction === "RIGHT") newHead[0] += 1;

        // Colisión con bordes
        if (
          newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 || newHead[1] >= GRID_SIZE
        ){
          setScore(0);
          setDirection("NONE");
          return initialSnake;
        } 

        // Colisión con sí misma
        if (prev.some(p => p[0] === newHead[0] && p[1] === newHead[1])){
          setScore(0);
          setDirection("NONE");
          return initialSnake;
        } 

        // Comer comida
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setShowQuiz(true);
          setScore(s => s + 1);
        }

        return [newHead, ...prev.slice(0, -1)];
      });
    }, 120);
    return () => clearInterval(interval);
  }, [direction, food, showQuiz]);

  // Cuando responde la pregunta, genera nueva comida
  const handleAnswered = (isCorrect: boolean) => {
    //si es correcta agrander la serpiente
    if(isCorrect){
      setSnake(prev => [...prev, prev[prev.length - 1]]);
    }else{
      setScore(s => s - 1);
    }
    setShowQuiz(false);
    setFood(getRandomPosition());
    setCurrentQuestion(q => (q + 1) % questions.length);
  };

  // Renderiza el tablero
  return (
    <>     
      <div className={`flex flex-col items-center mt-8 ${showQuiz && "blur-xs" }`}>
        <h1 className="text-2xl font-bold mb-2">Snake Quiz Game</h1>
        <div className="mb-2 text-lg">Puntaje: {score}</div>
        <div
          className="grid bg-gray-200"
          style={{
            gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
            gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`
          }}
        >
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isSnake = snake.some(p => p[0] === x && p[1] === y);
            const isFood = food[0] === x && food[1] === y;
            return (
              <div
                key={idx}
                className={`w-5 h-5 border border-gray-300 
                  ${isSnake ? "bg-green-500" : ""}
                  ${isFood ? "bg-red-500" : ""}
                  `}
              />
            );
          })}
        </div>
      </div>
        {showQuiz &&
          <QuizModal
            question={questions[currentQuestion]}
            onAnswered={handleAnswered}
          />
        }
    </>
  );
}