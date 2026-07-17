import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { fadeUp, staggerContainer } from '../data';
import { SectionLabel } from './UI';

export default function ContactSection({ t, lang, isRTL }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', service: '', details: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── Exact original WhatsApp logic, preserved ─────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const targetPhone = '962797325931';
    const msgLabels = lang === 'ar'
      ? { name: 'الاسم', phone: 'رقم الهاتف', service: 'الخدمة المطلوبة', details: 'التفاصيل' }
      : { name: 'Name',  phone: 'Phone',       service: 'Service',          details: 'Details' };

    const textMessage =
      `*🔥 New Lead from Portfolio*%0A%0A` +
      `*${msgLabels.name}:* ${formData.firstName} ${formData.lastName}%0A` +
      `*${msgLabels.phone}:* ${formData.phone}%0A` +
      `*${msgLabels.service}:* ${formData.service}%0A` +
      `*${msgLabels.details}:* ${formData.details}`;

    const whatsappUrl = `https://wa.me/${targetPhone}?text=${textMessage}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => setSending(false), 2000);
  };

  const inputClass =
    'form-input w-full rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 ' +
    'bg-transparent border border-white/[0.08] focus:outline-none focus:border-orange-500/50 ' +
    'focus:ring-2 focus:ring-orange-500/10 transition-all duration-300';

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Glow accent */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(234,88,12,0.08) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{isRTL ? 'تواصل معي' : 'Get in Touch'}</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">{t.contact.subtitle}</p>
          </motion.div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass border border-white/[0.07] rounded-3xl p-8 sm:p-12
            shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
        >
          {/* WhatsApp notice */}
          <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-xl
            bg-green-500/10 border border-green-500/20 w-fit">
            <MessageCircle size={16} className="text-green-400 flex-shrink-0" />
            <span className="text-green-300 text-xs font-semibold">
              {isRTL
                ? 'سيتم التواصل معك عبر واتساب خلال دقائق'
                : "You'll be contacted via WhatsApp within minutes"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">
                  {t.contact.fname}
                </label>
                <input
                  type="text" name="firstName" required
                  value={formData.firstName} onChange={handleChange}
                  placeholder={t.contact.fname}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">
                  {t.contact.lname}
                </label>
                <input
                  type="text" name="lastName" required
                  value={formData.lastName} onChange={handleChange}
                  placeholder={t.contact.lname}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone & Service row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">
                  {t.contact.phone}
                </label>
                <input
                  type="tel" name="phone" required dir="ltr"
                  placeholder="+962..."
                  value={formData.phone} onChange={handleChange}
                  className={`${inputClass} ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">
                  {t.contact.service}
                </label>
                <select
                  name="service" required
                  value={formData.service} onChange={handleChange}
                  className={`${inputClass} cursor-pointer appearance-none`}
                >
                  <option value="" disabled className="bg-slate-900 text-slate-500">—</option>
                  {t.contact.servicesList.map((srv, idx) => (
                    <option key={idx} value={srv} className="bg-slate-900 text-white">{srv}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">
                {t.contact.details}
              </label>
              <textarea
                name="details" required rows={5}
                value={formData.details} onChange={handleChange}
                placeholder={isRTL ? 'أخبرني عن مشروعك...' : 'Tell me about your project...'}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(234,88,12,0.5)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={sending}
              className="w-full relative overflow-hidden py-4 px-8 rounded-xl font-black text-base text-white
                bg-gradient-to-r from-orange-600 to-red-600
                shadow-[0_0_20px_rgba(234,88,12,0.3)]
                flex items-center justify-center gap-3
                disabled:opacity-60 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0
                hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                {sending
                  ? (isRTL ? 'جاري الإرسال...' : 'Opening WhatsApp...')
                  : t.contact.send}
                <Send
                  size={18}
                  className={`transition-transform ${isRTL ? 'rotate-180' : ''} ${sending ? 'animate-pulse' : ''}`}
                />
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
