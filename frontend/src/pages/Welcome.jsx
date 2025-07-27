import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
  return (
    // <section class="min-h-screen flex items-center justify-center bg-gray-100">
 <section className="bg-gray-100 py-16">
  <div className="text-center px-4 max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
      Welcome to the AI Playground!
    </h1>
    <p className="text-lg md:text-xl text-gray-600 mb-6">
      Ready to challenge your mind and imagination?
    </p>
    <p className="text-md md:text-lg text-gray-500 mb-6">
      This interactive space lets you explore the fun side of AI — from generating unique stories based on your ideas, to cracking clever riddles, and discovering surprising word connections in our Word Association challenge.
    </p>
    <p className="text-lg font-medium text-gray-700">
      Just type, play, and see where your thoughts take you!
    </p>
    <p className="text-2xl mt-4">Let the games begin</p>

     {/* <!-- Game Buttons  */}
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
      <Link to="/storygen" className="bg-[#D14D72] hover:bg-[#FFABAB] text-white hover:text-gray-800 py-2 px-6 rounded-lg transition">
        Story Generator
      </Link>
      <Link to="/riddle" className="bg-[#27391C] hover:bg-[#B0DB9C] text-white hover:text-gray-800 py-2 px-6 rounded-lg transition">
        Riddle Challenge
      </Link>
      <Link to="/wordassoc" className="bg-[#A27B5C] hover:bg-[#B1AB86] text-white hover:text-gray-800 py-2 px-6 rounded-lg transition">
        Word Association
      </Link>
    </div>
  </div>
</section>

  )
}

export default Welcome