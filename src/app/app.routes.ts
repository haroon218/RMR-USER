import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { AllRewardsComponent } from './all-rewards/all-rewards.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { SurveyComponent } from './survey/survey.component';
import { AllSurveysComponent } from './all-surveys/all-surveys.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  },
  { path: 'register', component: RegisterComponent,},
    { path: 'home', component: HomeComponent ,canActivate: [AuthGuard] },
    { path: 'offers', component: AllOffersComponent,canActivate: [AuthGuard] },
    { path: 'offer-detail', component: OfferDetailComponent ,canActivate: [AuthGuard]},
    { path: 'rewards', component: AllRewardsComponent,canActivate: [AuthGuard] },
    { path: 'reward-detail', component: RewardDetailComponent,canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
    { path: 'review', component: ReviewComponent,canActivate: [AuthGuard] },
    { path: 'survey-detail', component: SurveyComponent ,canActivate: [AuthGuard]},
    { path: 'all-surveys', component: AllSurveysComponent ,canActivate: [AuthGuard]},





];
