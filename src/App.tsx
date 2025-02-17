import React, { useState, useEffect, useCallback } from 'react';
import { Star, ArrowRight, Menu, X, Hexagon, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from './components/ui/waves-background';
import { GridBackground } from './components/ui/glowing-card';
import { ShootingStars } from './components/ui/shooting-stars';
import { CardSpotlight } from './components/ui/card-spotlight';
import { SocialLinks } from './components/ui/social-links';
import { TapeScroll } from './components/ui/tape-scroll';
import Preloader  from './components/ui/Preloader';
import ChatBot from './components/ui/ChatBot';
import MacWindow from './components/ui/MacWindow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showResume, setShowResume] = useState(false);
  
  const resumeUrl = "pubic/MohitGoyal.pdf";

  // Update loading state based on window load event
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // If the window is already loaded, hide the preloader
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  const useCustomLogo = true;
  const customLogoUrl = "pubic/logo1.png";

  const skills = [
    "Usability Testing",
    "User-Centric Design",
    "Prototyping",
    "Wireframing",
    "Web designs",
    "App designs",
    "UI/UX designs",
    "Figma",
    "Adobe Xd"
  ];

  // Add effect to scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    element.style.setProperty('--mouse-x', `${x}%`);
    element.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i : any) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      title: "UI/UX Design",
      description: "Crafting seamless and user-friendly experiences through intuitive and aesthetically pleasing interfaces.",
      icon: "pubic/user research (2).png"
    },
    {
      title: "User Research",
      description: "Conducting in-depth analysis to understand user behavior, pain points, and preferences for data-driven design decisions.",
      icon: "pubic/user research (1).png"
    },
    {
      title: "Wireframing & Prototyping",
      description: "Creating structured layouts and interactive prototypes to visualize and refine user journeys before development.",
      icon: "pubic/prototype.png"
    },
    {
      title: "Mobile App Design",
      description: "Designing user interfaces optimized for mobile platforms, ensuring a responsive and engaging experience across devices.",
      icon: "pubic/app-development.png"
    },
    {
      title: "Graphic Design",
      description: "I create appealing designs which effectively communicate your message that align with brand identity.",
      icon: "pubic/graphic-design.png"
    },
    {
      title: "Website Design",
      description: "Crafting visually appealing and user-friendly websites that enhance brand identity and improve user engagement.",
      icon: "/web-design.png"
    }
  ];

  const projects = [
    {
      number: "01",
      title: "Resumer- AI-Powered Resume Builder",
      description: "Resumer is an Ai Powered Resume Builder toolkit that helps job seekers and Working Professionals to create ATS-friendly, professional resumes effortlessly. With AI-powered optimization, smart templates, real-time suggestions, and one-click customization, users can craft standout resumes in seconds. 🚀",
      image: "pubic/Resumer.png",
      mockup: "pubic/Resumer.png",
      projectUrl: "https://www.behance.net/gallery/205453139/Resumer-AI-Powered-Resume-Builder-Toolkit-Case-Study"
    },
    {
      number: "02",
      title: "Luna  – AI-Powered Companion",
      description: "Luna  is an intelligent AI companion designed for engaging, human-like conversations. It offers personalized interactions, instant responses, and smart assistance, making it the perfect virtual companion for users seeking seamless AI-powered support. 🚀",
      image: "pubic/Luna.png",
      mockup: "/pubic/Luna.png",
      projectUrl: "https://lunaworld.netlify.app/"
    },
    {
      number: "03",
      title: "Redesign Of Monster Energy Website",
      description: "I redesigned the Monster Energy landing page to enhance user engagement and brand appeal. The new design features a bold, high-energy UI, improved navigation, and interactive elements, showcasing my prototyping skills in creating an immersive and dynamic user experience. 🚀",
      image: "pubic/monster.png",
      mockup: "pubic/monster.png",
      projectUrl: "https://www.behance.net/gallery/193970525/Redesign-The-Monster-Energy-Website"
    }
  ];

  const testimonials = [
    {
      text: "Working with Mohit was an excellent experience for my business. The attention to detail exceeded my expectations, and I couldn't be happier with the customer engagement. Highly recommended!",
      author: "Ashley Bekteshi",
      avatar: "pubic/avatar-2.png"
    },
    {
      text: "I was blown away by the creativity and professionalism brought to our project. The attention to detail exceeded expectations, and the end result was exactly what we needed. I can't wait to collaborate again!",
      author: "mark Butle",
      avatar: "pubic/avatar-1.png"
    },
    {
      text: "I needed a website with clean design and Mohit delivered magnificently. Their attention to detail exceeded my expectations. Very satisfied!                                    ",
      author: "Vijayendra Gopal",
      avatar: "pubic/avatar-4.png"
    }
  ];

  const steps = [
    {
      title: "Planning and Organizing",
      description: "We'll work together to plan your project, understand your goals, and create a strategy to reach your objectives.",
      icon: "1️⃣"
    },
    {
      title: "Creating and Designing",
      description: "After planning your project, we'll begin creating and designing to make a memorable impact online.",
      icon: "2️⃣"
    },
    {
      title: "Delivering",
      description: "We deliver everything and project management with regular updates to ensure you're happy with progress.",
      icon: "3️⃣"
    },
    {
      title: "Launching",
      description: "Once everything is ready, we'll launch with a carefully planned strategy to ensure success.",
      icon: "4️⃣"
    }
  ];
  const socials = [
    
    {
      name: "Twitter",
      image: "pubic/twitter.png",
      url: "https://twitter.com/goyalm453"
    },
    {
      name: "Instagram",
      image: "pubic/instagram.png",
      url: "https://instagram.com/mohit_1218"
    },
    {
      name: "LinkedIn",
      image: "pubic/linkdein.png",
      url: "https://www.linkedin.com/in/mohit-goyal-904982230/"
    },
    {
      name: "Behance",
      image: "pubic/behance.png",
      url: "https://www.behance.net/mohitgoyal453"
    }
  ];

  const menuItems = [
    { href: "#home", text: "HOME" },
    { href: "#about", text: "ABOUT" },
    { href: "#services", text: "SERVICES" },
    { href: "#portfolio", text: "PORTFOLIO" },
    { href: "#contact", text: "CONTACT ME" }
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const Logo = () => {
    if (useCustomLogo) {
      return (
        <img 
          src={customLogoUrl} 
          alt="Magret Digitalz Logo" 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
        />
      );
    }

    return (
      <div className="relative">
        <Hexagon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" strokeWidth={1.5} />
        <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={2} />
      </div>
    );
  };

  // Add touch event handlers for better mobile scrolling
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const difference = touchStartY - touchEndY;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(difference) > threshold) {
        // Determine scroll direction
        if (difference > 0) {
          // Scroll down
          window.scrollBy({
            top: window.innerHeight / 2,
            behavior: 'smooth'
          });
        } else {
          // Scroll up
          window.scrollBy({
            top: -window.innerHeight / 2,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Preloader isLoading={isLoading} />
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => scrollToSection('home')}
            >
              <Logo />
              <span className="text-lg md:text-xl font-bold ml-3 group-hover:text-cyan-400 transition-colors">MOHIT GOYAL</span>
            </motion.div>
            
            <motion.button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-cyan-400" />
              ) : (
                <Menu className="h-6 w-6 text-cyan-400" />
              )}
            </motion.button>

            <div className="hidden md:flex space-x-8 lg:space-x-12">
              {menuItems.map((item, index) => (
                <a 
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.replace('#', ''));
                  }}
                  href={item.href}
                  className={`${item.href === '#home' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'} cursor-pointer`}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden mt-4 bg-gray-900 rounded-lg overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.div className="flex flex-col space-y-4 p-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href.replace('#', ''));
                      }}
                      href={item.href}
                      className={`${item.href === '#home' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'} cursor-pointer`}
                      variants={menuItemVariants}
                      custom={index}
                    >
                      {item.text}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

       <motion.section 
        id="home" 
        className="min-h-[80vh] sm:min-h-screen relative overflow-hidden flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <div className="absolute inset-0 z-0">
          <Waves
            lineColor="rgba(34, 211, 238, 0.2)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 pt-16 sm:pt-0">
              <motion.p 
                variants={fadeInUpVariants}
                className="text-cyan-400 text-lg sm:text-lg md:text-xl font-medium mb-2 sm:mb-0"
              >
                Welcome to My Creative Space
              </motion.p>
              
              <motion.h1 
                variants={fadeInUpVariants}
                className="text-[2.5rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:leading-tight md:leading-tight px-4 sm:px-0"
              >
                I'm a Creative Designer<br />
                Based In <span className="gradient-text">India</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUpVariants}
                className="text-gray-300 text-base sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-6 sm:px-0"
              >
                I concentrate on creating digital experiences that are user-friendly,
                enjoyable, and effective in achieving their purpose.
              </motion.p>
              
              <motion.div variants={fadeInUpVariants} className="pt-4 sm:pt-0">
              <button 
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center px-8 sm:px-8 py-4 sm:py-4 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors text-base sm:text-base md:text-lg font-medium group"
            >
              Let's Talk
              <ArrowRight className="ml-2 w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
              </motion.div>
              
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="services" 
        className="py-12 md:py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildrenVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeInUpVariants} className="text-xl md:text-2xl font-bold mb-2 text-cyan-400">My Services</motion.h2>
          <motion.h3 variants={fadeInUpVariants} className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">What Can I Do?</motion.h3>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildrenVariants}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUpVariants}
              >
                <CardSpotlight className="h-full">
                  <div className="relative z-10">
                  <img 
                      src={service.icon} 
                      alt={service.title}
                      className="w-16 h-16 mb-4 object-contain"
                    />
                    <h4 className="text-lg md:text-xl font-bold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-sm md:text-base">{service.description}</p>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="about" 
        className="py-12 md:py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeInUpVariants} className="text-xl md:text-2xl font-bold mb-2 text-cyan-400">About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              className="space-y-4 md:space-y-6"
              variants={fadeInUpVariants}
            >
              <h3 className="text-2xl md:text-3xl font-bold">Mohit- UI/UX Designer</h3>
              <div className="space-y-4">
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                CS student by day, UX designer by night! I’m Mohit, passionate about turning complex problems into simple, user-friendly experiences. With a strong grasp of design principles and user psychology, I blend creativity with logic to craft intuitive interfaces that enhance engagement and usability. I wield the power of wireframing and prototyping to bring ideas to life, ensuring seamless experiences across web, mobile, and print. With a programmer’s brain and a designer’s eye, I bridge the gap between aesthetics and functionality, building designs that are not just beautiful but also effortless to use.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base"></p>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base"> </p>
                
              </div>
              <button 
                onClick={() => setShowResume(true)}
                className="inline-flex items-center px-8 sm:px-8 py-4 sm:py-4 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors text-base sm:text-base md:text-lg font-medium group"
            >
              View Resume
              <ArrowRight className="ml-2 w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base"> </p>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base"> </p>
            </motion.div>
            <motion.div 
              className="flex justify-center mt-8 md:mt-0"
              variants={fadeInUpVariants}
            >
              <div 
                className="about-image-container w-full max-w-md"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }}
              >
                <img 
                  src="pubic/photo.jpg"
                  alt="Professional portrait"
                  className="about-image w-full h-[400px] md:h-[400px] object-cover"
                />
              
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Add MacWindow for Resume */}
      <MacWindow 
        isOpen={showResume}
        onClose={() => setShowResume(false)}
        url={resumeUrl}
      />

      <TapeScroll items={skills} />

      <motion.section 
      id="portfolio" 
      className="py-12 md:py-24 px-4 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildrenVariants}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          variants={fadeInUpVariants} 
          className="text-2xl md:text-3xl font-bold mb-16 md:mb-24"
        >
          Projects I've worked on
        </motion.h2>
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className={`relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
              variants={fadeInUpVariants}
            >
              <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} text-6xl md:text-8xl font-bold text-cyan-400/20 -z-10 transform -translate-y-1/2`}>
                {project.number}
              </div>
              
              <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <a 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(project.projectUrl);
                    }}
                    className="inline-flex items-center px-6 py-3 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors text-base font-medium group cursor-pointer"
                  >
                    View Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 transition-transform hover:scale-[1.02]">
                    <img 
                      src={project.mockup}
                      alt={project.title}
                      className="rounded-xl w-full shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MacWindow 
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        url={selectedProject || ''}
      />
    </motion.section>

    <motion.section 
        className="py-12 md:py-16 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildrenVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 variants={fadeInUpVariants} className="text-xl md:text-2xl font-bold mb-2 text-cyan-400">
            Testimonials
          </motion.h2>
          <motion.h3 variants={fadeInUpVariants} className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">
            Client stories: Voices of success
          </motion.h3>
          
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
            
            <div className="flex overflow-hidden relative">
              <div className="flex infinite-scroll-container">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={`first-${index}`}
                    className="bg-gray-900 rounded-lg p-6 flex-shrink-0 mx-3 flex flex-col"
                    style={{
                      width: "400px",
                    }}
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 md:h-5 w-4 md:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm md:text-base mb-4 flex-grow min-h-[80px]">{testimonial.text}</p>
                    <div className="flex items-center justify-start w-full mt-auto">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4 flex-shrink-0"
                      />
                      <span className="font-medium text-sm md:text-base truncate">{testimonial.author}</span>
                    </div>
                  </div>
                ))}
                
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={`second-${index}`}
                    className="bg-gray-900 rounded-lg p-6 flex-shrink-0 mx-3 flex flex-col"
                    style={{
                      width: "400px",
                    }}
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 md:h-5 w-4 md:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm md:text-base mb-4 flex-grow min-h-[80px]">{testimonial.text}</p>
                    <div className="flex items-center justify-start w-full mt-auto">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4 flex-shrink-0"
                      />
                      <span className="font-medium text-sm md:text-base truncate">{testimonial.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
      className="py-12 md:py-16 px-4 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildrenVariants}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 variants={fadeInUpVariants} className="text-xl md:text-2xl font-bold mb-2 text-cyan-400">My Process</motion.h2>
        <motion.h3 variants={fadeInUpVariants} className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">How I Help You</motion.h3>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerChildrenVariants}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden group hover:bg-gray-900/90 transition-colors"
              variants={fadeInUpVariants}
            >
              {/* Background with stars */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
                <div className="stars absolute inset-0" />
                
                {/* Add multiple shooting star layers with different colors and speeds */}
                <ShootingStars
                  starColor="#9E00FF"
                  trailColor="#2EB9DF"
                  minSpeed={15}
                  maxSpeed={35}
                  minDelay={1000}
                  maxDelay={3000}
                />
                <ShootingStars
                  starColor="#FF0099"
                  trailColor="#FFB800"
                  minSpeed={10}
                  maxSpeed={25}
                  minDelay={2000}
                  maxDelay={4000}
                />
                <ShootingStars
                  starColor="#00FF9E"
                  trailColor="#00B8FF"
                  minSpeed={20}
                  maxSpeed={40}
                  minDelay={1500}
                  maxDelay={3500}
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <span className="text-cyan-400 text-3xl md:text-4xl mb-4 block">{step.icon}</span>
                <h4 className="text-lg md:text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

      <motion.section 
        className="py-12 md:py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto">
          <GridBackground
            title="Take the next step."
            description="Let's give your project a go!"
            showAvailability={false}
            className="w-full"
          >
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors text-base md:text-lg font-medium mt-8"
            >
              Let's Connect
            </a>
          </GridBackground>
        </div>
      </motion.section>

      <motion.section 
        id="contact"
        className="py-12 md:py-16 px-4 border-t border-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto text-center">
          <SocialLinks socials={socials} className="mb-6" />
          <p className="text-gray-400 text-sm md:text-base">Copyright ©2025 Mohit Goyal. All rights reserved.</p>
        </div>
      </motion.section>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;