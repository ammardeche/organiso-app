import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-weekly-days-component',
  templateUrl: './weekly-days-component.component.html',
  styleUrls: ['./weekly-days-component.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeeklyDaysComponentComponent implements OnInit {
  days: any[] = [];
  selectedIndex = 0;

  ngOnInit() {
    register();
    this.generateCurrentWeek();
  }

  generateCurrentWeek() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sun, 1 = Mon

    // Monday as start of week
    const monday = new Date(today);
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + diffToMonday);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      this.days.push({
        fullDate: d,
        month: d.toLocaleString('en-US', { month: 'short' }),
        dayNumber: d.getDate(),
        dayName: d.toLocaleString('en-US', { weekday: 'short' }),
        isToday: false,
      });

      // Detect today
      if (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth()
      ) {
        this.selectedIndex = i;
        this.days[i].isToday = true;
      }
    }
  }

  selectDay(index: number) {
    this.selectedIndex = index;
  }
}
