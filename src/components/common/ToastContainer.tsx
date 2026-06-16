'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto flex items-center gap-3 bg-[#111] border border-white/10 px-4 py-3 min-w-[280px] max-w-sm"
          >
            {toast.type === 'success' && <CheckCircle size={16} className="text-brand-gold shrink-0" />}
            {toast.type === 'error' && <XCircle size={16} className="text-red-500 shrink-0" />}
            {toast.type === 'info' && <Info size={16} className="text-blue-400 shrink-0" />}
            <p className="text-sm text-white/90 flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
