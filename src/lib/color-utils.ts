import chroma from 'chroma-js';

export interface ColorScale {
  name: string;
  colors: string[]; // Array of 12 hex codes
}

export interface AlphaColor {
  rgba: string;       // rgba(r, g, b, a)
  hsla: string;       // hsla(h, s%, l%, a)
  hex8: string;       // #RRGGBBAA
  alpha: number;      // 0-1 alpha value
  r: number;
  g: number;
  b: number;
}

export interface AlphaColorScale {
  name: string;
  colors: AlphaColor[]; // Array of 12 alpha colors
  background: string;   // The background color used for computation
}

// ===== LIGHT MODE LIGHTNESS SCALES =====

export const DEFAULT_LIGHTNESS_SCALE = [
  0.995, 0.975, 0.945, 0.91, 0.865, 0.81, 0.735, 0.63, 0.50, 0.44, 0.35, 0.12,
];

// Special lightness scales for problematic colors in light mode
export const YELLOW_LIGHT_SCALE = [
  0.985, 0.955, 0.915, 0.87, 0.815, 0.75, 0.67, 0.58, 0.48, 0.42, 0.34, 0.12,
];

export const CYAN_LIGHT_SCALE = [
  0.99, 0.965, 0.925, 0.885, 0.835, 0.775, 0.70, 0.60, 0.49, 0.43, 0.35, 0.12,
];

export const LIME_LIGHT_SCALE = [
  0.988, 0.96, 0.92, 0.88, 0.825, 0.76, 0.685, 0.59, 0.485, 0.425, 0.345, 0.12,
];

// ===== DARK MODE LIGHTNESS SCALES =====
// Modeled after actual Radix dark color scales (blue-dark, red-dark, etc.)
// Steps 1-2: Very dark tinted backgrounds
// Steps 3-5: Component backgrounds (progressively lighter)
// Steps 6-8: Borders (visible against dark bg, progressive)
// Step 9: Solid brand color (locked to base)
// Step 10: Hover state of step 9 (slightly lighter)
// Step 11: Low-contrast text (readable on dark)
// Step 12: High-contrast text (near-white, tinted)

export const DARK_LIGHTNESS_SCALE = [
  0.088, 0.112, 0.148, 0.175, 0.202, 0.232, 0.274, 0.342, 0.50, 0.58, 0.66, 0.93,
];

// Yellow in dark mode needs suppressed lightness in early steps to avoid muddy appearance
export const YELLOW_DARK_SCALE = [
  0.075, 0.098, 0.130, 0.155, 0.182, 0.215, 0.258, 0.330, 0.50, 0.58, 0.72, 0.94,
];

// Cyan in dark mode - slightly adjusted for perceptual uniformity
export const CYAN_DARK_SCALE = [
  0.082, 0.105, 0.140, 0.165, 0.192, 0.224, 0.266, 0.338, 0.49, 0.57, 0.67, 0.93,
];

// Lime in dark mode
export const LIME_DARK_SCALE = [
  0.078, 0.100, 0.135, 0.160, 0.188, 0.220, 0.262, 0.334, 0.485, 0.57, 0.70, 0.94,
];

// ===== DARK MODE SATURATION CURVE =====
// Radix dark scales have a characteristic saturation ramp:
// - Steps 1-2: Low saturation (tinted but not vivid backgrounds)
// - Steps 3-5: Moderate, progressively increasing
// - Steps 6-8: Higher saturation approaching brand
// - Step 9-10: Full saturation (brand color)
// - Step 11: High saturation (colored text)
// - Step 12: Slightly reduced saturation (high-contrast, near-white text)
const DARK_SATURATION_CURVE = [
  0.30, 0.42, 0.52, 0.58, 0.63, 0.68, 0.76, 0.84, 1.0, 1.0, 0.95, 0.65,
];

// Yellow has naturally lower perceived saturation in dark; boost mid-tones
const YELLOW_DARK_SAT_CURVE = [
  0.25, 0.36, 0.46, 0.52, 0.58, 0.65, 0.74, 0.82, 1.0, 1.0, 0.88, 0.55,
];

