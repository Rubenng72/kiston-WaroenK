import { Directory, Filesystem } from "@capacitor/filesystem";
import React, { useCallback, useEffect, useState } from "react";
import BarangContext, { Barang } from "./barang-context";
import { Storage } from "@capacitor/storage";

const BarangContextProvider: React.FC = props => {
  const [items, setItems] = useState<Barang[]>([]);

  const addItem = (path: string, base64Data: string, title: string, price: number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => {
    const newItem: Barang = {
      id: Math.random().toString(),
      title,
      price,
      type,
      imagePath: path,
      base64url: base64Data,
    }
    setItems(curItems => {
      return [...curItems, newItem];
    });
  };

  const updateItem = (id: string, imagePath: string, base64url: string, title: string, price: number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => {
    const update: Barang = {id, imagePath, base64url, title, price, type}
    const updateIndex = items.findIndex(i => i.id === id)

    setItems(curItems => {
      curItems[updateIndex] = update

      return curItems
    })

  }


  const deleteItem = (id: string) => {
    for(let i = 0; i < items.length; i++)
    {
      if(items[i].id == id)
      {
        items.splice(i, 1);
        break;
      }
    }
  }

  const deleteAllItems = () => {
    items.splice(0, items.length);
  };

  useEffect(() => {
    const storableItems = items.map((item) => {
      return { id: item.id, title: item.title, price: item.price, imagePath: item.imagePath, type: item.type};
    });
    Storage.set({ key: "items", value: JSON.stringify(storableItems) });
  }, [items]);

  const initContext = useCallback(async () => {
    const itemsData = await Storage.get({ key: "items" });
    const storedItems = itemsData.value ? JSON.parse(itemsData.value) : [];
    const loadedItems: Barang[] = [];

    for (const storedItem of storedItems) {
      const file = await Filesystem.readFile({
        path: storedItem.imagePath,
        directory: Directory.Data,
      });

      loadedItems.push({
        id: storedItem.id,
        title: storedItem.title,
        price: storedItem.price,
        type: storedItem.type,
        imagePath: storedItem.imagePath,
        base64url: "data:image/jpeg;base64," + file.data,
      });
    }

    setItems(loadedItems);
  }, []);

  return(
    <BarangContext.Provider value={{items, addItem, updateItem, deleteItem, deleteAllItems, initContext }}>
      {props.children}
    </BarangContext.Provider>
  );
}

export default BarangContextProvider;
