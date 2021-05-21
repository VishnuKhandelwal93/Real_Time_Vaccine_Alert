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
  public data: any;
  public form: FormGroup;
  public date: Date = new Date();
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
  private timeOutVariable: any;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.form = this.fb.group({
      "pincode": ["", Validators.required, Validators.minLength(6), Validators.maxLength(6)]
    });
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.getDetails();
    }
  }

  getDetails() {
    setTimeout(() => {
      this.appService.getDetails().subscribe((data: any) => {
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
      }, (err) => {
        console.log(err);
        this.getDetails();
      });
    }, 3100);
  }
}
