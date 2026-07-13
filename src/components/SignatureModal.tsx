import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { X, Download, Eye, EyeOff, Trash2, ShieldAlert, ImagePlus, Move, Maximize2 } from 'lucide-react';
import CryptoJS from 'crypto-js';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  translations: any;
}

const SECRET_KEY = 'docusign-lite-local-secret-key'; // Obfuscation key for local storage

export default function SignatureModal({ isOpen, onClose, onSave, translations }: SignatureModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = [
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
  ];
  const padRefs = useRef<(SignaturePad | null)[]>([]);
  
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [layersVisible, setLayersVisible] = useState<boolean[]>([true, true, true]);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);
  
  const [uploadedImage, setUploadedImage] = useState<{
    element: HTMLImageElement;
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // To make the stroke look more stylized, we adjust the pad settings
  const padOptions = {
    minWidth: 1.0,
    maxWidth: 3.5,
    penColor: 'black',
    velocityFilterWeight: 0.85, // Increased for smoother, more stylized lines
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      setTimeout(() => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        
        canvasRefs.forEach((ref, index) => {
          const canvas = ref.current;
          if (canvas) {
            if (canvas.width === 0 || canvas.width !== canvas.offsetWidth * ratio) {
              canvas.width = canvas.offsetWidth * ratio;
              canvas.height = canvas.offsetHeight * ratio;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.scale(ratio, ratio);
              }
            }

            if (!padRefs.current[index]) {
              padRefs.current[index] = new SignaturePad(canvas, padOptions);
              // Add event listeners to save on draw
              padRefs.current[index]?.addEventListener("endStroke", () => {
                saveToLocalStorage();
              });
            }
          }
        });

        loadFromLocalStorage();
      }, 50); // Delay to allow the modal DOM to fully render and calculate sizes
    } else if (!isOpen) {
      padRefs.current.forEach(pad => pad?.off());
      padRefs.current = [];
      setActiveLayer(0);
      setLayersVisible([true, true, true]);
    }
  }, [isOpen]);
  
  const loadFromLocalStorage = () => {
    try {
      const savedDataEncrypted = localStorage.getItem('signature_layers_encrypted');
      if (savedDataEncrypted) {
        const bytes = CryptoJS.AES.decrypt(savedDataEncrypted, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        
        if (decryptedData) {
          const parsed = JSON.parse(decryptedData);
          setHasSavedData(true);
          parsed.forEach((data: any, index: number) => {
            if (data && data.length > 0 && padRefs.current[index]) {
              padRefs.current[index]?.fromData(data);
            }
          });
        }
      }
    } catch (e) {
      console.error('Error loading encrypted signature data', e);
    }
  };

  const saveToLocalStorage = () => {
    const dataToSave = padRefs.current.map(pad => pad ? pad.toData() : []);
    const jsonStr = JSON.stringify(dataToSave);
    const encrypted = CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
    localStorage.setItem('signature_layers_encrypted', encrypted);
    setHasSavedData(true);
  };

  const handleClearLayer = () => {
    if (padRefs.current[activeLayer]) {
      padRefs.current[activeLayer]?.clear();
      saveToLocalStorage();
    }
  };

  const handleDeleteAllSaved = () => {
    if (window.confirm(translations.deleteAllConfirm)) {
      localStorage.removeItem('signature_layers_encrypted');
      localStorage.removeItem('signature_layers'); // Clear legacy unencrypted if exists
      padRefs.current.forEach(pad => pad?.clear());
      setHasSavedData(false);
      alert(translations.deletedSuccess || "Datos locales borrados con éxito.");
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const maxWidth = 200;
      const maxHeight = 100;
      let width = img.width;
      let height = img.height;
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      if (ratio < 1) {
        width *= ratio;
        height *= ratio;
      }
      setUploadedImage({
        element: img,
        url,
        x: 50,
        y: 50,
        width,
        height
      });
      setHasSavedData(true);
    };
    img.src = url;
  };

  const handlePointerDownDrag = (e: React.PointerEvent) => {
    if (!uploadedImage) return;
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startImgX = uploadedImage.x;
    const startImgY = uploadedImage.y;
    
    const handlePointerMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setUploadedImage(prev => prev ? { ...prev, x: startImgX + dx, y: startImgY + dy } : null);
    };
    
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerDownResize = (e: React.PointerEvent) => {
    if (!uploadedImage) return;
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = uploadedImage.width;
    const startHeight = uploadedImage.height;
    
    const handlePointerMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const aspect = startWidth / startHeight;
      const newWidth = Math.max(20, startWidth + dx);
      const newHeight = newWidth / aspect;
      setUploadedImage(prev => prev ? { ...prev, width: newWidth, height: newHeight } : null);
    };
    
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const toggleLayerVisibility = (index: number) => {
    setLayersVisible(prev => {
      const newVis = [...prev];
      newVis[index] = !newVis[index];
      return newVis;
    });
  };

  const getComposedCanvas = () => {
    const mainCanvas = document.createElement('canvas');
    if (canvasRefs[0].current) {
      mainCanvas.width = canvasRefs[0].current.width;
      mainCanvas.height = canvasRefs[0].current.height;
      const ctx = mainCanvas.getContext('2d');
      if (ctx) {
        canvasRefs.forEach((ref, index) => {
          if (layersVisible[index] && ref.current) {
            ctx.drawImage(ref.current, 0, 0);
          }
        });

        if (uploadedImage?.element) {
           const ratio = Math.max(window.devicePixelRatio || 1, 1);
           ctx.drawImage(
             uploadedImage.element, 
             uploadedImage.x * ratio, 
             uploadedImage.y * ratio, 
             uploadedImage.width * ratio, 
             uploadedImage.height * ratio
           );
        }
      }
    }
    return mainCanvas;
  };

  const handleSave = () => {
    saveToLocalStorage();
    const mainCanvas = getComposedCanvas();
    const dataUrl = mainCanvas.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };
  
  const handleDownloadImage = () => {
    saveToLocalStorage();
    const mainCanvas = getComposedCanvas();
    const dataUrl = mainCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'mi_firma.png';
    link.href = dataUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[550px] rounded-2xl shadow-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{translations.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{translations.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div 
          ref={containerRef}
          className="w-full h-64 bg-gray-50 border border-gray-200 rounded-xl relative overflow-hidden cursor-crosshair shadow-inner"
        >
          {canvasRefs.map((ref, index) => (
            <canvas
              key={index}
              ref={ref}
              className="absolute inset-0 w-full h-full touch-none"
              style={{ 
                zIndex: activeLayer === index ? 10 : 1,
                opacity: layersVisible[index] ? 1 : 0,
                pointerEvents: activeLayer === index && layersVisible[index] ? 'auto' : 'none'
              }}
            />
          ))}

          {uploadedImage && (
            <div 
              className="absolute z-30 group"
              style={{
                left: uploadedImage.x,
                top: uploadedImage.y,
                width: uploadedImage.width,
                height: uploadedImage.height,
              }}
            >
              <img 
                src={uploadedImage.url} 
                alt="Upload" 
                className="w-full h-full object-contain pointer-events-none" 
              />
              <div 
                className="absolute inset-0 border-2 border-dashed border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
              {/* Drag Handle */}
              <div 
                className="absolute top-0 left-0 w-6 h-6 bg-blue-500 text-white rounded-br-lg flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
                onPointerDown={handlePointerDownDrag}
              >
                <Move size={12} />
              </div>
              {/* Remove Handle */}
              <div 
                className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-bl-lg flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setUploadedImage(null)}
              >
                <Trash2 size={12} />
              </div>
              {/* Resize Handle */}
              <div 
                className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 text-white rounded-tl-lg flex items-center justify-center cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
                onPointerDown={handlePointerDownResize}
              >
                <Maximize2 size={12} className="rotate-90" />
              </div>
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 text-[10px] font-medium text-gray-400 flex items-center gap-2 pointer-events-none z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            {translations.stylizedStroke}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            {canvasRefs.map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <button
                  onClick={() => {
                    setActiveLayer(index);
                    if (!layersVisible[index]) {
                      toggleLayerVisibility(index);
                    }
                  }}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                    activeLayer === index 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600/20' 
                      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                  title={`${translations.selectLayer} ${index + 1}`}
                >
                  {translations.layer}{index + 1}
                </button>
                <button 
                  onClick={() => toggleLayerVisibility(index)}
                  className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  title={layersVisible[index] ? translations.hideLayer : translations.showLayer}
                >
                  {layersVisible[index] ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 items-end flex-1">
            <div className="flex flex-wrap justify-end gap-2 w-full">
              {hasSavedData && (
                <button 
                  onClick={handleDeleteAllSaved}
                  className="flex items-center px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  title={translations.deleteAllSaved}
                >
                  <ShieldAlert size={14} className="mr-1.5"/> {translations.deleteAllSaved}
                </button>
              )}
              <button 
                onClick={handleClearLayer}
                className="flex items-center px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
                title={`${translations.clearLayer}${activeLayer + 1}${translations.clearLayerSuffix || ''}`}
              >
                <Trash2 size={14} className="mr-1.5"/> {translations.clearLayer}{activeLayer + 1}{translations.clearLayerSuffix || ''}
              </button>
              <button 
                onClick={handleDownloadImage}
                className="flex items-center px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
                title={translations.downloadImage}
              >
                <Download size={14} className="mr-1.5"/> {translations.downloadImage}
              </button>
              <label 
                className="flex items-center px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white cursor-pointer"
                title="Subir imagen"
              >
                <ImagePlus size={14} className="mr-1.5"/> Subir imagen
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <button 
              onClick={handleSave}
              className="mt-2 px-8 py-2.5 bg-black text-white rounded-lg text-sm font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] transition-all w-full sm:w-auto"
            >
              {translations.applySignature}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

