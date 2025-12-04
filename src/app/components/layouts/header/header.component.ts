import { Component, input, OnInit, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonTitle, IonBackButton, IonButtons, IonToolbar, RouterLink],
})
export class HeaderComponent implements OnInit {
  title = input<string>();

  showBackButton = input<boolean>(false);
  closeButtonClicked = output<void>();
  defaultBackUrl = input<string>();

  showNotifications = input<boolean>(true);
  notificationsCount = signal<number>(0);

  private hideNotificationRoutes = ['/login', '/register', '/forget-password'];
  constructor(private router: Router) {}

  shouldShowNotifications(): boolean {
    const currentRoute = this.router.url;
    const shouldHide = this.hideNotificationRoutes.includes(currentRoute);

    // Only show if not in auth routes AND showNotifications input is true
    return !shouldHide && this.showNotifications();
  }

  ngOnInit() {}
}