// Cyan dark saturation - slightly boosted for visibility
const CYAN_DARK_SAT_CURVE = [
  0.32, 0.44, 0.54, 0.60, 0.65, 0.70, 0.78, 0.86, 1.0, 1.0, 0.96, 0.68,
];

// Lime dark saturation
const LIME_DARK_SAT_CURVE = [
  0.28, 0.40, 0.50, 0.56, 0.62, 0.68, 0.76, 0.84, 1.0, 1.0, 0.90, 0.58,
];

export interface ScaleOptions {
    hueShift?: number; // Degrees to shift from start to end
    saturationScale?: number; // Multiplier 0.0 to 2.0
    useP3?: boolean; // Use P3 color space (placeholder)
}

/**
 * Gets the hue category for special handling
 */
function getHueCategory(hue: number): 'yellow' | 'lime' | 'cyan' | 'default' {
  const normalizedHue = ((hue % 360) + 360) % 360;
  
  if (normalizedHue >= 45 && normalizedHue < 65) return 'yellow';
  if (normalizedHue >= 65 && normalizedHue <= 100) return 'lime';
  if (normalizedHue >= 170 && normalizedHue <= 200) return 'cyan';
  return 'default';
}

/**
 * Determines the optimal lightness scale for a given hue and mode
 */
function getLightnessScale(hue: number, isDark: boolean): number[] {
  const category = getHueCategory(hue);
  
  if (isDark) {
    switch (category) {
      case 'yellow': return YELLOW_DARK_SCALE;
      case 'lime': return LIME_DARK_SCALE;
      case 'cyan': return CYAN_DARK_SCALE;
      default: return DARK_LIGHTNESS_SCALE;
    }
  }
  
  switch (category) {
    case 'yellow': return YELLOW_LIGHT_SCALE;
    case 'lime': return LIME_LIGHT_SCALE;
    case 'cyan': return CYAN_LIGHT_SCALE;
    default: return DEFAULT_LIGHTNESS_SCALE;
  }
}

/**
 * Gets the dark mode saturation curve for a given hue
 */
function getDarkSaturationCurve(hue: number): number[] {
  const category = getHueCategory(hue);
  
  switch (category) {
    case 'yellow': return YELLOW_DARK_SAT_CURVE;
    case 'lime': return LIME_DARK_SAT_CURVE;
    case 'cyan': return CYAN_DARK_SAT_CURVE;
    default: return DARK_SATURATION_CURVE;
  }
}

/**
 * Applies saturation adjustments based on mode, hue, and step
 * Light mode: special boosts for problematic hues
 * Dark mode: Radix-style saturation curve (low at backgrounds, high at solids)
 */
function getSaturationMultiplier(hue: number, isDark: boolean, index: number): number {
  if (isDark) {
    // Dark mode: use the characteristic Radix saturation curve
    const curve = getDarkSaturationCurve(hue);
    return curve[index] ?? 1.0;
  }
  
  // Light mode: special boosts for problematic hues
  const normalizedHue = ((hue % 360) + 360) % 360;
  
  if (normalizedHue >= 45 && normalizedHue < 65) {
    if (index >= 4 && index <= 8) return 1.15;
  }
  
  if (normalizedHue >= 65 && normalizedHue <= 100) {
    if (index >= 3 && index <= 8) return 1.12;
  }
  
  if (normalizedHue >= 170 && normalizedHue <= 200) {
    if (index >= 2 && index <= 9) return 1.1;
  }
  
  return 1.0;
}

/**
 * Applies Radix-style hue shifting for dark mode
 * In dark mode, Radix slightly shifts hue toward the base for early steps
 * and can shift slightly away for text steps, creating a cohesive tinted feel
 */
