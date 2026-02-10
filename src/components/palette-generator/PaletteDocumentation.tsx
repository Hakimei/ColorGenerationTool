import React, { useState, useMemo } from 'react';
import { PaletteConfig } from './PaletteGenerator';
import { ColorScale, getContrast, getWCAGRating, generateAlphaScale, AlphaColorScale, formatAlphaColor } from '../../lib/color-utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Copy, Download, Moon, Sun, FileJson, Type } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PaletteDocumentationProps {
  palettes: (PaletteConfig & { scale: ColorScale })[];
}

export function PaletteDocumentation({ palettes }: PaletteDocumentationProps) {

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  const downloadJson = () => {
    const obj: Record<string, Record<string, string>> = {};
    palettes.forEach(p => {
      const colorObj: Record<string, string> = {};
      const alphaScale = generateAlphaScale(p.scale, p.isDark);
      p.scale.colors.forEach((color, i) => {
         colorObj[`${(i + 1)}`] = color;
      });
      alphaScale.colors.forEach((alpha, i) => {
         colorObj[`a${(i + 1)}`] = alpha.rgba;
      });
      obj[p.name.toLowerCase()] = colorObj;
    });
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "design-tokens.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadGoogleSheetCsv = () => {
    // Detailed CSV format for Google Sheets with proper escaping
    const headers = ["Token Name", "Hex Value", "Alpha (RGBA)", "Alpha (Hex8)", "Alpha %", "Mode", "Palette Name", "Step"];
    
    const escapeCsv = (field: string) => {
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
    };

    let csvContent = headers.join(",") + "\n";

    palettes.forEach(p => {
        const alphaScale = generateAlphaScale(p.scale, p.isDark);
        p.scale.colors.forEach((color, i) => {
            const alpha = alphaScale.colors[i];
            const row = [
                `${p.name}/${i + 1}`,
                color,
                alpha.rgba,
                alpha.hex8,
                `${Math.round(alpha.alpha * 100)}%`,
                p.isDark ? 'Dark' : 'Light',
                p.name,
                (i + 1).toString()
            ];
            csvContent += row.map(escapeCsv).join(",") + "\n";
        });
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "design-system-colors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Color Reference</h1>
          <p className="text-muted-foreground mt-1">
            Official documentation for the design system color palette.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={downloadGoogleSheetCsv}>
                <Type className="mr-2 h-4 w-4" /> Google Sheet CSV
            </Button>
        </div>
      </div>

      {palettes.map((palette) => (
        <section key={palette.id} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
                <div 
                    className="h-6 w-6 rounded-md border shadow-sm" 
                    style={{ backgroundColor: palette.baseColor }}
                />
                <h2 className="text-2xl font-semibold">{palette.name}</h2>
                <Badge variant={palette.isDark ? "secondary" : "outline"}>
                    {palette.isDark ? <Moon className="h-3 w-3 mr-1" /> : <Sun className="h-3 w-3 mr-1" />}
                    {palette.isDark ? 'Dark Mode' : 'Light Mode'}
                </Badge>
            </div>
            <p className="text-muted-foreground max-w-3xl">
                {palette.description || `The ${palette.name} scale is designed for ${palette.name.toLowerCase()} actions, states, and surfaces. It consists of 12 steps ranging from background tints to high-contrast text.`}
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
                {/* Ramp Visualization - Solid */}
                <div className="flex h-12 w-full">
                    {palette.scale.colors.map((color, i) => (
                        <div 
                            key={i}
                            className="flex-1 h-full first:rounded-tl-lg last:rounded-tr-lg relative group"
                            style={{ backgroundColor: color }}
                        >
                        </div>
                    ))}
                </div>
                {/* Ramp Visualization - Alpha */}
                {(() => {
                    const alphaScale = generateAlphaScale(palette.scale, palette.isDark);
                    const checkerBg = `repeating-conic-gradient(${palette.isDark ? '#1a1a1a' : '#e5e5e5'} 0% 25%, ${palette.isDark ? '#2a2a2a' : '#ffffff'} 0% 50%) 0 0 / 8px 8px`;
                    return (
                        <div className="flex h-8 w-full" style={{ background: checkerBg }}>
                            {alphaScale.colors.map((alpha, i) => (
                                <div 
                                    key={i}
                                    className="flex-1 h-full relative"
                                    style={{ backgroundColor: alpha.rgba }}
                                >
                                </div>
                            ))}
                        </div>
                    );
                })()}
                <div className="grid grid-cols-2 text-[9px] text-muted-foreground border-t text-center">
                    <div className="p-1 border-r bg-muted/10">Solid Scale</div>
                    <div className="p-1 bg-muted/10">Alpha Scale (on {palette.isDark ? '#111113' : '#FFFFFF'})</div>
                </div>

                {/* Detailed Table */}
                <div className="overflow-x-auto border-t">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-muted-foreground font-medium">
                            <tr>
                                <th className="p-4 font-medium">Token</th>
                                <th className="p-4 font-medium">Preview</th>
                                <th className="p-4 font-medium">HEX</th>
                                <th className="p-4 font-medium">Alpha (RGBA)</th>
                                <th className="p-4 font-medium">α%</th>
                                <th className="p-4 font-medium">Contrast (W/B)</th>
                                <th className="p-4 font-medium">Usage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {(() => {
                                const alphaScale = generateAlphaScale(palette.scale, palette.isDark);
                                const checkerBg = `repeating-conic-gradient(${palette.isDark ? '#1a1a1a' : '#e5e5e5'} 0% 25%, ${palette.isDark ? '#2a2a2a' : '#ffffff'} 0% 50%) 0 0 / 6px 6px`;
                                
                                return palette.scale.colors.map((color, i) => {
                                    const alpha = alphaScale.colors[i];
                                    const contrastWhite = getContrast(color, '#ffffff');
                                    const contrastBlack = getContrast(color, '#000000');
                                    const whiteRating = getWCAGRating(contrastWhite);
                                    const blackRating = getWCAGRating(contrastBlack);

                                    return (
                                        <tr key={i} className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-mono text-xs">{palette.name.toLowerCase()}-{i + 1}</span>
                                                    <span className="font-mono text-[10px] text-muted-foreground">{palette.name.toLowerCase()}-a{i + 1}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div 
                                                        className="h-8 w-8 rounded border shadow-sm" 
                                                        style={{ backgroundColor: color }}
                                                        title={`Solid: ${color}`}
                                                    />
                                                    <div 
                                                        className="h-8 w-8 rounded border shadow-sm"
                                                        style={{ background: checkerBg }}
                                                        title={`Alpha: ${alpha.rgba}`}
                                                    >
                                                        <div className="h-full w-full rounded" style={{ backgroundColor: alpha.rgba }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-mono text-xs text-muted-foreground">
                                                {color}
                                            </td>
                                            <td className="p-4">
                                                <span className="font-mono text-[11px] text-muted-foreground">
                                                    {alpha.rgba}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                                    alpha.alpha <= 0.1 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' :
                                                    alpha.alpha <= 0.3 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                                                    alpha.alpha <= 0.6 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                                }`}>
                                                    {Math.round(alpha.alpha * 100)}%
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[10px] text-muted-foreground/70">W:</span>
                                                            <span className="font-mono text-xs">{contrastWhite.toFixed(1)}</span>
                                                            {whiteRating.label !== 'Fail' && (
                                                                <Badge variant="secondary" className={`text-[9px] h-4 px-1 ${whiteRating.label === 'AAA' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}`}>
                                                                    {whiteRating.label}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[10px] text-muted-foreground/70">B:</span>
                                                            <span className="font-mono text-xs">{contrastBlack.toFixed(1)}</span>
                                                            {blackRating.label !== 'Fail' && (
                                                                <Badge variant="secondary" className={`text-[9px] h-4 px-1 ${blackRating.label === 'AAA' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}`}>
                                                                    {blackRating.label}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-muted-foreground text-xs">
                                                {getUsageNote(i)}
                                            </td>
                                        </tr>
                                    );
                                });
                            })()}
                        </tbody>
                    </table>
                </div>
            </CardContent>
          </Card>

            {/* Preview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Theme Simulation using this scale */}
            <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Component Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4" style={{ backgroundColor: palette.isDark ? '#18181b' : '#ffffff' }}>
                    <div 
                        className="p-4 rounded-lg border space-y-3"
                        style={{ 
                            backgroundColor: palette.scale.colors[1], 
                            borderColor: palette.scale.colors[5] 
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div 
                                className="h-10 w-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: palette.scale.colors[2] }}
                            >
                                <div className="h-5 w-5 rounded-full" style={{ backgroundColor: palette.scale.colors[10] }} />
                            </div>
                            <div>
                                <div className="h-4 w-32 rounded" style={{ backgroundColor: palette.scale.colors[10], opacity: 0.2 }}></div>
                                <div className="h-3 w-20 rounded mt-1" style={{ backgroundColor: palette.scale.colors[10], opacity: 0.1 }}></div>
                            </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                            <button 
                                className="px-4 py-2 rounded text-sm font-medium transition-colors"
                                style={{ 
                                    backgroundColor: palette.scale.colors[8], 
                                    color: getContrast(palette.scale.colors[8], '#fff') > 4.5 ? '#fff' : '#000' 
                                }}
                            >
                                Primary
                            </button>
                            <button 
                                className="px-4 py-2 rounded text-sm font-medium border transition-colors"
                                style={{ 
                                    backgroundColor: 'transparent', 
                                    borderColor: palette.scale.colors[6],
                                    color: palette.scale.colors[10]
                                }}
                            >
                                Secondary
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Typography & Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-2" style={{ backgroundColor: palette.scale.colors[0] }}>
                    <h3 className="text-2xl font-bold" style={{ color: palette.scale.colors[11] }}>
                        The quick brown fox
                    </h3>
                    <p className="text-lg" style={{ color: palette.scale.colors[10] }}>
                        Jumps over the lazy dog.
                    </p>
                    <p className="" style={{ color: palette.scale.colors[10], opacity: 0.8 }}>
                        Design systems allow for scalable UI development.
                    </p>
                    <p className="text-sm" style={{ color: palette.scale.colors[10], opacity: 0.6 }}>
                        Micro-copy and metadata often use lower contrast.
                    </p>
                </CardContent>
            </Card>
          </div>
        </section>
      ))}
    </div>
  );
}

function getUsageNote(index: number) {
    const i = index + 1;
    if (i <= 2) return "App backgrounds and subtle component backgrounds";
    if (i <= 5) return "Component backgrounds, hover states, active states";
    if (i <= 8) return "Borders, focus rings, interactive boundaries";
    if (i <= 10) return "Solid backgrounds (buttons), high-contrast elements";
    return "Text and icons requiring high contrast";
}
