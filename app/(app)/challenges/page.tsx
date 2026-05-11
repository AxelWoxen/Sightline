"use client"

import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Users, 
  Camera, 
  Award,
  ArrowRight,
  CheckCircle2,
  Play,
  ChevronRight,
  Heart,
  Sparkles,
  Trophy
} from "lucide-react"
import Link from "next/link"

const currentChallenge = {
  title: "Golden Hour Magic",
  description: "Capture the warm, soft light during the golden hour. Focus on how light transforms ordinary scenes into extraordinary moments. Submit your best golden hour photograph.",
  daysLeft: 5,
  submissions: 127,
  reward: "Featured on community gallery",
  tips: [
    "Shoot 1 hour after sunrise or before sunset",
    "Look for backlit subjects for dramatic silhouettes",
    "Use the warm tones to enhance mood",
    "Try both wide landscapes and intimate portraits"
  ],
  image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=800&q=80"
}

const pastChallenges = [
  {
    id: 1,
    title: "Street Shadows",
    date: "Week 2",
    participated: true,
    score: 84,
    rank: 12,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&q=80"
  },
  {
    id: 2,
    title: "Minimalist Moments",
    date: "Week 1",
    participated: true,
    score: 78,
    rank: 28,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
]

const upcomingChallenges = [
  {
    id: 1,
    title: "Night Photography",
    date: "Starts in 5 days",
    description: "Explore the beauty of low-light photography",
    icon: "🌙"
  },
  {
    id: 2,
    title: "Reflections",
    date: "Starts in 12 days",
    description: "Capture mirror images in water, glass, and more",
    icon: "💧"
  },
]

const communitySubmissions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
    author: "Sarah M.",
    likes: 45
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&q=80",
    author: "James K.",
    likes: 38
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=400&q=80",
    author: "Maria L.",
    likes: 52
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80",
    author: "Alex T.",
    likes: 29
  },
]

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Weekly Challenges</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Push your creative boundaries
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">2 completed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Current Challenge Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0">
              <img
                src={currentChallenge.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-accent text-background text-xs font-semibold uppercase tracking-wider">
                  This Week
                </span>
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass text-sm">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="font-medium">{currentChallenge.daysLeft} days left</span>
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {currentChallenge.title}
              </h2>
              
              <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed text-lg">
                {currentChallenge.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">{currentChallenge.submissions} submissions</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">{currentChallenge.reward}</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/critique"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/10 hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105"
                >
                  <Camera className="w-5 h-5" />
                  Submit Photo
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full font-semibold hover:bg-secondary transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Tutorial
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-semibold text-lg">Challenge Tips</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentChallenge.tips.map((tip, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl glass-subtle"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Community Submissions</h3>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {communitySubmissions.map((submission, i) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden ring-1 ring-border cursor-pointer"
                >
                  <img
                    src={submission.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold">{submission.author}</p>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
                      <Heart className="w-3.5 h-3.5" />
                      {submission.likes}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past & Upcoming */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Past Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-6">Your Past Submissions</h3>
              
              <div className="space-y-4">
                {pastChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.35 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass-subtle hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 ring-1 ring-border">
                      <img
                        src={challenge.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.date}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-2xl font-bold">{challenge.score}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-accent">#{challenge.rank}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Rank</div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-6">Coming Soon</h3>
              
              <div className="space-y-4">
                {upcomingChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.45 }}
                    className="flex items-center gap-4 p-5 rounded-xl glass-subtle"
                  >
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-2xl">
                      {challenge.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{challenge.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm text-muted-foreground">{challenge.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-xl glass-subtle hover:bg-secondary transition-colors font-medium">
                <Calendar className="w-5 h-5" />
                View Challenge Calendar
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
