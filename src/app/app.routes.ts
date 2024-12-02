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

export const routes: Routes = [
    { path: '', redirectTo: "register", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: AllOffersComponent },
    { path: 'offer-detail', component: OfferDetailComponent },
    { path: 'rewards', component: AllRewardsComponent },
    { path: 'reward-detail', component: RewardDetailComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'review', component: ReviewComponent },




];
