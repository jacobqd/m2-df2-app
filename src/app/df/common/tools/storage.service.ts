import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() { }
  read<T>(key: string): T {
    const value: string = localStorage.getItem(key);
    if (value && value !== "undefined" && value !== "null") {
      return <T>JSON.parse(value);
    }
    return null;
  }
  write(key: string, value: any) {
    if (value && !(typeof value === "string")) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
}
