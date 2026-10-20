import React, { useState } from 'react';
import { useCMS } from '../../lib/cmsStore';
import { ScriptHeading } from '../ui/ScriptHeading';
import { siteConfig } from '../../config/site';
import { CheckCircle2, ShoppingBag, Plus, Minus } from 'lucide-react';

export const OrderRequestForm: React.FC = () => {
  const cms = useCMS();
  const availableItems = cms.menuItems.filter((i) => i.available);

  // Cart state: itemId -> quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('18:00');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const selectedItemsList = Object.entries(quantities)
    .map(([id, qty]) => {
      const item = availableItems.find((i) => i.id === id);
      return item ? { ...item, qty, subtotal: item.price * qty } : null;
    })
    .filter(Boolean) as (typeof availableItems[0] & { qty: number; subtotal: number })[];

  const orderTotal = selectedItemsList.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (selectedItemsList.length === 0) {
      setErrorMsg('Please add at least one dish to your order.');
      return;
    }
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please specify your delivery address.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section aria-label="Online Order Request" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E] block mb-2">
            Direct Kitchen Order
          </span>
          <ScriptHeading as="h2">Order Request</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            Select your dishes below for pickup at {siteConfig.address} or local Brooklyn delivery. No payment required until pickup or confirmation.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-[#F2F2F2] rounded-[32px] p-8 sm:p-12 text-center space-y-4 border border-[#DDDDDD] animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#9CBF77]/20 text-[#111111] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#9CBF77]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111111]">Order Request Placed!</h3>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Thank you, <span className="font-semibold text-[#111111]">{name}</span>! Your order request of{' '}
              <span className="font-semibold text-[#111111]">${orderTotal.toFixed(2)}</span> has been dispatched to the kitchen pass for{' '}
              <span className="font-semibold text-[#111111]">{orderType} at {time}</span>. Our host will call or text {phone} to confirm prep time.
            </p>
            <div className="pt-4 border-t border-[#DDDDDD] max-w-md mx-auto text-left space-y-1.5 text-xs text-[#4A4A4A]">
              <span className="font-bold uppercase tracking-wider text-[#111111] block mb-2">Order Summary:</span>
              {selectedItemsList.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.qty}x {item.name}</span>
                  <span className="font-semibold text-[#111111]">${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setQuantities({});
              }}
              className="mt-6 text-xs font-bold uppercase tracking-wider text-[#111111] underline hover:text-[#EE9B3B]"
            >
              Place another order
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Dish Selector */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-bold text-lg text-[#111111] mb-2 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#EE9B3B]" />
                <span>Select Your Dishes</span>
              </h3>

              <div className="divide-y divide-[#DDDDDD] border border-[#DDDDDD] rounded-[24px] p-4 bg-white max-h-[600px] overflow-y-auto">
                {availableItems.map((item) => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-[#111111] truncate">
                            {item.name}
                          </h4>
                          <span className="font-semibold text-sm text-[#111111] shrink-0 tabular-nums">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#F2F2F2] rounded-full p-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-full bg-white text-[#111111] flex items-center justify-center hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#222222] cursor-pointer"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Checkout & Details Form */}
            <div className="lg:col-span-5 bg-[#F2F2F2] rounded-[32px] p-6 sm:p-8 border border-[#DDDDDD]">
              <h3 className="font-bold text-lg text-[#111111] mb-4">
                Fulfillment &amp; Contact
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMsg && (
                  <div role="alert" className="p-3 bg-[#F0C964]/40 text-[#111111] rounded-[14px] text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Pickup vs Delivery Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-full border border-[#DDDDDD]">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-[#0A0A0A] text-white'
                        : 'text-[#4A4A4A] hover:text-[#111111]'
                    }`}
                  >
                    Pickup at Restaurant
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#0A0A0A] text-white'
                        : 'text-[#4A4A4A] hover:text-[#111111]'
                    }`}
                  >
                    Brooklyn Delivery
                  </button>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label htmlFor="order-addr" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Delivery Address &amp; Apt
                    </label>
                    <input
                      id="order-addr"
                      type="text"
                      required
                      placeholder="Street address, Apt / Floor, Zipcode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="app-input"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="order-name" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Your Name
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="app-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="order-phone" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Phone Number
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      required
                      placeholder="(718) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="app-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="order-email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Email Address
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="app-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="order-time" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Requested Time
                    </label>
                    <select
                      id="order-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="app-input"
                    >
                      <option value="ASAP (approx 35 min)">ASAP (~35 mins)</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="order-notes" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Kitchen notes / dietary requests
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    placeholder="e.g. Extra scotch bonnet sauce, cutlery needed"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="app-input"
                  />
                </div>

                {/* Subtotal & Total */}
                <div className="pt-3 border-t border-[#DDDDDD] space-y-1.5 text-xs text-[#4A4A4A]">
                  <div className="flex justify-between">
                    <span>Selected items ({selectedItemsList.reduce((s, i) => s + i.qty, 0)})</span>
                    <span className="font-semibold text-[#111111] tabular-nums">${orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax &amp; Service Fee</span>
                    <span className="font-semibold text-[#111111] tabular-nums">${(orderTotal * 0.08875).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#111111] pt-1 border-t border-[#DDDDDD]">
                    <span>Estimated Total</span>
                    <span className="font-display text-2xl text-[#111111] tabular-nums">
                      ${(orderTotal > 0 ? orderTotal * 1.08875 : 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#EE9B3B] hover:bg-[#D98826] text-[#111111] font-bold py-3.5 px-6 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {submitting ? 'Placing Order...' : 'Send Order to Kitchen'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
