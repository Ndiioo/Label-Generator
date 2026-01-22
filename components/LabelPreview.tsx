
import React, { useEffect, useRef } from 'react';
import { LabelData } from '../types.ts';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  const barcodeRef = useRef<SVGSVGElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate Barcode - High density for compact space
    if (barcodeRef.current && data.resiNumber) {
      try {
        JsBarcode(barcodeRef.current, data.resiNumber, {
          format: "CODE128",
          lineColor: "#000",
          width: 1.4,
          height: 45,
          displayValue: false,
          margin: 0,
          background: "transparent"
        });
      } catch (e) {
        console.error("Barcode generation failed", e);
      }
    }

    // Generate QR Code - Scaled to fit its allocated space
    if (qrCanvasRef.current && data.orderId) {
      QRCode.toCanvas(qrCanvasRef.current, data.orderId, {
        margin: 0,
        scale: 2,
        width: 65,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }, (error) => {
        if (error) console.error("QR generation failed", error);
      });
    }
  }, [data.resiNumber, data.orderId]);

  return (
    <div className="label-font w-[100mm] h-[100mm] bg-white text-black relative p-0 flex flex-col overflow-hidden mx-auto select-none print:m-0 print:border-0 shadow-sm">
      
      {/* Outer Decorative Tracking Numbers */}
      <div className="absolute top-0 left-0 right-0 h-[12px] flex items-center justify-between whitespace-nowrap bg-white z-30 overflow-hidden px-12">
        {Array(3).fill(0).map((_, i) => <span key={i} className="text-[6px] font-bold">{data.resiNumber}</span>)}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[12px] flex items-center justify-between whitespace-nowrap bg-white z-30 overflow-hidden px-12">
        {Array(3).fill(0).map((_, i) => <span key={i} className="text-[6px] font-bold">{data.resiNumber}</span>)}
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-[12px] flex flex-col items-center justify-between whitespace-nowrap bg-white z-30 overflow-hidden py-12">
        {Array(3).fill(0).map((_, i) => <span key={i} className="text-[6px] font-bold transform -rotate-90 block">{data.resiNumber}</span>)}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-[12px] flex flex-col items-center justify-between whitespace-nowrap bg-white z-30 overflow-hidden py-12">
        {Array(3).fill(0).map((_, i) => <span key={i} className="text-[6px] font-bold transform -rotate-90 block">{data.resiNumber}</span>)}
      </div>

      {/* Main Border Box Wrapper */}
      <div className="m-[12px] flex flex-col flex-grow border-[1.8px] border-black relative z-10 overflow-hidden">
        
        {/* Row 1: Header */}
        <div className="flex items-center justify-between px-2 pt-1.5 pb-1">
           <div className="flex items-center gap-1 shrink-0">
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30,30 C30,15 70,15 70,30" fill="none" stroke="#EE4D2D" strokeWidth="8" strokeLinecap="round" />
                  <path d="M20,35 L80,35 C83,35 85,37 85,40 L80,85 C79,90 75,94 70,94 L30,94 C25,94 21,90 20,85 L15,40 C15,37 17,35 20,35 Z" fill="#EE4D2D" />
                  <path d="M58,55 C58,52 54,50 50,50 C44,50 42,54 42,58 C42,65 58,65 58,72 C58,76 56,80 50,80 C44,80 42,78 42,75" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[#EE4D2D] text-[18px] font-bold tracking-tight -ml-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Shopee</span>
           </div>
           <span className="text-[20px] font-black tracking-tight leading-none text-center flex-grow uppercase">{data.serviceType}</span>
           <div className="flex items-center justify-end shrink-0 w-[85px]">
              <svg viewBox="0 0 240 100" className="w-full h-auto">
                 <text x="10" y="70" fill="#EE4D2D" style={{ fontFamily: 'Inter, sans-serif', fontSize: '85px', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-2px' }}>SPX</text>
                 <g transform="translate(10, 80)">
                    <path d="M0 0 L15 0 L10 12 L-5 12 Z" fill="#EE4D2D" />
                    <path d="M22 0 L37 0 L32 12 L17 12 Z" fill="#EE4D2D" />
                    <path d="M44 0 L140 0 L135 12 L39 12 Z" fill="#EE4D2D" />
                    <text x="145" y="10" fill="#EE4D2D" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 900, fontStyle: 'italic' }}>EXPRESS</text>
                 </g>
              </svg>
           </div>
        </div>

        <div className="border-t-[1.5px] border-black border-dotted mx-1"></div>

        {/* Row 2: Barcode & Main Code */}
        <div className="flex mt-1 px-1 gap-1">
           <div className="w-[36%] border-[1.5px] border-black flex items-center justify-center h-[85px]">
              <span className="text-[32px] font-black tracking-tighter leading-none text-center px-1">{data.mainCode}</span>
           </div>
           <div className="w-[64%] flex flex-col gap-0.5">
              <div className="flex gap-1 h-[32px]">
                 <div className="w-[38%] border-[1.5px] border-black flex items-center justify-center bg-white px-0.5">
                    <span className="text-[9px] font-black text-center leading-tight uppercase">{data.hubSubCode}</span>
                 </div>
                 <div className="flex-grow border-[1.5px] border-black flex flex-col items-center justify-center bg-white px-0.5 overflow-hidden">
                    <span className="text-[7px] font-bold leading-none uppercase">No. Resi:</span>
                    <span className="text-[11px] font-black tracking-tight truncate w-full text-center">{data.resiNumber}</span>
                 </div>
              </div>
              <div className="flex-grow flex items-center justify-center px-1 py-1 bg-white overflow-hidden">
                 <svg ref={barcodeRef} className="max-w-full h-full"></svg>
              </div>
           </div>
        </div>

        <div className="border-t-[1.5px] border-black border-dotted mx-1 mt-0.5"></div>

        {/* Row 3: Address Content */}
        <div className="flex flex-grow relative min-h-[110px]">
           {/* Watermark */}
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] z-0 pointer-events-none select-none">
             <span 
                className="text-[100px] font-black tracking-[-0.05em] leading-none uppercase text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
             >
                {data.watermark}
             </span>
           </div>

           {/* Penerima Section - Expanded to 58% for more address space */}
           <div className="w-[58%] p-2 flex flex-col z-10 overflow-hidden relative">
              <span className="text-[9px] font-black mb-0.5">Penerima:</span>
              <span className="text-[12px] font-black truncate leading-none mb-1">{data.recipientName}</span>
              
              {/* Phone Box Section */}
              <div className="border border-black w-[100px] h-[16px] mb-1.5 shrink-0 flex items-center px-1 bg-white/50">
                 <span className="text-[9.5px] font-bold truncate">{data.recipientPhone}</span>
              </div>

              {/* Recipient Address - LEFT ALIGNED, SUPPORTS 2-3 LINES */}
              <p 
                className="text-[9px] font-bold leading-[1.1] text-left overflow-hidden pr-2"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                }}
              >
                 {data.recipientAddress}
              </p>
           </div>
           
           {/* Pengirim Section - Shifted to the right by reducing width to 42% and adding padding */}
           <div className="w-[42%] p-2 pl-3 flex flex-col z-10 overflow-hidden">
              <span className="text-[9px] font-black mb-0.5">Pengirim:</span>
              <span className="text-[10.5px] font-bold mb-0.5 truncate leading-none">{data.senderName}</span>
              <span className="text-[9.5px] font-bold leading-tight">{data.senderPhone}</span>
              {/* Sender City */}
              <span className="text-[10px] font-black uppercase tracking-tight truncate leading-tight mt-0.5">{data.senderCity}</span>
           </div>
        </div>

        {/* Row 4: Location Tags */}
        <div className="flex gap-1 h-[24px] mt-0.5 shrink-0 px-1">
           <div className="flex-grow border border-black flex items-center justify-center px-1 overflow-hidden">
              <span className="text-[9px] font-bold uppercase truncate">{data.district}</span>
           </div>
           <div className="flex-grow border border-black flex items-center justify-center px-1 overflow-hidden">
              <span className="text-[9px] font-bold uppercase truncate">{data.subDistrict}</span>
           </div>
           <div className="flex-grow border border-black flex items-center justify-center px-1 overflow-hidden">
              <span className="text-[9px] font-bold truncate">{data.village}</span>
           </div>
        </div>

        {/* Combined Row 5 & 6: Cashless and Metadata with Re-aligned QR Code */}
        <div className="flex mt-1 shrink-0">
           <div className="w-[78%] flex flex-col">
              <div className="border border-black h-[22px] self-start flex items-center px-2 mb-0.5 bg-white ml-1">
                 <span className="text-[10px] font-black whitespace-nowrap">CASHLESS</span>
                 <div className="w-[1px] h-3 bg-black mx-2"></div>
                 <span className="text-[8.5px] font-bold italic truncate">Penjual tidak perlu bayar ongkir ke Kurir</span>
              </div>

              <div className="flex flex-col py-1 pl-1.5 gap-0.5 justify-center overflow-hidden">
                 <div className="flex items-center gap-3">
                    <div className="flex gap-1 items-baseline">
                      <span className="text-[9.5px] font-black">Berat:</span>
                      <span className="text-[9.5px] font-bold">{data.weight}</span>
                    </div>
                    <div className="flex gap-1 items-baseline">
                      <span className="text-[9.5px] font-black whitespace-nowrap">COD Cek Dulu:</span>
                      <span className="text-[9.5px] font-bold">{data.codCekDulu}</span>
                    </div>
                 </div>
                 <div className="flex gap-1 items-baseline">
                    <span className="text-[9.5px] font-black whitespace-nowrap">Batas Kirim:</span>
                    <span className="text-[9.5px] font-bold">{data.batasKirim}</span>
                 </div>
                 <div className="flex gap-1 items-baseline overflow-hidden">
                    <span className="text-[9.5px] font-black shrink-0">No.Pesanan:</span>
                    <span className="text-[9.5px] font-bold truncate tracking-tight">{data.orderId}</span>
                 </div>
              </div>
           </div>

           <div className="w-[22%] flex items-start justify-center p-1">
              <div className="w-full flex items-center justify-center mt-[-4px]">
                 <canvas 
                    ref={qrCanvasRef} 
                    className="object-contain"
                    style={{ width: '60px', height: '60px' }}
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
