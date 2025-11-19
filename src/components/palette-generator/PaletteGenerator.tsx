import React, { useState, useMemo } from 'react';
import { Sliders, Plus, Trash2, Copy, Moon, Sun, RefreshCw, Save, FolderOpen, BookOpen, Edit3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../ui/dialog";
import { generateScale, isValidColor, ColorScale, getContrast, getAPCA, getAPCARating, getWCAGRating, getColorScaleInfo } from '../../lib/color-utils';
import { toast } from 'sonner@2.0.3';
import chroma from 'chroma-js';
import { Check, ChevronDown, ArrowRightLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { PaletteDocumentation } from './PaletteDocumentation';

export interface PaletteConfig {
  id: string;
  name: string;
  baseColor: string;
  isDark: boolean;
  hueShift: number;
  saturationScale: number;
  description?: string;
}

interface SavedPreset {
  id: string;
  name: string;
  palettes: PaletteConfig[];
  createdAt: number;
}

export function PaletteGenerator() {
  const [palettes, setPalettes] = useState<PaletteConfig[]>([
    { id: '1', name: 'Primary', baseColor: '#3e63dd', isDark: false, hueShift: 0, saturationScale: 1 },
    { id: '2', name: 'Neutral', baseColor: '#71717a', isDark: false, hueShift: 0, saturationScale: 1 },
  ]);

  const [activePaletteId, setActivePaletteId] = useState<string>('1');
  const [activeView, setActiveView] = useState<'editor' | 'docs'>('editor');
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('radixgen_presets');
    if (saved) {
      try {
        setSavedPresets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse presets", e);
      }
    }
  }, []);

  const savePreset = () => {
    if (!newPresetName.trim()) return;
    
    const newPreset: SavedPreset = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPresetName,
      palettes: palettes,
      createdAt: Date.now()
    };
    
    const updated = [...savedPresets, newPreset];
    setSavedPresets(updated);
    localStorage.setItem('radixgen_presets', JSON.stringify(updated));
    
    setNewPresetName('');
    setIsSaveDialogOpen(false);
    toast.success("Preset saved successfully!");
  };

  const loadPreset = (preset: SavedPreset) => {
    setPalettes(preset.palettes);
    if (preset.palettes.length > 0) {
      setActivePaletteId(preset.palettes[0].id);
    }
    setIsManageDialogOpen(false);
    toast.success(`Loaded "${preset.name}"`);
  };

  const deletePreset = (id: string) => {
    const updated = savedPresets.filter(p => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('radixgen_presets', JSON.stringify(updated));
    toast.success("Preset deleted");
  };

  const generatedPalettes = useMemo(() => {
    return palettes.map(p => ({
      ...p,
      scale: generateScale(p.baseColor, p.name, p.isDark, {
          hueShift: p.hueShift,
          saturationScale: p.saturationScale
      })
    }));
  }, [palettes]);

  const updatePalette = (id: string, updates: Partial<PaletteConfig>) => {
    setPalettes(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addPalette = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setPalettes(prev => [...prev, { id: newId, name: 'New Color', baseColor: '#10b981', isDark: false, hueShift: 0, saturationScale: 1 }]);
    setActivePaletteId(newId);
  };

  const removePalette = (id: string) => {
    if (palettes.length <= 1) {
      toast.error("You must have at least one palette.");
      return;
    }
    setPalettes(prev => prev.filter(p => p.id !== id));
    if (activePaletteId === id) {
      setActivePaletteId(palettes[0].id);
    }
  };

  const copyToClipboard = (text: string) => {
    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            toast.success("Copied to clipboard!");
          })
          .catch((err) => {
            console.error("Clipboard API failed, trying fallback...", err);
            fallbackCopy(text);
          });
      } else {
        fallbackCopy(text);
      }
    } catch (err) {
        console.error("Copy failed", err);
        toast.error("Failed to copy to clipboard");
    }
  };

  const fallbackCopy = (text: string) => {
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            toast.success("Copied to clipboard!");
        } else {
            throw new Error("execCommand copy failed");
        }
    } catch (err) {
        console.error("Fallback copy failed", err);
        toast.error("Failed to copy. Please copy manually.");
    }
  };

  const generateCssVariables = () => {
    let css = ':root {\n';
    generatedPalettes.forEach(p => {
      p.scale.colors.forEach((color, index) => {
        css += `  --${p.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}: ${color};\n`;
      });
    });
    css += '}';
    return css;
  };
  
  const generateJson = () => {
      const obj: Record<string, string[]> = {};
      generatedPalettes.forEach(p => {
          obj[p.name] = p.scale.colors;
      });
      return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r bg-card p-4 flex flex-col gap-6 overflow-y-auto h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-6 w-6 rounded-md bg-primary gradient-to-br from-primary to-purple-500"></div>
            RadixGen
          </div>
          <Button variant="ghost" size="icon" onClick={() => toast.info("Made by Figma Make")}>
            <Sliders className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Palettes</h3>
                <Button variant="outline" size="sm" onClick={addPalette}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
            </div>
            
            <ScrollArea className="h-[200px] md:h-auto md:max-h-[calc(100vh-300px)]">
                <div className="flex flex-col gap-2">
                    {palettes.map(palette => (
                        <div 
                            key={palette.id}
                            className={`group flex items-center gap-3 p-2 rounded-lg border transition-all cursor-pointer hover:bg-accent ${activePaletteId === palette.id ? 'border-primary bg-accent/50' : 'border-transparent'}`}
                            onClick={() => setActivePaletteId(palette.id)}
                        >
                            <div 
                                className="h-8 w-8 rounded-full shadow-sm border" 
                                style={{ backgroundColor: palette.baseColor }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{palette.name}</div>
                                <div className="text-xs text-muted-foreground uppercase">{palette.baseColor}</div>
                            </div>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="opacity-0 group-hover:opacity-100 h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removePalette(palette.id);
                                }}
                             >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>

        <div className="mt-auto pt-6 border-t">
             {activePaletteId && (
                 <div className="space-y-4">
                     <h3 className="font-medium">Edit {palettes.find(p => p.id === activePaletteId)?.name}</h3>
                     
                     <div className="space-y-2">
                         <Label>Name</Label>
                         <Input 
                            value={palettes.find(p => p.id === activePaletteId)?.name}
                            onChange={(e) => updatePalette(activePaletteId, { name: e.target.value })}
                         />
                     </div>

                     <div className="space-y-2">
                         <Label>Description (Usage Note)</Label>
                         <Textarea 
                            className="min-h-[80px] text-xs resize-none"
                            placeholder="e.g. Used for primary actions and high-priority elements."
                            value={palettes.find(p => p.id === activePaletteId)?.description || ''}
                            onChange={(e) => updatePalette(activePaletteId, { description: e.target.value })}
                         />
                     </div>
                     
                     <div className="space-y-2">
                         <Label>Base Color</Label>
                         <div className="flex gap-2">
                            <Input 
                                type="color" 
                                className="w-12 p-1 h-10 cursor-pointer"
                                value={palettes.find(p => p.id === activePaletteId)?.baseColor}
                                onChange={(e) => updatePalette(activePaletteId, { baseColor: e.target.value })}
                            />
                             <Input 
                                value={palettes.find(p => p.id === activePaletteId)?.baseColor}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    updatePalette(activePaletteId, { baseColor: val });
                                }}
                             />
                         </div>
                     </div>

                     <div className="flex items-center justify-between">
                         <Label className="flex items-center gap-2">
                             {palettes.find(p => p.id === activePaletteId)?.isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                             Dark Mode Scale
                         </Label>
                         <Switch 
                            checked={palettes.find(p => p.id === activePaletteId)?.isDark}
                            onCheckedChange={(checked) => updatePalette(activePaletteId, { isDark: checked })}
                         />
                     </div>

                     {/* Color Scale Optimization Indicator */}
                     {(() => {
                         const activePalette = palettes.find(p => p.id === activePaletteId);
                         if (!activePalette) return null;
                         const scaleInfo = getColorScaleInfo(activePalette.baseColor, activePalette.isDark);
                         if (!scaleInfo.isOptimized) return null;
                         
                         return (
                             <div className="rounded-lg p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                                 <div className="flex items-start gap-2">
                                     <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                         <Check className="h-3 w-3 text-white" />
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <div className="text-xs font-medium text-blue-900 dark:text-blue-100 capitalize">
                                             {scaleInfo.scaleType} Optimization Active
                                         </div>
                                         <div className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                                             {scaleInfo.description}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         );
                     })()}

                     <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase font-semibold text-muted-foreground">Easing & Adjustments</Label>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <Label className="text-xs">Hue Shift</Label>
                                    <span className="text-xs text-muted-foreground">{palettes.find(p => p.id === activePaletteId)?.hueShift}°</span>
                                </div>
                                <Slider 
                                    min={-180} 
                                    max={180} 
                                    step={1} 
                                    value={[palettes.find(p => p.id === activePaletteId)?.hueShift || 0]} 
                                    onValueChange={(vals) => updatePalette(activePaletteId, { hueShift: vals[0] })}
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <Label className="text-xs">Saturation Boost</Label>
                                    <span className="text-xs text-muted-foreground">{palettes.find(p => p.id === activePaletteId)?.saturationScale}x</span>
                                </div>
                                <Slider 
                                    min={0} 
                                    max={2} 
                                    step={0.05} 
                                    value={[palettes.find(p => p.id === activePaletteId)?.saturationScale || 1]} 
                                    onValueChange={(vals) => updatePalette(activePaletteId, { saturationScale: vals[0] })}
                                />
                            </div>
                        </div>
                     </div>
                 </div>
             )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/20">
        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Palette Generator</h1>
                        <p className="text-muted-foreground">Radix-style color scales for your next project.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-muted/50 p-1 rounded-lg border">
                            <Button 
                                variant={activeView === 'editor' ? 'secondary' : 'ghost'} 
                                size="sm"
                                onClick={() => setActiveView('editor')}
                                className="gap-2 px-4"
                            >
                                <Edit3 className="h-4 w-4" /> Editor
                            </Button>
                            <Button 
                                variant={activeView === 'docs' ? 'secondary' : 'ghost'} 
                                size="sm"
                                onClick={() => setActiveView('docs')}
                                className="gap-2 px-4"
                            >
                                <BookOpen className="h-4 w-4" /> Docs
                            </Button>
                        </div>
                    </div>
                </div>
                
                {activeView === 'editor' && (
                    <div className="flex justify-end gap-2 pb-4 border-b">
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Copy className="h-4 w-4" /> Export CSS
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0" align="end">
                                <div className="p-4 bg-muted border-b flex justify-between items-center">
                                    <span className="font-medium text-sm">CSS Variables</span>
                                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(generateCssVariables())}>Copy</Button>
                                </div>
                                <pre className="p-4 text-xs overflow-auto max-h-[300px] bg-zinc-950 text-zinc-50">
                                    {generateCssVariables()}
                                </pre>
                            </PopoverContent>
                        </Popover>
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Copy className="h-4 w-4" /> Export JSON
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0" align="end">
                                <div className="p-4 bg-muted border-b flex justify-between items-center">
                                    <span className="font-medium text-sm">JSON</span>
                                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(generateJson())}>Copy</Button>
                                </div>
                                <pre className="p-4 text-xs overflow-auto max-h-[300px] bg-zinc-950 text-zinc-50">
                                    {generateJson()}
                                </pre>
                            </PopoverContent>
                        </Popover>

                        <div className="h-4 w-px bg-border mx-2" />

                        <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Save className="h-4 w-4" /> Save
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Save Preset</DialogTitle>
                                    <DialogDescription>
                                        Save your current palette configuration to access it later.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newPresetName}
                                            onChange={(e) => setNewPresetName(e.target.value)}
                                            className="col-span-3"
                                            placeholder="My Awesome Theme"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={savePreset}>Save Preset</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <FolderOpen className="h-4 w-4" /> Load
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Saved Presets</DialogTitle>
                                    <DialogDescription>
                                        Manage your saved palette configurations.
                                    </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-[300px] pr-4">
                                    {savedPresets.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No saved presets found.
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {savedPresets.map((preset) => (
                                                <div 
                                                    key={preset.id} 
                                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                                >
                                                    <div className="flex flex-col gap-1 cursor-pointer flex-1" onClick={() => loadPreset(preset)}>
                                                        <span className="font-medium">{preset.name}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(preset.createdAt).toLocaleDateString()} • {preset.palettes.length} scales
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => loadPreset(preset)}>
                                                            Load
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                            onClick={() => deletePreset(preset.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>

            {/* Scales / Docs */}
            <div className="space-y-8">
                {activeView === 'editor' ? (
                    generatedPalettes.map((palette) => (
                        <PaletteDisplay key={palette.id} palette={palette} />
                    ))
                ) : (
                    <PaletteDocumentation palettes={generatedPalettes} />
                )}
            </div>

        </div>
      </div>
    </div>
  );
}

function PaletteDisplay({ palette }: { palette: PaletteConfig & { scale: ColorScale } }) {
    const [view, setView] = useState<'scale' | 'preview' | 'contrast'>('scale');

    return (
        <Card className="overflow-hidden border-0 shadow-sm bg-background">
            <CardHeader className="pb-4 border-b bg-muted/10">
                <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: palette.baseColor }} />
                        <CardTitle className="text-lg">{palette.name}</CardTitle>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="flex bg-muted rounded-lg p-1 gap-1">
                            <Button 
                                variant={view === 'scale' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => setView('scale')}
                            >
                                Scale
                            </Button>
                            <Button 
                                variant={view === 'preview' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => setView('preview')}
                            >
                                Preview
                            </Button>
                            <Button 
                                variant={view === 'contrast' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => setView('contrast')}
                            >
                                Contrast
                            </Button>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground ml-2">{palette.isDark ? 'Dark Scale' : 'Light Scale'}</span>
                     </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {view === 'scale' ? (
                    <>
                        {/* Color Strip */}
                        <div className="flex flex-col md:flex-row h-auto md:h-32 divide-y md:divide-y-0 md:divide-x divide-border/50">
                            {palette.scale.colors.map((color, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 flex md:flex-col items-center justify-between p-2 md:p-4 relative"
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Lock indicator for step 9 (base color) */}
                                    {i === 8 && (
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2">
                                            <div className="h-4 w-4 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <svg 
                                                    width="10" 
                                                    height="10" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2.5" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    className={getTextColorClass(palette.isDark, i)}
                                                >
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Hover indicator for step 10 (linked to step 9) */}
                                    {i === 9 && (
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2">
                                            <div className="h-4 w-4 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <svg 
                                                    width="10" 
                                                    height="10" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2.5" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    className={getTextColorClass(palette.isDark, i)}
                                                >
                                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <span className={`text-xs font-mono opacity-50 font-bold ${getTextColorClass(palette.isDark, i)}`}>
                                        {i + 1}
                                    </span>
                                    
                                    <span className={`text-xs font-mono uppercase ${getTextColorClass(palette.isDark, i)}`}>
                                        {color.replace('#', '')}
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Usage Hints (Radix style) */}
                        <div className="grid grid-cols-12 text-[10px] text-muted-foreground border-t divide-x text-center bg-muted/20">
                            <div className="col-span-2 p-2 bg-background/50">App Bg</div>
                            <div className="col-span-3 p-2">Component Bg</div>
                            <div className="col-span-3 p-2 bg-background/50">Borders</div>
                            <div className="col-span-2 p-2 text-primary font-medium bg-primary/5">Solid / Hover</div>
                            <div className="col-span-2 p-2">Text</div>
                        </div>
                    </>
                ) : view === 'preview' ? (
                    <PalettePreview colors={palette.scale.colors} isDark={palette.isDark} />
                ) : (
                    <PaletteContrast colors={palette.scale.colors} isDark={palette.isDark} />
                )}
            </CardContent>
        </Card>
    );
}

function PaletteContrast({ colors, isDark }: { colors: string[], isDark: boolean }) {
    // Default selection: Step 1 (bg) or Step 11 (text)
    const [mode, setMode] = useState<'text-on-bg' | 'bg-on-text'>('text-on-bg');
    const [selectedIndex, setSelectedIndex] = useState<number>(mode === 'text-on-bg' ? 0 : 10);

    const selectedColor = colors[selectedIndex];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4 p-[0px] m-[0px]">
                     <div className="flex items-center gap-2">
                        <Label>Mode:</Label>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="w-40 justify-between px-[24px] py-[0px] text-[12px]">
                                    {mode === 'text-on-bg' ? 'Text on Background' : 'Background on Text'}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => { setMode('text-on-bg'); setSelectedIndex(0); }}>
                                    Text on Background
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setMode('bg-on-text'); setSelectedIndex(10); }}>
                                    Background on Text
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </div>

                     <div className="flex items-center gap-2">
                        <Label>{mode === 'text-on-bg' ? 'Background:' : 'Text Color:'}</Label>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="w-32 justify-between gap-2 text-[12px]">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: selectedColor }} />
                                        Step {selectedIndex + 1}
                                    </div>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-64 overflow-y-auto">
                                {colors.map((c, i) => (
                                    <DropdownMenuItem key={i} onClick={() => setSelectedIndex(i)} className="flex items-center gap-2">
                                         <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: c }} />
                                         Step {i + 1}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                 </div>
                 
                 <div className="text-xs text-muted-foreground">
                    <span className="font-medium">APCA</span> (Advanced Perceptual Contrast Algorithm) & <span className="font-medium">WCAG 2.1</span>
                 </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {colors.map((color, i) => {
                    if (i === selectedIndex) return null; // Skip self

                    const bg = mode === 'text-on-bg' ? selectedColor : color;
                    const fg = mode === 'text-on-bg' ? color : selectedColor;
                    
                    const wcag = getContrast(fg, bg);
                    const apca = getAPCA(fg, bg);
                    
                    const wcagRating = getWCAGRating(wcag);
                    const apcaRating = getAPCARating(apca);

                    return (
                        <div 
                            key={i} 
                            className="rounded-lg border p-4 flex flex-col gap-3 transition-all hover:shadow-md"
                            style={{ backgroundColor: bg }}
                        >
                            <div className="flex justify-between items-start">
                                <span 
                                    className="text-sm font-bold"
                                    style={{ color: fg }}
                                >
                                    Step {i + 1}
                                </span>
                                {wcagRating.label !== 'Fail' && (
                                    <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ color: fg }} className="text-lg font-semibold leading-tight">
                                The quick brown fox
                            </div>

                            <div className="mt-auto pt-2 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="opacity-70 mix-blend-multiply dark:mix-blend-screen" style={{ color: fg }}>WCAG {wcag.toFixed(2)}</span>
                                    <span className={`px-1.5 py-0.5 rounded-[4px] font-medium text-[10px] ${wcagRating.class}`}>
                                        {wcagRating.label}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="opacity-70 mix-blend-multiply dark:mix-blend-screen" style={{ color: fg }}>Lc {Math.round(Math.abs(apca))}</span>
                                    <span className={`px-1.5 py-0.5 rounded-[4px] font-medium text-[10px] ${apcaRating.class}`}>
                                        {apcaRating.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


function PalettePreview({ colors, isDark }: { colors: string[], isDark: boolean }) {
    // Radix Mapping
    const c = {
        appBg: colors[0],
        subtleBg: colors[1],
        uiBg: colors[2],
        hover: colors[3],
        active: colors[4],
        border: colors[5],
        interactBorder: colors[6],
        hoverBorder: colors[7],
        solid: colors[8],
        solidHover: colors[9],
        textLow: colors[10],
        textHigh: colors[11],
    };

    // Dynamic text color for the solid button
    const solidText = chroma.contrast(c.solid, '#ffffff') > 4.5 ? '#ffffff' : '#000000';

    return (
        <div className="p-8 flex flex-col gap-8" style={{ backgroundColor: c.appBg, color: c.textHigh }}>
            <div className="flex gap-4 items-start">
                {/* Card Example */}
                <div 
                    className="p-6 rounded-lg border w-64 shadow-sm flex flex-col gap-4"
                    style={{ 
                        backgroundColor: c.subtleBg, 
                        borderColor: c.border 
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: c.uiBg }}>
                            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: c.solid }}></div>
                        </div>
                        <div>
                            <div className="text-sm font-bold" style={{ color: c.textHigh }}>Card Title</div>
                            <div className="text-xs" style={{ color: c.textLow }}>Subtitle text</div>
                        </div>
                    </div>
                    <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: c.uiBg }}></div>
                    <div className="h-2 rounded-full w-1/2" style={{ backgroundColor: c.uiBg }}></div>
                    
                    <div className="flex gap-2 mt-2">
                        <button 
                            className="px-3 py-1.5 text-xs font-medium rounded transition-colors"
                            style={{ backgroundColor: c.solid, color: solidText }}
                        >
                            Primary
                        </button>
                         <button 
                            className="px-3 py-1.5 text-xs font-medium rounded border transition-colors"
                            style={{ borderColor: c.interactBorder, color: c.textHigh }}
                        >
                            Secondary
                        </button>
                    </div>
                </div>

                {/* Form Elements */}
                <div className="p-6 rounded-lg w-64 flex flex-col gap-4" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium" style={{ color: c.textHigh }}>Email Address</label>
                        <input 
                            type="text" 
                            className="px-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
                            style={{ 
                                backgroundColor: c.uiBg, 
                                borderColor: c.interactBorder,
                                color: c.textHigh,
                                // We can't easily do focus ring via inline styles without pseudo classes, 
                                // but this simulates the look
                            }}
                            placeholder="name@example.com"
                        />
                    </div>
                    
                     <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded border flex items-center justify-center" style={{ borderColor: c.solid, backgroundColor: c.solid }}>
                             {/* Check icon */}
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={solidText} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                             </svg>
                        </div>
                        <span className="text-xs" style={{ color: c.textHigh }}>Remember me</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper to determine text color for contrast based on step index (rough approximation for Radix scales)
function getTextColorClass(isDarkScale: boolean, stepIndex: number) {
    // For Light Scale: Steps 1-8 are light (need dark text), 9-12 are dark (need light text).
    // Exception: Step 9/10 often need white text. Step 11/12 usually dark text again?
    // Wait, Radix Step 11/12 are TEXT colors. So they are very dark.
    // Let's simplify:
    
    if (!isDarkScale) {
        // Light Mode:
        // 1-8: Light bg -> Dark text
        // 9-10: Solid bg -> Light text (usually)
        // 11-12: Text (Very Dark) -> Light text (if used as bg)
        if (stepIndex >= 8) return "text-white/90";
        return "text-black/70";
    } else {
        // Dark Mode:
        // 1-2: Dark bg -> Light text
        // ...
        if (stepIndex >= 8) return "text-black/90";
        return "text-white/70";
    }
}