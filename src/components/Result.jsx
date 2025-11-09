export default function Result({ error, result, message, handleRestart }) {
  return (
    <>
      {result && (
        <div className="bg-white mt-6 p-6 shadow-lg rounded-2xl text-center max-w-md w-full">
          <p className="mb-3">{message}</p>

          <h2 className="text-xl font-semibold text-gray-800">
            Persona: {result.persona_name}
          </h2>
          <p className="text-gray-600 mt-2">{result.health_advice}</p>
          <button
            onClick={handleRestart}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
          >
            Restart
          </button>
        </div>
      )}
      {error && (
        <div className="bg-white mt-6 p-6 shadow-lg rounded-2xl text-center max-w-md w-full">
          <p className="mb-3">{message}</p>
          <p>(wait for 50s before retrying if this is your first try)</p>
          <button
            onClick={handleRestart}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
          >
            Restart
          </button>
        </div>
      )}
    </>
  );
}
