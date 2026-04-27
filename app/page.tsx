'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Star, ChevronDown, ShieldCheck, Truck, Package, Clock, ShieldAlert } from 'lucide-react';

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#333]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-medium text-lg focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-gold transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-grey">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SalesFunnel() {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    color: '',
    address: ''
  });

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send order to API for Google Sheets storage
      await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Format WhatsApp message
      const message = `Hello, I want to claim my ₦20,000 discount for the Omega Speedmaster (${formData.color}).

Order Details:
Name: ${formData.fullName}
Phone: ${formData.phone}
Address: ${formData.address}

Please confirm my order.`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/2348103796277?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-theme font-sans text-white pb-20 selection:bg-gold selection:text-black">

      {/* 1. FLASH SALE BANNER */}
      <div className="bg-gradient-to-r from-gold-dark to-gold text-black py-2.5 px-4 text-center sticky top-0 z-50 uppercase tracking-widest text-sm font-black shadow-md border-b border-gold/20">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
          <span className="animate-pulse">🔥 FLASH SALE – ₦20,000 DISCOUNT ENDS SOON 🔥</span>
          <button onClick={scrollToForm} className="hidden sm:inline-block underline hover:opacity-80 transition-opacity">
            Order Now to Claim Discount
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 overflow-hidden">

        {/* 2. HERO SECTION */}
        <section className="pt-10 pb-12 flex flex-col items-center text-center">
          <div className="text-xs text-gold uppercase tracking-[4px] mb-4 font-bold">Iconic Speedmaster</div>
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-[44px] leading-[1.1] mb-6 font-light">
              The Watch That <span className="text-gold italic font-serif">Commands Respect</span> Before You Say a Word
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-grey mb-8 max-w-2xl px-2">
              One glance at your wrist. That&apos;s all it takes. The Omega Speedmaster tells the room everything about who you are.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full">
            <div className="relative w-full aspect-square max-w-md mx-auto mb-8 rounded-xl overflow-hidden border border-[#333] shadow-[0_0_40px_rgba(197,160,89,0.1)]">
              <Image src="/productimage1.jpeg" alt="Omega Speedmaster Hero" fill className="object-cover" priority />
              <div className="absolute bottom-5 left-5 bg-black/80 px-5 py-2.5 border-l-4 border-gold text-left backdrop-blur-sm">
                <div className="text-[10px] text-grey uppercase tracking-widest">Units Remaining</div>
                <div className="text-2xl font-black text-white leading-none mt-1">12</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="w-full max-w-md bg-surface border border-[#333] rounded-xl p-6 relative overflow-hidden">
             <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-4 mb-5">
                   <span className="text-4xl font-black text-gold">₦85,000</span>
                   <span className="text-xl text-grey line-through decoration-black/50">₦105,000</span>
                   <span className="bg-gold/15 text-gold text-sm font-bold px-3 py-1 rounded">SAVE ₦20,000</span>
                </div>

                <div className="w-full bg-surface border border-[#333] rounded-lg p-4 flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-grey">Flash Promo Ends In</span>
                  <span className="text-3xl font-mono font-bold text-gold tracking-widest">
                    {isMounted ? formatTime(timeLeft) : '02:00:00'}
                  </span>
                </div>

                <button
                  onClick={scrollToForm}
                  className="w-full bg-gold hover:bg-gold-dark text-black text-[15px] py-4 rounded-md font-black uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                >
                  Claim My ₦20,000 Discount
                </button>
             </div>
             <p className="text-sm text-grey mt-4">Once the timer ends, the price returns to ₦105,000.</p>
          </FadeIn>
        </section>

        {/* 3. DESIGN STATEMENT SECTION */}
        <section className="py-16 border-t border-[#333]">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight mb-6 text-center font-light">
              Iconic Round Case. Legendary Chronograph. Unmistakable Legacy.
            </h2>
            <p className="text-lg text-grey text-center mb-10 max-w-2xl mx-auto">
              The Omega Speedmaster was built for astronauts and worn on the moon. Today, it sits on the wrists of the world&apos;s most successful men. Now it&apos;s yours.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FadeIn delay={0.1}>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#333]">
                <Image src="/productimage2.jpeg" alt="Omega Details" fill className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#333]">
                <Image src="/productimage3.jpeg" alt="Omega Angle" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 4. WHY THIS WATCH IS SELLING FAST */}
        <section className="py-16 border-t border-[#333]">
           <FadeIn>
            <h2 className="font-serif text-3xl font-light mb-10 text-center">Why This Watch is Selling Fast</h2>
           </FadeIn>
           <div className="space-y-12">
              <FadeIn delay={0.1} className="flex gap-4 sm:gap-6 items-start">
                 <div className="bg-[#1a1a1a] text-gold font-serif text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-[#333]">1</div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">Worn by Legends</h3>
                    <p className="text-grey leading-relaxed">The Speedmaster is one of the most iconic watches ever made. The bold round chronograph design signals sophistication and achievement the moment it&apos;s seen.</p>
                 </div>
              </FadeIn>
              <FadeIn delay={0.2} className="flex gap-4 sm:gap-6 items-start">
                 <div className="bg-[#1a1a1a] text-gold font-serif text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-[#333]">2</div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">Built for Everyday Dominance</h3>
                    <p className="text-grey leading-relaxed">This isn&apos;t just a watch for special occasions. It&apos;s built for the man who shows up powerfully every single day.</p>
                 </div>
              </FadeIn>
              <FadeIn delay={0.3} className="flex gap-4 sm:gap-6 items-start">
                 <div className="bg-[#1a1a1a] text-gold font-serif text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-[#333]">3</div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">A Watch That Starts Conversations</h3>
                    <p className="text-grey leading-relaxed">People will ask. And when you tell them it&apos;s an Omega Speedmaster, the respect in their eyes will say it all.</p>
                 </div>
              </FadeIn>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            <FadeIn delay={0.4}>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#333]">
                <Image src="/productimage4.jpeg" alt="Speedmaster Detail" fill className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden border border-[#333]">
                <Image src="/productimage5.jpeg" alt="Speedmaster Lifestyle" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 5. PREMIUM FEATURES LIST */}
        <section className="py-16 border-t border-[#333] bg-surface/30 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent rounded-none sm:rounded-xl">
          <div className="sm:bg-surface sm:p-10 sm:rounded-xl sm:border sm:border-[#333]">
            <FadeIn>
              <h2 className="font-serif text-3xl font-light mb-2 text-center">Premium Features</h2>
              <p className="text-grey text-center mb-10">Every detail engineered for the man who demands excellence.</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {[
                "Iconic round chronograph dial",
                "Premium stainless steel case",
                "Scratch-resistant sapphire glass",
                "Multi-function sub-dial display",
                "Premium leather/metal strap",
                "Comfortable all-day wear"
              ].map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1} className="flex gap-3 items-center bg-[#000] sm:bg-[#1a1a1a] p-4 rounded-xl border border-[#333]">
                  <div className="text-gold shrink-0"><Check size={20} className="stroke-[3]" /></div>
                  <span className="font-medium text-white">{feature}</span>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.6} className="flex justify-center">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto px-10 bg-gold hover:bg-gold-dark text-black py-4 rounded-md font-black uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(197,160,89,0.2)]"
              >
                Order Now to Claim Discount
              </button>
            </FadeIn>
          </div>
        </section>

        {/* 6. FREE GIFT SECTION */}
        <section className="py-10">
          <FadeIn>
            <div className="bg-gold/10 border-2 border-dashed border-gold p-6 sm:p-10 rounded-xl relative">
              <div className="flex flex-col sm:flex-row gap-8 items-center relative z-10">
                <div className="text-4xl">🎁</div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-black text-gold uppercase tracking-wide mb-2">Free Premium Bracelet Included</h4>
                  <p className="text-sm text-grey leading-relaxed">
                    A ₦15,000 value, yours free with every Omega Speedmaster order today. The perfect pairing for a complete luxury look.
                  </p>
                  <p className="mt-4 text-[11px] font-bold text-gold uppercase tracking-[2px]">
                     Available while promo stock lasts
                  </p>
                </div>
                <div className="w-full sm:w-64 shrink-0 aspect-[4/3] relative rounded-xl overflow-hidden border border-[#333]">
                  <Image src="/braceletimage.jpeg" alt="Free Premium Bracelet" fill className="object-cover" />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 7. PERFECT FOR EVERY OCCASION */}
        <section className="py-16 border-t border-[#333]">
          <FadeIn>
            <h2 className="font-serif text-3xl font-light mb-4 text-center text-gold">One Watch. Every Occasion.</h2>
            <p className="text-grey text-center mb-10 max-w-lg mx-auto">From boardrooms to black-tie. This watch fits every version of success.</p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {[
              "Business meetings", "Corporate dinners", "Parties & events",
              "Casual luxury outfits", "Special occasions", "Everyday wear"
            ].map((occasion, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                 <div className="px-5 py-2.5 bg-surface border border-[#333] rounded-md font-medium text-grey">
                   {occasion}
                 </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 8. WHAT YOU RECEIVE */}
        <section className="py-16 border-t border-[#333]">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <h2 className="font-serif text-3xl font-light mb-4">What You Receive</h2>
              <p className="text-grey mb-8">Every order ships with everything you need.</p>
              <div className="space-y-4">
                <div className="flex gap-4 items-center bg-surface p-4 rounded-xl border border-[#333]">
                  <div className="text-gold"><Check size={24} /></div>
                  <span className="text-base font-bold text-white">Omega Speedmaster Watch</span>
                </div>
                <div className="flex gap-4 items-center bg-gold/10 p-4 rounded-xl border border-gold/30">
                  <div className="text-gold"><Check size={24} className="stroke-[3]" /></div>
                  <span className="text-base font-bold text-gold">FREE Premium Bracelet</span>
                </div>
                <div className="flex gap-4 items-center bg-surface p-4 rounded-xl border border-[#333]">
                  <div className="text-gold"><Check size={24} /></div>
                  <span className="text-base font-bold text-white">Premium Watch Box + Packaging</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
               <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#333]">
                 <Image src="/productimage1.jpeg" alt="What you receive" fill className="object-cover" />
               </div>
            </FadeIn>
          </div>
        </section>

        {/* 9. SOCIAL PROOF / REVIEWS */}
        <section className="py-16 border-t border-[#333]">
          <FadeIn>
            <div className="text-xs uppercase text-gold mb-2 tracking-[2px] text-center">What customers say</div>
            <h2 className="font-serif text-3xl font-light mb-12 text-center">Trusted by Successful Men</h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            {[
              "Looks like it costs five times the price. Absolutely worth it.",
              "The bracelet that came free made it even better. Great combo.",
              "I wore it to a meeting and three people asked where I got it.",
              "Packaging was premium. Felt like unboxing a ₦500k watch."
            ].map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-l-2 border-gold pl-4 sm:pl-6 py-2">
                  <div className="flex text-gold mb-3 gap-0.5">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-base text-grey font-medium italic mb-2">&quot;{review}&quot;</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">— Verified Buyer</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 10. FLASH PROMO REPEAT BLOCK */}
        <section className="py-12 my-10 bg-surface border border-[#333] rounded-xl p-6 sm:p-10 text-center relative overflow-hidden">
          <FadeIn className="relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-gold mb-6">Flash Promo Happening Right Now</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
               <div className="text-center">
                 <p className="text-xs uppercase text-grey tracking-widest mb-2">Normal Price</p>
                 <p className="text-xl text-grey line-through">₦105,000</p>
               </div>
               <div className="hidden sm:block text-2xl text-[#333] font-light">/</div>
               <div className="text-center">
                 <p className="text-xs uppercase text-gold tracking-widest mb-2">Today Only</p>
                 <p className="text-4xl text-white font-black">₦85,000</p>
               </div>
               <div className="hidden sm:block text-2xl text-[#333] font-light">/</div>
               <div className="text-center">
                 <p className="text-xs uppercase text-grey tracking-widest mb-2">You Save</p>
                 <p className="text-xl text-gold font-bold bg-gold/10 px-3 py-1 rounded">₦20,000</p>
               </div>
            </div>

            <div className="bg-[#000] border border-[#333] rounded-lg p-5 flex flex-col items-center justify-center mb-6 max-w-sm mx-auto">
              <span className="text-[10px] uppercase tracking-[3px] text-grey mb-2">Promo Ends In</span>
              <div className="text-4xl font-mono font-bold text-gold tracking-widest">
                {isMounted ? formatTime(timeLeft) : '02:00:00'}
              </div>
            </div>
            <p className="text-xs text-grey uppercase tracking-wider">Once the timer ends, the price returns to ₦105,000.</p>
          </FadeIn>
        </section>

        {/* 11. SCARCITY BLOCK */}
        <section className="py-10">
          <FadeIn className="border border-[#444] bg-[#1a1a1a] rounded-xl p-6 sm:p-10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-between">
               <div className="flex-1">
                 <h2 className="font-serif text-2xl mb-4 text-white flex items-center gap-3">
                   <ShieldAlert className="shrink-0 text-gold" size={28} /> High Demand Alert
                 </h2>
                 <p className="text-grey leading-relaxed mb-6 text-sm">
                   Due to the ₦20,000 promo discount and the free bracelet offer, orders are coming in quickly. We currently have very limited units remaining.
                 </p>
                 <ul className="space-y-3 font-medium text-grey text-sm">
                    <li className="flex items-center gap-3"><span className="w-5 h-5 flex items-center justify-center bg-gold/20 text-gold rounded-sm shrink-0">✕</span> Promo price disappears</li>
                    <li className="flex items-center gap-3"><span className="w-5 h-5 flex items-center justify-center bg-gold/20 text-gold rounded-sm shrink-0">✕</span> Price returns to ₦105,000</li>
                 </ul>
               </div>
               <div className="bg-[#000] border border-[#333] p-8 rounded-xl flex flex-col items-center justify-center shrink-0 w-full sm:w-56">
                 <span className="text-[10px] text-grey uppercase tracking-widest mb-2">Remaining</span>
                 <span className="text-6xl font-black text-white leading-none mb-1">12</span>
                 <span className="text-gold text-xs uppercase tracking-widest">Watches</span>
               </div>
               <p className="mt-4 text-xs font-bold text-grey uppercase tracking-widest sm:hidden text-center w-full border-t border-[#333] pt-4">
                 Once these sell out, the next restock may take weeks.
               </p>
            </div>
          </FadeIn>
        </section>

        {/* 12. FAQ SECTION */}
        <section className="py-16 border-t border-[#333]">
          <FadeIn>
            <h2 className="font-serif text-3xl font-light mb-8 text-center text-white">Frequently Asked Questions</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-2xl mx-auto">
            <AccordionItem
              question="Is the watch durable?"
              answer="Yes. Built with a stainless steel case and scratch-resistant sapphire glass designed for daily use."
            />
            <AccordionItem
              question="Is the strap comfortable?"
              answer="Yes. The strap is designed for long wear and adjusts to fit comfortably on your wrist."
            />
            <AccordionItem
              question="Does it come with a box?"
              answer="Yes. Every order comes with a premium watch box and protective packaging — perfect for gifting."
            />
            <AccordionItem
              question="What about the free bracelet?"
              answer="Every order placed during this promo includes a premium bracelet at no extra cost. It ships with your watch."
            />
            <AccordionItem
              question="How long does delivery take?"
              answer="Delivery typically takes 2–5 business days depending on your location in Nigeria."
            />
          </FadeIn>
        </section>

        {/* 14. ORDER FORM */}
        <section id="order-form" className="py-16 scroll-mt-20 border-t border-[#333]">
          <FadeIn>
            <div className="bg-surface border border-[#333] rounded-xl p-6 sm:p-10 shadow-2xl relative">
               <div className="text-center mb-10">
                 <h2 className="font-serif text-2xl sm:text-3xl font-light mb-3 text-white">Secure Your Order</h2>
                 <p className="text-sm text-grey">Upgrade your wrist today. Fill the form below to secure your discount.</p>
               </div>

               <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                 <div>
                   <label className="block text-[11px] font-bold text-grey uppercase tracking-wider mb-1.5">Full Name <span className="text-gold">*</span></label>
                   <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                     className="w-full bg-[#000] border border-[#444] p-3 focus:outline-none focus:border-gold transition-colors text-white placeholder-[#555] rounded-none"
                     placeholder="e.g. Chukwuma Obi"
                   />
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[11px] font-bold text-grey uppercase tracking-wider mb-1.5">Phone Number <span className="text-gold">*</span></label>
                     <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                       className="w-full bg-[#000] border border-[#444] p-3 focus:outline-none focus:border-gold transition-colors text-white placeholder-[#555] rounded-none"
                       placeholder="080..."
                     />
                   </div>

                   <div>
                     <label className="block text-[11px] font-bold text-grey uppercase tracking-wider mb-1.5">Select Color <span className="text-gold">*</span></label>
                     <div className="relative">
                       <select required name="color" value={formData.color} onChange={handleInputChange}
                         className="w-full bg-[#000] border border-[#444] p-3 focus:outline-none focus:border-gold transition-colors text-white appearance-none rounded-none"
                       >
                         <option value="" disabled>Select...</option>
                         <option value="Rose Gold">Rose Gold</option>
                         <option value="Silver">Silver</option>
                         <option value="Black">Black</option>
                         <option value="Blue">Blue</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey pointer-events-none" size={16} />
                     </div>
                   </div>
                 </div>

                 <div>
                   <label className="block text-[11px] font-bold text-grey uppercase tracking-wider mb-1.5">Email Address <span className="text-[#555] font-normal">(Optional)</span></label>
                   <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                     className="w-full bg-[#000] border border-[#444] p-3 focus:outline-none focus:border-gold transition-colors text-white placeholder-[#555] rounded-none"
                     placeholder="you@example.com"
                   />
                 </div>

                 <div>
                   <label className="block text-[11px] font-bold text-grey uppercase tracking-wider mb-1.5">Delivery Address <span className="text-gold">*</span></label>
                   <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3}
                     className="w-full bg-[#000] border border-[#444] p-3 focus:outline-none focus:border-gold transition-colors text-white placeholder-[#555] resize-none rounded-none"
                     placeholder="Street, City, State"
                   />
                 </div>

                 <div className="pt-6">
                   <button type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-dark text-black text-[15px] p-4.5 font-black uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'CLAIM MY ₦20,000 DISCOUNT'}
                  </button>
                   <p className="text-center text-grey text-xs mt-4 flex items-center justify-center gap-1.5 tracking-wide">
                     🔒 Safe & Secure Checkout. Pay on Delivery available.
                   </p>
                 </div>
               </form>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <section className="border-t border-[#222] py-8 mt-10">
           <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 text-grey text-xs font-medium tracking-wide">
              <span>✅ Secure Checkout</span>
              <span>🚚 Fast Nationwide Delivery</span>
              <span>📦 Premium Watch Box Included</span>
           </div>
        </section>

      </main>
    </div>
  );
}
