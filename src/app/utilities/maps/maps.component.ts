import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  address: string;
  private geoCoder;

  markers = []
  // google maps zoom level
  zoom: number = 5;
  // initial center position for the map
  lat: number = -26.233449;
  lng: number = 133.848693;
  radData: any;
  startDragCircle = false;
  constructor(
    public sharedSrv: SharedService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
            //set latitude, longitude and zoom
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
          
          this.getAddress(this.lat, this.lng)
        });
      });
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log(results)
          const state = results[0].address_components.find(x => x.types[0] === "administrative_area_level_1");
          const country = results[0].address_components.find(x => x.types[0] === "country");
          const city = results[0].address_components.find(x => x.types[0] === "administrative_area_level_2");
          this.sharedSrv.country = country.long_name;
          this.sharedSrv.state = state ? state.long_name : ''
          this.sharedSrv.city = city ? city.long_name : ''
          this.searchElementRef.nativeElement.value = `${this.sharedSrv.city} ${this.sharedSrv.state}, ${this.sharedSrv.country}`;
        } else {
          this.toastr.error('Location not found')
        }
      } else if ( status === 'OVER_QUERY_LIMIT') {
        this.toastr.error('Over the query limit')
      } else {
        this.toastr.error('Location not found');
      }
    });
  }

  radiusDragEnd(event: any) {
    this.getAddress(event.coords.lat, event.coords.lng)
    this.startDragCircle = false;
  }

  centerChange(event: any) {
    if (!this.startDragCircle) {
      this.getAddress(event.lat, event.lng)
    }
  }

  radiusDragStart() {
    this.startDragCircle = true;
  }
}
