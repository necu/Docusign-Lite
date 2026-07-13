import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSignature, Briefcase, User, MapPin, Calendar, FileText, ChevronDown, ShieldCheck, Coffee } from 'lucide-react';
import QRCode from 'react-qr-code';
import SignatureModal from './components/SignatureModal';
import { documentTemplates, getFieldConfig } from './data/templates';
import { languages, uiTranslations } from './data/i18n';
import { generatePdfFromPages } from './utils/pdfGenerator';
import { FormData } from './types';

export default function App() {
  const donationUrl = import.meta.env.VITE_DONATION_URL?.trim() || 'https://github.com/sponsors/necu';
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSignatureIndex, setActiveSignatureIndex] = useState<number | null>(null);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [language, setLanguage] = useState('es');
  const [selectedTemplateId, setSelectedTemplateId] = useState(documentTemplates['es'][0].id);
  
  const today = new Date().toISOString().split('T')[0];
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 15);
  const formattedDefaultDate = defaultDate.toISOString().split('T')[0];

  const t = uiTranslations[language] || uiTranslations['es'];
  const fieldConfig = getFieldConfig(language);
  const activeLanguageTemplates = documentTemplates[language] || documentTemplates['es'];
  const activeTemplate = activeLanguageTemplates.find(t => t.id === selectedTemplateId) || activeLanguageTemplates[0];

  const [formData, setFormData] = useState<FormData>({
    company: '',
    city: '',
    date: today,
    name: '',
    dni: '',
    position: '',
    lastDay: formattedDefaultDate,
    startDate: formattedDefaultDate,
    endDate: formattedDefaultDate,
    newSchedule: '',
    bankName: '',
    iban: '',
    amount: '',
    reason: '',
    newAddress: '',
    marriageDate: formattedDefaultDate,
    bodyText: activeTemplate.bodyText,
    signatureImage: null as string | null,
    extraSignatures: [],
  });

  const inputRefs = {
    company: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    date: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    dni: useRef<HTMLInputElement>(null),
    position: useRef<HTMLInputElement>(null),
    lastDay: useRef<HTMLInputElement>(null),
    startDate: useRef<HTMLInputElement>(null),
    endDate: useRef<HTMLInputElement>(null),
    newSchedule: useRef<HTMLInputElement>(null),
    bankName: useRef<HTMLInputElement>(null),
    iban: useRef<HTMLInputElement>(null),
    amount: useRef<HTMLInputElement>(null),
    reason: useRef<HTMLInputElement>(null),
    newAddress: useRef<HTMLInputElement>(null),
    marriageDate: useRef<HTMLInputElement>(null),
    bodyText: useRef<HTMLTextAreaElement>(null),
  };

  const focusInput = (field: string) => {
    const ref = inputRefs[field as keyof typeof inputRefs];
    if (ref?.current) {
      ref.current.focus();
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const template = activeLanguageTemplates.find(t => t.id === e.target.value);
    if (template) {
      setSelectedTemplateId(template.id);
      setFormData(prev => ({
        ...prev,
        bodyText: template.bodyText
      }));
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const newLangTemplates = documentTemplates[newLang] || documentTemplates['es'];
    const newTemplate = newLangTemplates.find(t => t.id === selectedTemplateId) || newLangTemplates[0];
    setFormData(prev => ({
      ...prev,
      bodyText: newTemplate.bodyText
    }));
  };

  const insertVariable = (variable: string) => {
    const textarea = inputRefs.bodyText.current;
    if (!textarea) return;
    
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = formData.bodyText.substring(0, startPos);
    const textAfter = formData.bodyText.substring(endPos, formData.bodyText.length);
    
    const newText = textBefore + `{{${variable}}}` + textAfter;
    setFormData(prev => ({ ...prev, bodyText: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(startPos + variable.length + 4, startPos + variable.length + 4);
    }, 0);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      const fileName = `${activeTemplate.name.replace(/\s+/g, '_')}_${formData.name.replace(/\s+/g, '_') || 'Documento'}.pdf`;
      await generatePdfFromPages('.pdf-page', fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. ' + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '[Fecha]';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderParagraph = (text: string) => {
    const parts = text.split(/(\{\{[a-zA-Z]+\}\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const field = part.slice(2, -2) as Extract<keyof FormData, string>;
        let displayValue = formData[field] || `[${field}]`;
        
        if (['date', 'lastDay', 'startDate', 'endDate'].includes(field) && formData[field]) {
          displayValue = formatDate(formData[field] as string);
        }

        return (
          <span 
            key={i} 
            className="font-bold border-b border-gray-400 cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded"
            onClick={() => focusInput(field)}
          >
            {displayValue}
          </span>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  // Simple pagination logic for rendering
  const pages: string[][] = [];
  let currentPage: string[] = [];
  let currentCharCount = 0;
  
  formData.bodyText.split('\n\n').filter((p) => p.trim() !== '').forEach(paragraph => {
    const limit = pages.length === 0 ? 1200 : 2500;
    if (currentCharCount + paragraph.length > limit && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [paragraph];
      currentCharCount = paragraph.length;
    } else {
      currentPage.push(paragraph);
      currentCharCount += paragraph.length;
    }
  });
  if (currentPage.length > 0) pages.push(currentPage);
  if (pages.length === 0) pages.push([]);

  return (
    <div className="h-screen flex flex-col bg-[#F3F4F6] font-sans text-[#1F2937] overflow-hidden">
      <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <h1 className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">DocuSign <span className="text-blue-600 italic font-medium">Lite</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowPrivacyNotice(!showPrivacyNotice)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors animate-pulse hover:animate-none shadow-sm"
              title={t.privacyNotice}
            >
              <ShieldCheck size={18} />
            </button>
            
            {showPrivacyNotice && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowPrivacyNotice(false)}
                ></div>
                <div className="absolute top-12 right-0 w-72 p-4 bg-white border border-green-100 rounded-lg shadow-xl z-50">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full shrink-0">
                      <ShieldCheck size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{t.privacyNotice}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.privacyText.replace(/permanecen exclusivamente en su ordenador/g, '<strong>permanecen exclusivamente en su ordenador</strong>') }} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2 hidden md:block">{t.language}</span>
            <select 
              className="bg-transparent border-none text-sm font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-6"
              value={language}
              onChange={handleLanguageChange}
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2 hidden md:block">{t.mode}</span>
            <select 
              className="bg-transparent border-none text-sm font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-6"
              value={selectedTemplateId}
              onChange={handleTemplateChange}
            >
              {activeLanguageTemplates.map(tmpl => (
                <option key={tmpl.id} value={tmpl.id}>{tmpl.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 text-gray-500 pointer-events-none" />
          </div>

          <a
            href={donationUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
            title={t.supportProject}
          >
            <Coffee size={16} />
            <span>{t.buyCoffee}</span>
          </a>
          
          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-70 shadow-sm"
          >
            <Download size={16} />
            {isGenerating ? '...' : t.download.replace('1', pages.length.toString()).replace('Pág)', pages.length > 1 ? 'Págs)' : 'Pág)').replace('Page)', pages.length > 1 ? 'Pages)' : 'Page)').replace('Seite)', pages.length > 1 ? 'Seiten)' : 'Seite)')}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Editor Form */}
        <aside className="w-[320px] bg-white border-r border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 z-10 shadow-lg">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t.docInfo}</h2>
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.company}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Briefcase size={14} />
                  </div>
                  <input
                    ref={inputRefs.company}
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre empresa"
                    className="block w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.city}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={14} />
                  </div>
                  <input
                    ref={inputRefs.city}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t.city}
                    className="block w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.fullName}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={14} />
                </div>
                <input
                  ref={inputRefs.name}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.fullName}
                  className="block w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.idNumber}</label>
                <input
                  ref={inputRefs.dni}
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  placeholder="12345678A"
                  className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.position}</label>
                <input
                  ref={inputRefs.position}
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder={t.position}
                  className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.docDate}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Calendar size={14} />
                  </div>
                  <input
                    ref={inputRefs.date}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Fields */}
            {activeTemplate.fields.length > 0 && (
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-2">
                {activeTemplate.fields.map(fieldKey => {
                  const config = fieldConfig[fieldKey];
                  const Icon = config?.icon || FileText;
                  return (
                    <div key={fieldKey} className={activeTemplate.fields.length === 1 || fieldKey === 'newSchedule' || fieldKey === 'iban' ? 'col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{config?.label || fieldKey}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Icon size={14} />
                        </div>
                        <input
                          ref={inputRefs[fieldKey as keyof typeof inputRefs] as React.RefObject<HTMLInputElement>}
                          type={config?.type || 'text'}
                          name={fieldKey}
                          value={formData[fieldKey as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          placeholder={config?.placeholder}
                          className="block w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 mt-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{t.bodyLabel}</label>
              
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="text-[10px] text-gray-400 w-full mb-0.5">{t.insertVars}</span>
                <button type="button" onClick={() => insertVariable('company')} className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 rounded transition-colors">+ {t.company}</button>
                <button type="button" onClick={() => insertVariable('name')} className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 rounded transition-colors">+ {t.fullName}</button>
                {activeTemplate.fields.map(fieldKey => (
                  <button 
                    key={`btn-${fieldKey}`}
                    type="button" 
                    onClick={() => insertVariable(fieldKey)} 
                    className="px-1.5 py-0.5 text-[10px] font-medium bg-green-50 text-green-600 hover:bg-green-100 border border-green-100 rounded transition-colors"
                  >
                    + {fieldConfig[fieldKey]?.label || fieldKey}
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  ref={inputRefs.bodyText}
                  name="bodyText"
                  value={formData.bodyText}
                  onChange={handleInputChange}
                  rows={8}
                  className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black resize-y min-h-[120px] transition-shadow font-mono text-[11px] leading-relaxed"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                {t.bodyHelp}
              </p>
            </div>
          </div>
          </section>
          
          <div className="mt-auto pt-6">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              * El documento generado cumple con la normativa vigente de rescisión o comunicación empresarial.
            </p>
          </div>
        </aside>

        {/* Document Preview Area */}
        <section className="flex-1 relative bg-gray-100 p-10 flex justify-center overflow-auto items-start">
          <div className="flex flex-col gap-8 pb-10" id="document-preview">
            {pages.map((pageContent, pageIndex) => (
              <div 
                key={pageIndex}
                className="pdf-page w-[210mm] h-[297mm] bg-white shadow-2xl p-[25mm] relative shrink-0 flex flex-col"
                style={{ boxSizing: 'border-box' }}
              >
                {/* Watermark/Guide */}
                <div className="absolute top-8 right-8 text-[10px] text-gray-300 uppercase hidden print:block">Borrador Digital v1.0</div>
                
                {pageIndex === 0 && (
                  <>
                    <div className="text-right text-sm text-gray-600 mb-12">
                      {t.presentation.replace('{{city}}', '').replace('{{date}}', '').trim() !== '' ? (
                         <span dangerouslySetInnerHTML={{
                           __html: t.presentation
                             .replace('{{city}}', `<span class="cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded font-medium text-gray-800" onclick="document.querySelector('[name=city]').focus()">${formData.city || `[${t.city}]`}</span>`)
                             .replace('{{date}}', `<span class="cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded font-medium text-gray-800" onclick="document.querySelector('[name=date]').focus()">${formatDate(formData.date)}</span>`)
                         }} />
                      ) : (
                        <>En <span className="cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded font-medium text-gray-800" onClick={() => focusInput('city')}>{formData.city || `[${t.city}]`}</span>, a <span className="cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded font-medium text-gray-800" onClick={() => focusInput('date')}>{formatDate(formData.date)}</span></>
                      )}
                    </div>

                    <div className="mb-8">
                      <h1 className="text-lg font-bold underline underline-offset-4 mb-6 uppercase tracking-tight text-black">{activeTemplate.title}</h1>
                      <p className="text-sm text-gray-500 mb-4 font-semibold uppercase">
                        {activeTemplate.recipient} <span className="cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded" onClick={() => focusInput('company')}>{formData.company || `[${t.company}]`}</span>
                      </p>
                    </div>
                  </>
                )}

                <div className="flex-1 text-sm leading-relaxed text-justify space-y-4 text-black">
                  {pageIndex === 0 && (
                    <p dangerouslySetInnerHTML={{
                      __html: t.exposition
                        .replace('{{name}}', `<span class="font-bold border-b border-gray-400 cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded" onclick="document.querySelector('[name=name]').focus()">${formData.name || `[${t.fullName}]`}</span>`)
                        .replace('{{dni}}', `<span class="font-bold border-b border-gray-400 cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded" onclick="document.querySelector('[name=dni]').focus()">${formData.dni || `[${t.idNumber}]`}</span>`)
                        .replace('{{position}}', `<span class="font-bold border-b border-gray-400 cursor-pointer hover:bg-yellow-100 transition-colors px-1 rounded" onclick="document.querySelector('[name=position]').focus()">${formData.position || `[${t.position}]`}</span>`)
                    }} />
                  )}
                  
                  {pageContent.map((paragraph, idx) => (
                    <p key={idx} className="whitespace-pre-wrap">{renderParagraph(paragraph)}</p>
                  ))}
                </div>

                {/* Footer Section with Signature and QR */}
                <div className="mt-8 flex justify-between items-end pt-8 border-t border-gray-100">
                  {/* QR Code Validation */}
                  <div className="flex flex-col items-center opacity-60">
                    <div className="p-1.5 bg-white border border-gray-200 rounded shadow-sm">
                      <QRCode value="https://github.com/necu/Docusign-Lite" size={48} level="L" />
                    </div>
                    <span className="text-[7px] mt-1.5 text-gray-400 font-mono tracking-widest uppercase">Verificado</span>
                    <span className="text-[7px] text-gray-400 font-mono mt-0.5">Pág. {pageIndex + 1}/{pages.length}</span>
                  </div>

                  {/* Signatures block */}
                  <div className="flex gap-4 items-end">
                    {/* Primary Signature */}
                    <div className="w-48 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{t.signBy}</p>
                      <div 
                        className={`relative group cursor-pointer h-20 w-full border ${formData.signatureImage || isGenerating ? 'border-transparent bg-transparent' : 'border-gray-200 bg-gray-50/50'} flex items-center justify-center rounded-lg overflow-hidden transition-all`}
                        onClick={() => {
                          if (!isGenerating) {
                            setActiveSignatureIndex(null);
                            setIsSignatureModalOpen(true);
                          }
                        }}
                      >
                        {formData.signatureImage ? (
                          <img 
                            src={formData.signatureImage} 
                            alt="Firma" 
                            className="max-w-full max-h-full object-contain cursor-pointer mix-blend-multiply"
                          />
                        ) : !isGenerating && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                            <FileSignature size={20} className="mb-1.5 opacity-50" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{t.clickToSign}</span>
                          </div>
                        )}
                        
                        {/* Hover overlay to re-edit signature */}
                        {formData.signatureImage && !isGenerating && (
                          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[1px]">
                              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-white/90 px-2 py-1 rounded shadow-sm">{t.changeSign}</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 font-semibold text-xs text-black border-t border-gray-200 pt-1 mx-4 truncate">{formData.name || `[${t.fullName}]`}</p>
                    </div>

                    {/* Extra Signatures */}
                    {formData.extraSignatures?.map((sig, idx) => (
                      <div key={idx} className="w-48 text-center relative group/extra">
                        {!isGenerating && (
                          <button 
                            className="absolute -top-6 right-0 text-[10px] text-red-500 opacity-0 group-hover/extra:opacity-100 transition-opacity"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                extraSignatures: prev.extraSignatures?.filter((_, i) => i !== idx)
                              }));
                            }}
                          >
                            Eliminar
                          </button>
                        )}
                        <input 
                          type="text" 
                          placeholder="Cargo/Rol (Ej. Representante)" 
                          className={`text-[10px] uppercase tracking-widest text-gray-400 mb-2 w-full text-center bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-gray-200 rounded px-1 ${isGenerating ? 'placeholder-transparent' : ''}`}
                          value={sig.role}
                          readOnly={isGenerating}
                          onChange={(e) => {
                            setFormData(prev => {
                              const extras = [...(prev.extraSignatures || [])];
                              extras[idx] = { ...extras[idx], role: e.target.value };
                              return { ...prev, extraSignatures: extras };
                            });
                          }}
                        />
                        <div 
                          className={`relative group cursor-pointer h-20 w-full border ${sig.image || isGenerating ? 'border-transparent bg-transparent' : 'border-gray-200 bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-200'} flex items-center justify-center rounded-lg overflow-hidden transition-all`}
                          onClick={() => {
                            if (!isGenerating) {
                              setActiveSignatureIndex(idx);
                              setIsSignatureModalOpen(true);
                            }
                          }}
                        >
                          {sig.image ? (
                            <img 
                              src={sig.image} 
                              alt={`Firma ${idx + 1}`} 
                              className="max-w-full max-h-full object-contain cursor-pointer mix-blend-multiply"
                            />
                          ) : !isGenerating && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                              <FileSignature size={20} className="mb-1.5 opacity-50" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">{t.clickToSign}</span>
                            </div>
                          )}
                          
                          {sig.image && !isGenerating && (
                            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[1px]">
                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-white/90 px-2 py-1 rounded shadow-sm">{t.changeSign}</span>
                            </div>
                          )}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Nombre Completo" 
                          className={`mt-2 font-semibold text-xs text-black border-t border-gray-200 pt-1 mx-4 w-[calc(100%-2rem)] text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 rounded px-1 ${isGenerating ? 'placeholder-transparent' : ''}`}
                          value={sig.name}
                          readOnly={isGenerating}
                          onChange={(e) => {
                            setFormData(prev => {
                              const extras = [...(prev.extraSignatures || [])];
                              extras[idx] = { ...extras[idx], name: e.target.value };
                              return { ...prev, extraSignatures: extras };
                            });
                          }}
                        />
                      </div>
                    ))}

                    {/* Add extra signature button */}
                    {!isGenerating && (
                      <button 
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            extraSignatures: [...(prev.extraSignatures || []), { image: null, name: '', role: '' }]
                          }));
                        }}
                        className="h-20 w-12 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors hover:border-blue-300 ml-2"
                        title="Añadir otra firma"
                      >
                        <span className="text-xl leading-none mb-1">+</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="h-8 bg-white border-t border-gray-200 px-8 flex items-center justify-between text-[10px] text-gray-400 shrink-0">
        <div>{t.footerSupport}</div>
        <div>© {new Date().getFullYear()} {t.footerCopy}</div>
      </footer>

      <SignatureModal 
        isOpen={isSignatureModalOpen} 
        onClose={() => setIsSignatureModalOpen(false)}
        onSave={(dataUrl) => {
          if (activeSignatureIndex === null) {
            setFormData(prev => ({ ...prev, signatureImage: dataUrl }));
          } else {
            setFormData(prev => {
              const newExtras = [...(prev.extraSignatures || [])];
              newExtras[activeSignatureIndex] = { ...newExtras[activeSignatureIndex], image: dataUrl };
              return { ...prev, extraSignatures: newExtras };
            });
          }
        }}
        translations={t.signatureModal}
      />
    </div>
  );
}
