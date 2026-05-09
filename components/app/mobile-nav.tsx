"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, TrendingUp, Calendar, Eye } from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/critique", icon: Upload, label: "Critique" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
  { href: "/challenges", icon: Calendar, label: "Challenges" },
  { href: "/learn", icon: Eye, label: "Learn" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-foreground' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
