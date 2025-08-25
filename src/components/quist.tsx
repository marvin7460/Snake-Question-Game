type QuizModalProps = {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswered: (isCorrect: boolean) => void;
};

export default function QuizModal({ question, onAnswered, }: QuizModalProps) {
  function handleClick(option: string) {
    const isCorrect = option === question.answer;
    // Aquí puedes mostrar feedback si quieres
    setTimeout(() => onAnswered(isCorrect), 500); // Espera un poco antes de continuar
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <div className="flex flex-col gap-2">
          {question.options.map(opt => (
            <button
              key={opt}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => handleClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}