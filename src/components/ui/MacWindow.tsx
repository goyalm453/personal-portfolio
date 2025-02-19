import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X, ExternalLink, Linkedin, Smartphone, FileText, Download } from 'lucide-react';

interface MacWindowProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ isOpen, onClose, url }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isRestrictedContent, setIsRestrictedContent] = useState(false);
  const [platform, setPlatform] = useState<'behance' | 'linkedin' | 'dribbble' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  });

  // Function to get document name from URL
  const getDisplayName = (url: string) => {
    const filename = url.split('/').pop() || url;
    return decodeURIComponent(filename);
  };

  // Check if the file is a PDF
  useEffect(() => {
    setIsPDF(url.toLowerCase().endsWith('.pdf'));
  }, [url]);

  // Update window dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let newWidth, newHeight;
      
      if (width <= 640) { // Mobile
        newWidth = width * 0.95;
        newHeight = height * 0.8;
      } else if (width <= 1024) { // Tablet
        newWidth = width * 0.85;
        newHeight = height * 0.85;
      } else { // Desktop
        newWidth = width * 0.8;
        newHeight = height * 0.8;
      }

      setWindowDimensions({
        width: newWidth,
        height: newHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    if (url.includes('behance.net')) {
      setIsRestrictedContent(true);
      setPlatform('behance');
    } else if (url.includes('linkedin.com')) {
      setIsRestrictedContent(true);
      setPlatform('linkedin');
    } else if (url.includes('dribbble.com')) {
      setIsRestrictedContent(true);
      setPlatform('dribbble');
    } else {
      setIsRestrictedContent(false);
      setPlatform(null);
    }
  }, [url]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen && isRestrictedContent && !redirecting) {
      setRedirecting(true);
      setShowTimer(true);
      setCountdown(3);
      
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            openContent();
            setTimeout(() => {
              setShowTimer(false);
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      setRedirecting(false);
      setShowTimer(false);
    };
  }, [isOpen, isRestrictedContent]);

  const handleMinimize = () => {
    onClose();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const openContent = () => {
    if (platform === 'linkedin' && isMobile) {
      const appUrl = url.replace('https://www.linkedin.com', 'linkedin://');
      const fallbackUrl = url;
      
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      iframe.src = appUrl;

      setTimeout(() => {
        document.body.removeChild(iframe);
        window.location.href = fallbackUrl;
      }, 2000);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = getDisplayName(url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlatformContent = () => {
    switch (platform) {
      case 'behance':
        return {
          title: 'Behance Content',
          description: 'Due to Behance\'s security settings, we can\'t display the content directly in this window.',
          buttonText: 'Open in Behance',
          icon: <ExternalLink className="w-4 h-4" />,
          bgColor: 'bg-blue-500/20',
          hoverBgColor: 'bg-blue-500/30',
          textColor: 'text-blue-400'
        };
      case 'linkedin':
        return {
          title: 'LinkedIn Content',
          description: isMobile 
            ? 'Open this content in the LinkedIn app for the best experience.'
            : 'View this content on LinkedIn for the best experience.',
          buttonText: isMobile ? 'Open in LinkedIn App' : 'Open in LinkedIn',
          icon: isMobile ? <Smartphone className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />,
          bgColor: 'bg-sky-500/20',
          hoverBgColor: 'bg-sky-500/30',
          textColor: 'text-sky-400'
        };
      case 'dribbble':
        return {
          title: 'Dribbble Content',
          description: 'Opening this Dribbble content in a new tab for the best viewing experience.',
          buttonText: 'Open in Dribbble',
          icon: <ExternalLink className="w-4 h-4" />,
          bgColor: 'bg-pink-500/20',
          hoverBgColor: 'bg-pink-500/30',
          textColor: 'text-pink-400'
        };
      default:
        return null;
    }
  };

  const platformContent = getPlatformContent();
  const isDocument = /\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif)$/i.test(url);
  const displayName = getDisplayName(url);

  const renderContent = () => {
    if (isRestrictedContent && platformContent) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 space-y-4 p-8">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-semibold mb-2">{platformContent.title}</h3>
            <p className="text-gray-400 mb-4">{platformContent.description}</p>
            <div className="space-y-4">
              <button
                onClick={openContent}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded ${platformContent.bgColor} hover:${platformContent.hoverBgColor} ${platformContent.textColor} transition-colors`}
              >
                <span>{platformContent.buttonText}</span>
                {platformContent.icon}
              </button>
              <AnimatePresence>
                {showTimer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${platformContent.bgColor}`}
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 3, ease: "linear" }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Redirecting in {countdown} seconds...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      );
    }

    if (isPDF && isMobile) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 space-y-6 p-8">
          <div className="text-center max-w-md">
            <FileText className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h3 className="text-xl font-semibold mb-2">PDF Document</h3>
            <p className="text-gray-400 mb-6">
              For the best experience on mobile devices, you can:
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.open(url, '_blank')}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 rounded bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Browser</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 rounded bg-gray-700/50 hover:bg-gray-700 text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <iframe
        src={url}
        className="w-full h-full border-none bg-white"
        title="Content Preview"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: 'white'
        }}
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              width: isMaximized ? '100%' : windowDimensions.width,
              height: isMaximized ? '100%' : windowDimensions.height,
              top: isMaximized ? '0' : '50%',
              left: isMaximized ? '0' : '50%',
              x: isMaximized ? '0' : '-50%',
              y: isMaximized ? '0' : '-50%'
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-[999] border border-gray-800"
            style={{
              minWidth: '320px',
              minHeight: '240px'
            }}
          >
            <div 
              className="h-8 bg-gray-950/80 backdrop-blur-sm flex items-center px-4 select-none cursor-move border-b border-gray-800"
              onDoubleClick={handleMaximize}
            >
              <div className="flex space-x-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
                >
                  <X className="w-2 h-2 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={handleMinimize}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
                >
                  <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center group"
                >
                  <Square className="w-2 h-2 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              
              <div className="flex-1 flex justify-center items-center space-x-2">
                <div className="bg-gray-800/50 rounded px-4 py-0.5 text-sm text-gray-300 max-w-md truncate border border-gray-700/50 flex items-center gap-2">
                  {isDocument && <FileText className="w-4 h-4" />}
                  {displayName}
                </div>
              </div>
            </div>

            <div className="w-full h-[calc(100%-2rem)] bg-gray-900">
              {renderContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MacWindow;