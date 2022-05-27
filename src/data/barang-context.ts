import React from 'react';

export interface Barang{
  id: string;
  uId: string;
  foto: string;
  fotoUrl: string;
  title: string;
  price: number;
  type: 'box';
  nMax: number;
  amount: number;
  cost: number;
  stock: number;
}


const BarangContext = React.createContext<{
  items: Barang[];
  addDataItem: (uId:string, title:string, price:number, cost: number, type: 'box', nMax: number, stock:number, image: string, url:string) => void;
  updateDataItem: (url: string|null, bId: string|null, title: string, price: number, type: 'box', nMax: number, fileName: string) => void;
  deleteSingleItem:(id:string, img:string)=>void;
  initContext: () => void;
}>({
  items: [],
  addDataItem: () => {},
  updateDataItem: () => {},
  deleteSingleItem: () => {},
  initContext: () => {},
});

export default BarangContext;
