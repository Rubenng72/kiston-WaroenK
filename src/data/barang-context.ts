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

export interface History{
  id: string;
  uId: string;
  totalPrice: number;
  date: string;
  time: string;
}

export interface HistoryReceipt{
  uId: string;
  name: string;
  quantity: number;
  receiptId: string;
  totalPrice: number;
}


const BarangContext = React.createContext<{
  items: Barang[];
  history: History[];
  historyReceipt: HistoryReceipt[];
  addDataItem: (uId:string, title:string, price:number, cost: number, type: 'box', nMax: number, stock:number, image: string, url:string) => void;
  updateDataItem: (url: string|null, bId: string|null, title: string, price: number,  cost: number, type: 'box', nMax: number, fileName: string) => void;
  saveToHistory: (uId: string|null, totalPrice: number, date: string, time: string) => void;
  deleteSingleItem:(id:string, img:string)=>void;
  initContext: () => void;
  initContextHistory: () => void;
  initContextHistoryReceipt: () => void;

}>({
  items: [],
  history: [],
  historyReceipt: [],
  addDataItem: () => {},
  updateDataItem: () => {},
  saveToHistory: () => {},
  deleteSingleItem: () => {},
  initContext: () => {},
  initContextHistory: () => {},
  initContextHistoryReceipt: () => {},
});

export default BarangContext;
