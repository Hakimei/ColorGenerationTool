import chroma from 'chroma-js';

export interface ColorScale {
  name: string;
  colors: string[]; // Array of 12 hex codes
}

export const DEFAULT_LIGHTNESS_SCALE = [
  0.995, 0.975, 0.945, 0.91, 0.865, 0.81, 0.735, 0.63, 0.50, 0.44, 0.35, 0.12,
];

export const DARK_LIGHTNESS_SCALE = [
  0.01, 0.04, 0.08, 0.12, 0.17, 0.23, 0.30, 0.42, 0.50, 0.55, 0.65, 0.90
];

export interface ScaleOptions {
    hueShift?: number; // Degrees to shift from start to end
    saturationScale?: number; // Multiplier 0.0 to 2.0
    useP3?: boolean; // Use P3 color space (simulated via CSS or just placeholder for now)
}

export function generateScale(
  baseColor: string, 
  name: string = 'Custom', 
  isDark: boolean = false,
  options: ScaleOptions = {}
): ColorScale {
  try {
    const { hueShift = 0, saturationScale = 1.0 } = options;
    const base = chroma(baseColor);
    const h = base.get('hsl.h');
    const s = base.get('hsl.s');
    
    const lightnessTargets = isDark ? DARK_LIGHTNESS_SCALE : DEFAULT_LIGHTNESS_SCALE;
    
    const colors = lightnessTargets.map((targetL, index) => {
      // Hue Shift: Distribute hue shift across the 12 steps
      // Pivot around the middle (index 6) or start from index 0?
      // Let's pivot around index 6 (approx middle visually) so base color hue is preserved roughly in the middle
      const hueAdjustment = (hueShift / 12) * (index - 6);
      const targetH = (isNaN(h) ? 0 : h) + hueAdjustment;
      
      // Saturation Adjustment
      let adjustedS = s * saturationScale;
      
      // Radix-like saturation dampening for light/dark ends
      if (targetL > 0.9) adjustedS = adjustedS * 0.8;
      else if (targetL < 0.2) adjustedS = adjustedS * 0.7;
      
      // Clamp saturation
      adjustedS = Math.max(0, Math.min(1, adjustedS));
      
      return chroma.hsl(targetH, adjustedS, targetL).hex();
    });

    return {
      name,
      colors
    };
  } catch (e) {
    console.error("Error generating scale", e);
    return { name, colors: Array(12).fill("#000000") };
  }
}

// WCAG 2.1 Contrast
export function getContrast(c1: string, c2: string) {
  try {
    return chroma.contrast(c1, c2);
  } catch {
    return 0;
  }
}

// APCA Implementation (Simplified G-4g constants)
const sRGBtrc = 2.4;
const Rco = 0.2126729, Gco = 0.7151522, Bco = 0.0721750;
const scaleBoW = 1.14, scaleWoB = 1.14;
const normBG = 0.56, normTXT = 0.57;
const revTXT = 0.62, revBG = 0.65;
const blkThrs = 0.022;

function simpleExp(val: number) {
    return Math.pow(val, sRGBtrc);
}

function getLuminanceAPCA(color: string) {
    const rgb = chroma(color).rgb();
    return (simpleExp(rgb[0]/255.0) * Rco) + (simpleExp(rgb[1]/255.0) * Gco) + (simpleExp(rgb[2]/255.0) * Bco);
}

export function getAPCA(txt: string, bg: string) {
    try {
        let Ytxt = getLuminanceAPCA(txt);
        let Ybg = getLuminanceAPCA(bg);
        
        // Clamp low values
        if (Ytxt <= blkThrs) Ytxt += Math.pow(blkThrs - Ytxt, 1.414);
        if (Ybg <= blkThrs) Ybg += Math.pow(blkThrs - Ybg, 1.414);

        if (isNaN(Ytxt) || isNaN(Ybg)) return 0;

        let SAPC = 0;

        if (Ybg > Ytxt) { // Dark text on Light background
             SAPC = (Math.pow(Ybg, normBG) - Math.pow(Ytxt, normTXT)) * scaleBoW;
             // Output scale scaling
             if (SAPC < 0.0004) SAPC = 0;
             else if (SAPC < 0.1) SAPC = SAPC - 0.027;
             else SAPC = SAPC - 0.027; // Simple offset
             
             // Re-scale to roughly 100
             return SAPC * 100;
        } else { // Light text on Dark background
             SAPC = (Math.pow(Ybg, revBG) - Math.pow(Ytxt, revTXT)) * scaleWoB;
              if (SAPC > -0.0004) SAPC = 0;
             else if (SAPC > -0.1) SAPC = SAPC + 0.027;
             else SAPC = SAPC + 0.027;
             
             return SAPC * 100;
        }
    } catch {
        return 0;
    }
}

export function getAPCARating(score: number) {
    const s = Math.abs(score);
    if (s >= 90) return { label: 'Excellent', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' };
    if (s >= 75) return { label: 'Good (Body)', class: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100' };
    if (s >= 60) return { label: 'Good (Large)', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' };
    if (s >= 45) return { label: 'Poor (Large only)', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' };
    if (s >= 30) return { label: 'Fail (Spot only)', class: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' };
    return { label: 'Fail', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' };
}

export function getWCAGRating(ratio: number) {
    if (ratio >= 7) return { label: 'AAA', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' };
    if (ratio >= 4.5) return { label: 'AA', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' };
    if (ratio >= 3) return { label: 'AA Large', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' };
    return { label: 'Fail', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' };
}

export function isValidColor(c: string) {
    return chroma.valid(c);
}
