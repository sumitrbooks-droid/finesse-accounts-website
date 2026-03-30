'use client';
import { Scale, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Finesse Accounts</span>
            </div>
            {/* Updated description — targets CPA firms */}
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              White-label bookkeeping and tax services for US CPA firms. Clean books delivered overnight — your brand, our work.
            </p>
            {/* EA credential line */}
            <p className="text-emerald-400 text-xs font-medium">
              Operated by Sumit Rastogi | Enrolled Agent (EA Parts 1 & 3)
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {[
                { label: 'White-Label Bookkeeping', href: '#services' },
                { label: 'Bank Reconciliation', href: '#services' },
                { label: 'Clean-up Services', href: '#services' },
                { label: 'Tax Compliance', href: '#tax' },
                { label: 'Request Sample Report', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/sumit-rastogi-aaa710224/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                {/* Updated — replace with domain email once bought */}
                <a
                  href="mailto:sumit@finesseaccounts.com"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  sumit@finesseaccounts.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-slate-400 text-sm mb-4 sm:mb-0">
            © 2026 Finesse Accounts. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}