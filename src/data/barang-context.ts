import React from 'react';

export interface Barang{
  id: string;
  imagePath: string;
  title: string;
  price:string;
  type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim';
  base64url: string;
}

const BarangContext = React.createContext<{
  items: Barang[];
  addItem: (path: string, base64url: string, title: string, price:string, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => void;
  deleteItem: (id: string) => void;
  initContext: () => void;
}>({
  items: [],
  addItem: () => {},
  deleteItem: () => {},
  initContext: () => {},
});

export default BarangContext;
