import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
