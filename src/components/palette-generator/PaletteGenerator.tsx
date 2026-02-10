import React, { useState, useMemo } from 'react';
import { Sliders, Plus, Trash2, Copy, Moon, Sun, RefreshCw, Save, FolderOpen, BookOpen, Edit3, Download, Upload } from 'lucide-react';
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
import { generateScale, isValidColor, ColorScale, getContrast, getAPCA, getAPCARating, getWCAGRating, getColorScaleInfo, generateAlphaScale, AlphaColorScale, AlphaColor, formatAlphaColor } from '../../lib/color-utils';
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

export function PaletteGenerator({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) {
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

  const exportPresets = () => {
    const data = {
      _meta: { app: 'Lumina', version: 1, exportedAt: new Date().toISOString() },
      presets: savedPresets,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumina-presets-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${savedPresets.length} preset(s)`);
  };

  const importPresets = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const raw = JSON.parse(ev.target?.result as string);
          let incoming: SavedPreset[] = [];
          // Support both wrapped format and raw array
          if (raw._meta && Array.isArray(raw.presets)) {
            incoming = raw.presets;
          } else if (Array.isArray(raw)) {
            incoming = raw;
          } else {
            throw new Error('Unrecognized format');
          }
          // Validate shape
          for (const p of incoming) {
            if (!p.id || !p.name || !Array.isArray(p.palettes)) {
              throw new Error('Invalid preset structure');
            }
          }
          // Deduplicate by id
          const existingIds = new Set(savedPresets.map(p => p.id));
          const newPresets = incoming.filter(p => !existingIds.has(p.id));
          const merged = [...savedPresets, ...newPresets];
          setSavedPresets(merged);
          localStorage.setItem('radixgen_presets', JSON.stringify(merged));
          toast.success(`Imported ${newPresets.length} new preset(s)${incoming.length - newPresets.length > 0 ? `, ${incoming.length - newPresets.length} duplicate(s) skipped` : ''}`);
        } catch (err) {
          console.error('Import failed', err);
          toast.error('Import failed — invalid or corrupted file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
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
    css += '  /* Solid Colors */\n';
    generatedPalettes.forEach(p => {
      p.scale.colors.forEach((color, index) => {
        css += `  --${p.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}: ${color};\n`;
      });
    });
    css += '\n  /* Alpha Colors */\n';
    generatedPalettes.forEach(p => {
      const alphaScale = generateAlphaScale(p.scale, p.isDark);
      alphaScale.colors.forEach((alpha, index) => {
        css += `  --${p.name.toLowerCase().replace(/\s+/g, '-')}-a${index + 1}: ${alpha.rgba};\n`;
      });
    });
    css += '}';
    return css;
  };
  
  const generateJson = () => {
      const obj: Record<string, { solid: string[], alpha: string[] }> = {};
      generatedPalettes.forEach(p => {
          const alphaScale = generateAlphaScale(p.scale, p.isDark);
          obj[p.name] = {
              solid: p.scale.colors,
              alpha: alphaScale.colors.map(a => a.rgba),
          };
      });
      return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-border bg-card p-6 flex flex-col gap-6 overflow-y-auto h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <Sliders className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Lumina</span>
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded border border-primary/20">Beta</span>
          </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Palettes</h3>
                <Button variant="ghost" size="sm" onClick={addPalette} className="h-7 text-xs hover:bg-primary/10 hover:text-primary">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
            </div>
            
            <ScrollArea className="h-[200px] md:h-auto md:max-h-[calc(100vh-300px)]">
                <div className="flex flex-col gap-2">
                    {palettes.map(palette => (
                        <div 
                            key={palette.id}
                            className={`group flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer hover:bg-accent/50 ${activePaletteId === palette.id ? 'border-primary/50 bg-primary/5' : 'border-transparent hover:border-border'}`}
                            onClick={() => setActivePaletteId(palette.id)}
                        >
                            <div 
                                className="h-9 w-9 rounded-md shadow-sm border border-border" 
                                style={{ backgroundColor: palette.baseColor }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{palette.name}</div>
                                <div className="text-xs text-muted-foreground font-mono">{palette.baseColor}</div>
                            </div>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="opacity-0 group-hover:opacity-100 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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

        <div className="mt-auto pt-6 border-t border-border">
             {activePaletteId && (
                 <div className="space-y-5">
                     <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Base Color</h3>
                     
                     <div className="space-y-3">
                         <Label className="text-xs text-muted-foreground">Name</Label>
                         <Input 
                            value={palettes.find(p => p.id === activePaletteId)?.name}
                            onChange={(e) => updatePalette(activePaletteId, { name: e.target.value })}
                            className="bg-muted/30 border-border h-9 text-sm"
                         />
                     </div>

                     <div className="space-y-3">
                         <Label className="text-xs text-muted-foreground">Description (Usage Note)</Label>
                         <Textarea 
                            className="min-h-[70px] text-xs resize-none bg-muted/30 border-border"
                            placeholder="e.g. Used for primary actions and high-priority elements."
                            value={palettes.find(p => p.id === activePaletteId)?.description || ''}
                            onChange={(e) => updatePalette(activePaletteId, { description: e.target.value })}
                         />
                     </div>
                     
                     <div className="space-y-3">
                         <Label className="text-xs text-muted-foreground">Base Color (Auto-detect format)</Label>
                         <div className="flex gap-2">
                            <Input 
                                type="color" 
                                className="w-12 p-1 h-9 cursor-pointer border-border bg-muted/30"
                                value={palettes.find(p => p.id === activePaletteId)?.baseColor}
                                onChange={(e) => updatePalette(activePaletteId, { baseColor: e.target.value })}
                            />
                             <Input 
                                value={palettes.find(p => p.id === activePaletteId)?.baseColor}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    updatePalette(activePaletteId, { baseColor: val });
                                }}
                                className="bg-muted/30 border-border h-9 font-mono text-sm"
                             />
                         </div>
                     </div>

                     <div className="flex items-center justify-between py-2">
                         <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                             {palettes.find(p => p.id === activePaletteId)?.isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
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
                         
                         const isDarkScale = activePalette.isDark;
                         
                         return (
                             <div className={`rounded-lg p-3 border ${
                                 isDarkScale 
                                     ? 'bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800'
                                     : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                             }`}>
                                 <div className="flex items-start gap-2">
                                     <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                         isDarkScale ? 'bg-violet-500' : 'bg-blue-500'
                                     }`}>
                                         {isDarkScale ? (
                                             <Moon className="h-3 w-3 text-white" />
                                         ) : (
                                             <Check className="h-3 w-3 text-white" />
                                         )}
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <div className={`text-xs font-medium capitalize ${
                                             isDarkScale 
                                                 ? 'text-violet-900 dark:text-violet-100'
                                                 : 'text-blue-900 dark:text-blue-100'
                                         }`}>
                                             {isDarkScale ? 'Radix Dark Mode' : scaleInfo.scaleType} Optimization Active
                                         </div>
                                         <div className={`text-xs mt-0.5 ${
                                             isDarkScale 
                                                 ? 'text-violet-700 dark:text-violet-300'
                                                 : 'text-blue-700 dark:text-blue-300'
                                         }`}>
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
      <div className="flex-1 overflow-y-auto p-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Palette Generator</h1>
                        <p className="text-muted-foreground">Radix-style color scales for your next project.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={toggleDarkMode}
                            className="h-9 w-9 hover:bg-primary/10"
                        >
                            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
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
                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={exportPresets} disabled={savedPresets.length === 0}>
                                        <Download className="h-3.5 w-3.5" /> Export All
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={importPresets}>
                                        <Upload className="h-3.5 w-3.5" /> Import
                                    </Button>
                                </div>
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
    const [view, setView] = useState<'scale' | 'alpha' | 'contrast'>('scale');
    const [alphaFormat, setAlphaFormat] = useState<'rgba' | 'hsla' | 'hex8'>('rgba');
    
    const alphaScale = useMemo(() => {
        return generateAlphaScale(palette.scale, palette.isDark);
    }, [palette.scale, palette.isDark]);

    const copyToClipboard = (text: string) => {
        const fallback = (t: string): boolean => {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = t;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch {
                return false;
            }
        };
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => toast.success("Copied!"))
                    .catch(() => {
                        if (fallback(text)) { toast.success("Copied!"); }
                        else { toast.error("Failed to copy. Please copy manually."); }
                    });
            } else {
                if (fallback(text)) { toast.success("Copied!"); }
                else { toast.error("Failed to copy. Please copy manually."); }
            }
        } catch {
            if (fallback(text)) { toast.success("Copied!"); }
            else { toast.error("Failed to copy. Please copy manually."); }
        }
    };

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
                                Solid
                            </Button>
                            <Button 
                                variant={view === 'alpha' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => setView('alpha')}
                            >
                                Alpha
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
                                    className="flex-1 flex md:flex-col items-center justify-between p-2 md:p-4 relative group cursor-pointer transition-all hover:brightness-110"
                                    style={{ backgroundColor: color }}
                                    onClick={() => copyToClipboard(color)}
                                    title={`Click to copy ${color}`}
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
                                    
                                    {/* Copy indicator on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className={`px-2 py-1 rounded text-[10px] font-medium backdrop-blur-sm ${
                                            palette.isDark ? 'bg-white/20 text-white' : (i < 6 ? 'bg-black/20 text-white' : 'bg-white/20 text-white')
                                        }`}>
                                            <Copy className="h-3 w-3 inline mr-1" />Copy
                                        </div>
                                    </div>
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
                ) : view === 'alpha' ? (
                    <AlphaScaleView 
                        alphaScale={alphaScale} 
                        solidColors={palette.scale.colors}
                        isDark={palette.isDark} 
                        paletteName={palette.name}
                        alphaFormat={alphaFormat}
                        setAlphaFormat={setAlphaFormat}
                    />
                ) : (
                    <PaletteContrast colors={palette.scale.colors} isDark={palette.isDark} />
                )}
            </CardContent>
        </Card>
    );
}

function AlphaScaleView({ 
    alphaScale, 
    solidColors,
    isDark, 
    paletteName, 
    alphaFormat,
    setAlphaFormat
}: { 
    alphaScale: AlphaColorScale; 
    solidColors: string[];
    isDark: boolean; 
    paletteName: string;
    alphaFormat: 'rgba' | 'hsla' | 'hex8';
    setAlphaFormat: (f: 'rgba' | 'hsla' | 'hex8') => void;
}) {
    const copyToClipboard = (text: string) => {
        const fallback = (t: string): boolean => {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = t;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch {
                return false;
            }
        };

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => toast.success("Copied!"))
                    .catch(() => {
                        if (fallback(text)) {
                            toast.success("Copied!");
                        } else {
                            toast.error("Failed to copy. Please copy manually.");
                        }
                    });
            } else {
                if (fallback(text)) {
                    toast.success("Copied!");
                } else {
                    toast.error("Failed to copy. Please copy manually.");
                }
            }
        } catch {
            if (fallback(text)) {
                toast.success("Copied!");
            } else {
                toast.error("Failed to copy. Please copy manually.");
            }
        }
    };

    // Checkerboard pattern for transparency visualization
    const checkerBg = `repeating-conic-gradient(${isDark ? '#1a1a1a' : '#e5e5e5'} 0% 25%, ${isDark ? '#2a2a2a' : '#ffffff'} 0% 50%) 0 0 / 12px 12px`;
    
    return (
        <div className="space-y-0">
            {/* Header bar with info and format selector */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-b">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded" style={{ backgroundColor: alphaScale.background }} />
                        <span className="text-xs text-muted-foreground">
                            Background: <span className="font-mono">{alphaScale.background}</span>
                        </span>
                    </div>
                    <span className="text-xs text-muted-foreground/60">|</span>
                    <span className="text-xs text-muted-foreground">
                        {paletteName}A — Transparent equivalents that composite to match solid colors
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Format:</Label>
                    <div className="flex bg-muted rounded-md p-0.5 gap-0.5">
                        {(['rgba', 'hsla', 'hex8'] as const).map(fmt => (
                            <Button 
                                key={fmt}
                                variant={alphaFormat === fmt ? 'secondary' : 'ghost'} 
                                size="sm" 
                                className="h-5 text-[10px] px-2 font-mono"
                                onClick={() => setAlphaFormat(fmt)}
                            >
                                {fmt.toUpperCase()}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alpha Color Strip with checkerboard */}
            <div className="relative">
                {/* Checkerboard background layer */}
                <div className="flex flex-col md:flex-row h-auto md:h-36" style={{ background: checkerBg }}>
                    {alphaScale.colors.map((alphaColor, i) => (
                        <div 
                            key={i} 
                            className="flex-1 flex md:flex-col items-center justify-between p-2 md:p-3 relative group cursor-pointer transition-all hover:brightness-110"
                            style={{ backgroundColor: alphaColor.rgba }}
                            onClick={() => copyToClipboard(formatAlphaColor(alphaColor, alphaFormat))}
                            title={`Click to copy ${formatAlphaColor(alphaColor, alphaFormat)}`}
                        >
                            {/* Step number */}
                            <span className={`text-xs font-mono opacity-50 font-bold ${getTextColorClass(isDark, i)}`}>
                                {i + 1}A
                            </span>
                            
                            {/* Alpha percentage badge */}
                            <div className="flex flex-col items-center gap-1">
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                    isDark 
                                        ? 'bg-white/10 text-white/80' 
                                        : 'bg-black/10 text-black/70'
                                }`}>
                                    {Math.round(alphaColor.alpha * 100)}%
                                </span>
                                <span className={`text-[9px] font-mono truncate max-w-full opacity-0 group-hover:opacity-100 transition-opacity ${getTextColorClass(isDark, i)}`}>
                                    {alphaFormat === 'hex8' ? alphaColor.hex8.replace('#', '') : 
                                     alphaFormat === 'rgba' ? `${alphaColor.r},${alphaColor.g},${alphaColor.b}` :
                                     `${Math.round(chroma(alphaColor.r, alphaColor.g, alphaColor.b).get('hsl.h') || 0)}°`}
                                </span>
                            </div>
                            
                            {/* Copy indicator on hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className={`px-2 py-1 rounded text-[10px] font-medium backdrop-blur-sm ${
                                    isDark ? 'bg-white/20 text-white' : 'bg-black/20 text-white'
                                }`}>
                                    <Copy className="h-3 w-3 inline mr-1" />Copy
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Side-by-side comparison: Solid vs Alpha composited */}
            <div className="border-t">
                <div className="px-4 py-2 bg-muted/10 flex items-center gap-2">
                    <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Solid vs Alpha Comparison</span>
                </div>
                <div className="grid grid-cols-12 gap-0">
                    {solidColors.map((solidColor, i) => {
                        const alpha = alphaScale.colors[i];
                        return (
                            <div key={i} className="flex flex-col">
                                {/* Solid color */}
                                <div className="h-6" style={{ backgroundColor: solidColor }} title={`Solid: ${solidColor}`} />
                                {/* Alpha composited on background */}
                                <div className="h-6 relative" style={{ backgroundColor: alphaScale.background }}>
                                    <div className="absolute inset-0" style={{ backgroundColor: alpha.rgba }} title={`Alpha: ${alpha.rgba}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-2 text-[9px] text-muted-foreground border-t text-center">
                    <div className="p-1 border-r bg-muted/10">Solid</div>
                    <div className="p-1 bg-muted/10">Alpha (composited)</div>
                </div>
            </div>

            {/* Detailed alpha values table */}
            <div className="border-t">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-muted/30 text-muted-foreground">
                                <th className="p-2 text-left font-medium w-16">Step</th>
                                <th className="p-2 text-left font-medium">Alpha Value</th>
                                <th className="p-2 text-left font-medium w-16">Alpha %</th>
                                <th className="p-2 text-left font-medium w-20">Solid</th>
                                <th className="p-2 text-center font-medium w-12">Copy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {alphaScale.colors.map((alpha, i) => (
                                <tr key={i} className="hover:bg-muted/20 transition-colors group">
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="h-4 w-4 rounded border border-border/50" 
                                                style={{ 
                                                    background: checkerBg,
                                                }}
                                            >
                                                <div className="h-full w-full rounded" style={{ backgroundColor: alpha.rgba }} />
                                            </div>
                                            <span className="font-mono font-medium">{i + 1}A</span>
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <span className="font-mono text-[11px]">
                                            {formatAlphaColor(alpha, alphaFormat)}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                            alpha.alpha <= 0.1 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' :
                                            alpha.alpha <= 0.3 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                                            alpha.alpha <= 0.6 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' :
                                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        }`}>
                                            {Math.round(alpha.alpha * 100)}%
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-3 w-3 rounded border border-border/50" style={{ backgroundColor: solidColors[i] }} />
                                            <span className="font-mono text-muted-foreground text-[10px]">{solidColors[i]}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => copyToClipboard(formatAlphaColor(alpha, alphaFormat))}
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function PaletteContrast({ colors, isDark }: { colors: string[], isDark: boolean }) {
    // Default selection: Step 1 (bg) or Step 11 (text)
    const [mode, setMode] = useState<'text-on-bg' | 'bg-on-text'>('text-on-bg');
    const [selectedIndex, setSelectedIndex] = useState<number>(mode === 'text-on-bg' ? 0 : 10);
    const [view, setView] = useState<'cards' | 'matrix'>('cards');

    const selectedColor = colors[selectedIndex];

    // Helper to get cell background color based on APCA value
    const getMatrixCellBgColor = (apcaValue: number) => {
        const absApca = Math.abs(apcaValue);
        
        // Color scale based on APCA values
        if (absApca >= 90) return 'hsl(160, 85%, 35%)'; // Excellent - Green
        if (absApca >= 75) return 'hsl(160, 70%, 45%)'; // Great - Light Green
        if (absApca >= 60) return 'hsl(160, 50%, 55%)'; // Good - Lighter Green
        if (absApca >= 45) return 'hsl(45, 85%, 50%)'; // Fair - Yellow/Orange
        if (absApca >= 30) return 'hsl(25, 85%, 50%)'; // Poor - Orange
        if (absApca >= 15) return 'hsl(5, 85%, 50%)'; // Very Poor - Red/Orange
        return 'hsl(0, 70%, 45%)'; // Fail - Dark Red
    };

    // Helper to get text color for matrix cells
    const getMatrixTextColor = (apcaValue: number) => {
        const absApca = Math.abs(apcaValue);
        return absApca >= 45 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)';
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4 p-[0px] m-[0px]">
                     {/* View Toggle */}
                     <div className="flex bg-muted rounded-lg p-1 gap-1">
                         <Button 
                             variant={view === 'cards' ? 'secondary' : 'ghost'} 
                             size="sm" 
                             className="h-7 text-xs px-3"
                             onClick={() => setView('cards')}
                         >
                             Cards
                         </Button>
                         <Button 
                             variant={view === 'matrix' ? 'secondary' : 'ghost'} 
                             size="sm" 
                             className="h-7 text-xs px-3"
                             onClick={() => setView('matrix')}
                         >
                             Matrix
                         </Button>
                     </div>

                     {view === 'cards' && (
                         <>
                             <div className="h-4 w-px bg-border" />
                             
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
                         </>
                     )}
                 </div>
                 
                 <div className="text-xs text-muted-foreground">
                    <span className="font-medium">APCA</span> (Advanced Perceptual Contrast Algorithm) {view === 'cards' && '& '}<span className="font-medium">{view === 'cards' && 'WCAG 2.1'}</span>
                 </div>
            </div>

            {view === 'cards' ? (
                /* Results Grid */
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
            ) : (
                /* Matrix View */
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full px-[8px] py-[0px]">
                        <div className="grid gap-0" style={{ 
                            gridTemplateColumns: `60px repeat(${colors.length}, minmax(70px, 1fr))`,
                        }}>
                            {/* Top-left corner cell */}
                            <div className="border border-border bg-muted/50 flex items-center justify-center p-2">
                                <span className="text-[10px] font-medium text-muted-foreground">Bg / Fg</span>
                            </div>
                            
                            {/* Column headers (Foreground colors) */}
                            {colors.map((color, i) => (
                                <div 
                                    key={`header-${i}`}
                                    className="border border-border bg-muted/30 flex items-center justify-center p-2"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="h-4 w-4 rounded-full border-2 border-background shadow-sm" style={{ backgroundColor: color }} />
                                        <span className="text-[10px] font-medium">{i + 1}</span>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Matrix rows */}
                            {colors.map((bgColor, bgIndex) => (
                                <React.Fragment key={`row-${bgIndex}`}>
                                    {/* Row header (Background color) */}
                                    <div className="border border-border bg-muted/30 flex items-center justify-center p-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-medium">{bgIndex + 1}</span>
                                            <div className="h-4 w-4 rounded-full border-2 border-background shadow-sm" style={{ backgroundColor: bgColor }} />
                                        </div>
                                    </div>
                                    
                                    {/* Matrix cells */}
                                    {colors.map((fgColor, fgIndex) => {
                                        // Diagonal (same color)
                                        if (bgIndex === fgIndex) {
                                            return (
                                                <div 
                                                    key={`cell-${bgIndex}-${fgIndex}`}
                                                    className="border border-border flex items-center justify-center p-3 bg-muted/80"
                                                >
                                                    <span className="text-xl text-muted-foreground/30 font-bold">-</span>
                                                </div>
                                            );
                                        }
                                        
                                        const apca = getAPCA(fgColor, bgColor);
                                        const absApca = Math.abs(apca);
                                        const bgColorForCell = getMatrixCellBgColor(apca);
                                        const textColor = getMatrixTextColor(apca);
                                        
                                        return (
                                            <div 
                                                key={`cell-${bgIndex}-${fgIndex}`}
                                                className="border border-border flex items-center justify-center p-3 transition-all hover:scale-105 hover:z-10 hover:shadow-lg cursor-default"
                                                style={{ 
                                                    backgroundColor: bgColorForCell,
                                                }}
                                                title={`Lc ${absApca.toFixed(1)} (Step ${bgIndex + 1} bg, Step ${fgIndex + 1} fg)`}
                                            >
                                                <span className="text-xs font-bold" style={{ color: textColor }}>
                                                    {absApca.toFixed(1)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                        
                        {/* Legend */}
                        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                            <span className="font-medium text-muted-foreground">Legend:</span>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(160, 85%, 35%)' }} />
                                <span>90+ (Excellent)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(160, 70%, 45%)' }} />
                                <span>75-89 (Great)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(160, 50%, 55%)' }} />
                                <span>60-74 (Good)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(45, 85%, 50%)' }} />
                                <span>45-59 (Fair)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(25, 85%, 50%)' }} />
                                <span>30-44 (Poor)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(5, 85%, 50%)' }} />
                                <span>15-29 (Very Poor)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(0, 70%, 45%)' }} />
                                <span>&lt;15 (Fail)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper to determine text color for contrast based on step index (Radix-aware)
function getTextColorClass(isDarkScale: boolean, stepIndex: number) {
    if (!isDarkScale) {
        // Light Mode:
        // 1-8: Light bg -> Dark text
        // 9-10: Solid bg -> Light text (usually)
        // 11-12: Text (Very Dark) -> Light text (if used as bg)
        if (stepIndex >= 8) return "text-white/90";
        return "text-black/70";
    } else {
        // Dark Mode (Radix-style):
        // 1-7: Very dark bg -> Light text
        // 8: Transitional (still relatively dark) -> Light text
        // 9-10: Solid brand color -> depends on brand lightness, default to dark
        // 11: High-lightness colored text -> Dark text
        // 12: Near-white text -> Dark text
        if (stepIndex <= 7) return "text-white/70";
        if (stepIndex >= 10) return "text-black/90";
        // Steps 9-10 (solid brand): usually mid-lightness, use dark text
        return "text-black/80";
    }
}