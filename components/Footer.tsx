'use client';
import { Scale, Mail, Linkedin } from 'lucide-react';

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
            {/* Professional Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              White-label bookkeeping and tax services for US CPA firms. Clean books delivered overnight — your brand, our work.
            </p>
            {/* Professional Leadership Line */}
            <div className="space-y-1">
              <p className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                Sumit Rastogi | Managing Partner
              </p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-medium">
                Enrolled Agent (EA Parts 1 & 3)
              </p>
            </div>
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

          {/* Contact & Socials */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@finesseaccounts.com"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@finesseaccounts.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sumit-rastogi-aaa710224/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-slate-500 text-xs mb-4 sm:mb-0">
            © 2026 Finesse Accounts. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
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
