import axios from "axios";
import { useState } from "react";
import DisplayListItems from "./Components/DisplayListItems.js"
function App() {

  const [input, setInput] = useState("");
  const handleAddItems = async () => {
    try {
      const response = await axios.post("https://todo-elitetech-backend.onrender.com/api/addTask", { task: input });
      if (response.status === 200) {
        console.log(response.data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItems();
    }
  };

  return (
    <div className="BACKGROUND flex flex-col items-center justify-center h-screen absolute inset-0 -z-10 w-full bg-[#faf5ec] pt-4 pb-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1.5px)] [background-size:16px_16px] ">
      <div className="CARD sm:w-[40%] md:w-[90%] xl:w-[40%] bg-white p-10 rounded-lg shadow ">
        <div className="flex gap-3 items-center justify-start mb-4">
          <h1 className="text-4xl font-semibold text-gray-700">Todo List</h1>
          <i className="fa-solid fa-pen-to-square text-3xl text-gray-700"></i>
        </div>
        <input
          type="text"
          onKeyPress={handleKeyPress}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="bg-gray-100 outline-none py-3 pl-6 pr-12 sm:w-[20%] md:w-[85%] lg:w-[85%]  xl:w-[85%] rounded-full"
          placeholder="Add your task"
        />
        <button onClick={handleAddItems} className="bg-gray-700 py-3 px-9 -ml-10 rounded-full text-white mb-5">
          Add
        </button>
        <DisplayListItems />
      </div>
      <div className="flex items-center gap-1 text-gray-400 mt-3">
        <i className="fa-solid fa-circle-exclamation text-gray-400"></i>
        <p>
          Tip: Press <span className="bg-gray-200 p-1 rounded-md">Enter</span> - Add & Update
        </p>
      </div>
    </div>
  );
}

export default App;
