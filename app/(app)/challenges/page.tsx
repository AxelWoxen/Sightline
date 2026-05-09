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
  ChevronRight
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
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&q=80"
  },
  {
    id: 2,
    title: "Minimalist Moments",
    date: "Week 1",
    participated: true,
    score: 78,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
]

const upcomingChallenges = [
  {
    id: 1,
    title: "Night Photography",
    date: "Starts in 5 days",
    description: "Explore the beauty of low-light photography"
  },
  {
    id: 2,
    title: "Reflections",
    date: "Starts in 12 days",
    description: "Capture mirror images in water, glass, and more"
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium">Weekly Challenges</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Push your creative boundaries
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Your submissions:</span>
              <span className="font-medium">2</span>
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
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={currentChallenge.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
            </div>

            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full glass text-xs font-medium">
                  This Week
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {currentChallenge.daysLeft} days left
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-medium">
                {currentChallenge.title}
              </h2>
              
              <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
                {currentChallenge.description}
              </p>

              <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {currentChallenge.submissions} submissions
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {currentChallenge.reward}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/critique"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Submit Photo
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-subtle rounded-full font-medium hover:bg-white/5 transition-colors">
                  <Play className="w-4 h-4" />
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
            <h3 className="font-medium mb-4">Challenge Tips</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {currentChallenge.tips.map((tip, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass-subtle"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Community Submissions</h3>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {communitySubmissions.map((submission, i) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="group relative aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={submission.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm font-medium">{submission.author}</p>
                    <p className="text-white/60 text-xs">{submission.likes} likes</p>
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
              <h3 className="font-medium mb-4">Your Past Submissions</h3>
              
              <div className="space-y-3">
                {pastChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center gap-4 p-3 rounded-xl glass-subtle"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={challenge.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <p className="text-xs text-muted-foreground">{challenge.date}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-medium">{challenge.score}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Score</div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
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
              <h3 className="font-medium mb-4">Coming Soon</h3>
              
              <div className="space-y-3">
                {upcomingChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center gap-4 p-4 rounded-xl glass-subtle"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    </div>

                    <div className="text-xs text-muted-foreground shrink-0">
                      {challenge.date}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl glass-subtle hover:bg-white/5 transition-colors text-sm">
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
