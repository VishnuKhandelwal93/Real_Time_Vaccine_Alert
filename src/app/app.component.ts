import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from "./app.service";
import {AngMusicPlayerComponent} from "ang-music-player"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(AngMusicPlayerComponent) audioPlayerComponent!: AngMusicPlayerComponent;

  title = 'vaccine-web';
  public data: any[] = [];
  public form: FormGroup;
  public date: Date = new Date();
  sampleData: any = {
    "center_id": 593286,
    "name": "Newai BCMO Building (Covaxin)",
    "address": "BCMO Office Newai",
    "state_name": "Rajasthan",
    "district_name": "Tonk",
    "block_name": "Niwai",
    "pincode": 304021,
    "from": "10:00:00",
    "to": "15:00:00",
    "lat": 26,
    "long": 75,
    "fee_type": "Free",
    "session_id": "ae7d1cd0-cbc2-4b2f-b676-58f4de2c9e34",
    "date": "22-05-2021",
    "available_capacity_dose1": 0,
    "available_capacity_dose2": 0,
    "available_capacity": 0,
    "fee": "0",
    "min_age_limit": 45,
    "vaccine": "COVAXIN",
    "slots": [
      "10:00AM-11:00AM",
      "11:00AM-12:00PM",
      "12:00PM-01:00PM",
      "01:00PM-03:00PM"
    ]
  }
  centreIdList: number[] = [701351, 705876, 593286]
  audioList = [
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Smaple 1",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      title: "Sample 2",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      title: "Sample 3",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    }
  ];
  logs: any[] = [];
  timeDuration: number = 10000;
  private timeOutVariable: any;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.form = this.fb.group({
      "pincode": ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
    });
  }

  ngOnInit(): void {
    // this.data.push(this.sampleData);
    localStorage.setItem("delay", "3000");
  }

  submit() {
    if (this.form.valid) {
      this.getDetails();
    }
  }

  getDetails() {
    let value = localStorage.getItem("delay");
    if (value) {
      this.timeDuration = parseInt(value);
    } else {
      this.timeDuration = 10000;
    }
    setTimeout(() => {
      this.appService.getDetails(this.form.get("pincode")?.value).subscribe((data: any) => {
        console.log(data);
        this.date = new Date();
        this.data = <any[]>data?.sessions;
        let vaccineAvailable: boolean = false;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].available_capacity > 0 || this.data[i].available_capacity_dose1 > 0 || this.data[i].available_capacity_dose2 > 0) {
            this.audioPlayerComponent.play();
            vaccineAvailable = true;
            break;
          }
        }
        this.data = [...this.data];
        if (!vaccineAvailable) {
          this.getDetails();
        }
        this.logs.push({time: new Date().toLocaleTimeString(), status: "success", result: ""});
      }, (err) => {
        console.log(err);
        this.logs.push({time: new Date().toLocaleTimeString(), status: "error", result: ""});
        this.getDetails();
      });
    }, this.timeDuration);
  }
}
