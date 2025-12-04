import { NgClass } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonTabButton,
  IonTabs,
  IonTabBar,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonTabBar, IonTabs, IonTabButton, NgClass],
})
export class TabsComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  isHidden = signal<boolean>(false);
  selectedTab: string = 'home';

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }
  constructor() {}

  ngOnInit() {}
}
