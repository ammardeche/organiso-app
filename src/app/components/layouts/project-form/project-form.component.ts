import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonDatetimeButton,
  IonPopover,
  IonLabel,
} from '@ionic/angular/standalone';

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
  // access to the template
  @ViewChild('startDateModal') startDateModal!: IonModal;
  @ViewChild('endDateModal') endDateModal!: IonModal;
  @ViewChild('endDatePicker', { read: ElementRef }) endDatePicker!: ElementRef;
  @ViewChild('taskGroupModal') taskGroupModal!: IonModal;

  @ViewChild('startDatePicker', { read: ElementRef })

  // variables
  initialValue = input<any | null>(null);
  submitLabel = input<string>('Save');
  submitted = output<any>();
  isModalOpen = false;
  startDatePicker!: ElementRef;
  startDate: Date | null = null;
  endDate: Date | null = null;
  isStartDatePopoverOpen = false;
  isEndDatePopoverOpen = false;
  selectedTaskGroup: any = null;
  isTaskGroupPickerOpen = false;
  // functions
  ngAfterViewInit() {
    // Add event listeners to prevent modal close when clicking inside datetime
    this.setupDateTimeEventListeners();
  }

  private fb = new FormBuilder();

  // 🔹 reactive form
  form = this.fb.group({
    taskGroup: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    // status: ['todo' as ProjectStatus, Validators.required],
  });

  // 🔹 signal that mirrors current form value
  formValue = signal<any>({
    taskGroup: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'todo',
  });

  constructor() {
    // update signal when form changes
    this.form.valueChanges.subscribe((value) => {
      // this.formValue.set(value as ProjectFormValue);
    });

    // when parent passes initialValue() (edit page) → patch form
    effect(() => {
      const value = this.initialValue();
      if (value) {
        this.form.patchValue(value);
        this.formValue.set(value);
      }
    });
  }

  setStatus() {
    this.form.patchValue({});
  }

  onSubmit() {
    if (this.form.invalid) return;
    // this.submitted.emit(this.form.getRawValue() as ProjectFormValue);
  }
  ngOnInit() {}

  // dummy data

  taskGroups = [
    { id: 1, name: 'Development', description: 'Software development tasks' },
    { id: 2, name: 'Design', description: 'UI/UX design tasks' },
    { id: 3, name: 'Marketing', description: 'Marketing and promotion tasks' },
    { id: 4, name: 'Support', description: 'Customer support tasks' },
    { id: 5, name: 'Administration', description: 'Administrative tasks' },
  ];

  // function for the task group
  async openTaskGroupPicker(event: MouseEvent) {
    event.stopPropagation();
    this.isTaskGroupPickerOpen = true;
    await this.taskGroupModal.present();
  }

  onTaskGroupModalPresent() {
    this.isTaskGroupPickerOpen = true;
  }

  onTaskGroupModalDismiss() {
    this.isTaskGroupPickerOpen = false;
  }

  selectTaskGroup(group: any) {
    this.selectedTaskGroup = group;
    // Don't dismiss modal automatically - let user click Done
    // But you can auto-dismiss if you prefer:
    // this.closeTaskGroupModal();
  }

  clearTaskGroup() {
    this.selectedTaskGroup = null;
    this.closeTaskGroupModal();
  }

  closeTaskGroupModal() {
    this.taskGroupModal.dismiss();
  }

  // functions for the start & end date

  async openStartDatePicker(event: MouseEvent) {
    event.stopPropagation();
    this.isStartDatePopoverOpen = true;
    await this.startDateModal.present();
  }

  async openEndDatePicker(event: MouseEvent) {
    event.stopPropagation();
    this.isEndDatePopoverOpen = true;
    await this.endDateModal.present();
  }

  onStartDateModalPresent() {
    this.isStartDatePopoverOpen = true;
  }

  onStartDateModalDismiss() {
    this.isStartDatePopoverOpen = false;
  }

  onEndDateModalPresent() {
    this.isEndDatePopoverOpen = true;
  }

  onEndDateModalDismiss() {
    this.isEndDatePopoverOpen = false;
  }

  onStartDateSelected(event: any) {
    this.startDate = new Date(event.detail.value);

    // Optional: If end date is before start date, reset end date
    if (this.endDate && this.endDate < this.startDate) {
      this.endDate = null;
    }

    // Don't dismiss modal automatically - let user click Done
  }

  onEndDateSelected(event: any) {
    this.endDate = new Date(event.detail.value);

    // Optional: If start date is after end date, reset start date
    if (this.startDate && this.startDate > this.endDate) {
      this.startDate = null;
    }
  }

  clearStartDate() {
    this.startDate = null;
    this.closeStartDateModal();
  }

  clearEndDate() {
    this.endDate = null;
    this.closeEndDateModal();
  }

  closeStartDateModal() {
    this.startDateModal.dismiss();
  }

  closeEndDateModal() {
    this.endDateModal.dismiss();
  }

  // Prevent event bubbling for arrow clicks
  onArrowClick(event: MouseEvent, type: 'start' | 'end') {
    event.stopPropagation();
    if (type === 'start') {
      this.openStartDatePicker(event);
    } else {
      this.openEndDatePicker(event);
    }
  }

  setupDateTimeEventListeners() {
    // Prevent modal close when interacting with datetime component
    setTimeout(() => {
      const startDatetime = document.getElementById('startDatePicker');
      const endDatetime = document.getElementById('endDatePicker');

      if (startDatetime) {
        startDatetime.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        // Prevent month/year picker from closing modal
        const monthButtons = startDatetime.querySelectorAll(
          '.datetime-year, .datetime-month, ion-picker-column'
        );
        monthButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.stopPropagation();
          });
        });
      }

      if (endDatetime) {
        endDatetime.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        // Prevent month/year picker from closing modal
        const monthButtons = endDatetime.querySelectorAll(
          '.datetime-year, .datetime-month, ion-picker-column'
        );
        monthButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.stopPropagation();
          });
        });
      }
    }, 500);
  }
}
