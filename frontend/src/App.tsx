import axios from "axios";
import { useState } from "react";

type TColor = "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "purple" | "pink";
type TBgColor =
  | "bg-red-500"
  | "bg-orange-500"
  | "bg-yellow-500"
  | "bg-lime-500"
  | "bg-green-500"
  | "bg-cyan-500"
  | "bg-blue-500"
  | "bg-purple-500"
  | "bg-pink-500";
const colors: TColor[] = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
];
const bgColors: TBgColor[] = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
];

// interface ICell {
//   number: number,
//   color: TColor
// }

function App() {
  const [placedColors, setPlacedColors] = useState<TColor[]>([]);
  const [currentColor, setCurrentColor] = useState<TColor>();

  const loadCells = async () => {
    const cellsCollors = (await axios.get(import.meta.env.VITE_BACKEND_URL + "/cells")).data as TColor[];
    console.log(cellsCollors);
    setPlacedColors(cellsCollors);
  }

  const saveCurrentCells = async () => {
    console.log(placedColors)
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/cells", placedColors)
      .then(response => {
        // Handle successful response
        console.log('Response:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  }

  const placeCurrentColor = (cellIndex: number) => {
    const newPlacedColors: TColor[] = placedColors;
    if (!currentColor) throw new Error();
    newPlacedColors[cellIndex] = currentColor;
    console.log(newPlacedColors);
    setPlacedColors([ ...newPlacedColors ]);
  };

  const getBgColorByColor = (color: TColor): TBgColor | "" => {
    const indexOfColor = colors.indexOf(color);
    if (indexOfColor !== -1) return bgColors[indexOfColor];
    else return "";
  };

  return (
    <div className="flex mx-auto flex-col max-w-[50rem] w-fit">
      <h1 className="flex mx-auto my-4 font-bold">Naruto Colors</h1>

      <button onClick={loadCells} className="black-button mx-auto max-w-[10rem] w-[10rem] p-2 @extend hover:scale-110 active:scale-95 transition duration-200">Load cells</button>

      <div className="choose-color">
        <h2 className="text-3xl flex mx-auto my-4">
          {currentColor ? "Chosen color: " + currentColor : "Choose color:"}
        </h2>
        <ul className="flex gap-2 flex-wrap">
          {colors.map((_, i) => (
            <li className="w-16 h-16" key={colors[i]}>
              <button
                className={
                  `${bgColors[i]} w-full h-full hover:scale-105 active:scale-95 transition duration-200 shadow-md` +
                  (currentColor === colors[i] ? " current-color" : "")
                }
                onClick={() => {
                  setCurrentColor(colors[i]);
                }}
              >
                {colors[i]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {currentColor || placedColors.length ? (
        <div className="place-color mt-8">
          <h2 className="text-3xl flex mx-auto mb-8">Place color to cell:</h2>
          <ul className="grid gap-4 grid-cols-3 m-auto max-w-72">
            {new Array(9).fill(undefined).map((_, i) => (
              <li className="flex" key={i + 1}>
                <button
                  onClick={() => {
                    placeCurrentColor(i);
                  }}
                  className={`font-bold text-3xl w-full h-16 border-white border-2 hover:scale-105 active:scale-95 transition duration-200 ${getBgColorByColor(
                    placedColors[i]
                  )}`}
                >
                  {i + 1} 
                </button>
              </li>
            ))}
          </ul>

          <div className="flex mx-auto mt-12">
            <button onClick={() => setPlacedColors([])} className="black-button mx-auto max-w-[10rem] w-[10rem] p-2 @extend hover:scale-110 active:scale-95 transition duration-200">Clear cells</button>
            <button onClick={saveCurrentCells} className="black-button mx-auto max-w-[10rem] w-[10rem] @extend hover:scale-110 active:scale-95 transition duration-200">Save cells</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
