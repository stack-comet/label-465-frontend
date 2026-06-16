'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Edit2, Plus, Trash2 } from 'lucide-react'
import { MOCK_USER, MOCK_ORDERS, MOCK_ADDRESSES } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
]

const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  shipped: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  processing: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pending: 'bg-white/10 text-white/60 border-white/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState(MOCK_USER)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
            <p className="text-white/40 text-sm">{profile.email}</p>
            <p className="text-[10px] tracking-widest uppercase text-brand-gold mt-0.5">
              Member since {new Date(profile.joinedAt).getFullYear()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-10 gap-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-widest uppercase border-b-2 transition-all -mb-px ${
                activeTab === id
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all"
              >
                <Edit2 size={12} /> {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl">
              {[
                { label: 'Full Name', field: 'name' as const },
                { label: 'Email', field: 'email' as const },
                { label: 'Phone', field: 'phone' as const },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">{label}</label>
                  {editMode ? (
                    <input
                      value={profile[field]}
                      onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                      className="w-full bg-[#111] border border-white/20 px-4 py-3 text-sm text-white outline-none focus:border-brand-gold transition-colors"
                    />
                  ) : (
                    <p className="text-sm text-white/80 py-3 border-b border-white/10">{profile[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="mt-6 bg-brand-gold text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all"
              >
                Save Changes
              </button>
            )}
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold mb-8">Order History</h2>
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="border border-white/10 p-5 hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="font-mono text-sm font-bold">{order.orderNumber}</p>
                      <p className="text-xs text-white/40 mt-0.5">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`border px-3 py-1 text-[10px] font-semibold tracking-widest uppercase ${STATUS_STYLES[order.status]}`}>
                        {order.status}
                      </span>
                      <span className="text-sm font-bold">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                  {order.trackingNumber && (
                    <p className="text-xs text-white/40 mb-2">
                      Tracking: <span className="font-mono text-brand-gold">{order.trackingNumber}</span>
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-white/40">
                      Expected: {order.estimatedDelivery}
                    </p>
                    <button className="text-xs text-brand-gold hover:text-white transition-colors underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Saved Addresses</h2>
              <button className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all">
                <Plus size={12} /> Add New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_ADDRESSES.map((addr) => (
                <div key={addr.id} className={`border p-6 relative ${addr.isDefault ? 'border-brand-gold/40' : 'border-white/10'}`}>
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5">
                      Default
                    </span>
                  )}
                  <p className="font-semibold mb-1">{addr.name}</p>
                  <p className="text-sm text-white/60">{addr.line1}</p>
                  {addr.line2 && <p className="text-sm text-white/60">{addr.line2}</p>}
                  <p className="text-sm text-white/60">{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p className="text-sm text-white/40 mt-1">{addr.phone}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="text-xs text-brand-gold hover:text-white transition-colors underline">Edit</button>
                    {!addr.isDefault && (
                      <button className="text-xs text-red-400 hover:text-red-300 transition-colors underline">Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
