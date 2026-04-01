'use client';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  ArrowRight,
  BookOpen,
  ChartBar as BarChart3,
  CircleCheck as CheckCircle2,
  ChartPie as PieChart,
  RefreshCw,
  FileText,
  Clock,
  Shield,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    service_interest: '',
    client_type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const bookkeepingServices = [
    {
      icon: Shield,
      title: 'White-Label Bookkeeping for CPA Firms',
      description:
        'We work behind the scenes as your silent bookkeeping team. Your clients see your brand. You get clean books delivered before deadlines. No payroll, no overhead — just reliable work done overnight.',
      highlight: true,
    },
    {
      icon: RefreshCw,
      title: 'Bank & Credit Card Reconciliation',
      description:
        'Accurate matching of every transaction. We ensure your accounts are perfectly aligned with bank statements, eliminating discrepancies and providing complete financial clarity.',
      highlight: false,
    },
    {
      icon: BookOpen,
      title: 'End-to-End Monthly Bookkeeping',
      description:
        'Complete management from data entry to financial statements. We handle the entire process so you can focus on growing your business.',
      highlight: false,
    },
    {
      icon: BarChart3,
      title: 'Clean-up Services',
      description:
        'Fixing historical errors and catching up on overdue books. Get your records organized and audit-ready, no matter the current state.',
      highlight: false,
    },
    {
      icon: PieChart,
      title: 'Financial Reporting',
      description:
        'Monthly P&L and Balance Sheet insights. Understand your financial position with clear, professional reports delivered on time.',
      highlight: false,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          business_name: formData.business_name || 'N/A',
          message: formData.message || 'N/A',
          client_type: formData.client_type || 'N/A',
          service_interest: formData.service_interest || 'N/A'
        },
      ]);

      if (dbError) throw dbError;

      // 2. Trigger Email Notification
      const emailRes = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!emailRes.ok) {
        console.error('Email trigger failed in the background');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        business_name: '',
        service_interest: '',
        client_type: '',
        message: '',
      });

      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 dark:from-emerald-950/20 to-white dark:to-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-emerald-200 dark:border-emerald-800">
            <Star className="w-4 h-4" />
            Enrolled Agent — Managing Partner
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
            White-Label Bookkeeping
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              for US CPA Firms
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
            Your Clients. Our Work. Your Brand.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We handle reconciliations, monthly bookkeeping, and financial reporting
            overnight — so your firm stays ahead without expanding payroll.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 text-lg px-8 py-6 group"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-lg px-8 py-6"
            >
              Request Sample Report
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {[
              { icon: CheckCircle2, text: 'Enrolled Agent (EA) Certified' },
              { icon: Clock, text: '1.8 Years US Accounting Experience' },
              { icon: Shield, text: 'White-Label — Your Brand Always' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: '48 Hr', label: 'Turnaround on monthly bookkeeping' },
              { stat: '100%', label: 'White-label — your brand always' },
              { stat: 'Night Shift', label: 'We work while your firm sleeps' },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat}</div>
                <div className="text-emerald-100 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Behind the Expertise
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Finesse Accounts is led by <strong className="text-slate-900 dark:text-white">Sumit Rastogi</strong>, a Managing Partner with a deep focus on the US accounting landscape. With 1.8 years of hands-on experience and Enrolled Agent credentials (EA Parts 1 & 3 cleared), we specialize in providing silent, high-accuracy support to growing CPA firms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle2, title: '1.8 Years US Experience', desc: 'Expertise in US GAAP and standard accounting practices' },
              { icon: Star, title: 'EA Certified Support', desc: 'Federally licensed tax professional credentials' },
              { icon: Shield, title: 'Total Privacy Guarantee', desc: 'Strict white-label compliance — your firm stays the hero' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-6 rounded-xl border-t-4 border-emerald-500 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Seamless integration with your existing workflow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Connect', desc: "Securely share your client's QB/Xero access" },
              { step: '02', title: 'Overnight Processing', desc: 'Reconciliations done while your local team rests' },
              { step: '03', title: 'Review & Approve', desc: 'Verify the clean financials under your firm name' },
              { step: '04', title: 'Deliver', desc: "Clients receive professional reports from YOU" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-4">{step}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Bookkeeping Services</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Comprehensive accounting solutions designed for professional scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookkeepingServices.map((service, index) => (
              <Card key={index} className={`border transition-all duration-300 hover:shadow-lg group ${service.highlight ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 md:col-span-2' : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-white dark:bg-slate-950'}`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${service.highlight ? 'bg-emerald-600' : 'bg-emerald-50 dark:bg-emerald-950 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900'} transition-colors`}>
                      <service.icon className={`w-7 h-7 ${service.highlight ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                    </div>
                    <div>
                      {service.highlight && (<span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">★ Core Competency</span>)}
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TAX COMPLIANCE SECTION */}
      <section id="tax" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                Tax compliance support provided by EA-qualified specialists. Parts 1 & 3 Cleared.
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900 dark:text-white">US Tax Compliance</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">From Individual Form 1040 preparation to federal filing support, we provide precise compliance to safeguard your client&apos;s standing.</p>
              <div className="space-y-4">
                {[
                  { icon: FileText, title: 'Form 1040 Preparation', desc: 'Expert individual income tax filings with optimized deductions.' },
                  { icon: BarChart3, title: 'Federal Filings', desc: 'Timely and accurate submission of federal documentation.' },
                  { icon: CheckCircle2, title: 'Strategic Planning', desc: 'Year-round planning to minimize overall tax liability.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-2xl p-12 border border-emerald-200 dark:border-emerald-800 text-center">
                <FileText className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Compliance Focused</h3>
                <p className="text-slate-600 dark:text-slate-400">Scalable tax support so you can handle more clients without the overhead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Elevate Your Firm&apos;s Output</h2>
          <p className="text-lg text-emerald-50 mb-8 leading-relaxed">Secure, overnight bookkeeping under your brand. Let&apos;s grow together.</p>
          <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-emerald-600 hover:bg-emerald-50 border-0 text-lg px-8 py-6 group">
            Schedule a Consultation
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Secure Inquiry</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Enter your firm details below. A Managing Partner will respond within 24 business hours.</p>
          </div>
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <CardContent className="p-8">
              {submitSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 font-medium text-sm">
                  Success! Your inquiry has been prioritized. Our team will contact you at your provided email shortly. Thank you for choosing Finesse Accounts.
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 font-medium text-sm">
                  Error: {submitError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Full Name</label>
                    <Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Work Email</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@firm.com" required className="w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Phone</label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Firm/Business Name</label>
                    <Input type="text" name="business_name" value={formData.business_name} onChange={handleInputChange} placeholder="Acme CPA Group" className="w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Client Profile</label>
                  <select name="client_type" value={formData.client_type} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition">
                    <option value="">Select one...</option>
                    <option value="cpa_firm">CPA Firm Owner</option>
                    <option value="accountant">Accountant / Tax Professional</option>
                    <option value="small_business">Small Business Owner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Service Portfolio</label>
                  <select name="service_interest" value={formData.service_interest} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition">
                    <option value="">Select a service...</option>
                    <option value="whitelabel">White-Label Bookkeeping</option>
                    <option value="bookkeeping">End-to-End Bookkeeping</option>
                    <option value="reconciliation">Bank Reconciliation</option>
                    <option value="cleanup">Clean-up Services</option>
                    <option value="tax">Tax Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Message</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Outline your specific bookkeeping needs..." rows={5} className="w-full" />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white border-0 py-3 text-lg font-medium transition-colors"
                >
                  {isSubmitting ? 'Processing Submission...' : 'Submit Professional Inquiry'}
                </Button>
                <p className="text-xs text-slate-600 dark:text-slate-400 text-center">Finesse Accounts strictly adheres to data privacy standards. Your inquiry is secure.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
