import React from 'react';

interface SizeGuideProps {
  theme?: 'dark' | 'light';
}

export const SizeGuide: React.FC<SizeGuideProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className={`${isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-[#121316] border-zinc-800 text-zinc-300'} border rounded-xl p-4 text-xs font-mono transition-colors duration-300`}>
      <div className={`flex items-center justify-between mb-3 pb-2 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800/60'}`}>
        <span className={`${isLight ? 'text-emerald-600' : 'text-[#6ae29a]'} font-bold`}>📏 GUÍA DE TALLAS - OVERSIZED MZ.B LT.6</span>
        <span className="text-zinc-500">Unidades en centímetros (cm)</span>
      </div>
      
      <p className={`${isLight ? 'text-zinc-650' : 'text-zinc-400'} mb-3 leading-relaxed`}>
        Nuestras prendas cuentan con un corte **Oversized Boxy Fit** (más anchas y de caída recta holgada). Si prefieres un ajuste convencional, te sugerimos pedir una talla menor a tu talla habitual.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${isLight ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-400'}`}>
              <th className="py-2 pr-2">TALLA</th>
              <th className="py-2 px-2 text-center">ANCHO (Axila/Axila)</th>
              <th className="py-2 px-2 text-center">LARGO TOTAL</th>
              <th className="py-2 pl-2 text-right">MANGA</th>
            </tr>
          </thead>
          <tbody className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>
            <tr className={`border-b ${isLight ? 'border-zinc-200/60 hover:bg-zinc-100/70' : 'border-zinc-800/40 hover:bg-zinc-800/20'}`}>
              <td className={`py-2 pr-2 font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>S</td>
              <td className="py-2 px-2 text-center">56 cm</td>
              <td className="py-2 px-2 text-center">72 cm</td>
              <td className="py-2 pl-2 text-right">24 cm</td>
            </tr>
            <tr className={`border-b ${isLight ? 'border-zinc-200/60 hover:bg-zinc-100/70' : 'border-zinc-800/40 hover:bg-zinc-800/20'}`}>
              <td className={`py-2 pr-2 font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>M</td>
              <td className="py-2 px-2 text-center">59 cm</td>
              <td className="py-2 px-2 text-center">75 cm</td>
              <td className="py-2 pl-2 text-right">25 cm</td>
            </tr>
            <tr className={`border-b ${isLight ? 'border-zinc-200/60 hover:bg-zinc-100/70' : 'border-zinc-800/40 hover:bg-zinc-800/20'}`}>
              <td className={`py-2 pr-2 font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>L</td>
              <td className="py-2 px-2 text-center">62 cm</td>
              <td className="py-2 px-2 text-center">78 cm</td>
              <td className="py-2 pl-2 text-right">26 cm</td>
            </tr>
            <tr className={isLight ? 'hover:bg-zinc-100/70' : 'hover:bg-zinc-800/20'}>
              <td className={`py-2 pr-2 font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>XL</td>
              <td className="py-2 px-2 text-center">65 cm</td>
              <td className="py-2 px-2 text-center">81 cm</td>
              <td className="py-2 pl-2 text-right">27 cm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`mt-3 p-2 rounded border text-[10px] leading-relaxed ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-500' : 'bg-black/40 border-zinc-800/40 text-zinc-500'}`}>
        * Todas las medidas son referenciales y pueden variar sutilmente en +/- 1cm debido al proceso artesanal de confección y pre-encogido de lavado.
      </div>
    </div>
  );
};
