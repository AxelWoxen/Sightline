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
  Sparkles,
  Flame
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
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
            <div className="w-4 h-4 rounded-full border-2 border-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-semibold tracking-tight text-lg">Sightline</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Photography</span>
            </motion.div>
          )}
        </Link>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg hover:bg-secondary transition-colors ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Streak indicator */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium">12 day streak</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-foreground text-background shadow-lg shadow-foreground/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? '' : 'group-hover:scale-110'}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <Sparkles className="w-3.5 h-3.5 ml-auto opacity-60" />
                  )}
                  {isActive && collapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors shadow-lg"
        >
          <ChevronLeft className="w-3 h-3 rotate-180" />
        </button>
      )}
    </motion.aside>
  )
}
