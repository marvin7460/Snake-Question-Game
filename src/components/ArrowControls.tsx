type ArrowControlsProps = {
  onDirection: (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => void;
};

export default function ArrowControls({ onDirection }: ArrowControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <button
        className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow hover:bg-gray-400"
        onClick={() => onDirection("UP")}
        aria-label="Arriba"
      >
        ⬆️
      </button>
      <div className="flex gap-14">
        <button
          className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow hover:bg-gray-400"
          onClick={() => onDirection("LEFT")}
          aria-label="Izquierda"
        >
          ⬅️
        </button>
        <button
          className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow hover:bg-gray-400"
          onClick={() => onDirection("RIGHT")}
          aria-label="Derecha"
        >
          ➡️
        </button>
      </div>
      <button
        className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow hover:bg-gray-400"
        onClick={() => onDirection("DOWN")}
        aria-label="Abajo"
      >
        ⬇️
      </button>
    </div>
  );
}