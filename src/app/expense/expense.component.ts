import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpensedataService } from '../Services/expensedata.service';
import { CalculationsService } from '../Services/calculations.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseForm!: FormGroup;
  totalExpense: any;
  displayedExpenseData: any[] = [];
  ExpenseData: any[] = [];
  highestExpense: number = 0;
  showConfirmationIndex: number | null = null;
  expenseToDelete: any;
  recentExpenses: any[] = [];
  selectedCategory: string = ''; 

  constructor(
    private fb: FormBuilder,
    private expensedataservice: ExpensedataService,
    private calculationService: CalculationsService
  ) {
    this.expenseForm = this.fb.group({
      expenseTitle: [''],
      expenseAmount: [''],
      expenseDate: [''],
      expenseCategory: [''],
      expenseDescription: ['']
    });
    this.loadExpenseData(); 
  }

  ngOnInit(): void {
    this.calculateTotalExpense();
    this.calculateHighestExpense();
    this.defaultDate();
    this.loadRecentExpense();
  }

  loadExpenseData(): void {
    this.ExpenseData = this.expensedataservice.getExpenseData(); 
  }

  loadRecentExpense(): void {
    const sortedExpenseData = this.ExpenseData.sort((a, b) => {
      return new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime();
    });
    this.recentExpenses = sortedExpenseData.slice(0, 4); 
  }

  defaultDate() {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    this.expenseForm.get('expenseDate')?.patchValue(formattedDate);
  }

  confirmDelete(expense: any, index: number): void {
    this.showConfirmationIndex = index; 
    this.expenseToDelete = expense;
  }

  cancelDelete(): void {
    this.showConfirmationIndex = null; 
  }

  deleteExpense(): void {
    this.expensedataservice.deleteExpenseData(this.expenseToDelete); 
    this.ExpenseData = this.ExpenseData.filter(item => item !== this.expenseToDelete); 
    this.recentExpenses = this.recentExpenses.filter(item => item !== this.expenseToDelete); 
    this.showConfirmationIndex = null;
    this.calculateTotalExpense();
    this.calculateHighestExpense();
  }

  addExpense() {
    const newExpense = this.expenseForm.value;
    this.expensedataservice.addExpenseData(newExpense); 
    this.ExpenseData.unshift(newExpense); 
    this.expenseForm.reset();
    this.defaultDate();
    this.calculateTotalExpense();
    this.calculateHighestExpense();

    this.recentExpenses.unshift(newExpense); 
    if (this.recentExpenses.length > 4) {
      this.recentExpenses.pop(); 
    }
  }

  calculateTotalExpense() {
    this.totalExpense = this.calculationService.calculateTotalExpense(); 
  }

  calculateHighestExpense() {
    this.highestExpense = this.calculationService.calculateHighestExpense(); 
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getCategoryImage(category: string): string | undefined {
    const categoryImages: { [key: string]: string } = {
      grocery: '../../assets/Income/grocery_1261052.png',
      shopping: '../../assets/Income/shopping-cart_3737372.png',
      rent: '../../assets/Income/dollar_3225621.png',
      bills: '../../assets/Income/wallet_584067.png',
      installment: '../../assets/Categories/pngwing.com (1).png',
      health: '../../assets/Income/heartbeat_898655.png',
      education: '../../assets/Income/mortarboard_114806.png',
      investment: '../../assets/Income/wallet_584067.png',
      personal: '../../assets/Income/hair-gel_2752616.png',
      other: '../../assets/Income/salary_1589110.png',
    };
    return categoryImages[category] || undefined;
  }
}
