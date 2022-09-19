import { FeatureFlagGuard } from './common/guards/feature-flag.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [FeatureFlagGuard],
    data: {
      featureFlag: 'home'
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
    canActivate: [FeatureFlagGuard],
    data: {
      featureFlag: 'about'
    }
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then(m => m.NotesModule),
    canActivate: [FeatureFlagGuard],
    data: {
      featureFlag: 'notes'
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRouting { }
