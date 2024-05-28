import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: "./event-list.component.html",
})
export class EventListComponent {
  @Input() events: string[] | null = [];


}
