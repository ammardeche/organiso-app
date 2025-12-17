import { Routes } from '@angular/router';
import { TabsComponent } from './components/layouts/tabs/tabs.component';
import { isNotLoggedInGuard } from './guards/is-not-logged-in-guard.guard';
import { isLoggedInGuard } from './guards/is-logged-in-guard.guard';

export const routes: Routes = [
  // register and login routes
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.page').then((m) => m.RegisterPage),
    canActivate: [isNotLoggedInGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),

    canActivate: [isNotLoggedInGuard],
  },
  // tabs routes
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./pages/tasks/tasks.page').then((m) => m.TasksPage),
      },
      {
        path: 'add-project',
        loadComponent: () =>
          import('./pages/add-project/add-project.page').then(
            (m) => m.AddProjectPage
          ),
      },
      {
        path: 'todays-tasks',
        loadComponent: () =>
          import('./pages/todays-tasks/todays-tasks.page').then(
            (m) => m.TodaysTasksPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
    ],

    canActivate: [isLoggedInGuard],
  },

  // splash
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () =>
      import('./pages/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
      ),
  },

  {
    path: 'forget-password-form',
    loadComponent: () =>
      import(
        './pages/auth/reset-password/components/forget-password-form/forget-password-form.page'
      ).then((m) => m.ForgetPasswordFormPage),
  },

  {
    path: 'task-item',
    loadComponent: () =>
      import('./pages/tasks/components/task-item/task-item.page').then(
        (m) => m.TaskItemPage
      ),
  },
  {
    path: 'task-list',
    loadComponent: () =>
      import('./pages/tasks/components/task-list/task-list.page').then(
        (m) => m.TaskListPage
      ),
  },

  {
    path: 'search-bar',
    loadComponent: () =>
      import('./pages/tasks/components/search-bar/search-bar.page').then(
        (m) => m.SearchBarPage
      ),
  },

  {
    path: 'edite-project',
    loadComponent: () =>
      import('./pages/edite-project/edite-project.page').then(
        (m) => m.EditeProjectPage
      ),
  },

  {
    path: 'update-profile',
    loadComponent: () =>
      import(
        './pages/profile/pages/update-information/update-information.page'
      ).then((m) => m.UpdateInformationPage),
  },
  {
    path: 'update-password',
    loadComponent: () =>
      import('./pages/profile/pages/update-password/update-password.page').then(
        (m) => m.UpdatePasswordPage
      ),
  },
];
