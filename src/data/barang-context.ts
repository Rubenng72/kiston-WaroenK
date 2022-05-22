import React from 'react';

export interface Barang{
  id: string;
  uId: string;
  foto: string;
  fotoUrl: string;
  title: string;
  price: number;
  // type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim';
  type: 'box';
  disc: number;
  nMax: number;
  amount: number;
}


const BarangContext = React.createContext<{
  items: Barang[];
  addDataItem: (uId:string, title:string, price:number, type: 'box', disc: number, nMax: number, image: string, url:string) => void;
  deleteSingleItem:(id:string, img:string)=>void;
  initContext: () => void;
}>({
  items: [],
  addDataItem: () => {},
  deleteSingleItem: () => {},
  initContext: () => {},
});

export default BarangContext;
