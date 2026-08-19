import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Heart, MapPin, Phone, Mail, Clock, ShieldCheck, CreditCard, Award, Lock } from "lucide-react";
import { Container } from "./Section";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e2c569]/30 bg-[#090806] text-white">
      <Container className="py-16">
        
        {/* Trust Badges Strip */}
        <div className="mb-12 grid grid-cols-2 gap-4 rounded-2xl border border-[#e2c569]/25 bg-neutral-950 p-4 text-center sm:grid-cols-4 shadow-lg">
          <div className="flex flex-col items-center justify-center p-2">
            <ShieldCheck className="h-5 w-5 text-[#e2c569]" />
            <span className="font-cinzel text-[11px] font-bold text-[#e2c569] mt-1.5">FSSAI CERTIFIED</span>
            <span className="text-[10px] text-neutral-400">100% Hygienic Food</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-l border-neutral-800">
            <CreditCard className="h-5 w-5 text-[#e2c569]" />
            <span className="font-cinzel text-[11px] font-bold text-[#e2c569] mt-1.5">SECURE PAYMENTS</span>
            <span className="text-[10px] text-neutral-400">UPI, Card & Cash</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-l border-neutral-800">
            <Award className="h-5 w-5 text-[#e2c569]" />
            <span className="font-cinzel text-[11px] font-bold text-[#e2c569] mt-1.5">PURE INGREDIENTS</span>
            <span className="text-[10px] text-neutral-400">Fresh Daily Prep</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-l border-neutral-800">
            <Clock className="h-5 w-5 text-[#e2c569]" />
            <span className="font-cinzel text-[11px] font-bold text-[#e2c569] mt-1.5">FAST PREPARATION</span>
            <span className="text-[10px] text-neutral-400">10-15 Min Order</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#e2c569]">
                KHOKHARZ
              </span>
              <span className="-mt-2 font-script text-3xl text-amber-300">
                Cafe
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-neutral-300">
              Coffee, breakfast and lunch prepared fresh to order in a warm, welcoming setting at Emera Place, Floor 2.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e2c569] shrink-0" />
                <span>{SITE.address.full}</span>
              </div>
              <a href={SITE.tel} className="flex items-center gap-2 transition-colors hover:text-[#e2c569]">
                <Phone className="h-4 w-4 text-[#e2c569] shrink-0" />
                <span>{SITE.phone}</span>
              </a>
              <a href={SITE.mailto} className="flex items-center gap-2 transition-colors hover:text-[#e2c569]">
                <Mail className="h-4 w-4 text-[#e2c569] shrink-0" />
                <span>{SITE.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#e2c569] shrink-0" />
                <span>{SITE.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-neutral-300 transition-colors hover:text-[#e2c569]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/reservation" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Table Reservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Customer Policies */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
              Legal & Policies
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/privacy" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/food-safety" className="text-neutral-300 transition-colors hover:text-[#e2c569]">
                  Food Safety & Hygiene
                </Link>
              </li>
              <li className="pt-1 border-t border-neutral-800/80">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 text-[#e2c569] hover:underline font-medium"
                >
                  <Lock className="h-3 w-3" />
                  <span>Admin Management Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us Social Media */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
              Follow Us
            </h4>
            <p className="mt-2 text-xs text-neutral-400">
              Connect with us on social media for daily specials & updates:
            </p>

            <div className="mt-4 space-y-2.5">
              <a
                href="https://instagram.com/shamsher_pb29"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-[#e2c569]/20 bg-neutral-900/60 p-2 transition-all duration-300 hover:border-[#e2c569] hover:bg-neutral-900 hover:shadow-[0_0_15px_rgba(226,197,105,0.2)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e2c569]/40 bg-[#e2c569]/10 text-[#e2c569] transition-transform group-hover:scale-110">
                  <Instagram className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-cinzel text-[11px] font-bold text-white group-hover:text-[#e2c569]">Instagram</p>
                  <p className="text-[10px] text-neutral-400">@shamsher_pb29</p>
                </div>
              </a>

              <a
                href="https://facebook.com/shamshersamadh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-[#e2c569]/20 bg-neutral-900/60 p-2 transition-all duration-300 hover:border-[#e2c569] hover:bg-neutral-900 hover:shadow-[0_0_15px_rgba(226,197,105,0.2)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e2c569]/40 bg-[#e2c569]/10 text-[#e2c569] transition-transform group-hover:scale-110">
                  <Facebook className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-cinzel text-[11px] font-bold text-white group-hover:text-[#e2c569]">Facebook</p>
                  <p className="text-[10px] text-neutral-400">@shamshersamadh</p>
                </div>
              </a>

              <a
                href="https://youtube.com/@735wale"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-[#e2c569]/20 bg-neutral-900/60 p-2 transition-all duration-300 hover:border-[#e2c569] hover:bg-neutral-900 hover:shadow-[0_0_15px_rgba(226,197,105,0.2)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e2c569]/40 bg-[#e2c569]/10 text-[#e2c569] transition-transform group-hover:scale-110">
                  <Youtube className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-cinzel text-[11px] font-bold text-white group-hover:text-[#e2c569]">YouTube</p>
                  <p className="text-[10px] text-neutral-400">@735wale</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e2c569]/20 pt-6 text-xs text-neutral-400 sm:flex-row font-cinzel">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy" className="hover:text-[#e2c569]">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#e2c569]">Terms</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-[#e2c569]">Refunds</Link>
            <span>•</span>
            <Link to="/shipping-policy" className="hover:text-[#e2c569]">Delivery</Link>
            <span>•</span>
            <Link to="/admin" className="text-[#e2c569] font-bold hover:underline">Admin Portal</Link>
          </div>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#e2c569] fill-current" />
            <span>for Khokharz Cafe</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
