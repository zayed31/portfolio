import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect, memo } from "react";
import TextType from "./TextType";
import MagicBento from "./MagicBento";
import interiorImage from "@/assets/cafe-interior.jpg";
import secondInteriorImage from "@/assets/cafe-interior-chalkboard.jpg";
import { Coffee } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

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
        image: "/profile-picture.jpg", // Add your profile image path here
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
          { name: "React", proficiency: "Intermediate", icon: "⚛️" },
          { name: "TypeScript", proficiency: "Intermediate", icon: "🔷" },
          { name: "Tailwind CSS", proficiency: "Beginner", icon: "🎨" },
          { name: "Flutter", proficiency: "Beginner", icon: "🦋" }
        ],
        backend: [
          { name: "Java SpringBoot", proficiency: "Intermediate", icon: "☕" },
          { name: "Node.js", proficiency: "Intermediate", icon: "🟢" },
          { name: "Express", proficiency: "Beginner", icon: "🚀" },
          { name: "PostgreSQL", proficiency: "Beginner", icon: "🐘" },
          { name: "SQL", proficiency: "Beginner", icon: "🗄️" }
        ],
        tools: [
          { name: "Git", proficiency: "Beginner", icon: "📦" },
          { name: "Docker", proficiency: "Beginner", icon: "🐳" }
        ]
      },
      achievements: [
        {
          icon: "🎓",
          title: "Course Completion Certificates",
          description: "Professional development and skill enhancement",
          type: "certificates",
          items: [
            {
              name: "Programming in Java (NPTEL)",
              period: "July–Oct 2024",
              link: "https://drive.google.com/file/d/11T86FhsGYyhmhPraBrsLeh93MdAw44y1/view?usp=drive_link"
            },
            {
              name: "Programming in Modern C++ (NPTEL)",
              period: "Jan–Apr 2024",
              link: "https://drive.google.com/file/d/1e-sHluk8HFJ8nx3JUxzhf2MXg56i5Mrj/view?usp=drive_link"
            },
            {
              name: "Cloud Computing (VTU)",
              period: "JULY 2025",
              link: "https://drive.google.com/file/d/1_TT57i0cIMvZjaXuphhynXLRTiZh3lJk/view?usp=sharing"
            },
            {
              name: "Full Stack React (Infosys Springboard)",
              period: "Aug 2024",
              link: "https://drive.google.com/file/d/1R5ovIk7HofO-WGYHhpaIb-cN2YOhgUgE/view?usp=drive_link"
            },
            {
              name: "Design Thinking (Coursera)",
              period: "Apr 2023",
              link: "https://www.coursera.org/account/accomplishments/verify/FLD2DFYLCHV8"
            },
            {
              name: "Strategic Innovation (Coursera)",
              period: "Apr 2023",
              link: "https://www.coursera.org/account/accomplishments/verify/STSWX3BJ5VAW"
            },

            {
              name: "DevOPS Projects (Udemy)",
              period: "JUNE 2025",
              link: "https://drive.google.com/file/d/1mC1z2iH8RW93gEmNDppybjDMYBRX1Z7F/view?usp=sharing"
            }
          ]
        },
        {
          icon: "🏆",
          title: "Event Certifications",
          description: "Hackathons, competitions, and events",
          type: "participation",
          items: [
            {
              name: "Sigma Ideathon Winner, MIT Tandavpura",
              link: "https://drive.google.com/file/d/1hI8PIVobxeSzyjx4yRRcG87-137RD5QN/view?usp=drive_link"
            },
            {
              name: "HackXerve National Level Hackathon, VVCE",
              link: "https://drive.google.com/file/d/1pHOu-_sYIgOjvLUnyikxjG3rARISL4lX/view?usp=drive_link"
            },
            {
              name: "Tech Avishkar 2.0 Hackathon, ATMECE",
              link: "https://drive.google.com/file/d/1h6yd8vDSKKIQLKxvg0niwylVIH26u8-E/view?usp=drive_link"
            },
            {
              name: "Microsoft Luxor Workshop Visit, Bangalore",
              link: "https://drive.google.com/file/d/1c5LGR6CFJwjqHogOSdmuWaNrfWZyE2vd/view?usp=drive_link"
            },
            {
              name: "AR/VR, Power BI Workshop, ATMECE",
              link: "https://drive.google.com/file/d/1IuvidWPIw9K7CJRP6yOykZof7Q8T-P7C/view?usp=drive_link"
            },
            {
              name: "Make4Mysore Hackathon, COMED Kares, Mysore",
              link: "https://drive.google.com/file/d/1lfNYjqNKOqFty0gebMXs9v-6g_cjJJn6/view?usp=drive_link"
            }
          ]
        }
      ],
      philosophy: [
        "If it works, don’t touch it. If it doesn’t… blame caching",
        "I don’t fix bugs, I create undocumented features.",
        "Always learning, always iterating",
        "Collaboration over competition",
        "My code runs perfectly… on my machine"
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
    subtitle: "Zidio Development – Java Full Stack Intern (Mar 2025 – Jun 2025)",
    content: {
      description: "Three-month internship focused on building scalable full‑stack features with React and Spring Boot, collaborating in agile teams, and integrating secure backend services with MySQL.",
      role: "Java Full Stack Intern",
      company: "Zidio Development",
      period: "Mar 2025 – Jun 2025",
      bullets: [
        "Developed scalable full-stack features using React and Spring Boot for enterprise apps",
        "Collaborated within agile teams to deliver secure, efficient modules with MySQL integration",
        "Integrated enterprise-grade tools, improving deployment turnaround and reliability",
        "Contributed to code reviews, testing, and continuous improvement"
      ],
      certificates: [
        { name: "Internship Certificate", link: "https://drive.google.com/file/d/1kCBLUrCnilkNFUtZsP5vkOwGWP3U5AyT/view?usp=sharing" },
        { name: "Training Certificate", link: "https://drive.google.com/file/d/15ZXTP3k5pksYcMuRonH6r_47SbNKcSJZ/view?usp=drive_link" }
      ]
    }
  },

  {
    id: "contact",
    title: "Coffee Chat: Let's Connect",
    subtitle: "Have a project in mind, or just want to share memes about debugging? Let's talk!",
    content: {
      description: "Ready to collaborate on your next project or discuss opportunities.",
      contactInfo: {
        email: "zayed.fakruddin@gmail.com",
        phone: "+91 9876543210",
        location: "Mysore, India"
      },
      social: {
        github: "https://github.com/zayed31",
        linkedin: "https://www.linkedin.com/in/md-fakruddin-s/",
        twitter: "https://twitter.com/zayed_dev",
        instagram: "https://instagram.com/zayed_codes"
      },
      formFields: {
        name: "",
        email: "",
        message: ""
      }
    }
  }
];

