import {
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  imports: [IonItem, IonList, ReactiveFormsModule, IonSelect, IonSelectOption],
})
export class ProjectFormComponent implements OnInit {
  // 🔹 signal inputs/outputs
  initialValue = input<any | null>(null);
  submitLabel = input<string>('Save');
  submitted = output<any>();

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
}
