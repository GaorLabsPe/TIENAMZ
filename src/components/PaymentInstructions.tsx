import React, { useState } from 'react';
import { STORE_TIENDA_INFO } from '../data';
import { Check, Copy, Landmark, QrCode } from 'lucide-react';

interface PaymentInstructionsProps {
  theme?: 'dark' | 'light';
}

export const PaymentInstructions: React.FC<PaymentInstructionsProps> = ({ theme = 'dark' }) => {
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_TIENDA_INFO.yapeNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-[#121316] border-zinc-800 text-zinc-300'} border rounded-xl p-4 font-mono text-xs transition-colors duration-300`}>
      <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${isLight ? 'border-zinc-150 text-[#9d246c]' : 'border-zinc-800/60 text-[#ff7da2]'}`}>
        <Landmark className="w-4 h-4" />
        <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-zinc-900' : 'text-white'}`}>MÉTODO DE PAGO: YAPE</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Styled Yape scan card */}
        <div className="bg-gradient-to-br from-[#00bcd4]/10 via-[#7952b3]/20 to-[#9d246c]/20 p-3.5 rounded-lg border border-[#7952b3]/30 relative overflow-hidden flex flex-col md:flex-row gap-4 items-center">
          
          <div className="flex-1 text-center md:text-left z-10 w-full">
            <div className="flex items-center gap-1.5 justify-center md:justify-start mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#12c2e9] animate-pulse" />
              <span className="text-white font-black text-sm tracking-wide">YAPEA AQUÍ</span>
            </div>
            
            <div className="space-y-1 my-2">
              <p className="text-zinc-350 text-[11px] font-sans">Número Celular:</p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xl font-bold font-mono tracking-wider text-[#f5ea5d]">
                  {STORE_TIENDA_INFO.yapeNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-md bg-zinc-850 hover:bg-zinc-750 text-zinc-250 transition-colors cursor-pointer"
                  title="Copiar número de Yape"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="text-[11px] font-sans leading-snug text-zinc-150">
              <p className="font-medium text-white">Titular: <span className="text-teal-300">{STORE_TIENDA_INFO.yapeOwner}</span></p>
              <p className="text-[10px] text-zinc-350 mt-1">Sube la captura de tu Yape al chat de WhatsApp al enviar tu orden.</p>
            </div>
          </div>

          {/* Simulated Yape QR Display */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-black/60 p-2.5 rounded-lg border border-zinc-800 z-10">
            <div className="relative w-24 h-24 bg-white p-1 rounded-md flex items-center justify-center">
              <QrCode className="w-20 h-20 text-[#2c1d3c]" />
              {/* Central Yape Star Graphic Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#831e67] rounded-full flex items-center justify-center border border-white text-[9px] font-black text-white">
                mzb
              </div>
            </div>
            <span className="text-[9px] text-purple-300 font-bold">ESCANEADOR QR</span>
          </div>
        </div>

        {/* Steps */}
        <div className={`space-y-2 ${isLight ? 'text-zinc-650' : 'text-zinc-400'}`}>
          <p className={`font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-300'} mb-1`}>Pasos para completar tu compra:</p>
          <div className="flex gap-2">
            <span className={`${isLight ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-white'} font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]`}>1</span>
            <span>Agrega tus polos favoritos al carrito y selecciona tu talla.</span>
          </div>
          <div className="flex gap-2">
            <span className={`${isLight ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-white'} font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]`}>2</span>
            <span>Realiza el Yapeo del monto total al número de celular <strong className={isLight ? 'text-zinc-900 font-bold' : 'text-white'}>{STORE_TIENDA_INFO.yapeNumber}</strong>.</span>
          </div>
          <div className="flex gap-2">
            <span className={`${isLight ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-white'} font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]`}>3</span>
            <span>Llena tus datos de entrega (o selecciona recojo) y coloca el código de operación del Yape.</span>
          </div>
          <div className="flex gap-2">
            <span className={`${isLight ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-white'} font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]`}>4</span>
            <span>Haz clic en &quot;Enviar Pedido a WhatsApp&quot; para abrir el chat del negocio con tu pedido reservado. ¡Adjunta el screenshot de tu yapeo y listo!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
