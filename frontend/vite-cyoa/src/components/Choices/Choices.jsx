import React from 'react';

const ChoicesContainer = ({ options, handleChoice }) => {
  console.log(
    'Rendering ChoicesContainer with options:',
    JSON.stringify(options, null, 2),
  );

  return (
    <div className="choices-container w-full max-w-md my-4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4">
      {options.map((option) => {
        console.log('Rendering option:', option); // Log each option

        return (
          <button
            key={option.id}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
              console.log(
                `Clicked: ${option.choice} | Health: ${option.health} | Sanity: ${option.sanity}`,
              );
              handleChoice(option.id, option.health ?? 0, option.sanity ?? 0);
            }}
          >
            {option.choice}
          </button>
        );
      })}
    </div>
  );
};

export default ChoicesContainer;
