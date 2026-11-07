import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, UploadCloud, File, Trash2, CheckCircle2, AlertCircle, Shield, Clock, FileCheck, ArrowRight, MessageCircle, Scale, Info } from 'lucide-react';
import { ProjectInquiry } from '../types';
import { LegalDisclaimerModal } from './LegalDisclaimerModal';

interface ContactPageProps {
  initialServicePrefill?: 'cad' | 'pcb' | '3d-printing';
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialServicePrefill }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServicePrefill ? [initialServicePrefill] : ['cad']
  );
  const [timeline, setTimeline] = useState('fast');
  const [projectDescription, setProjectDescription] = useState('');
  const [requireNda, setRequireNda] = useState(true);
  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<{
    id: string;
    name: string;
    size: string;
    type: string;
    progress: number;
  }[]>([
    {
      id: 'demo-file-1',
      name: 'enclosure_chassis_revB.step',
      size: '4.8 MB',
      type: 'STEP AP242',
      progress: 100,
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<ProjectInquiry | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');

  // Handle service toggle
  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Handle File Add
  const handleFilesAdded = (files: FileList | null) => {
    if (!files) return;
    const newItems = Array.from(files).map((f) => {
      const ext = f.name.split('.').pop()?.toUpperCase() || 'FILE';
      const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: f.name,
        size: `${sizeMb} MB`,
        type: ext,
        progress: 100,
      };
    });
    setUploadedFiles((prev) => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Form Validation & Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid work or institutional email.';
    }

    if (!projectDescription.trim() || projectDescription.trim().length < 15) {
      newErrors.projectDescription = 'Please provide a brief technical description (at least 15 characters).';
    }

    if (selectedServices.length === 0) {
      newErrors.services = 'Please select at least one engineering service.';
    }

    if (!agreedToLegal) {
      newErrors.agreedToLegal = 'You must acknowledge the legal terms of use, limitation of liability, and PCB design-only scope.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const refCode = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(refCode);

    const inquiry: ProjectInquiry = {
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim() || 'Independent Hardware Lab',
      phone: phone.trim() || 'N/A',
      services: selectedServices as ('cad' | 'pcb' | '3d-printing')[],
      timeline: timeline === 'urgent' ? 'Rush (< 7 Days)' : timeline === 'fast' ? 'Standard (1–2 Weeks)' : 'Iterative (3–4 Weeks)',
      budgetRange: 'Informational Consultation',
      projectDescription: projectDescription.trim(),
      uploadedFiles: uploadedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    };

    setSubmittedInquiry(inquiry);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <LegalDisclaimerModal isOpen={showLegalModal} onClose={() => setShowLegalModal(false)} />

      {/* Page Header */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Informational Hardware Consultation
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          Contact &amp; Engineering Consultation
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Submit your project requirements, 3D STEP models, or schematic specifications. This website is purely informational — no automated e-commerce or quotes. Our engineering team reviews submissions under bilateral confidentiality.
        </p>
      </div>

      {/* Notice Banner: No Quotes / E-Commerce Notice */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block">Informational &amp; Technical Consultation Policy</strong>
          <p>
            TRIKONA does not provide automated e-commerce purchasing or instant binding quotes on this website. For PCB projects, we strictly design schematics, routing, and Gerber manufacturing files (we do not print/fabricate physical circuit boards). All deliverables are provided &ldquo;AS-IS&rdquo; without warranties, and client holds full responsibility for independent validation.
          </p>
        </div>
      </div>

      {/* Confirmation State if Submitted */}
      {submittedInquiry && (
        <div className="bg-slate-900 border-2 border-cyan-500/80 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Project Inquiry Received &amp; Logged
                </h2>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {submissionId}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Thank you, <strong className="text-white">{submittedInquiry.fullName}</strong>. A TRIKONA mechanical and electrical systems engineer has received your technical inquiry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[11px]">Primary Contact</span>
              <div className="text-white font-semibold mt-1">{submittedInquiry.fullName}</div>
              <div className="text-cyan-400 font-mono text-[11px]">{submittedInquiry.email}</div>
              <div className="text-slate-400">{submittedInquiry.company}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[11px]">Selected Disciplines</span>
              <div className="text-white font-semibold mt-1 uppercase">
                {submittedInquiry.services.join(' + ')}
              </div>
              <div className="text-slate-400 mt-1">Pace: {submittedInquiry.timeline}</div>
              <div className="text-cyan-300 text-[11px] font-mono mt-0.5">Consultation &amp; Feasibility</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[11px]">Attached Engineering Assets</span>
              <div className="text-cyan-400 font-mono font-semibold mt-1">
                {submittedInquiry.uploadedFiles.length} File(s) Staged for Review
              </div>
              <div className="text-slate-400 text-[11px] truncate mt-1">
                {submittedInquiry.uploadedFiles.map((f) => f.name).join(', ') || 'No files attached'}
              </div>
              <div className="text-emerald-400 font-mono text-[11px] mt-1">
                ✓ Bilateral NDA Protocol Active
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-400">
              Our engineering team will review your specifications and contact you within 1 business day for technical alignment.
            </span>
            <button
              type="button"
              onClick={() => {
                setSubmittedInquiry(null);
                setProjectDescription('');
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 border border-cyan-800/80 rounded-lg hover:bg-cyan-950/40 transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}

      {/* Main 2-Column: Inquiry Form + Channels / Lab Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white font-display mb-1">
            Hardware Project Intake Form
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Detail your technical requirements below for confidential engineering review. (Informational only — no automated quotes).
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inqName" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="inqName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Aris Thorne"
                  className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="inqEmail" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Work / Lab Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="inqEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. a.thorne@robotics-lab.org"
                  className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="inqCompany" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company / Organization
                </label>
                <input
                  id="inqCompany"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Apex Motion Dynamics"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inqPhone" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="inqPhone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9970113207"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Service Checklist */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Required Engineering Disciplines <span className="text-cyan-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'cad', label: 'CAD & 3D Modeling', sub: 'Solid modeling, assemblies, 2D drawings' },
                  { id: 'pcb', label: 'PCB Design & Schematics', sub: 'Schematics & Gerbers (No board printing)' },
                  { id: '3d-printing', label: 'Rapid 3D Prototyping', sub: 'Physical prototypes (PLA/PETG/PA-CF)' },
                ].map((item) => {
                  const isChecked = selectedServices.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleService(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-slate-800 border-cyan-500/80 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{item.label}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 block line-clamp-1">{item.sub}</span>
                    </button>
                  );
                })}
              </div>
              {errors.services && <p className="text-[11px] text-rose-400 mt-1">{errors.services}</p>}
            </div>

            {/* Turnaround Pace Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Desired Turnaround Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'urgent', label: 'Express / Urgent' },
                  { id: 'fast', label: 'Standard (1–2 Wks)' },
                  { id: 'iterative', label: 'Flexible Research' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeline(t.id)}
                    className={`py-2 px-2 text-xs font-mono font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      timeline === t.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload UI */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Upload CAD, STEP, STL or Gerber Files <span className="text-slate-500">(Optional)</span>
              </label>
              
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFilesAdded(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/20'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".step,.stp,.stl,.iges,.dxf,.zip,.rar,.tar,.kicad_pcb,.gerber"
                  className="hidden"
                  onChange={(e) => handleFilesAdded(e.target.files)}
                />
                <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-xs font-medium text-slate-200">
                  Click to browse or drag and drop mechanical &amp; schematic archives
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Supported formats: .STEP, .STP, .STL, .IGES, .DXF, .ZIP (Gerber RS-274X) · Up to 100MB
                </div>
              </div>

              {/* Uploaded File Feed */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">
                    Staged Files ({uploadedFiles.length}):
                  </div>
                  {uploadedFiles.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <File className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-slate-200 font-mono text-[11px] truncate">{f.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({f.size})</span>
                        <span className="px-1.5 py-0.2 bg-slate-900 border border-slate-800 rounded text-[10px] text-cyan-400 font-mono">
                          {f.type}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(f.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove attached file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Scope Description */}
            <div>
              <label htmlFor="inqDescription" className="block text-xs font-medium text-slate-300 mb-1.5">
                Technical Scope &amp; Functional Requirements <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="inqDescription"
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Detail enclosure geometry, PCB layer count / dimensions, voltage rails, environmental constraints, expected physical prototype quantity..."
                className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.projectDescription ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                }`}
              />
              {errors.projectDescription && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.projectDescription}</p>
              )}
            </div>

            {/* Mutual NDA Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireNda}
                  onChange={(e) => setRequireNda(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-950 border-slate-700 text-cyan-400 focus:ring-cyan-400"
                />
                <span className="text-xs text-slate-300">
                  <strong className="text-white">Mutual NDA Requested</strong> — Request a bilateral non-disclosure agreement prior to examining proprietary CAD/schematic files.
                </span>
              </label>
            </div>

            {/* Legal Non-Warranty & Liability Disclaimer Checkbox */}
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToLegal}
                  onChange={(e) => setAgreedToLegal(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-cyan-400"
                />
                <span className="text-xs text-slate-300">
                  <strong className="text-white">Legal Terms &amp; Scope Acknowledgment:</strong> I understand that this website is purely informational (no e-commerce or quotes). For PCB projects, TRIKONA provides digital design and Gerber files only (no in-house circuit board printing/manufacturing). All deliverables are provided &ldquo;AS-IS&rdquo; without warranties of any kind. Client is solely responsible for independent physical validation, certifications, and compliance. I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLegalModal(true);
                    }}
                    className="text-cyan-400 underline hover:text-cyan-300 cursor-pointer font-semibold"
                  >
                    Terms of Use &amp; Limitation of Liability
                  </button>.
                </span>
              </label>
              {errors.agreedToLegal && (
                <p className="text-[11px] text-rose-400">{errors.agreedToLegal}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-lg shadow-cyan-950 flex items-center justify-center gap-2"
            >
              <span>Submit Technical Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Direct Channels & Engineering FAQ */}
        <div className="lg:col-span-5 space-y-6">
          {/* Engineering Lab Contact Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Direct Engineering Channels
            </h3>

            <div className="space-y-4 text-xs">
              {/* WhatsApp Fast-Track Chat */}
              <div className="flex items-start gap-3 p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/80">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5 fill-emerald-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-emerald-300 block">Fast-Track WhatsApp Discussion</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Discuss specifications directly with our mechatronics engineering lead.
                  </p>
                  <a
                    href="https://wa.me/919970113207?text=Hello%20TRIKONA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20hardware%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-mono font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Chat on WhatsApp: +91 9970113207</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Lab Location */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Engineering Studio</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    Yeola, Nashik, Maharashtra 423401, India
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400/80 block mt-1">
                    CAD &amp; Additive Fabrication Studio
                  </span>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-semibold text-white">Direct Phone</span>
                  <span className="font-mono text-cyan-400 text-xs">+91 9970113207</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Protection Card */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 text-xs text-left">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
              <Scale className="w-4 h-4" />
              <span>Legal Protection &amp; Terms</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              TRIKONA is an engineering design and consulting studio. All designs and guidance are provided strictly for informational purposes without express or implied warranties. Clients retain 100% IP ownership.
            </p>
            <button
              type="button"
              onClick={() => setShowLegalModal(true)}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono underline cursor-pointer pt-1"
            >
              View Complete Terms &amp; Limitation of Liability &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
