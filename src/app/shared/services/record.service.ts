import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Record } from "../models/record.model"

@Injectable()
export class RecordService {
  constructor(private http: HttpClient) {}

  createRecord (record: Record) {
    return this.http.post('http://localhost:3000/records', record);
  }
}
