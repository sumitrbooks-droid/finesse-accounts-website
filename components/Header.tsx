'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scale, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Finesse Accounts
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#tax"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Tax Services
            </a>
            <a
              href="#contact"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
            {/* Highlighted sample report link */}
            <a
              href="#contact"
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Sample Report
            </a>
            <Button
              onClick={() => scrollTo('contact')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-0"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 transition-colors"
          >
            Services
          </a>
          <a
            href="#tax"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 transition-colors"
          >
            Tax Services
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 transition-colors"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 py-2 transition-colors"
          >
            Sample Report
          </a>
          <Button
            onClick={() => scrollTo('contact')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0"
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}