// Projects data for "House Specials: Crafted Projects"
const craftedProjects = [
  {
    id: "enterprise-expense",
    title: "Enterprise Expense Management",
    tagline: "Full-stack expense tracking with approvals and analytics.",
    tech: [
      "React",
      "Spring Boot",
      "Java",
      "MySQL",
      "JWT",
      "OAuth2",
      "Tailwind",
      "MUI",
    ],
    description:
      "The Enterprise Expense Management System is a comprehensive full-stack application designed to streamline expense tracking, approval workflows, and financial reporting for organizations. The system supports multiple user roles, OAuth2 authentication, receipt management, and real-time notifications.",
    features: [
      "Multi-role Authentication: Employee, Manager, Admin, and Finance roles",
      "OAuth2 Integration: Google and GitHub social login",
       "Expense Management: Create, edit, delete, and track expenses",
    "Approval Workflows: Multi-level approval system",
      "Receipt Management: Cloudinary integration for receipt storage",
      "Real-time Notifications: In-app notification system",
      "Reporting & Analytics: Comprehensive dashboards and reports",
      "Budget Management: Monthly budget tracking and alerts",
      "Audit Logging: Complete activity tracking",
      "File Export: PDF and Excel export capabilities"
    ],
    links: {
      demo: "#",
      repo: "https://github.com/zidioteam6/Enterprise-Expense-Management1.1",
      caseStudy: "",
    },
    thumbnail: "💰",
    thumbnailBg: "bg-green-500/20",
    thumbnailIcon: "📊",
  },
  {
    id: "green-corridor",
    title: "Green Corridor",
    tagline: "Intelligent traffic signal clearance for emergency vehicles.",
    tech: [
      "React Native",
      "Expo",
      "RN Maps",
      "Node.js",
      "Express",
      "MySQL",
      "JWT",
      "IoT",
    ],
    description:
      "The Emergency Clearance App is an intelligent traffic management system designed to assist emergency vehicles (ambulances, fire trucks, police cars) in navigating through traffic by automatically controlling traffic signals. The system uses real-time GPS tracking, predictive algorithms, and IoT integration to create green corridors for emergency vehicles.",
    features: [
      "Real-time GPS tracking and background location",
      "Predictive signal control via IoT hardware",
      "Route optimization with Google Maps",
      "Journey analytics and performance tracking",
    ],
    links: {
      demo: "#",
      repo: "https://github.com/zayed31",
      caseStudy: "#",
    },
    thumbnail: "🚨",
    thumbnailBg: "bg-red-500/20",
    thumbnailIcon: "🚑",
  },
  {
    id: "campus-connect",
    title: "CampusConnect",
    tagline: "Social Media platform for students and faculty.",
    tech: ["Flutter", "Dart", "Firebase"],
    description:
      "Secure, real-time campus social app with profiles, messaging, push notifications, and media uploads.",
    features: [
      "Secure Authentication with Firebase",
      "User Profile Management",
      "Real-time Messaging",
      "User Search Functionality",
      "Cross-platform Support (Android, iOS, Web)",
      "Push Notifications", 
      "Image Upload Capabilities",
      "LinkedIn Integration"
    ],
    links: {
      demo: "#",
      repo: "https://github.com/zayed31/Campus-Connect",
      caseStudy: "",
    },
    thumbnail: "🎓",
    thumbnailBg: "bg-blue-500/20",
    thumbnailIcon: "💬",
  },

  {
    id: "dragon-adventure",
    title: "Dragon Adventure",
    tagline: "2D side-scrolling action built with Python and Pygame.",
    tech: ["Python", "Pygame"],
    description:
      "Endless runner-style dragon game: dodge obstacles, shoot fireballs, and survive to rack up points.",
    features: [
      "Navigate gaps and avoid enemy obstacles",
      "Fireball shooting with score tracking",
      "Endless runner progression",
    ],
    links: {
      demo: "#",
      repo: "https://github.com/zayed31/Dragon-Adventure-Game",
      caseStudy: "",
    },
    thumbnail: "🐉",
    thumbnailBg: "bg-orange-500/20",
    thumbnailIcon: "🎮",
  },
  {
    id: "pet-management",
    title: "Pet Management System (In Works)",
    tagline: "Connect pet owners with volunteer walkers",
    tech: ["React Native", "Spring Boot", "PostgreSQL", "Java 17", "JWT"],
    description:
      "A comprehensive pet walking service app that connects pet owners with freelancers who volunteer as pet walkers. Built with Spring Boot 3.x and PostgreSQL JSONB for flexible, scalable pet data management.",
    features: [
      "Pet owner and walker registration system",
      "Health records and walking preferences management",
      "Verification workflows for walkers",
      "Real-time location tracking and scheduling",
      "Comprehensive backend with RESTful APIs",
      "PostgreSQL JSONB for flexible pet data storage"
    ],
    links: {
      demo: "#",
      repo: "https://github.com/fluffwalks/FLUFFWALKS",
      caseStudy: "",
    },
    thumbnail: "🐾",
    thumbnailBg: "bg-purple-500/20",
    thumbnailIcon: "🚶‍♂️",
  },
  {
    id: "ai-product-discovery",
    title: "AI Product Discovery (In Works)",
    tagline: "Discover products with 5-layer AI intelligence",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Google APIs"],
    description:
      "Advanced product discovery platform using a sophisticated 5-layer AI pipeline. Find perfect products with personalized recommendations, compare prices across 10+ platforms, and discover hidden gems with production-ready performance.",
    features: [
      "5-layer AI pipeline with 95%+ accuracy",
      "Multi-platform integration (Flipkart, Amazon, Snapdeal, etc.)",
      "BERT-based semantic matching and intelligent filtering",
      "Reciprocal Rank Fusion (RRF) for optimal results",
      "Dark & sleek UI with glassmorphism effects",
      "Real-time search suggestions and trending searches"
    ],
    links: {
      demo: "#",
      repo: "https://github.com/zayed31/FindONE",
      caseStudy: "",
    },
    thumbnail: "🤖",
    thumbnailBg: "bg-cyan-500/20",
    thumbnailIcon: "🔍",
  },


];

