import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  input,
  OnInit,
  Output,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonList,
  IonItem,
  IonDatetime,
  IonModal,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { TaskGroup } from 'src/app/interfaces/ITaskFormData';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  imports: [
    IonLabel,
    DatePipe,
    IonModal,
    IonDatetime,
    IonItem,
    IonList,
    ReactiveFormsModule,

    IonButton,
  ],
})
export class ProjectFormComponent implements OnInit {
  // ===== TEMPLATE REFERENCES =====
  @ViewChild('startDateModal') startDateModal!: IonModal;
  @ViewChild('endDateModal') endDateModal!: IonModal;
  @ViewChild('taskGroupModal') taskGroupModal!: IonModal;

  // ===== INPUTS/OUTPUTS =====
  initialValue = input<any | null>(null); // For editing
  submitLabel = input<string>('Save');
  submitted = output<any>();

  // ===== FORM =====
  form: FormGroup;

  // ===== MODAL STATES (only for UI) =====
  isStartDatePickerOpen = false;
  isEndDatePickerOpen = false;
  isTaskGroupPickerOpen = false;

  // ===== DATA =====
  taskGroups: TaskGroup[] = [
    { id: 1, name: 'Development', description: 'Software development tasks' },
    { id: 2, name: 'Design', description: 'UI/UX design tasks' },
    { id: 3, name: 'Marketing', description: 'Marketing and promotion tasks' },
    { id: 4, name: 'Support', description: 'Customer support tasks' },
    { id: 5, name: 'Administration', description: 'Administrative tasks' },
  ];

  // ===== CONSTRUCTOR =====
  constructor(private fb: FormBuilder) {
    // Create the form with ALL fields
    this.form = this.fb.group({
      taskGroup: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: ['todo', Validators.required],
    });
  }

  // ===== LIFECYCLE =====
  ngOnInit() {
    // Load initial data if provided (for editing)
    const initialData = this.initialValue();
    if (initialData) {
      this.loadInitialData(initialData);
    }
  }

  ngAfterViewInit() {
    this.setupDateTimeEventListeners();
  }

  // ===== LOAD DATA FOR EDITING =====
  private loadInitialData(data: any): void {
    // Patch all values into the form
    this.form.patchValue({
      taskGroup: data.taskGroup || null,
      name: data.name || '',
      description: data.description || '',
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      status: data.status || 'todo',
    });
  }

  // ===== FORM SUBMISSION =====
  onSubmit(): void {
    // Mark all fields as touched to show errors
    this.markFormAsTouched();

    // Check if form is valid
    if (this.form.invalid) {
      console.log('Form is invalid', this.form.errors);
      return;
    }

    // Check date validation
    if (!this.isDateRangeValid()) {
      alert('End date must be after start date');
      return;
    }

    // Get the form value
    const formData = this.form.getRawValue();

    // Emit the data to parent component
    this.submitted.emit(formData);
  }

  // ===== TASK GROUP METHODS =====
  async openTaskGroupPicker(event: MouseEvent): Promise<void> {
    event.stopPropagation();
    this.isTaskGroupPickerOpen = true;
    await this.taskGroupModal.present();
  }

  selectTaskGroup(group: TaskGroup): void {
    // Update the FORM
    this.form.patchValue({
      taskGroup: group,
    });
    this.closeTaskGroupModal();
  }

  clearTaskGroup(): void {
    // Update the FORM
    this.form.patchValue({
      taskGroup: null,
    });
    this.closeTaskGroupModal();
  }

  closeTaskGroupModal(): void {
    this.isTaskGroupPickerOpen = false;
    this.taskGroupModal.dismiss();
  }

  // ===== DATE METHODS =====
  async openStartDatePicker(event: MouseEvent): Promise<void> {
    event.stopPropagation();
    this.isStartDatePickerOpen = true;
    await this.startDateModal.present();
  }

  async openEndDatePicker(event: MouseEvent): Promise<void> {
    event.stopPropagation();
    this.isEndDatePickerOpen = true;
    await this.endDateModal.present();
  }

