import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemJson } from "./app.models";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NgForm} from "@angular/forms";

@Injectable()
export class HttpService{

  apiUrl : string = 'http://localhost:4201/api/products/';

  constructor(private http: HttpClient){}
  getData() : Observable<ItemJson[]>{
    return this.http.get(this.apiUrl).pipe(map(data=>{
      let arr: ItemJson[] = [];
      for (let i in data) {
        arr.push(<ItemJson>{
          name: data[i].Name,
          count: Number(data[i].Count),
          description: data[i].Description === null ? "" : data[i].Description
        });
      }
      return arr;
    }));
  }

  setData(data: NgForm) : Observable<ItemJson>{
    const item = <ItemJson>{
      name: data["name"],
      count: Number(data["count"]),
      description: data["description"]
    };
    return this.http.post(this.apiUrl, item).pipe(map(data=>{
      if (data !== null) {
        return <ItemJson>{
          name: data["Name"],
          count: data["Count"],
          description: data["Description"]
        }
      } else {
        //дубль
        return <ItemJson>{
          name: "Дубль",
          count: 1,
          description: "описание дубля"
        }
      }
    }));

  }

  /*putData(item: ItemJson) : Observable<ItemJson>{
    const data = <ItemJson>{
      name: item.name,
      count: Number(item.count),
      description: item.description
    };

    return this.http.put(this.apiUrl, data).pipe(map(data=>{
      console.log(data);
    }));
  }*/
}
