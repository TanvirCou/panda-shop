import { BsRobot } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const AIPromptField = ({ prompt, setPrompt, loading, error, handleKeyDown, handleSubmit }) => {
  return (
    <div className='w-full max-w-4xl mx-auto relative group z-20'>
      <div className='absolute -inset-1 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500' />

      {error && (
        <p className='text-rose-500 text-center text-sm font-medium mb-2'>{error}</p>
      )}
      <div className='relative bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start p-2 sm:p-3 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 z-10'>
        <div className='p-2.5 pt-3 sm:p-4 sm:pt-5 flex-shrink-0'>
           <BsRobot className='w-5 h-5 sm:w-7 sm:h-7 text-emerald-500' />
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full bg-transparent border-none focus:ring-0 focus:outline-none text-base sm:text-lg text-gray-800 placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400 py-3 sm:py-4 px-2 sm:px-3 resize-none h-[120px] sm:h-[140px] leading-relaxed'
          placeholder='e.g. "I need some comfortable running shoes under $100" or "Show me powerful gaming laptops"...'
        />

        <div className='p-1.5 pt-2 sm:p-2 sm:pt-3 flex-shrink-0'>
          <button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className={`
              bg-emerald-500 text-white p-2 sm:p-3.5 rounded-xl sm:rounded-2xl
              transition-all duration-300 shadow-md
              hover:bg-emerald-400 hover:-translate-y-0.5
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
              flex items-center justify-center
            `}
          >
            {loading ? (
              <svg className='animate-spin h-6 w-6 text-white' viewBox='0 0 24 24' fill='none'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
              </svg>
            ) : (
              <IoIosArrowForward className="w-5 h-5 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPromptField;