function getDarkHueShift(baseHue: number, index: number): number {
  // Steps 1-2: subtle hue shift toward blue (Radix dark backgrounds are slightly blue-shifted)
  // This creates the characteristic "night sky" feel of Radix dark themes
  if (index <= 1) {
    const blueShift = 220; // Target for subtle blue shift
    const normalizedHue = ((baseHue % 360) + 360) % 360;
    const hueDiff = blueShift - normalizedHue;
    // Apply a very subtle shift (5-10% toward blue)
    return hueDiff * 0.06 * (2 - index);
  }
  
  // Steps 11-12: slight hue shift toward lighter tint for readability
  if (index >= 10) {
    return 0; // Keep text hue true to brand
  }
  
  return 0;
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
    
    // Normalize base color to uppercase hex
    const normalizedBaseColor = base.hex().toUpperCase();
    
    const lightnessTargets = getLightnessScale(h, isDark);
    
    const colors = lightnessTargets.map((targetL, index) => {
      // Step 9 (index 8) should always be the exact base color
      if (index === 8) {
        return normalizedBaseColor;
      }
      
      // Step 10 (index 9): hover state derived from step 9
      if (index === 9) {
        const baseL = base.get('hsl.l');
        const baseH = isNaN(h) ? 0 : h;
        const baseS = base.get('hsl.s');
        
        if (isDark) {
          // Dark mode: lighten for hover, also slightly boost saturation
          const adjustedL = Math.min(1, baseL + 0.08);
          const adjustedS = Math.min(1, baseS * 1.05);
          return chroma.hsl(baseH, adjustedS, adjustedL).hex();
        } else {
          // Light mode: darken for hover
          const adjustedL = Math.max(0, baseL - 0.07);
          return chroma.hsl(baseH, baseS, adjustedL).hex();
        }
      }
      
      // User hue shift: distribute across steps, pivot around index 6
      const userHueAdjustment = (hueShift / 12) * (index - 6);
      
      // Radix dark mode hue tinting for backgrounds
      const darkHueAdj = isDark ? getDarkHueShift(isNaN(h) ? 0 : h, index) : 0;
      
      const targetH = (isNaN(h) ? 0 : h) + userHueAdjustment + darkHueAdj;
      
      // Saturation: apply base saturation, user scale, and mode-specific curve
      const modeMultiplier = getSaturationMultiplier(h, isDark, index);
      let adjustedS = s * saturationScale * modeMultiplier;
      
      if (!isDark) {
        // Light mode: Radix-like saturation dampening for extreme lightness values
        if (targetL > 0.9) adjustedS = adjustedS * 0.8;
        else if (targetL < 0.2) adjustedS = adjustedS * 0.7;
      } else {
        // Dark mode: the saturation curve already handles dampening via DARK_SATURATION_CURVE
        // But for step 12 (very high lightness), add extra dampening to avoid neon text
        if (index === 11) {
          adjustedS = adjustedS * 0.75;
        }
      }
      
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
             if (SAPC < 0.0004) SAPC = 0;
             else if (SAPC < 0.1) SAPC = SAPC - 0.027;
             else SAPC = SAPC - 0.027;
             
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

/**
 * Gets information about which color system adjustment is being applied
 */
export function getColorScaleInfo(baseColor: string, isDark: boolean): {
  scaleType: 'default' | 'yellow' | 'lime' | 'cyan';
  description: string;
  isOptimized: boolean;
} {
  try {
    const base = chroma(baseColor);
    const hue = base.get('hsl.h');
    const category = getHueCategory(hue);

    if (isDark) {
      // Dark mode always uses Radix-style optimization
      switch (category) {
        case 'yellow':
          return {
            scaleType: 'yellow',
            description: 'Dark mode: Radix-optimized yellow with suppressed early lightness',
            isOptimized: true
          };
        case 'lime':
          return {
            scaleType: 'lime',
            description: 'Dark mode: Radix-optimized lime with adjusted saturation curve',
            isOptimized: true
          };
        case 'cyan':
          return {
            scaleType: 'cyan',
            description: 'Dark mode: Radix-optimized cyan with boosted visibility',
            isOptimized: true
          };
        default:
          return {
            scaleType: 'default',
            description: 'Dark mode: Radix-style scale with tinted backgrounds and saturation ramp',
            isOptimized: true
          };
      }
    }

    // Light mode
    switch (category) {
      case 'yellow':
        return {
          scaleType: 'yellow',
          description: 'Optimized yellow scale with enhanced contrast',
          isOptimized: true
        };
      case 'lime':
        return {
          scaleType: 'lime',
          description: 'Optimized lime scale with adjusted lightness',
          isOptimized: true
        };
      case 'cyan':
        return {
          scaleType: 'cyan',
          description: 'Optimized cyan scale with improved visibility',
          isOptimized: true
        };
      default:
        return {
          scaleType: 'default',
          description: 'Standard scale',
          isOptimized: false
        };
    }
  } catch {
    return {
      scaleType: 'default',
      description: 'Standard scale',
      isOptimized: false
    };
  }
}

// ===== ALPHA COLOR GENERATION =====
// Radix UI provides alpha color scales (e.g., blueA, redA) that are transparent
// equivalents of the solid colors. When composited over a specific background,
// they produce the same visual result as the solid color.

/**
 * Converts a solid color to its alpha equivalent over a given background.
 * Finds the minimum alpha value where all RGB channels remain in [0, 255].
 * 
 * The compositing formula is: result = fg * alpha + bg * (1 - alpha)
 * Solving for fg: fg = (result - bg * (1 - alpha)) / alpha
 * 
 * We want the lowest alpha where fg channels are all valid [0, 255].
 */
export function solidToAlpha(solidColor: string, backgroundColor: string): AlphaColor {
  try {
    const solid = chroma(solidColor).rgb();
    const bg = chroma(backgroundColor).rgb();
    
    const sr = solid[0], sg = solid[1], sb = solid[2];
    const br = bg[0], bg_ = bg[1], bb = bg[2];
    
    // Find minimum alpha where all foreground channels are in [0, 255]
    // For each channel: fg = (solid - bg * (1 - alpha)) / alpha
    // fg must be in [0, 255], so:
    //   fg >= 0: solid - bg * (1 - alpha) >= 0 => alpha >= 1 - solid/bg (if bg > 0)
    //   fg <= 255: solid - bg * (1 - alpha) <= 255 * alpha => alpha >= (solid - bg) / (255 - bg) (if bg < 255)
    
    let minAlpha = 0.001; // Start with nearly transparent
    
    const channels = [
      { s: sr, b: br },
      { s: sg, b: bg_ },
      { s: sb, b: bb },
    ];
    
    for (const { s, b } of channels) {
      if (s === b) continue; // Channel matches background, any alpha works
      
      if (s < b) {
        // Foreground needs to be less than background
        // fg = (s - b * (1 - a)) / a = (s - b + b*a) / a = s/a - b/a + b
        // For fg >= 0: s - b*(1-a) >= 0 => a >= 1 - s/b (when b > 0)
        // For fg <= 255: always true since s < b means fg < b < 255
        if (b > 0) {
          const needed = (b - s) / b;
          minAlpha = Math.max(minAlpha, needed);
        }
      } else {
        // Foreground needs to be greater than background (s > b)
        // For fg <= 255: (s - b*(1-a))/a <= 255
        //   s - b + b*a <= 255*a
        //   s - b <= a*(255 - b)
        //   a >= (s - b) / (255 - b) (when b < 255)
        if (b < 255) {
          const needed = (s - b) / (255 - b);
          minAlpha = Math.max(minAlpha, needed);
        } else {
          // bg is 255, and solid > 255 is impossible, so s <= 255
          // If s == b == 255, already handled above
          minAlpha = Math.max(minAlpha, 1);
        }
      }
    }
    
    // Round alpha to 3 decimal places for cleaner output
    // But ensure it doesn't go below the minimum
    let alpha = Math.ceil(minAlpha * 1000) / 1000;
    alpha = Math.min(1, Math.max(0.001, alpha));
    
    // Calculate the foreground RGB values for this alpha
    let fgR = Math.round((sr - br * (1 - alpha)) / alpha);
    let fgG = Math.round((sg - bg_ * (1 - alpha)) / alpha);
    let fgB = Math.round((sb - bb * (1 - alpha)) / alpha);
    
    // Clamp to valid range
    fgR = Math.max(0, Math.min(255, fgR));
    fgG = Math.max(0, Math.min(255, fgG));
    fgB = Math.max(0, Math.min(255, fgB));
    
    // Format alpha for display (remove trailing zeros)
    const alphaStr = alpha === 1 ? '1' : alpha.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    
    // Generate hex8 (with alpha byte)
    const alphaByte = Math.round(alpha * 255);
    const hex8 = `#${fgR.toString(16).padStart(2, '0')}${fgG.toString(16).padStart(2, '0')}${fgB.toString(16).padStart(2, '0')}${alphaByte.toString(16).padStart(2, '0')}`.toUpperCase();
    
    // Generate HSLA
    const fgChroma = chroma(fgR, fgG, fgB);
    const h = fgChroma.get('hsl.h') || 0;
    const s = fgChroma.get('hsl.s') * 100;
    const l = fgChroma.get('hsl.l') * 100;
    
    return {
      rgba: `rgba(${fgR}, ${fgG}, ${fgB}, ${alphaStr})`,
      hsla: `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${alphaStr})`,
      hex8,
      alpha,
      r: fgR,
      g: fgG,
      b: fgB,
    };
  } catch (e) {
    console.error('Error converting to alpha:', e);
    return {
      rgba: 'rgba(0, 0, 0, 1)',
      hsla: 'hsla(0, 0%, 0%, 1)',
      hex8: '#000000FF',
      alpha: 1,
      r: 0,
      g: 0,
      b: 0,
    };
  }
}

/**
 * Generates a full alpha color scale from a solid color scale.
 * Each solid color is converted to its alpha equivalent against the given background.
 */
export function generateAlphaScale(
  solidScale: ColorScale,
  isDark: boolean,
  customBackground?: string
): AlphaColorScale {
  const background = customBackground || (isDark ? '#111113' : '#FFFFFF');
  
  const alphaColors = solidScale.colors.map(solidColor => {
    return solidToAlpha(solidColor, background);
  });
  
  return {
    name: `${solidScale.name}A`,
    colors: alphaColors,
    background,
  };
}

/**
 * Formats an alpha color value in the specified format
 */
export function formatAlphaColor(alpha: AlphaColor, format: 'rgba' | 'hsla' | 'hex8'): string {
  switch (format) {
    case 'rgba': return alpha.rgba;
    case 'hsla': return alpha.hsla;
    case 'hex8': return alpha.hex8;
    default: return alpha.rgba;
  }
}

/**
 * Returns a Radix-style usage description for a given color step.
 * Used in JSON token exports and documentation.
 */
export function getStepDescription(step: number, paletteName: string, isAlpha: boolean): string {
  const prefix = isAlpha ? 'Transparent ' : '';
  const descriptions: Record<number, string> = {
    1: `${prefix}App background`,
    2: `${prefix}Subtle background`,
    3: `${prefix}UI element background`,
    4: `${prefix}Hovered UI element background`,
    5: `${prefix}Active / Selected UI element background`,
    6: `${prefix}Subtle borders and separators`,
    7: `${prefix}UI element border and focus rings`,
    8: `${prefix}Hovered UI element border`,
    9: `${prefix}Solid backgrounds`,
    10: `${prefix}Hovered solid backgrounds`,
    11: `${prefix}Low-contrast text`,
    12: `${prefix}High-contrast text`,
  };
  return descriptions[step] || `${paletteName} color step ${step}`;
}

/**
 * Composites an alpha color over a background to verify visual equivalence
 */
export function compositeAlphaOver(alphaColor: AlphaColor, backgroundColor: string): string {
  try {
    const bg = chroma(backgroundColor).rgb();
    const a = alphaColor.alpha;
    
    const r = Math.round(alphaColor.r * a + bg[0] * (1 - a));
    const g = Math.round(alphaColor.g * a + bg[1] * (1 - a));
    const b = Math.round(alphaColor.b * a + bg[2] * (1 - a));
    
    return chroma(r, g, b).hex();
  } catch {
    return '#000000';
  }
}