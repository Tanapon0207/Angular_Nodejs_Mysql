import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user'; // ตรวจสอบให้แน่ใจว่า path นี้ถูกต้อง

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:5000/auth';  // แก้ไข path ให้ถูกต้อง

  // ใช้ httpOptions เพื่อจัดการ headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับ register
  register(userData: User): Observable<any> {
    return this.http.post(`${this.api}/register`, userData, this.httpOptions);
  }
}
