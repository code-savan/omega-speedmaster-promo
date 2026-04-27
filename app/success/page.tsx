'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, MessageCircle, Clock, Truck, ShieldCheck } from 'lucide-react';

export default function SuccessPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg-theme font-sans text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center py-8"
      >
        {/* Success Icon */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gold/10 rounded-full border-2 border-gold"
          >
            <CheckCircle className="w-12 h-12 text-gold" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Main Message */}
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-4">
          Order Submitted!
        </h1>

        <p className="text-grey text-lg mb-8 leading-relaxed">
          Thank you for your order. We&apos;ve received your details and will contact you shortly to confirm.
        </p>

        {/* What Happens Next */}
        <div className="bg-surface border border-[#333] rounded-xl p-6 mb-8 text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gold mb-6 text-center">
            What Happens Next
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">WhatsApp Confirmation</h3>
                <p className="text-sm text-grey">We&apos;ll send you a confirmation message with payment details</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Secure Payment</h3>
                <p className="text-sm text-grey">Pay securely via transfer or choose pay on delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Fast Delivery</h3>
                <p className="text-sm text-grey">Your watch arrives in 2-5 business days with free bracelet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Reminder */}
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-gold mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Limited Time</span>
          </div>
          <p className="text-sm text-grey">
            Your ₦20,000 discount is reserved. Complete payment within 24 hours to secure this price.
          </p>
        </div>

        {/* Back to Home */}
        <a
          href="/"
          className="inline-block w-full bg-gold hover:bg-gold-dark text-black py-4 rounded-md font-black uppercase tracking-widest transition-colors"
        >
          Back to Home
        </a>

        {/* Support */}
        <p className="text-grey text-sm mt-6">
          Questions? Contact us on WhatsApp:{' '}
          <a
            href="https://wa.me/2348103796277"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            +234 810 379 6277
          </a>
        </p>
      </motion.div>
    </div>
  );
}
