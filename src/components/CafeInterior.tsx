import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect, memo } from "react";
import TextType from "./TextType";
import MagicBento from "./MagicBento";
import interiorImage from "@/assets/cafe-interior.jpg";
import secondInteriorImage from "@/assets/cafe-interior-chalkboard.jpg";
import { Coffee } from "lucide-react";

// Portfolio sections data for modal content
const portfolioSections = [
  {
    id: "about",
    title: "Barista's Special: My Story",
    subtitle: "The Story Behind the Code",
    content: {
      description: "Passionate developer crafting digital experiences with attention to detail and user-centered design. Turning coffee ☕ into clean code.",
      profile: {
        name: "Md Fakruddin S",
        role: "Full-Stack Developer",
        location: "📍 Remote / Global",
        tagline: "Will Always Exceed Your Expectations",
        social: {
          linkedin: "https://www.linkedin.com/in/md-fakruddin-s/",
          github: "https://github.com/zayed31",
          email: "zayed.fakruddin@gmail.com"
        }
      },
      timeline: [
        { 
          period: "2018-2020", 
          title: "St Matthias High School (St Joseph now)", 
          description: "Completed 10th grade with 73.92% - Foundation years of academic journey" 
        },
        { 
          period: "2020-2022", 
          title: "St Joseph Pre University College", 
          description: "Completed 2nd PU with 87.83% - Strengthened academic foundation" 
        },
        { 
          period: "2022-Current", 
          title: "ATME College of Engineering", 
          description: "Pursuing Computer Science and Engineering with current CGPA of 8.58 - Building technical expertise" 
        }
      ],
      techStack: {
        frontend: [
          { name: "React", proficiency: "Advanced", icon: "⚛️" },
          { name: "TypeScript", proficiency: "Advanced", icon: "🔷" },
          { name: "Next.js", proficiency: "Advanced", icon: "▲" },
          { name: "Tailwind CSS", proficiency: "Advanced", icon: "🎨" }
        ],
        backend: [
          { name: "Node.js", proficiency: "Advanced", icon: "🟢" },
          { name: "Express", proficiency: "Advanced", icon: "🚀" },
          { name: "PostgreSQL", proficiency: "Intermediate", icon: "🐘" },
          { name: "MongoDB", proficiency: "Intermediate", icon: "🍃" }
        ],
        tools: [
          { name: "Git", proficiency: "Advanced", icon: "📦" },
          { name: "Docker", proficiency: "Intermediate", icon: "🐳" },
          { name: "AWS", proficiency: "Intermediate", icon: "☁️" },
          { name: "Figma", proficiency: "Intermediate", icon: "🎨" }
        ]
      },
      achievements: [
        { icon: "🚀", title: "Built 5+ full-stack apps", description: "Production-ready applications" },
        { icon: "🏆", title: "Hackathon Winner", description: "3x hackathon champion" },
        { icon: "🎓", title: "Certifications", description: "AWS, Google Cloud, Microsoft Azure" },
        { icon: "⭐", title: "GitHub Stars", description: "500+ stars across repositories" }
      ],
      philosophy: [
        "Code should be clean and human-readable",
        "User experience first, performance second",
        "Always learning, always iterating",
        "Collaboration over competition"
      ],
      details: [
        "Full-stack developer with 5+ years experience",
        "Specialized in React, TypeScript, and Node.js",
        "Strong focus on user experience and performance",
        "Continuous learner and problem solver"
      ]
    }
  },
  {
    id: "projects",
    title: "House Specials: Crafted Projects",
    subtitle: "Brewed with Precision",
    content: {
      description: "A collection of carefully crafted applications and solutions.",
      details: [
        "E-commerce platform with modern UI/UX",
        "Real-time collaboration dashboard",
        "Mobile-first responsive applications",
        "API integrations and microservices"
      ]
    }
  },
  {
    id: "experience",
    title: "Roasted to Perfection: Work Journey",
    subtitle: "Professional Journey",
    content: {
      description: "Professional journey across various companies and challenging projects.",
      details: [
        "Senior Developer at TechCorp (2021-Present)",
        "Frontend Developer at StartupXYZ (2019-2021)",
        "Junior Developer at DevAgency (2018-2019)",
        "Freelance Projects (2017-2018)"
      ]
    }
  },
  {
    id: "skills",
    title: "Brewing Tools: Technical Skills",
    subtitle: "Tools of the Trade",
    content: {
      description: "A comprehensive toolkit for modern web development.",
      details: [
        "Frontend: React, TypeScript, Tailwind CSS",
        "Backend: Node.js, Express, PostgreSQL",
        "Cloud: AWS, Vercel, Docker",
        "Tools: Git, VS Code, Figma"
      ]
    }
  },
  {
    id: "contact",
    title: "Coffee Chat: Let's Connect",
    subtitle: "Let's Connect",
    content: {
      description: "Ready to collaborate on your next project or discuss opportunities.",
      details: [
        "Email: zayed@example.com",
        "LinkedIn: /in/zayed-dev",
        "GitHub: /zayed-portfolio",
        "Phone: +1 (555) 123-4567"
      ]
    }
  }
];

