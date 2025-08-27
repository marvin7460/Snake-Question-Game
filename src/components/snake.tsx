import { useState, useEffect } from "react";
import QuizModal from "./quist";
import ArrowControls from "./ArrowControls";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"| "NONE";
type Position = [number, number];

const GRID_SIZE = 17;

const initialSnake: Position[] = [
  [8, 8]
];

const questions = [
  { 
    question: "¿Cómo se define un lenguaje dentro del contexto de la Teoría de la Computación?", 
    options: ["Conjunto de signos y reglas", "Un diccionario de palabras", "Una forma de hablar"], 
    answer: "Conjunto de signos y reglas" 
  },
  { 
    question: "¿Qué es un signo y qué función cumple en un lenguaje?", 
    options: ["Un concepto abstracto que representa objetos", "Una palabra sin sentido", "Un error de escritura"], 
    answer: "Un concepto abstracto que representa objetos" 
  },
  { 
    question: "¿Qué se entiende por interpretación en el uso de los signos?", 
    options: ["Proceso de relacionar el signo con un objeto o idea", "Traducción literal de un idioma", "Cambio de significado por contexto"], 
    answer: "Proceso de relacionar el signo con un objeto o idea" 
  },
  { 
    question: "¿Cuál es la diferencia entre signo y símbolo?", 
    options: ["El símbolo es un signo creado convencionalmente", "No hay diferencia", "El signo es siempre abstracto y el símbolo no"], 
    answer: "El símbolo es un signo creado convencionalmente" 
  },
  { 
    question: "¿Qué significa el término 'denotado' en relación con los signos?", 
    options: ["El objeto al que se refiere el signo", "Las características del signo", "Un significado ambiguo"], 
    answer: "El objeto al que se refiere el signo" 
  },
  { 
    question: "¿Qué se entiende por 'designado' de un signo y cómo se determina?", 
    options: ["Características o propiedades del signo, definidas por su definición", "Objeto al que se refiere el signo", "Un sinónimo del signo"], 
    answer: "Características o propiedades del signo, definidas por su definición" 
  },
  { 
    question: "¿Qué se denomina ambigüedad en los signos?", 
    options: ["Que un signo tenga más de un designado", "Que un signo no tenga significado", "Que un signo cambie de idioma"], 
    answer: "Que un signo tenga más de un designado" 
  },
  { 
    question: "¿Qué papel cumplen las reglas sintácticas en un lenguaje?", 
    options: ["Ordenan y relacionan los signos", "Definen su significado", "Relacionan signos con usuarios"], 
    answer: "Ordenan y relacionan los signos" 
  },
  { 
    question: "¿Cómo se diferencian las reglas semánticas de las sintácticas?", 
    options: ["Semánticas relacionan signos con significados, sintácticas ordenan signos", "Semánticas ordenan signos, sintácticas dan significado", "No hay diferencia"], 
    answer: "Semánticas relacionan signos con significados, sintácticas ordenan signos" 
  },
  { 
    question: "¿Qué función tienen las reglas pragmáticas en la comunicación?", 
    options: ["Vinculan los signos con sus usuarios", "Ordenan los signos", "Definen la fonética"], 
    answer: "Vinculan los signos con sus usuarios" 
  },
  { 
    question: "¿Qué disciplinas componen la gramática de los lenguajes?", 
    options: ["Morfología, sintaxis y fonética", "Semántica y pragmática", "Ortografía y gramática"], 
    answer: "Morfología, sintaxis y fonética" 
  },
  { 
    question: "¿De qué se ocupa la morfología en un lenguaje?", 
    options: ["De la forma de las palabras", "De la pronunciación de signos", "De la relación entre usuarios"], 
    answer: "De la forma de las palabras" 
  },
  { 
    question: "¿Qué estudia la fonética dentro de la gramática?", 
    options: ["La expresión oral de los signos", "La escritura de los signos", "La semántica de los signos"], 
    answer: "La expresión oral de los signos" 
  },
  { 
    question: "¿Qué diferencia fundamental existe entre los lenguajes naturales y los lenguajes formales?", 
    options: ["Naturales permiten variaciones, formales son rígidos", "Naturales no tienen gramática, formales sí", "Formales no transmiten significado"], 
    answer: "Naturales permiten variaciones, formales son rígidos" 
  },
  { 
    question: "¿Por qué los lenguajes formales son apropiados para la interpretación inequívoca de mensajes?", 
    options: ["Porque no permiten excepciones", "Porque son más fáciles de aprender", "Porque son parecidos a los naturales"], 
    answer: "Porque no permiten excepciones" 
  },
  { 
    question: "¿Qué importancia tienen las reglas en los lenguajes de programación respecto a los naturales?", 
    options: ["Son estrictas e inquebrantables", "Son opcionales", "Se basan en costumbres culturales"], 
    answer: "Son estrictas e inquebrantables" 
  },
  { 
    question: "¿Qué aportó la 'Teoría de las Gramáticas Transformacionales' de Noam Chomsky?", 
    options: ["Bases de la Lingüística Matemática y formalización de lenguajes", "Traducción automática", "Solo nuevas palabras"], 
    answer: "Bases de la Lingüística Matemática y formalización de lenguajes" 
  },
  { 
    question: "¿Cómo influyó la obra de Chomsky en el desarrollo de los lenguajes de programación?", 
    options: ["Permitió formalizar y crear compiladores", "Mejoró la pronunciación", "Simplificó la ortografía"], 
    answer: "Permitió formalizar y crear compiladores" 
  },
  { 
    question: "¿Por qué se considera necesario un tratamiento tanto sintáctico como semántico en traducción automática?", 
    options: ["Porque hay que entender significado y orden de palabras", "Porque basta con traducir palabra por palabra", "Porque los idiomas no tienen reglas"], 
    answer: "Porque hay que entender significado y orden de palabras" 
  },
  { 
    question: "¿Qué aplicaciones actuales tienen las técnicas de lenguajes formales en el procesamiento de lenguajes naturales?", 
    options: ["Traducción automática, interpretación de significados, diálogo con sistemas expertos", "Gramática escolar", "Publicidad y mercadotecnia"], 
    answer: "Traducción automática, interpretación de significados, diálogo con sistemas expertos" 
  }
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
        }

        return [newHead, ...prev.slice(0, -1)];
      });
    }, 200);
    return () => clearInterval(interval);
  }, [direction, food, showQuiz]);

  // Cuando responde la pregunta, genera nueva comida
  const handleAnswered = (isCorrect: boolean) => {
    //si es correcta agrander la serpiente
    if(isCorrect){
      setSnake(prev => [...prev, prev[prev.length - 1]]);
      setScore(s => s + 1);
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
      <div className={`flex flex-col items-center  ${showQuiz && "blur-xs" }`}>
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
        <div className="sm:hidden flex flex-col items-center mt-8">
          {/* ...tablero y modal */}
          <ArrowControls
            onDirection={dir => {
              // mismo control que para el teclado, evita reversa de dirección
              if (
                (dir === "UP" && direction !== "DOWN") ||
                (dir === "DOWN" && direction !== "UP") ||
                (dir === "LEFT" && direction !== "RIGHT") ||
                (dir === "RIGHT" && direction !== "LEFT")
              ) {
                setDirection(dir);
              }
            }}
          />
        </div>
    </>
  );
}