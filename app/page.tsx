'use client';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  ArrowRight, BookOpen, ChartBar as BarChart3, CircleCheck as CheckCircle2,
  ChartPie as PieChart, RefreshCw, FileText, Clock, Shield, Star, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', business_name: '',
    service_interest: '', client_type: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const { error: dbError } = await supabase.from('leads').insert([formData]);
      if (dbError) throw dbError;

      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', business_name: '', service_interest: '', client_type: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20 px-4 text-center bg-slate-50">
        <h1 className="text-6xl font-bold mb-6 text-slate-900">White-Label Bookkeeping</h1>
        <p className="text-xl text-slate-600 mb-10">Your Clients. Our Work. Your Brand.</p>
        <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-600 text-white px-8 py-6">
          Get Started <ArrowRight className="ml-2" />
        </Button>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 max-w-2xl mx-auto">
        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-8">
            {submitSuccess && <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded">Success! We will contact you soon.</div>}
            {submitError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">Error: {submitError}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required />
              <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
              <Input name="business_name" value={formData.business_name} onChange={handleInputChange} placeholder="Business Name" />
              <select name="service_interest" value={formData.service_interest} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select Service</option>
                <option value="whitelabel">White-Label Bookkeeping</option>
                <option value="tax">Tax Services</option>
              </select>
              <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="How can we help?" rows={4} />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white">
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
