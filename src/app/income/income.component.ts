import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IncomedataService } from '../Services/incomedata.service';
import { CalculationsService } from '../Services/calculations.service';
 
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit{
  incomeForm!: FormGroup;
  totalIncome: any;
  IncomeData: any[] = [];
  highestIncome: number = 0;
  showConfirmationIndex: number | null = null;
  incomeToDelete: any;
  recentIncomes: any[] = [];
  selectedCategory: string;

  constructor(
    private fb: FormBuilder,
    private incomedataservice: IncomedataService,
    private calculationService: CalculationsService
  ) {
    this.incomeForm = this.fb.group({
      incomeTitle: [''],
      incomeAmount: [''],
      incomeDate: [''],
      incomeCategory: [''],
      incomeDescription: [''],
    });
    this.loadIncomeData();
    this.calculateTotalIncome();
  }

  ngOnInit(): void {
    this.calculateHighestIncome();
    this.defaultDate();
    this.loadRecentIncome();
  }

  loadIncomeData(): void {
    this.IncomeData = this.incomedataservice.getIncomeData();
  }

  loadRecentIncome(): void {
    const sortedIncomeData = [...this.IncomeData].sort((a, b) => {
      return new Date(b.incomeDate).getTime() - new Date(a.incomeDate).getTime();
    });

    this.recentIncomes = sortedIncomeData.slice(0, 4); // Limit to 4 recent items
  }

  private defaultDate() {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    this.incomeForm.get('incomeDate')?.patchValue(formattedDate);
  }

  confirmDelete(income: any, index: number): void {
    this.showConfirmationIndex = index;
    this.incomeToDelete = income;
  }

  deleteIncome(): void {
    this.incomedataservice.deleteIncomeData(this.incomeToDelete);


    this.IncomeData = this.IncomeData.filter((item) => item !== this.incomeToDelete);
    this.recentIncomes = this.recentIncomes.filter((item) => item !== this.incomeToDelete);

    this.showConfirmationIndex = null;
    this.calculateTotalIncome();
    this.calculateHighestIncome();
  }

  cancelDelete(): void {
    this.showConfirmationIndex = null;
  }

  addIncome() {
    const newIncome = this.incomeForm.value;
    this.incomedataservice.addIncomeData(newIncome);

    this.IncomeData.unshift(newIncome);
    this.recentIncomes.unshift(newIncome);

    if (this.recentIncomes.length > 4) {
      this.recentIncomes.pop();
    }

    this.incomeForm.reset();
    this.defaultDate();
    this.calculateTotalIncome();
    this.calculateHighestIncome();
  }

  calculateTotalIncome() {
    this.totalIncome = this.calculationService.calculateTotalIncome();
  }

  calculateHighestIncome() {
    this.highestIncome = this.calculationService.calculateHighestIncome();
  }

  getCategoryImage(category: string): string | undefined {
    const categoryImages: { [key: string]: string } = {
      freelance: '../../assets/Income/computer_2004580.png',
      salary: '../../assets/Income/dollar_3225621.png',
      shopping: '../../assets/Income/shopping-cart_3737372.png',
      business: '../../assets/Income/negotiation_1356001.png',
      socialmedia: '../../assets/Income/social-media_3893024.png',
      amazon: '../../assets/Categories/amazon-icon-41517.png',
      youtube: '../../assets/Income/youtube_1077046.png',
      other: '../../assets/Income/salary_1589110.png',
    };
    return categoryImages[category] || undefined;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
