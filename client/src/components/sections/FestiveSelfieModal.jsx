import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FestiveButton from '../common/FestiveButton';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Camera,
  Upload,
  Sparkles,
  Download,
  Share2,
  X,
  RotateCcw,
  CheckCircle2,
  Palette,
  Timer,
  Zap,
  Smartphone,
  MessageSquareQuote,
  Copy,
  AlertCircle
} from 'lucide-react';

// Synchronously convert DataURI to Blob (No async fetch delay, keeps user gesture alive for mobile share)
function dataURItoBlob(dataURI) {
  try {
    const parts = dataURI.split(',');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  } catch (e) {
    console.error('Blob conversion error:', e);
    return null;
  }
}

export const FestiveSelfieModal = ({
  isOpen,
  onClose,
  defaultSisterName = '',
  defaultBrotherName = '',
  showToast
}) => {
  const [sisterName, setSisterName] = useState(defaultSisterName || 'બહેન');
  const [brotherName, setBrotherName] = useState(defaultBrotherName || 'ભાઈ');
  const [selectedFrame, setSelectedFrame] = useState('royal_gold');
  const [customMessage, setCustomMessage] = useState(
    `🪔 શુભ રક્ષાબંધન! ✨\nભાઈ-બહેનના પવિત્ર સ્નેહ, અતૂટ વિશ્વાસ અને રક્ષાના પાવન પર્વની હાર્દિક શુભકામનાઓ! 💖\nઆપણો આ સંબંધ સદાય સુખ-સમૃદ્ધિથી મહેકતો રહે! 🌸`
  );
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [compositeCardUrl, setCompositeCardUrl] = useState(null);
  const [cardFileObject, setCardFileObject] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileCameraInputRef = useRef(null);
  const streamRef = useRef(null);

  // Detect Mobile Device
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
    setIsMobileDevice(isMobile);
  }, []);

  // Sync prop names
  useEffect(() => {
    if (defaultSisterName) setSisterName(defaultSisterName);
    if (defaultBrotherName) setBrotherName(defaultBrotherName);
  }, [defaultSisterName, defaultBrotherName]);

  // Update Gujarati celebration share message when sibling names change
  useEffect(() => {
    const sName = sisterName.trim() || 'બહેન';
    const bName = brotherName.trim() || 'ભાઈ';
    setCustomMessage(
      `🪔 શુભ રક્ષાબંધન! ✨\n${sName} અને ${bName} તરફથી રક્ષાબંધનના પવિત્ર પર્વની હાર્દિક શુભકામનાઓ!\nભાઈ-બહેનનો આ અતૂટ સ્નેહ અને ખુશીઓ સદાય અકબંધ રહે! 💖`
    );
  }, [sisterName, brotherName]);

  // Clean up camera on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  // Re-generate composite card whenever capturedImage, sisterName, brotherName, or frame changes
  useEffect(() => {
    if (capturedImage) {
      renderFestiveCard();
    }
  }, [capturedImage, sisterName, brotherName, selectedFrame]);

  // Robust Camera Starter with Mobile Fallbacks
  const startCamera = async () => {
    setCameraError(null);

    // If mediaDevices is not available (e.g. HTTP on phone network)
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (mobileCameraInputRef.current) {
        mobileCameraInputRef.current.click();
        return;
      }
      setCameraError('Tap "Take Mobile Selfie" to open your phone camera directly.');
      return;
    }

    try {
      if (streamRef.current) {
        stopCamera();
      }

      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (e1) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
          });
        } catch (e2) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }
      }

      if (!stream) {
        throw new Error('Could not initialize video stream');
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('webkit-playsinline', 'true');
        await videoRef.current.play();
      }
      setCameraActive(true);
      if (showToast) showToast('📸 Camera live! Pose with your sibling!');
    } catch (err) {
      console.warn('Camera stream error:', err);
      if (isMobileDevice && mobileCameraInputRef.current) {
        mobileCameraInputRef.current.click();
      } else {
        setCameraError('Camera access unavailable. Click "Take Mobile Selfie" or upload from gallery!');
      }
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCountdown(null);
  };

  // Instant shutter capture
  const takeInstantPhoto = () => {
    performCapture();
  };

  // 3-second timer capture
  const startTimerCapture = () => {
    soundManager.playBell();
    setCountdown(3);

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(timer);
        setCountdown(null);
        performCapture();
      } else {
        setCountdown(count);
        soundManager.playChime();
      }
    }, 900);
  };

  const performCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    // Flash animation
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    soundManager.playFanfare();

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Flip horizontal for natural selfie mirror
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);
    stopCamera();

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 }
    });

    if (showToast) showToast('✨ Sibling selfie captured! Customize your festive card below!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target.result);
      stopCamera();
      soundManager.playChime();
      if (showToast) showToast('✨ Photo loaded! Generating card...');
    };
    reader.readAsDataURL(file);
  };

  // Render the final card on canvas
  const renderFestiveCard = () => {
    if (!capturedImage) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cardWidth = 1080;
    const cardHeight = 1350; // 4:5 Portrait Card
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    // 1. Festive Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, cardHeight);
    if (selectedFrame === 'royal_gold') {
      bgGrad.addColorStop(0, '#FFFDF9');
      bgGrad.addColorStop(0.3, '#FFF7ED');
      bgGrad.addColorStop(1, '#FEF3C7');
    } else if (selectedFrame === 'sacred_crimson') {
      bgGrad.addColorStop(0, '#450A0A');
      bgGrad.addColorStop(0.5, '#7F1D1D');
      bgGrad.addColorStop(1, '#991B1B');
    } else {
      bgGrad.addColorStop(0, '#1E1B4B');
      bgGrad.addColorStop(0.6, '#312E81');
      bgGrad.addColorStop(1, '#4338CA');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // 2. Load User Image
    const userImg = new Image();
    userImg.onload = () => {
      const photoPadding = 75;
      const photoTop = 180;
      const photoWidth = cardWidth - photoPadding * 2;
      const photoHeight = 780;

      // Draw photo with rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoPadding, photoTop, photoWidth, photoHeight, 32);
      ctx.clip();

      // Object fit cover calculation
      const imgAspect = userImg.width / userImg.height;
      const targetAspect = photoWidth / photoHeight;
      let renderW, renderH, renderX, renderY;

      if (imgAspect > targetAspect) {
        renderH = photoHeight;
        renderW = photoHeight * imgAspect;
        renderX = photoPadding + (photoWidth - renderW) / 2;
        renderY = photoTop;
      } else {
        renderW = photoWidth;
        renderH = photoWidth / imgAspect;
        renderX = photoPadding;
        renderY = photoTop + (photoHeight - renderH) / 2;
      }

      ctx.drawImage(userImg, renderX, renderY, renderW, renderH);
      ctx.restore();

      // 3. Ornate Double Gold & Crimson Border Frame
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect(photoPadding - 6, photoTop - 6, photoWidth + 12, photoHeight + 12, 36);
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.strokeStyle = '#DC2626';
      ctx.beginPath();
      ctx.roundRect(photoPadding - 14, photoTop - 14, photoWidth + 28, photoHeight + 28, 42);
      ctx.stroke();

      // 4. Header Badge & Typography
      ctx.textAlign = 'center';
      ctx.fillStyle = selectedFrame === 'royal_gold' ? '#DC2626' : '#FBBF24';
      ctx.font = 'bold 38px sans-serif';
      ctx.fillText('॥ શુભ રક્ષાબંધન ॥', cardWidth / 2, 90);

      ctx.fillStyle = selectedFrame === 'royal_gold' ? '#78350F' : '#FFFFFF';
      ctx.font = 'bold 48px serif';
      ctx.fillText('Happy Raksha Bandhan', cardWidth / 2, 148);

      // 5. Bottom Sibling Names Banner Card
      const bannerTop = 995;
      const bannerHeight = 280;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
      ctx.beginPath();
      ctx.roundRect(photoPadding, bannerTop, photoWidth, bannerHeight, 28);
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#F59E0B';
      ctx.stroke();

      // Sibling Names Title
      ctx.fillStyle = '#991B1B';
      ctx.font = 'bold 44px sans-serif';
      const siblingTitle = `${sisterName || 'Sister'} & ${brotherName || 'Brother'}`;
      ctx.fillText(siblingTitle, cardWidth / 2, bannerTop + 72);

      // Subtitle Quote in Gujarati
      ctx.fillStyle = '#451A03';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('“ભાઈ-બહેનનો પવિત્ર સ્નેહ અને અતૂટ રક્ષાનું બંધન”', cardWidth / 2, bannerTop + 125);

      // Auspicious Date & Watermark
      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('✨ શ્રાવણ સુદ પૂનમ • ભાઈ-બહેન સ્નેહ સ્મૃતિ ✨', cardWidth / 2, bannerTop + 175);

      // Small decorative corner symbols
      ctx.font = '36px sans-serif';
      ctx.fillText('🪔', photoPadding + 50, bannerTop + 85);
      ctx.fillText('🧵', cardWidth - photoPadding - 50, bannerTop + 85);

      // Watermark link
      ctx.fillStyle = '#A8A29E';
      ctx.font = '18px sans-serif';
      ctx.fillText('Crafted with love at Raksha Bandhan Festive Portal', cardWidth / 2, bannerTop + 235);

      // Export as high quality JPEG for universal mobile & WhatsApp media compatibility
      const finalUrl = canvas.toDataURL('image/jpeg', 0.95);
      setCompositeCardUrl(finalUrl);

      // Synchronously generate File object so it is ready immediately on click without async delays
      const blob = dataURItoBlob(finalUrl);
      if (blob) {
        const file = new File(
          [blob],
          `Raksha_Bandhan_${sisterName || 'Sister'}_and_${brotherName || 'Brother'}.jpg`,
          { type: 'image/jpeg' }
        );
        setCardFileObject(file);
      }

      setIsProcessing(false);
    };

    userImg.src = capturedImage;
  };

  const handleDownload = () => {
    if (!compositeCardUrl) return;
    const link = document.createElement('a');
    link.download = `Raksha_Bandhan_${sisterName || 'Sister'}_and_${brotherName || 'Brother'}.jpg`;
    link.href = compositeCardUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    soundManager.playChime();
    if (showToast) showToast('📥 Festive photo card saved to your device!');
  };

  // Synchronous Web Share (Zero async delay to preserve mobile user gesture!)
  const handleSharePhoto = () => {
    if (!compositeCardUrl) return;

    // 1. Auto-download immediately to phone gallery
    handleDownload();

    // 2. Copy Gujarati text message to clipboard
    try {
      navigator.clipboard.writeText(customMessage);
    } catch (e) {}

    // 3. Trigger native mobile share with pre-computed file
    const file = cardFileObject;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          files: [file],
          title: 'શુભ રક્ષાબંધન!'
        })
        .then(() => {
          if (showToast) showToast('🎉 Photo card shared successfully!');
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Share error:', err);
            // Fallback to opening WhatsApp with greeting text
            const encodedText = encodeURIComponent(customMessage);
            window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
          }
        });
      return;
    }

    // 4. Fallback for Desktop: Copy image blob to clipboard and open WhatsApp Web
    try {
      const blob = dataURItoBlob(compositeCardUrl);
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(() => {
          if (showToast) showToast('📋 Photo copied! In WhatsApp Web, press Ctrl+V to send.');
        });
      }
    } catch (err) {}

    // Open WhatsApp
    const encodedText = encodeURIComponent(customMessage);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  // 2. Share Gujarati Text to WhatsApp directly
  const handleShareTextWhatsApp = () => {
    handleDownload();
    const encodedText = encodeURIComponent(customMessage);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    if (showToast) showToast('📲 Opening WhatsApp with your Gujarati greeting!');
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        stopCamera();
        onClose();
      }}
      className="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full bg-white rounded-3xl p-5 md:p-7 border-2 border-amber-300 shadow-2xl relative my-6 max-h-[94vh] overflow-y-auto"
      >
        {/* Shutter Flash Animation */}
        {isFlashing && (
          <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-fade-out opacity-90" />
        )}

        {/* Close Button */}
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-amber-100 transition-colors z-20"
          aria-label="Close selfie modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-3 border-b border-amber-200">
          <span className="font-hindi text-xs text-festive-saffron font-bold">
            સેલ્ફી ફોટો બૂથ • રક્ષાબંધન
          </span>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-festive-crimson mt-0.5">
            Festive Sibling Selfie & Photo Card
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Capture with phone camera or upload a photo, frame it with royal gold blessings, and share to WhatsApp!
          </p>

          {/* Privacy Guarantee Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Private • Processed on device (Zero database storage)</span>
          </div>
        </div>

        {/* Sibling Names Input */}
        <div className="grid grid-cols-2 gap-3 py-3">
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Sister's Name
            </label>
            <input
              type="text"
              value={sisterName}
              onChange={(e) => setSisterName(e.target.value)}
              placeholder="e.g. Ananya"
              maxLength={25}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs bg-amber-50/40 focus:ring-2 focus:ring-festive-crimson outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Brother's Name
            </label>
            <input
              type="text"
              value={brotherName}
              onChange={(e) => setBrotherName(e.target.value)}
              placeholder="e.g. Aarav"
              maxLength={25}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs bg-amber-50/40 focus:ring-2 focus:ring-festive-crimson outline-none"
            />
          </div>
        </div>

        {/* Live Camera Video / Card Display Area */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-300 aspect-[4/3] flex items-center justify-center mb-4 shadow-inner">
          
          {/* Always mounted video element with playsinline for mobile Safari / Chrome */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 ${
              cameraActive && !capturedImage ? 'block' : 'hidden'
            }`}
          />

          {/* Live Countdown Overlay */}
          {countdown && cameraActive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="text-8xl font-extrabold text-festive-gold animate-ping">
                {countdown}
              </span>
            </div>
          )}

          {/* Captured Composite Card Display */}
          {capturedImage && (
            <div className="relative w-full h-full flex items-center justify-center bg-stone-950 p-2">
              {compositeCardUrl ? (
                <img
                  src={compositeCardUrl}
                  alt="Sibling Festive Card"
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <div className="text-white text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Generating festive card...</span>
                </div>
              )}
            </div>
          )}

          {/* Camera Error / Fallback State */}
          {!cameraActive && !capturedImage && (
            <div className="text-center p-6 space-y-3 text-stone-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center text-3xl">
                📸
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Capture or Choose Sibling Photo</h4>
                <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                  {cameraError || 'Tap "Take Mobile Selfie" to open your phone camera directly!'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Shutter / Capture / Upload Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4 border-b border-amber-200">
          
          {/* While Live Camera is Active: Instant Snap & Timer Snap */}
          {cameraActive && !capturedImage && (
            <>
              <button
                onClick={takeInstantPhoto}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-xs font-bold shadow-lg hover:shadow-xl flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
              >
                <Zap className="w-4 h-4" /> Snap Photo Now 📸
              </button>

              <button
                onClick={startTimerCapture}
                disabled={countdown !== null}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Timer className="w-4 h-4" /> 3s Timer
              </button>

              <button
                onClick={() => mobileCameraInputRef.current?.click()}
                className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-festive-crimson" /> Phone Camera
              </button>
            </>
          )}

          {/* When Camera is Not Active & No Image: Native Mobile Shutter & Live Webcam & Upload */}
          {!cameraActive && !capturedImage && (
            <>
              {/* Native Mobile Front Camera Shutter Button (100% infallible on Android/iPhone) */}
              <button
                onClick={() => mobileCameraInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-xs font-bold shadow-lg hover:shadow-xl flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
              >
                <Camera className="w-4 h-4" /> Take Mobile Selfie 📸
              </button>

              {/* Live WebCam / Browser Stream Button */}
              <button
                onClick={startCamera}
                className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-stone-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Camera className="w-4 h-4 text-festive-crimson" /> Live Stream
              </button>

              {/* Upload from Gallery / Files */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Upload className="w-4 h-4 text-festive-gold" /> Upload from Gallery
              </button>
            </>
          )}

          {/* When Photo is Captured: Retake or Change */}
          {capturedImage && (
            <>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  setCompositeCardUrl(null);
                  setCardFileObject(null);
                  if (isMobileDevice && mobileCameraInputRef.current) {
                    mobileCameraInputRef.current.click();
                  } else {
                    startCamera();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-festive-crimson" /> Retake Photo 📸
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Upload className="w-3.5 h-3.5 text-festive-gold" /> Choose From Gallery
              </button>
            </>
          )}

          {/* Native Mobile Camera Capture Shutter Input (Direct Front Camera on Mobile) */}
          <input
            ref={mobileCameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Standard Gallery File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Frame Styles Selector & Gujarati WhatsApp Message */}
        {capturedImage && (
          <div className="py-3 space-y-3">
            {/* Theme Picker */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-festive-gold" /> Choose Festive Card Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedFrame('royal_gold')}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedFrame === 'royal_gold'
                      ? 'bg-amber-100 border-festive-gold text-festive-dark shadow-sm ring-2 ring-festive-gold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  👑 Royal Gold
                </button>
                <button
                  onClick={() => setSelectedFrame('sacred_crimson')}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedFrame === 'sacred_crimson'
                      ? 'bg-red-100 border-festive-crimson text-festive-crimson shadow-sm ring-2 ring-festive-crimson'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  🔴 Sacred Crimson
                </button>
                <button
                  onClick={() => setSelectedFrame('shravan_night')}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedFrame === 'shravan_night'
                      ? 'bg-indigo-100 border-indigo-600 text-indigo-900 shadow-sm ring-2 ring-indigo-600'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  🌌 Shravan Night
                </button>
              </div>
            </div>

            {/* Editable Gujarati WhatsApp & Social Share Message Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600" /> Gujarati Greeting Message (ગુજરાતી સંદેશ):
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(customMessage);
                    if (showToast) showToast('📋 Gujarati message copied to clipboard!');
                  }}
                  className="text-[11px] text-festive-crimson font-bold hover:underline flex items-center gap-0.5"
                >
                  <Copy className="w-3 h-3" /> Copy Message
                </button>
              </div>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border border-amber-300 text-xs bg-amber-50/30 text-stone-800 focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed font-sans"
              />
            </div>
          </div>
        )}

        {/* Sharing Action Controls for Mobile & Desktop */}
        {capturedImage && (
          <div className="pt-3 border-t border-amber-200 space-y-2">
            <span className="text-[11px] font-bold text-stone-600 block text-center uppercase tracking-wider">
              Share Sibling Photo Card
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Button 1: Share Actual Photo Card File into WhatsApp / Apps */}
              <button
                onClick={handleSharePhoto}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Photo Card 📸
              </button>

              {/* Button 2: Share WhatsApp Text Greeting */}
              <button
                onClick={handleShareTextWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" /> Send Text on WhatsApp 💬
              </button>

              {/* Button 3: Instant High-Res Download */}
              <button
                onClick={handleDownload}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-festive-crimson to-festive-gold text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Download className="w-3.5 h-3.5" /> Download HD Photo 📥
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FestiveSelfieModal;