// Consolidated state interface for better performance
interface AppState {
  phase: 'initial' | 'welcome' | 'transition' | 'portfolio';
  showVideo: boolean;
  showSecondImage: boolean;
  hasScrolled: boolean;
  expandedTile: string | null;
}

const CafeInterior = memo(() => {
  // Consolidated state to reduce re-renders
  const [state, setState] = useState<AppState>({
    phase: 'initial',
    showVideo: false,
    showSecondImage: false,
    hasScrolled: false,
    expandedTile: null
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [tileRect, setTileRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);


  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (state.hasScrolled) return;

    // Use requestAnimationFrame for smooth performance
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
    }

    // Throttle scroll handling with requestAnimationFrame
    scrollTimeoutRef.current = requestAnimationFrame(() => {
      setState(prev => {
        if (prev.hasScrolled) return prev;
        return {
          ...prev,
          hasScrolled: true,
          phase: 'transition'
        };
      });

      // Start transition sequence
      setTimeout(() => {
        setState(prev => ({ ...prev, showVideo: true }));
      }, 500);
      
      scrollTimeoutRef.current = null;
    });
  }, [state.hasScrolled]);

  // Optimized video end handler
  const handleVideoEnd = useCallback(() => {
    setState(prev => ({
      ...prev,
      showVideo: false,
      showSecondImage: true,
      phase: 'portfolio'
    }));
  }, []);

  // Smooth tile click handler with position capture
  const handleTileClick = useCallback((cardLabel: string, event: React.MouseEvent) => {
    const tileElement = event.currentTarget;
    
    // Use requestAnimationFrame for smooth DOM measurement
    requestAnimationFrame(() => {
      const rect = tileElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setTileRect({
        x: rect.left + scrollLeft,
        y: rect.top + scrollTop,
      width: rect.width,
      height: rect.height
    });
    
      // Map card labels to section IDs
      const labelToIdMap: { [key: string]: string } = {
        'about': 'about',
        'projects': 'projects', 
        'experience': 'experience',
        'skills': 'skills',
        'contact': 'contact'
      };
      
      const sectionId = labelToIdMap[cardLabel] || cardLabel;
      
      // Set expanded state on next frame to prevent layout thrashing
      requestAnimationFrame(() => {
    setState(prev => ({ ...prev, expandedTile: sectionId }));
      });
    });
  }, []);

  const handleCloseTile = useCallback(() => {
    setState(prev => ({ ...prev, expandedTile: null }));
    // Clear rect after animation completes
    setTimeout(() => setTileRect(null), 400);
  }, []);

  // Prevent body scroll when expanded
  useLayoutEffect(() => {
    if (state.expandedTile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.expandedTile]);

  // Initial welcome sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'welcome' }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll listeners
  useEffect(() => {
    if (state.phase !== 'welcome') return;

    const options = { passive: true };
    window.addEventListener('scroll', handleScroll, options);
    window.addEventListener('wheel', handleScroll, options);
    window.addEventListener('touchmove', handleScroll, options);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [state.phase, handleScroll]);

  // Video preloading and optimization
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.preload = 'metadata';
      video.playsInline = true;
      video.muted = true;
      
      // Optimize video for performance
      video.style.willChange = 'transform';
      video.style.backfaceVisibility = 'hidden';
      video.style.transform = 'translateZ(0)';
    }
  }, []);

  // Video fallback timer
  useEffect(() => {
    if (!state.showVideo) return;

    const fallbackTimer = setTimeout(() => {
      if (state.showVideo && !state.showSecondImage) {
        handleVideoEnd();
      }
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, [state.showVideo, state.showSecondImage, handleVideoEnd]);

  // Memoized background styles
  const backgroundStyles = useMemo(() => ({
    initial: {
      backgroundImage: `url(${interiorImage})`,
      opacity: state.phase === 'transition' ? 0 : 0.7
    },
    second: {
      backgroundImage: `url(${secondInteriorImage})`,
      opacity: 1
    }
  }), [state.phase]);

  return (
    <div className="h-screen bg-gradient-cream relative overflow-hidden">
      {/* Initial Background - Only show when second image is not loaded */}
      {!state.showSecondImage && (
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 will-change-transform"
        style={backgroundStyles.initial}
      />
      )}
      
      {/* Video Layer - Only render when needed */}
      {state.showVideo && (
        <div className="absolute inset-0 z-20">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            <source src="/chalkboard-zoom.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Final Background - Chalkboard interior after video */}
      {state.showSecondImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-cover bg-center"
          style={backgroundStyles.second}
        />
      )}
      
      {/* Welcome Message - Optimized rendering */}
      <AnimatePresence>
        {state.phase === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <div className="text-center bg-cafe-cream/98 p-8 rounded-2xl shadow-lg border-2 border-cafe-latte/50 max-w-2xl mx-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <TextType 
                  text={["Welcome Inside"]}
                  typingSpeed={100}
                  pauseDuration={1000}
                  showCursor={true}
                  cursorCharacter="|"
                  className="font-chalkboard text-5xl md:text-7xl font-bold text-cafe-espresso"
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-[3px] bg-gradient-coffee" />
                <Coffee className="text-cafe-mocha" size={32} />
                <div className="w-16 h-[3px] bg-gradient-coffee" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-body text-cafe-mocha text-xl leading-relaxed mb-4"
              >
                Let me show you around...
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="font-body text-cafe-espresso text-lg font-medium"
              >
                please scroll to continue
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Container - Only render when needed */}
      {state.phase === 'portfolio' && (
      <div className="relative z-10 px-6 py-4 h-full overflow-hidden">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left mb-16 ml-1 mt-8"
          >
            <p className="font-chalkboard text-cafe-warm text-3xl ml-60 whitespace-nowrap font-bold">
              Browse through my portfolio like exploring a café menu. Each section tells a story of passion, skill, and creativity.
          </p>
        </motion.div>

          {/* Magic Bento Grid */}
          <div className="max-w-6xl mx-auto mr-8 -mt-8">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="230, 180, 102"
              onCardClick={handleTileClick}
            />
        </div>

        </div>
      )}

      {/* Smooth Tile Expansion */}
      <AnimatePresence>
        {state.expandedTile && tileRect && (() => {
          const section = portfolioSections.find(s => s.id === state.expandedTile);
          if (!section) return null;
          
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-cafe-espresso/98"
            onClick={handleCloseTile}
          >
            <motion.div
              initial={{ 
                  x: tileRect.x,
                  y: tileRect.y,
                  width: tileRect.width,
                  height: tileRect.height,
                  borderRadius: 16,
              }}
              animate={{ 
                  x: 20,
                  y: 20,
                  width: window.innerWidth - 40,
                  height: window.innerHeight - 40,
                  borderRadius: 24,
              }}
              exit={{ 
                  x: tileRect.x,
                  y: tileRect.y,
                  width: tileRect.width,
                  height: tileRect.height,
                  borderRadius: 16,
              }}
              transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0.0, 0.2, 1], // Material design easing
                  type: "tween"
                }}
                className="bg-cafe-cream/95 absolute overflow-hidden"
                style={{
                  transformOrigin: "top left",
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  contain: 'layout style paint',
                }}
              onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                onClick={handleCloseTile}
                  className="absolute top-6 right-6 z-20 p-3 rounded-full bg-cafe-espresso/30 hover:bg-cafe-espresso/40 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-cafe-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </motion.button>

                {/* Content */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    delay: 0.25, 
                    duration: 0.3, 
                    ease: "easeOut" 
                  }}
                  className="h-full flex flex-col p-8 pt-20"
                  style={{
                    willChange: 'opacity, transform',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Header */}
                      <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 rounded-2xl bg-cafe-espresso/30">
                      <div className="w-8 h-8 bg-cafe-warm rounded-full flex items-center justify-center">
                        <Coffee size={20} className="text-cafe-espresso" />
                      </div>
                        </div>
                        <div>
                          <h1 className="font-chalkboard text-4xl font-bold text-cafe-espresso mb-2">
                            {section.title}
                          </h1>
                          <p className="font-handwritten text-xl text-cafe-mocha">
                            {section.subtitle}
                          </p>
                        </div>
      </div>

                  {/* Content Body */}
                      <div className="flex-1 overflow-y-auto">
                    {section.id === 'about' ? (
                      <div className="space-y-6">
                        {/* Profile Snapshot Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white/30 rounded-xl p-6 border border-white/40"
                        >
                          <div className="flex items-center gap-6 mb-4">
                            <div className="w-20 h-20 bg-cafe-warm rounded-full flex items-center justify-center text-2xl">
                              ☕
                            </div>
                            <div>
                              <h2 className="font-chalkboard text-3xl font-bold text-cafe-espresso">
                                {section.content.profile.name}
                              </h2>
                              <p className="font-handwritten text-xl text-cafe-mocha">
                                {section.content.profile.role}
                              </p>
                              <p className="font-body text-cafe-mocha">
                                {section.content.profile.location}
                              </p>
                              <p className="font-body text-cafe-mocha italic">
                                "{section.content.profile.tagline}"
                              </p>
                            </div>
                          </div>
                          
                          {/* Summary Section */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 p-4 bg-cafe-cream/20 rounded-lg border border-cafe-latte/30"
                          >
                            <h3 className="font-chalkboard text-xl font-bold text-cafe-espresso mb-3">
                              The Barista's Blend
                            </h3>
                            <p className="font-body text-cafe-mocha leading-relaxed">
                              I'm basically a barista for code, instead of lattes, I brew up full-stack apps with a shot of React, a splash of TypeScript, and just enough Node.js/SpringBoot to keep things strong.
                            </p>
                            <p className="font-body text-cafe-mocha leading-relaxed mt-3">
                              I've been stirring this blend for 5+ years, and my specialty is making digital experiences smooth, fast, and easy to sip (I mean… use).
                            </p>
                            <p className="font-body text-cafe-mocha leading-relaxed mt-3">
                              When I'm not debugging (a.k.a. "cleaning coffee spills"), you'll find me experimenting with new tech recipes, obsessing over user experience, or pretending that my caffeine intake is "under control."
                            </p>
                            <p className="font-body text-cafe-mocha leading-relaxed mt-3 font-semibold">
                              At the end of the day, my goal is simple: keep learning, keep building, and serve up code that's good to the last drop.
                            </p>
                          </motion.div>
                          
                          <div className="flex gap-4 mt-6">
                            <a href={`https://${section.content.profile.social.linkedin}`} className="text-cafe-warm hover:text-cafe-espresso transition-colors">
                              LinkedIn
                            </a>
                            <a href={`https://${section.content.profile.social.github}`} className="text-cafe-warm hover:text-cafe-espresso transition-colors">
                              GitHub
                            </a>
                            <a href={`mailto:${section.content.profile.social.email}`} className="text-cafe-warm hover:text-cafe-espresso transition-colors">
                              Email
                            </a>
                          </div>
                        </motion.div>

                        {/* Timeline Component */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white/30 rounded-xl p-6 border border-white/40"
                        >
                          <h3 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-4">
                            My Journey
                          </h3>
                          <div className="space-y-4">
                            {section.content.timeline.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-3 h-3 bg-cafe-warm rounded-full mt-2 flex-shrink-0" />
                                <div>
                                  <div className="font-body text-cafe-mocha font-semibold">
                                    {item.period}: {item.title}
                                  </div>
                                  <div className="font-body text-cafe-mocha">
                                    {item.description}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Tech Stack Grid */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-white/30 rounded-xl p-6 border border-white/40"
                        >
                          <h3 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-4">
                            Tech Stack
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Frontend */}
                            <div>
                              <h4 className="font-handwritten text-lg font-semibold text-cafe-espresso mb-3">
                                Frontend
                              </h4>
                              <div className="space-y-2">
                                {section.content.techStack.frontend.map((tech, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-center gap-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                  >
                                    <span className="text-xl">{tech.icon}</span>
                                    <div>
                                      <div className="font-body text-cafe-mocha font-medium">
                                        {tech.name}
                                      </div>
                                      <div className="font-body text-cafe-mocha text-sm">
                                        {tech.proficiency}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Backend */}
                            <div>
                              <h4 className="font-handwritten text-lg font-semibold text-cafe-espresso mb-3">
                                Backend
                              </h4>
                              <div className="space-y-2">
                                {section.content.techStack.backend.map((tech, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="flex items-center gap-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                  >
                                    <span className="text-xl">{tech.icon}</span>
                                    <div>
                                      <div className="font-body text-cafe-mocha font-medium">
                                        {tech.name}
                                      </div>
                                      <div className="font-body text-cafe-mocha text-sm">
                                        {tech.proficiency}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Tools */}
                            <div>
                              <h4 className="font-handwritten text-lg font-semibold text-cafe-espresso mb-3">
                                Tools
                              </h4>
                              <div className="space-y-2">
                                {section.content.techStack.tools.map((tech, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="flex items-center gap-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                  >
                                    <span className="text-xl">{tech.icon}</span>
                                    <div>
                                      <div className="font-body text-cafe-mocha font-medium">
                                        {tech.name}
                                      </div>
                                      <div className="font-body text-cafe-mocha text-sm">
                                        {tech.proficiency}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          className="bg-white/30 rounded-xl p-6 border border-white/40"
                        >
                          <h3 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-4">
                            Highlights & Achievements
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.content.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                              >
                                <span className="text-3xl">{achievement.icon}</span>
                                <div>
                                  <div className="font-body text-cafe-mocha font-semibold">
                                    {achievement.title}
                                  </div>
                                  <div className="font-body text-cafe-mocha text-sm">
                                    {achievement.description}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Philosophy */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="bg-white/30 rounded-xl p-6 border border-white/40"
                        >
                          <h3 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-4">
                            My Philosophy
                          </h3>
                          <div className="space-y-3">
                            {section.content.philosophy.map((philosophy, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.3 + index * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 bg-cafe-warm rounded-full mt-2 flex-shrink-0" />
                                <p className="font-body text-cafe-mocha italic">
                                  "{philosophy}"
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="bg-white/30 rounded-xl p-6 border border-white/40">
                            <h2 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-4">
                              Details
                            </h2>
                            <p className="font-body text-cafe-mocha text-lg leading-relaxed mb-6">
                              {section.content.description}
                            </p>
                            
                            <div className="space-y-3">
                              {section.content.details.map((detail, index) => (
                            <motion.div
                                  key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-cafe-warm rounded-full mt-2 flex-shrink-0" />
                                  <p className="font-body text-cafe-mocha">
                                    {detail}
                                  </p>
                            </motion.div>
                              ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                  <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white"></div>
                  <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-white"></div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
});

export default CafeInterior;