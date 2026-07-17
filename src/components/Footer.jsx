import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck, CreditCard, Briefcase, User } from 'lucide-react';
import { staggerContainer, fadeUp } from '../data';

const policyIcons = {
  about:   User,
  privacy: ShieldCheck,
  payment: CreditCard,
  work:    Briefcase,
};

export default function Footer({ t, lang, navigateToPage }) {
  const isRTL = lang === 'ar';

  const policyLinks = [
    { id: 'about',   label: t.footer.about,         Icon: User },
    { id: 'privacy', label: t.footer.privacyPolicy,  Icon: ShieldCheck },
    { id: 'payment', label: t.footer.paymentPolicy,  Icon: CreditCard },
    { id: 'work',    label: t.footer.workPolicy,     Icon: Briefcase },
  ];

  return (
    <footer className="relative border-t border-white/[0.05] bg-[#020509] pt-16 pb-8 overflow-hidden">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2
        w-[600px] h-[200px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(234,88,12,0.3) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14"
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="space-y-5 md:col-span-1">
            <button
              onClick={(e) => navigateToPage('home', e)}
              className="flex items-center gap-3 group"
              aria-label="Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-700
                flex items-center justify-center text-xl font-black text-white
                shadow-[0_0_16px_rgba(234,88,12,0.35)]
                group-hover:shadow-[0_0_24px_rgba(234,88,12,0.5)] transition-shadow duration-300">
                A
              </div>
              <span className="font-bold text-xl text-white">
                Ahmed<span className="text-orange-500">.</span>
              </span>
            </button>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {t.footer.shortBio}
            </p>
          </motion.div>

          {/* Links col */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5">
              {isRTL ? 'الصفحات' : 'Pages'}
            </h4>
            <nav className="space-y-2.5">
              {policyLinks.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={(e) => navigateToPage(id, e)}
                  className="flex items-center gap-2.5 text-sm text-slate-400
                    hover:text-orange-400 transition-colors duration-200 group w-full text-start"
                  aria-label={label}
                >
                  <Icon size={13} className="text-orange-600/60 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact col */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5">
              {isRTL ? 'تواصل معي' : 'Contact'}
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:ahmadterawi@hotmail.com"
                className="group flex items-center gap-3 text-slate-400 hover:text-white
                  p-3 rounded-xl glass border border-white/[0.06] hover:border-orange-500/20
                  transition-all duration-300 w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center
                  group-hover:bg-orange-500/15 transition-colors">
                  <Mail size={14} className="text-orange-500" />
                </div>
                <span className="text-sm font-medium" dir="ltr">ahmadterawi@hotmail.com</span>
              </a>

              <a
                href="tel:+962797325931"
                className="group flex items-center gap-3 text-slate-400 hover:text-white
                  p-3 rounded-xl glass border border-white/[0.06] hover:border-orange-500/20
                  transition-all duration-300 w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center
                  group-hover:bg-orange-500/15 transition-colors">
                  <Phone size={14} className="text-orange-500" />
                </div>
                <span className="text-sm font-medium font-mono" dir="ltr">+962 79 732 5931</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-xs tracking-wider text-center sm:text-start">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {isRTL ? 'متاح للعمل الآن' : 'Available for work'}
          </div>
        </div>
      </div>
    </footer>
  );
}
