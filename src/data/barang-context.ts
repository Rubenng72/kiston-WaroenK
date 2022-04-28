import React from 'react';

export interface Barang{
  id: string;
  imagePath: string;
  title: string;
  price: number;
  type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim';
  base64url: string;
}

const BarangContext = React.createContext<{
  items: Barang[];
  addItem: (path: string, base64url: string, title: string, price:number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => void;
  updateItem: (id: string, path: string, base64url: string, title: string, price:number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => void;
  deleteItem: (id: string) => void;
  deleteAllItems: () => void;
  initContext: () => void;
}>({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  deleteAllItems: () => {},
  initContext: () => {},
});

export default BarangContext;
