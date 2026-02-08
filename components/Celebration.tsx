
import React from 'react';
import { Heart } from 'lucide-react';

const Celebration: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 md:p-8 z-10 relative overflow-y-auto">
      <div className="max-w-2xl w-full animate-in fade-in zoom-in duration-1000 space-y-8">
        
        {/* The Romantic Illustration */}
        <div className="relative mx-auto w-64 h-64 md:w-96 md:h-96 mb-8 animate-subtle">
           <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-20 -z-10 animate-pulse"></div>
           {/* We use the uploaded image from the prompt. 
               In this context, we'll represent it as a beautiful image element. */}
           <img 
             src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop" 
             alt="Romantic Couple"
             className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
             onError={(e) => {
               // Fallback if the external link fails, though the prompt image is what we really want.
               (e.target as HTMLImageElement).src = "https://img.freepik.com/free-vector/romantic-couple-illustration_23-2148417646.jpg";
             }}
           />
           {/* User's provided image placeholder logic: 
               The prompt image shows a couple kissing with a circular floral background. 
               I've used a high quality unsplash as a placeholder that matches the vibe, 
               but in a real deployment the user would point this to their local asset. 
           */}
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-romantic text-gray-800 font-light">
            I love you, {name}
          </h1>

          <p className="text-red-400 font-light tracking-[0.4em] uppercase text-xs md:text-sm animate-pulse">
            See you on February 14th! 💖
          </p>
        </div>

        <div className="flex justify-center gap-6 py-4">
          <Heart size={20} className="text-red-300 animate-bounce" style={{ animationDelay: '0s' }} fill="currentColor" />
          <Heart size={24} className="text-red-400 animate-bounce" style={{ animationDelay: '0.2s' }} fill="currentColor" />
          <Heart size={20} className="text-red-300 animate-bounce" style={{ animationDelay: '0.4s' }} fill="currentColor" />
        </div>

        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-red-50 max-w-lg mx-auto">
            <p className="text-gray-600 font-light italic text-lg leading-relaxed">
              "Every day feels like Valentine's Day with you, Makayla. Thank you for saying yes to forever."
            </p>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
