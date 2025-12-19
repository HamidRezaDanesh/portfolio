// src/admin/hooks/useCRUD.ts
import { useState, useCallback } from 'react';
import { storage } from '../../utils/storage';
import { Experience, Skill, Certification, Project } from '../../types/admin.types';

type DataType = 'experiences' | 'skills' | 'certifications' | 'projects';
type ItemType = Experience | Skill | Certification | Project;

export function useCRUD<T extends ItemType>(dataType: DataType) {
  const [items, setItems] = useState<T[]>(() => {
    const data = storage.getData();
    return data[dataType] as T[];
  });

  const saveToStorage = useCallback((newItems: T[]) => {
    const allData = storage.getData();
    allData[dataType] = newItems as any;
    storage.setData(allData);
    setItems(newItems);
  }, [dataType]);

  const create = useCallback((item: Omit<T, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    } as T;
    
    const newItems = [...items, newItem];
    saveToStorage(newItems);
    return newItem;
  }, [items, saveToStorage]);

  const update = useCallback((id: string, updates: Partial<T>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveToStorage(newItems);
  }, [items, saveToStorage]);

  const remove = useCallback((id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveToStorage(newItems);
  }, [items, saveToStorage]);

  const getById = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  const refresh = useCallback(() => {
    const data = storage.getData();
    setItems(data[dataType] as T[]);
  }, [dataType]);

  return {
    items,
    create,
    update,
    remove,
    getById,
    refresh
  };
}