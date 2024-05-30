import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-calendar-app';
}
