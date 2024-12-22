import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  imports: [CommonModule,FormsModule,],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {

  surveyName: string = '';
  selectedCompany: any = null;
  formattedStartDate!: string;
  formattedEndDate!: string;
  description: string = '';
  survey:any
  questions: any[] = [
  
  ];
    currentQuestionIndex: number = 0; // Keep track of the current question index

  constructor(private surveyService: AuthService, private route: ActivatedRoute,private authService:AuthService,private location:Location,private toastr:ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadOfferById(id);
      }
    });
    // if (surveyId) {
    //   this.surveyService.getSurveyById(surveyId).subscribe(
    //     (data) => {
    //       this.surveyName = data.name;
    //       this.selectedCompany = data.company;
    //       this.formattedStartDate = data.start_date;
    //       this.formattedEndDate = data.end_date;
    //       this.description = data.description;
    //       this.questions = data.questions;
    //     },
    //     (error) => {
    //       console.error('Error fetching survey data:', error);
    //     }
    //   );
    // }
  }
  loadOfferById(id: string) {
    this.authService.getSurveys().subscribe({
      next: (res) => {
        // Match the offer based on the ID
        const survey = res.data.data;
        debugger
        this.survey = survey.find((offer: any) => offer.id == id);
       this.questions=this.survey.questions
      },
      error: (err) => {
        console.error('Error fetching offers:', err);
      }
    });
  }
  setCurrentQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitUserSurvey(): void {
    const formData = new FormData();
  
    // Append the survey name and ID
    formData.append('name', this.survey.name || '');
    formData.append('survey_id', this.survey.id || '');
  
    // Append the questions
    this.questions.forEach((question, index) => {
      formData.append(`question[${index}][survey_question_id]`, question.id.toString());
  
      // Handle multiple selected options
      if (Array.isArray(question.selectedOptions)) {
        question.selectedOptions.forEach((option:any, optionIndex:any) => {
          formData.append(
            `question[${index}][survey_question_option_id][${optionIndex}]`,
            option.toString()
          );
        });
      } else if (question.selectedOption) {
        // For single selection fallback (if needed)
        formData.append(
          `question[${index}][survey_question_option_id][0]`,
          question.selectedOption.toString()
        );
      }
  
      // Uncomment below if you want to include custom answers
      formData.append(`question[${index}][custom_answer]`, question.customAnswer || '');
    });
  
    // Log the FormData for debugging
    console.log('FormData entries:');
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    this.surveyService.submitSurvey(formData).subscribe({
      next: (response) => {
        if (response.success) {
          // Show success toastr notification
          this.toastr.success(response.message, 'Success');
  
          // Navigate to the home screen
          this.router.navigate(['/home']);
        } else {
          // Show error toastr notification if the response indicates failure
          this.toastr.error('Failed to submit the survey. Please try again.', 'Error');
        }
      },
      error: (error) => {
        console.error('Error submitting survey:', error);
      },
    });
  }
  
  goBack() {
    this.location.back();
  }
}
