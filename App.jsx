import React, { useState, useEffect } from 'react';
import { TaalSelector, LayaSelector, TypeSelector } from './components/Selectors';
import { NotationGrid } from './components/NotationGrid';
import { ExportButtons } from './components/ExportButtons';

const TAAL_MATRAS = {
  Teentaal: 16,
  Jhaptaal: 10,
  Dhamar: 14
};

export default function App() {
  const [taal, setTaal] = useState('Teentaal');
  const [laya, setLaya] = useState('Madhya');
  const [compositionType, setCompositionType] = useState('Aamad');
  const [gridData, setGridData] = useState([]);
  const [markers, setMarkers] = useState({ sam: 0, khali: 8, taali: [4, 12] });

  useEffect(() => {
    const matras = TAAL_MATRAS[taal] || 16;
    setGridData(Array(matras).fill(''));
    setMarkers({ sam: 0, khali: Math.floor(matras / 2), taali: [Math.floor(matras / 4), Math.floor((3 * matras) / 4)] });
  }, [taal]);

  useEffect(() => {
    const saved = localStorage.getItem('kathakNotation');
    if (saved) {
      const { taal, laya, compositionType, gridData, markers } = JSON.parse(saved);
      setTaal(taal);
      setLaya(laya);
      setCompositionType(compositionType);
      setGridData(gridData);
      setMarkers(markers);
    }
  }, []);

  const saveToLocal = () => {
    localStorage.setItem('kathakNotation', JSON.stringify({ taal, laya, compositionType, gridData, markers }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Kathak Notation</h1>
      <div className="flex gap-4 mb-4">
        <TaalSelector taal={taal} setTaal={setTaal} />
        <LayaSelector laya={laya} setLaya={setLaya} />
        <TypeSelector compositionType={compositionType} setCompositionType={setCompositionType} />
        <button onClick={saveToLocal} className="bg-gray-300 px-3 rounded">Save</button>
      </div>
      <NotationGrid gridData={gridData} setGridData={setGridData} markers={markers} setMarkers={setMarkers} taal={taal} />
      <ExportButtons gridData={gridData} taal={taal} laya={laya} compositionType={compositionType} markers={markers} />
    </div>
  );
}
