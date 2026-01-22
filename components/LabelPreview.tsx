
import React, { useEffect, useRef } from 'react';
import { LabelData } from '../types';
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

    // Generate QR Code - Smaller scale to ensure it fits perfectly
    if (qrCanvasRef.current && data.orderId) {
      QRCode.toCanvas(qrCanvasRef.current, data.orderId, {
        margin: 0,
        scale: 2,
        width: 50,
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
      
      {/* Outer Decorative Tracking Numbers - No Borders, 3 per side */}
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
        <div className="flex items-center justify-between px-2 pt-0.5 pb-0.5">
           <div className="flex items-center gap-1">
              <div className="bg-[#ee4d2d] rounded-sm p-0.5 w-4.5 h-4.5 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M19,6.5L17.5,4H6.5L5,6.5V19a2,2,0,0,0,2,2H17a2,2,0,0,0,2-2V6.5M7,19V11H17v8H7M17,9H7V6.5h10V9Z"/></svg>
              </div>
              <span className="text-[#ee4d2d] text-[16px] font-black tracking-tighter" style={{ fontFamily: 'Inter' }}>Shopee</span>
           </div>
           <span className="text-[24px] font-black tracking-tight leading-none">{data.serviceType}</span>
           <div className="flex flex-col items-end">
              <div className="text-red-600 font-black italic text-[26px] leading-none tracking-tighter" style={{ fontFamily: 'Inter' }}>SPX</div>
              <div className="text-[4px] bg-red-600 text-white font-black px-1 py-0.5 tracking-[0.2em] -mt-1 uppercase leading-none">EXPRESS</div>
           </div>
        </div>

        {/* Dotted Line 1 */}
        <div className="border-t-[1.5px] border-black border-dotted mx-1"></div>

        {/* Row 2: Main Code & Resi Info */}
        <div className="flex mt-1 px-1 gap-1">
           {/* Main Code Box */}
           <div className="w-[36%] border-[1.5px] border-black flex items-center justify-center h-[85px]">
              <span className="text-[32px] font-black tracking-tighter leading-none text-center px-1">{data.mainCode}</span>
           </div>
           
           {/* Hub Sub and Barcode Area */}
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
              {/* Barcode Area */}
              <div className="flex-grow flex items-center justify-center px-1 py-1 bg-white overflow-hidden">
                 <svg ref={barcodeRef} className="max-w-full h-full"></svg>
              </div>
           </div>
        </div>

        {/* Dotted Line 2 */}
        <div className="border-t-[1.5px] border-black border-dotted mx-1 mt-0.5"></div>

        {/* Row 3: Address Content */}
        <div className="flex flex-grow relative min-h-[85px]">
           {/* Watermark */}
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.1] z-0 pointer-events-none">
             <span className="text-[80px] font-black tracking-[0.1em]">{data.watermark}</span>
           </div>

           <div className="w-1/2 p-1.5 flex flex-col z-10 overflow-hidden">
              <span className="text-[9px] font-black mb-0.5">Penerima:</span>
              <span className="text-[12px] font-black mb-1 truncate leading-none">{data.recipientName}</span>
              <div className="border border-black w-[90px] h-[16px] mb-1 shrink-0"></div>
              <p className="text-[8.5px] font-bold leading-[1.1] uppercase text-justify overflow-hidden">
                 {data.recipientAddress}
              </p>
           </div>
           
           <div className="w-1/2 p-1.5 flex flex-col z-10 overflow-hidden">
              <span className="text-[9px] font-black mb-0.5">Pengirim:</span>
              <span className="text-[10.5px] font-bold mb-0.5 truncate leading-none">{data.senderName}</span>
              <span className="text-[9.5px] font-bold mb-0.5">{data.senderPhone}</span>
              <span className="text-[10px] font-black uppercase tracking-tight truncate leading-tight">{data.senderCity}</span>
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
              <span className="text-[9px] font-bold uppercase truncate">{data.village}</span>
           </div>
        </div>

        {/* Row 5: Cashless Banner */}
        <div className="border-y border-black h-[24px] mt-1 flex items-center px-1.5 shrink-0 bg-white">
           <div className="flex items-center w-full">
              <span className="text-[10px] font-black pr-2 shrink-0">CASHLESS</span>
              <div className="w-[1px] h-3 bg-black mx-1.5"></div>
              <span className="text-[9px] font-bold italic truncate">Penjual tidak perlu bayar ongkir ke Kurir</span>
           </div>
        </div>

        {/* Row 6: Final Metadata & QR Section - Balanced Proportions */}
        <div className="flex mt-0.5 shrink-0 h-[75px]">
           <div className="w-[80%] flex flex-col py-0.5 pl-1.5 gap-0.5 justify-center overflow-hidden">
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
           
           <div className="w-[20%] flex items-center justify-center p-0.5 shrink-0">
              <div className="w-full h-full flex items-center justify-center">
                 <canvas 
                    ref={qrCanvasRef} 
                    className="max-w-full max-h-full object-contain"
                    style={{ width: '45px', height: '45px' }}
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