  onStartDateSelected(event: any): void {
    const selectedDate = new Date(event.detail.value);

    // Update the FORM
    this.form.patchValue({
      startDate: selectedDate,
    });

    // Validate date range
    this.validateDateRange();
  }

  onEndDateSelected(event: any): void {
    const selectedDate = new Date(event.detail.value);

    // Update the FORM
    this.form.patchValue({
      endDate: selectedDate,
    });

    // Validate date range
    this.validateDateRange();
  }

  clearStartDate(): void {
    // Update the FORM
    this.form.patchValue({
      startDate: null,
    });
    this.closeStartDateModal();
  }

  clearEndDate(): void {
    // Update the FORM
    this.form.patchValue({
      endDate: null,
    });
    this.closeEndDateModal();
  }

  closeStartDateModal(): void {
    this.isStartDatePickerOpen = false;
    this.startDateModal.dismiss();
  }

  closeEndDateModal(): void {
    this.isEndDatePickerOpen = false;
    this.endDateModal.dismiss();
  }

  // ===== STATUS METHODS =====
  updateStatus(newStatus: 'todo' | 'inprogress' | 'done'): void {
    // Update the FORM
    this.form.patchValue({
      status: newStatus,
    });
  }

  // Helper to get status class for UI
  getStatusClass(statusType: 'todo' | 'inprogress' | 'done'): string {
    const currentStatus = this.form.get('status')?.value;
    const isSelected = currentStatus === statusType;

    const baseClass = 'status-button ';
    const typeClasses = {
      todo: isSelected ? 'status-todo-selected' : 'status-todo',
      inprogress: isSelected
        ? 'status-inprogress-selected'
        : 'status-inprogress',
      done: isSelected ? 'status-done-selected' : 'status-done',
    };

    return (
      baseClass +
      (isSelected ? 'status-selected ' : '') +
      typeClasses[statusType]
    );
  }

  // ===== VALIDATION HELPERS =====
  private validateDateRange(): void {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      // If start date is after end date, clear end date
      this.form.patchValue({
        endDate: null,
      });
    }
  }

  private isDateRangeValid(): boolean {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (!startDate || !endDate) return true;
    return startDate <= endDate;
  }

  private markFormAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // ===== HELPER GETTERS FOR TEMPLATE =====
  get selectedTaskGroup(): TaskGroup | null {
    return this.form.get('taskGroup')?.value;
  }

  get startDate(): Date | null {
    return this.form.get('startDate')?.value;
  }

  get endDate(): Date | null {
    return this.form.get('endDate')?.value;
  }

  // ===== MODAL EVENT HANDLERS =====
  onStartDateModalPresent(): void {
    this.isStartDatePickerOpen = true;
  }

  onStartDateModalDismiss(): void {
    this.isStartDatePickerOpen = false;
  }

  onEndDateModalPresent(): void {
    this.isEndDatePickerOpen = true;
  }

  onEndDateModalDismiss(): void {
    this.isEndDatePickerOpen = false;
  }

  onTaskGroupModalPresent(): void {
    this.isTaskGroupPickerOpen = true;
  }

  onTaskGroupModalDismiss(): void {
    this.isTaskGroupPickerOpen = false;
  }

  // ===== EVENT LISTENERS =====
  private setupDateTimeEventListeners(): void {
    setTimeout(() => {
      const startDatetime = document.getElementById('startDatePicker');
      const endDatetime = document.getElementById('endDatePicker');

      if (startDatetime) {
        startDatetime.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }

      if (endDatetime) {
        endDatetime.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }
    }, 500);
  }

  // ===== ARROW CLICK HANDLER =====
  onArrowClick(event: MouseEvent, type: 'start' | 'end'): void {
    event.stopPropagation();
    if (type === 'start') {
      this.openStartDatePicker(event);
    } else {
      this.openEndDatePicker(event);
    }
  }
}
