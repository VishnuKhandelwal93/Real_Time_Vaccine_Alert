import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
    this.setDate();
  }

  setDate(){
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    let date = tomorrow.toLocaleDateString();
    let date1 = date.replace("/", "-");
    localStorage.setItem("date", date1);
  }

  getDetails(pincode: string = "304021") {
    let date = localStorage.getItem("date");
    return this.http.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + date);
  }

  getDetailsByDistrict(districtId: number = 505) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    let date = tomorrow.toLocaleDateString();
    date.replace("/", "-");
    return this.http.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + districtId + "&date=" + date);
  }
}
