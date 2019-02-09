import { Injectable } from '@angular/core';
import { ItemJson } from './app.models';

@Injectable()
export class AppStore {
  private tempItems: ItemJson[] = [];

  async getItems(): Promise<ItemJson[]> {
    return this.tempItems;
  }

  async addList(data: ItemJson[]) {
    for (let i = 0; i < data.length; i++)
      this.add(data[i]).then(function(){});
  }

  async add(data: ItemJson) {
    const item = <ItemJson>{
      name: data.name,
      count: Number(data.count),
      description: data.description
    };
    this.tempItems.push(item);
  }
}
