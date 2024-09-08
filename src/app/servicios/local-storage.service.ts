import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(key: string, data: any): void {    
    localStorage.setItem(key, data);    
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, data);    
  }
  
  getData(key: string): any {   
    return localStorage.getItem(key);   
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  removeAllData(): void {
    localStorage.clear();
  }

  isEmpty(): boolean {
    return localStorage.length === 0;
  }
}
