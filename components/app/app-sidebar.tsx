"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Upload, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Settings,
  LogOut,
  ChevronLeft,
  Sparkles
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/critique", icon: Upload, label: "AI Critique" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
  { href: "/challenges", icon: Calendar, label: "Challenges" },
  { href: "/learn", icon: Eye, label: "Learn to See" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="hidden md:flex flex-col h-screen sticky top-0 glass border-r border-border/50"
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-full border-2 border-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-medium tracking-tight"
            >
              Sightline
            </motion.span>
          )}
        </Link>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-foreground text-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <Sparkles className="w-3 h-3 ml-auto opacity-60" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-border/50">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-3 h-3 rotate-180" />
        </button>
      )}
    </motion.aside>
  )
}
