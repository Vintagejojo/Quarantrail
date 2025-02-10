import React, { useState, useEffect } from 'react';
import './index.css';
import ChoiceBox from './components/Choices/Choices';
import TextContainer from './components/Textbox/TextBox';

function App() {
  const [node, setNode] = useState({ text: '', options: [] });
  const [health, setHealth] = useState(100);
  const [sanity, setSanity] = useState(100);

  useEffect(() => {
    fetchNode('1'); // ✅ Only fetches the first story node
  }, []);

  const fetchNode = (id) => {
    fetch(`http://localhost:3000/node/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched node data:', JSON.stringify(data, null, 2)); // Log full response
        setNode(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleChoice = (id, healthChange = 0, sanityChange = 0) => {
    console.log(`Choice selected: ${id}`);
    console.log(
      `Received health change: ${healthChange}, sanity change: ${sanityChange}`,
    );

    setHealth((prevHealth) => {
      const newHealth =
        healthChange !== 0
          ? Math.max(0, prevHealth + healthChange)
          : prevHealth;
      console.log(`Updated Health: ${newHealth}`);
      return newHealth;
    });

    setSanity((prevSanity) => {
      const newSanity =
        sanityChange !== 0
          ? Math.max(0, prevSanity + sanityChange)
          : prevSanity;
      console.log(`Updated Sanity: ${newSanity}`);
      return newSanity;
    });

    setTimeout(() => {
      console.log(`Final Health: ${health}, Final Sanity: ${sanity}`); // 🔍 Check updated state
      if (health + healthChange <= 0) {
        console.log('Game Over! You ran out of health.');
        alert('Game Over! You ran out of health.');
        return;
      }

      if (sanity + sanityChange <= 0) {
        console.log('Game Over! You lost your sanity.');
        alert('Game Over! You lost your sanity.');
        return;
      }

      fetchNode(id);
    }, 100);
  };

  return (
    <div className="App min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-blue-600 p-4 text-white text-center">
        <h1 className="text-xl font-bold">Choose Your Own Adventure</h1>
      </header>

      <div className="image-container w-full max-w-md my-4">
        <img
          src="your-image-url.jpg"
          alt="Adventure"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <div className="text-container w-full max-w-md my-4 p-4 bg-white rounded-lg shadow-md">
        <TextContainer text={node.text} />
      </div>

      <div className="choices-container w-full max-w-md my-4 p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
        <ChoiceBox options={node.options} handleChoice={handleChoice} />
      </div>

      {/* Stats Bars */}
      <div className="bars-container w-full max-w-md my-4 p-4 bg-white rounded-lg shadow-md flex justify-between space-x-4">
        <div className="bar1 w-full h-4 bg-red-500 rounded text-white text-center">
          ❤️ Health: {health}
        </div>
        <div className="bar2 w-full h-4 bg-blue-500 rounded text-white text-center">
          🧠 Sanity: {sanity}
        </div>
      </div>
    </div>
  );
}

export default App;
