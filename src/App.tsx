import { PaletteGenerator } from './components/palette-generator/PaletteGenerator';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  return (
    <div className="dark">
      <PaletteGenerator />
      <Toaster />
    </div>
  );
}