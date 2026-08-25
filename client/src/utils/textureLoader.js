import * as THREE from 'three';

let cachedTexture = null;

export const loadTransparentRakhiTexture = () => {
  if (cachedTexture) return Promise.resolve(cachedTexture);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/rakhi_premium.png';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Make white and off-white background completely transparent with smooth edge anti-aliasing
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Background detection: high brightness and low saturation (white/off-white)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        const brightness = (r + g + b) / 3;

        // If pixel is near-white with very low saturation (background)
        if (brightness > 235 && delta < 20) {
          // Smooth alpha falloff for antialiased edges
          const factor = (brightness - 235) / 20; // 0 to 1
          data[i + 3] = Math.round(data[i + 3] * Math.max(0, 1 - factor * factor));
        } else if (brightness > 250) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;

      cachedTexture = texture;
      resolve(texture);
    };

    img.onerror = (err) => {
      console.warn('Error loading Rakhi image for transparency:', err);
      // Fallback standard texture
      const fallbackLoader = new THREE.TextureLoader();
      fallbackLoader.load('/rakhi_premium.png', (tex) => {
        cachedTexture = tex;
        resolve(tex);
      }, undefined, reject);
    };
  });
};