// Consolidated state interface for better performance
interface AppState {
  phase: 'initial' | 'welcome' | 'transition' | 'portfolio';
  showVideo: boolean;
  showSecondImage: boolean;
  hasScrolled: boolean;
  expandedTile: string | null;
  expandedAchievement: string[];
  expandedProjectId?: string | null;
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
}

const CafeInterior = memo(() => {
  // Consolidated state to reduce re-renders
  const [state, setState] = useState<AppState>({
    phase: 'initial',
    showVideo: false,
    showSecondImage: false,
    hasScrolled: false,
    expandedTile: null,
    expandedAchievement: [],
    expandedProjectId: null,
    contactForm: {
      name: "",
      email: "",
      message: ""
    }
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const warmedUpRef = useRef(false);

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

    // Proactively unmount listeners and heavy layers from welcome/transition
    window.scrollTo(0, 0);
    document.body.offsetHeight; // force sync layout
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
    setState(prev => ({ ...prev, expandedTile: null, expandedProjectId: null }));
    // Clear rect after animation completes
    setTimeout(() => setTileRect(null), 400);
  }, []);

  // Handle project tile expand/collapse
  const handleProjectClick = useCallback((projectId: string) => {
    setState(prev => ({
      ...prev,
      expandedProjectId: prev.expandedProjectId === projectId ? null : projectId
    }));
  }, []);

  // Handle contact form input changes
  const handleContactFormChange = useCallback((field: string, value: string) => {
    setState(prev => ({
      ...prev,
      contactForm: {
        ...prev.contactForm,
        [field]: value
      }
    }));
  }, []);

  // Handle contact form submission
  const handleContactFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = state.contactForm;
    
    if (!name || !email || !message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Show loading state
      toast({
        title: "Sending Message...",
        description: "Brewing your message ☕",
      });

      // EmailJS configuration
      const serviceId = 'service_1co0c7f'; // Replace with your EmailJS service ID
      const templateId = 'template_hbnfgeg'; // Replace with your EmailJS template ID
      const publicKey = 'jqtP7rTE_rnWz-Q16'; // Replace with your EmailJS public key

      // Prepare template parameters for EmailJS
      // This will send an email TO YOU (Zayed) when someone submits the form
      const templateParams = {
        from_name: name,           // Sender's name
        from_email: email,         // Sender's email  
        message: message,          // Their message
        to_name: 'Md Fakruddin S',          // Your name (recipient)
        reply_to: email,           // So you can reply directly to them
        subject: `New message from ${name} via Portfolio Contact Form`,
      };

      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Message Sent! ☕",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });

      // Reset form
      setState(prev => ({
        ...prev,
        contactForm: { name: "", email: "", message: "" }
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      
      // More detailed error message
      let errorMessage = "Something went wrong. Please try again or email me directly.";
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid email')) {
          errorMessage = "Please check your email address and try again.";
        } else if (error.message.includes('Template not found')) {
          errorMessage = "Email template not found. Please check your Template ID.";
        } else if (error.message.includes('Service not found')) {
          errorMessage = "Email service not found. Please check your Service ID.";
        } else if (error.message.includes('Invalid public key')) {
          errorMessage = "Invalid public key. Please check your EmailJS configuration.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [state.contactForm]);

  // Handle achievement tile click
  const handleAchievementClick = useCallback((achievementType: string) => {
    setState(prev => {
      const isOpen = prev.expandedAchievement.includes(achievementType);
      const nextExpanded = isOpen
        ? prev.expandedAchievement.filter(t => t !== achievementType)
        : [...prev.expandedAchievement, achievementType];
      return { ...prev, expandedAchievement: nextExpanded };
    });
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

  // Cleanup old components and optimize performance after tiles load
  useEffect(() => {
    if (state.phase === 'portfolio') {
      // Delay cleanup to allow tiles to fully animate in
      const cleanupTimer = setTimeout(() => {
        // Force garbage collection of unused components
        if (window.gc) {
          window.gc();
        }

        // Clear any cached images that are no longer needed
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src && !img.src.includes('profile-picture') && !img.src.includes('cafe-interior')) {
            img.removeAttribute('src');
          }
        });

        // Clear unused event listeners
        const oldListeners = document.querySelectorAll('[data-cleanup="true"]');
        oldListeners.forEach(el => el.remove());

        // Force a layout recalculation to optimize rendering
        document.body.offsetHeight;

        // Clear any unused GSAP animations
        if (window.gsap) {
          window.gsap.killTweensOf('.card:not(.card--active)');
        }

        console.log('Performance cleanup completed');
      }, 2000); // Wait 2 seconds after portfolio phase starts

      return () => clearTimeout(cleanupTimer);
    }
  }, [state.phase]);

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

    // Preload and pre-decode final chalkboard background image
    const img = new Image();
    img.src = secondInteriorImage;
    if (img.decode) {
      img.decode().catch(() => {});
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

  // After showing the final background, wait for fonts and warm up GPU layers
  useEffect(() => {
    if (!state.showSecondImage || state.phase !== 'portfolio' || warmedUpRef.current) return;

    const warmUp = async () => {
      try {
        // Ensure web fonts are ready to avoid reflow during first interaction
        // @ts-ignore
        if (document.fonts && document.fonts.ready) {
          // @ts-ignore
          await document.fonts.ready;
        }
      } catch {}

      // Double rAF to ensure we're on a clean frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Force a compositor/layer reset similar to minimize/restore
          const rootEl = document.getElementById('root') as HTMLElement | null;
          if (rootEl) {
            rootEl.style.transform = 'translateZ(0)';
            rootEl.style.backfaceVisibility = 'hidden';
          }

          const gridEls = document.querySelectorAll('.card-grid');
          gridEls.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.willChange = 'transform, opacity';
            htmlEl.style.transform = 'translateZ(0)';
          });

          const container = contentRef.current;
          if (container) {
            container.style.willChange = 'transform, opacity';
            container.style.transform = 'translateZ(0)';
            container.style.contain = 'layout style paint';
          }

          // Clear the hint shortly after to avoid keeping will-change forever
          setTimeout(() => {
            gridEls.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.transform = '';
              htmlEl.style.willChange = '';
            });
            if (container) {
              container.style.transform = '';
              container.style.willChange = '';
              container.style.contain = '';
            }
            if (rootEl) {
              rootEl.style.transform = '';
              rootEl.style.backfaceVisibility = '';
            }

            // Fire resize to encourage reflow/compositing stabilization
            window.dispatchEvent(new Event('resize'));
          }, 250);

          warmedUpRef.current = true;
        });
      });
    };

    warmUp();
  }, [state.showSecondImage, state.phase]);

  // Background styles
  const backgroundStyles = {
    initial: {
      backgroundImage: `url(${interiorImage})`,
      // Keep the initial background visible during transition to avoid white screen
      opacity: 1
    },
    second: {
      backgroundImage: `url(${secondInteriorImage})`,
      opacity: 1
    }
  };

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
            <div className="text-center bg-cafe-cream p-8 rounded-2xl shadow-lg border-2 border-cafe-latte/50 max-w-2xl mx-4">
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
      <div ref={contentRef} className="relative z-10 px-6 py-4 h-full overflow-hidden">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left mb-16 ml-5 mt-5"
          >
            <p className="font-chalkboard text-cafe-warm text-3xl ml-60 whitespace-nowrap font-bold">
              Browse through my portfolio like exploring a café menu. Each section tells a story of passion, skill, and creativity.
          </p>
        </motion.div>

          {/* Magic Bento Grid */}
          <motion.div 
            className="max-w-6xl mx-auto mr-8 -mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.3
            }}
          >
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
          </motion.div>

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
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cafe-warm shadow-lg">
                              <img
                                src={section.content.profile.image}
                                alt={section.content.profile.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to coffee emoji if image fails to load
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-cafe-warm flex items-center justify-center text-2xl">☕</div>';
                                }}
                              />
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
                              I've been stirring this blend for 2+ years, and my specialty is making digital experiences smooth, fast, and easy to sip (I mean… use).
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
                            Certifications
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.content.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                className={`p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                                  state.expandedAchievement.includes(achievement.type) ? 'bg-white/25' : ''
                                }`}
                                onClick={() => handleAchievementClick(achievement.type)}
                              >
                                <div className="flex items-center gap-4 mb-3">
                                  <span className="text-3xl">{achievement.icon}</span>
                                  <div className="flex-1">
                                    <div className="font-body text-cafe-mocha font-semibold">
                                      {achievement.title}
                                    </div>
                                    <div className="font-body text-cafe-mocha text-sm">
                                      {achievement.description}
                                    </div>
                                  </div>
                                  <motion.div
                                    animate={{ rotate: state.expandedAchievement.includes(achievement.type) ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-cafe-mocha"
                                  >
                                    ▼
                                  </motion.div>
                                </div>
                                
                                {/* Expandable Content */}
                                <motion.div
                                  initial={false}
                                  animate={{
                                    height: state.expandedAchievement.includes(achievement.type) ? 'auto' : 0,
                                    opacity: state.expandedAchievement.includes(achievement.type) ? 1 : 0
                                  }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-3 border-t border-white/20">
                                    <div className="space-y-3">
                                      {achievement.items.map((item, itemIndex) => (
                                        <motion.div
                                          key={itemIndex}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ 
                                            opacity: state.expandedAchievement.includes(achievement.type) ? 1 : 0,
                                            x: state.expandedAchievement.includes(achievement.type) ? 0 : -10
                                          }}
                                          transition={{ delay: itemIndex * 0.1 }}
                                          className="flex items-start gap-3"
                                        >
                                          <div className="w-1.5 h-1.5 bg-cafe-warm rounded-full flex-shrink-0 mt-2" />
                                          <div className="flex-1">
                                            {typeof item === 'string' ? (
                                              <span className="font-body text-cafe-mocha text-sm">
                                                {item}
                                              </span>
                                            ) : (
                                              <div>
                                                <a
                                                  href={item.link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="font-body text-cafe-mocha text-sm font-medium inline-block relative group"
                                                >
                                                  {item.name}
                                                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cafe-mocha transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                                                </a>
                                                <div className="font-body text-cafe-mocha/70 text-xs mt-1">
                                                  {item.period}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
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
                    ) : section.id === 'projects' ? (
                      <div className="bg-white/30 rounded-xl p-6 border border-white/40">
                        <p className="font-body text-cafe-mocha text-lg leading-relaxed mb-6">
                          {section.content.description}
                        </p>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 gap-5">
                          {craftedProjects.map((proj, idx) => (
                            <motion.div
                              key={proj.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + idx * 0.06 }}
                              className="rounded-xl border border-white/40 bg-white/25 overflow-hidden"
                            >
                              {/* Header Row */}
                              <button
                                onClick={() => handleProjectClick(proj.id)}
                                className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/20 transition-colors"
                              >
                                <div className={`w-16 h-16 rounded-lg border border-white/50 flex-shrink-0 flex items-center justify-center text-3xl ${proj.thumbnailBg}`}>
                                  <span className="text-4xl">{proj.thumbnail}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <h3 className="font-chalkboard text-xl font-bold text-cafe-espresso">
                                        {proj.title}
                                      </h3>
                                      <p className="font-body text-cafe-mocha text-sm">
                                        {proj.tagline}
                                      </p>
                                    </div>
                                    <motion.span
                                      animate={{ rotate: state.expandedProjectId === proj.id ? 180 : 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="text-cafe-mocha mt-1"
                                    >
                                      ▼
                                    </motion.span>
                                  </div>

                                  {/* Tech badges */}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {proj.tech.map((t) => (
                                      <span
                                        key={t}
                                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-cafe-cream/70 border border-white/40 text-cafe-espresso"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </button>

                              {/* Expandable Content */}
                              <motion.div
                                initial={false}
                                animate={{
                                  height: state.expandedProjectId === proj.id ? 'auto' : 0,
                                  opacity: state.expandedProjectId === proj.id ? 1 : 0,
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4">
                                  <p className="font-body text-cafe-mocha text-sm leading-relaxed mb-4">
                                    {proj.description}
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Features */}
                                    <div className="bg-white/20 rounded-lg p-3 border border-white/40">
                                      <div className="font-chalkboard text-cafe-espresso mb-2">Features</div>
                                      <ul className="list-none space-y-2">
                                        {proj.features.map((f) => (
                                          <li key={f} className="flex items-start gap-2">
                                            <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-cafe-warm flex-shrink-0" />
                                            <span className="font-body text-cafe-mocha text-sm">{f}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    {/* Links */}
                                    <div className="bg-white/20 rounded-lg p-3 border border-white/40">
                                      <div className="font-chalkboard text-cafe-espresso mb-2">Links</div>
                                      <div className="flex flex-wrap gap-3">
                                        {proj.links.demo && (
                                          <button
                                            onClick={() =>
                                              toast({
                                                title: "Live Demo",
                                                description: "Will be added soon",
                                              })
                                            }
                                            className="px-3 py-1 rounded-md bg-cafe-espresso/20 text-cafe-espresso border border-white/40 hover:bg-cafe-espresso/30 transition-colors text-sm"
                                          >
                                            Live Demo
                                          </button>
                                        )}
                                        {proj.links.repo && (
                                          <a
                                            href={proj.links.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 rounded-md bg-cafe-espresso/20 text-cafe-espresso border border-white/40 hover:bg-cafe-espresso/30 transition-colors text-sm"
                                          >
                                            GitHub Repo
                                          </a>
                                        )}
                                        {/* Case Study button removed as requested */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : section.id === 'contact' ? (
                      <div className="bg-white/30 rounded-xl p-6 border border-white/40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Contact Information */}
                          <div className="space-y-4">
                            <h3 className="font-chalkboard text-xl font-bold text-cafe-espresso mb-4">
                              ☕ Let's Brew Something Together
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">📧</span>
                                <div>
                                  <div className="font-body text-cafe-mocha font-semibold">Email</div>
                                  <a 
                                    href={`mailto:${section.content.contactInfo.email}`}
                                    className="font-body text-cafe-espresso hover:text-cafe-mocha transition-colors relative group"
                                  >
                                    {section.content.contactInfo.email}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cafe-espresso transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                                  </a>
                                </div>
                              </div>
                              

                              
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🌍</span>
                                <div>
                                  <div className="font-body text-cafe-mocha font-semibold">Location</div>
                                  <div className="font-body text-cafe-mocha">
                                    {section.content.contactInfo.location}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6">
                              <h4 className="font-chalkboard text-lg font-bold text-cafe-espresso mb-3">
                                Find Me at Other Cafés ☕
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                <a
                                  href={section.content.social.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-lg bg-cafe-espresso/20 text-cafe-espresso border border-white/40 hover:bg-cafe-espresso/30 transition-colors text-sm"
                                >
                                  GitHub
                                </a>
                                <a
                                  href={section.content.social.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-lg bg-cafe-espresso/20 text-cafe-espresso border border-white/40 hover:bg-cafe-espresso/30 transition-colors text-sm"
                                >
                                  LinkedIn
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Contact Form */}
                          <div className="bg-white/20 rounded-lg p-4 border border-white/40">
                            <h3 className="font-chalkboard text-lg font-bold text-cafe-espresso mb-4">
                              Send the Beans! ☕
                            </h3>
                            <form onSubmit={handleContactFormSubmit} className="space-y-4">
                              <div>
                                <label className="block font-body text-cafe-mocha text-sm font-medium mb-1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  value={state.contactForm.name}
                                  onChange={(e) => handleContactFormChange('name', e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-white/40 bg-white/30 text-cafe-espresso placeholder-cafe-mocha focus:outline-none focus:ring-2 focus:ring-cafe-warm"
                                  placeholder="Your name"
                                />
                              </div>
                              
                              <div>
                                <label className="block font-body text-cafe-mocha text-sm font-medium mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  value={state.contactForm.email}
                                  onChange={(e) => handleContactFormChange('email', e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-white/40 bg-white/30 text-cafe-espresso placeholder-cafe-mocha focus:outline-none focus:ring-2 focus:ring-cafe-warm"
                                  placeholder="your.email@example.com"
                                />
                              </div>
                              
                              <div>
                                <label className="block font-body text-cafe-mocha text-sm font-medium mb-1">
                                  Message
                                </label>
                                <textarea
                                  value={state.contactForm.message}
                                  onChange={(e) => handleContactFormChange('message', e.target.value)}
                                  rows={4}
                                  className="w-full px-3 py-2 rounded-lg border border-white/40 bg-white/30 text-cafe-espresso placeholder-cafe-mocha focus:outline-none focus:ring-2 focus:ring-cafe-warm resize-none"
                                  placeholder="Tell me about your project, or just say hi!"
                                />
                              </div>
                              
                              <button
                                type="submit"
                                className="w-full px-4 py-2 rounded-lg bg-cafe-espresso text-cafe-cream font-medium hover:bg-cafe-mocha transition-colors"
                              >
                                Brew a Message ☕
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : section.id === 'experience' ? (
                      <div className="bg-white/30 rounded-xl p-6 border border-white/40">
                        <h2 className="font-chalkboard text-2xl font-bold text-cafe-espresso mb-2">
                          {section.subtitle}
                        </h2>
                        <p className="font-body text-cafe-mocha text-lg leading-relaxed mb-5">
                          {section.content.description}
                        </p>
                        <div className="space-y-3 mb-6">
                          {section.content.bullets?.map((b: string, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + idx * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 bg-cafe-warm rounded-full mt-2 flex-shrink-0" />
                              <p className="font-body text-cafe-mocha">{b}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="bg-white/20 rounded-lg p-4 border border-white/40">
                          <div className="font-chalkboard text-cafe-espresso mb-2">Certificates</div>
                          <div className="flex flex-wrap gap-3">
                            {section.content.certificates?.map((c: { name: string; link: string }, i: number) => (
                              <a
                                key={i}
                                href={c.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-md bg-cafe-espresso/20 text-cafe-espresso border border-white/40 hover:bg-cafe-espresso/30 transition-colors text-sm"
                              >
                                {c.name}
                              </a>
                            ))}
                          </div>
                        </div>
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