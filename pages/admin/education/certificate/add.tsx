import React, { useState } from 'react';
import Head from 'next/head';
import { AdminDashboardLayout } from '../../../../src/layout/AdminDashboardLayout';
import { CertificateApiService } from '../../../../src/lib/api/admin/CertificateApiService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function AddTemplatePage() {
  const router = useRouter();
  const { data: fonts } = CertificateApiService.useFonts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    showTitle: 'yes',
    positionX: '0',
    positionY: '0',
    fontFamily: '',
    fontSize: '30',
    fontColor: '#000000',
  });
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !backgroundFile) {
      return toast.error('Title and Background Image are required');
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('background_image', backgroundFile);
      data.append('layout_settings', JSON.stringify(formData));
      
      await CertificateApiService.createTemplate(data);
      toast.success('Template created successfully');
      router.push('/admin/education/certificate');
    } catch (e: any) {
      toast.error('Failed to create template');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminDashboardLayout>
      <Head>
        <title>Add Certificate | Admin</title>
      </Head>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">ADD CERTIFICATE</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Form Panel */}
          <div className="lg:w-[450px] shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-8">
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                BACKGROUND IMAGE <span className="text-red-500">*</span> <span className="text-[10px]">(MAX LIMIT:1MB)</span>
              </label>
              <div className="flex border border-gray-200 rounded-md overflow-hidden mb-2">
                <input type="text" readOnly value={backgroundFile ? backgroundFile.name : ''} placeholder="BROWSE IMAGE FILE" className="flex-1 px-4 py-2.5 text-sm text-gray-500 bg-white focus:outline-none" />
                <label className="bg-[#C9A227] hover:bg-[#b08d22] text-white px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center">
                  BROWSE
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-[11px] text-gray-500">(Recommend Size 1300x910 px)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">SHOW TITLE</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={formData.showTitle === 'yes'} onChange={() => setFormData({...formData, showTitle: 'yes'})} className="w-4 h-4 text-[#C9A227] border-gray-300 focus:ring-[#C9A227]" />
                  <span className="text-sm text-gray-600">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={formData.showTitle === 'no'} onChange={() => setFormData({...formData, showTitle: 'no'})} className="w-4 h-4 text-[#C9A227] border-gray-300 focus:ring-[#C9A227]" />
                  <span className="text-sm text-gray-600">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">TITLE</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Title" className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">POSITION X</label>
                <input type="text" value={formData.positionX} onChange={e => setFormData({...formData, positionX: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">POSITION Y</label>
                <input type="text" value={formData.positionY} onChange={e => setFormData({...formData, positionY: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">FONT FAMILY</label>
              <div className="relative">
                <select value={formData.fontFamily} onChange={e => setFormData({...formData, fontFamily: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227] appearance-none bg-white">
                  <option value="">Select Font...</option>
                  {fonts?.map((f: any) => (
                    <option key={f.id} value={f.name}>{f.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">FONT SIZE</label>
                <input type="text" value={formData.fontSize} onChange={e => setFormData({...formData, fontSize: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">FONT COLOR</label>
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  <input type="color" value={formData.fontColor} onChange={e => setFormData({...formData, fontColor: e.target.value})} className="w-full px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#C9A227]" />
                </div>
              </div>
            </div>

            <button disabled={isSubmitting} onClick={handleSubmit} className="w-full py-3 bg-[#1B2A6B] hover:bg-[#121d4f] text-white font-bold rounded-lg mt-6">
              {isSubmitting ? 'SAVING...' : 'SAVE TEMPLATE'}
            </button>

          </div>

          {/* Right Preview Panel */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg text-gray-800 mb-2">
              <span className="font-semibold">Preview ( x )</span> All measurement depends on background height & width
            </h2>
            <div className="w-full h-[500px] bg-gray-50/50 mt-4 border border-dashed border-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
               {previewUrl ? (
                 <>
                   <img src={previewUrl} alt="Background" className="absolute inset-0 w-full h-full object-contain" />
                   {formData.showTitle === 'yes' && (
                     <div 
                       className="absolute"
                       style={{ 
                         left: `${formData.positionX}%`, 
                         top: `${formData.positionY}%`, 
                         color: formData.fontColor, 
                         fontSize: `${formData.fontSize}px`,
                         fontFamily: formData.fontFamily 
                       }}
                     >
                       [Student Name]
                     </div>
                   )}
                 </>
               ) : (
                 <span className="text-gray-400">Upload background to preview</span>
               )}
            </div>
          </div>
          
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
