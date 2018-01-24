import { Component, EventEmitter, Input, OnChanges, OnInit, Output, forwardRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Subject } from 'rxjs/Subject';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `

 <div class="errors" *ngIf="formName === defaultFormName && storeService.formErrorsByForm.length > 0">
    <ul>
      <li *ngFor="let error of storeService.formErrorsByForm">
        {{ error }}
      </li>
    </ul>
</div>
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form"
        [groupName]="formName">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  config: FieldConfig[] = [];

  @Input()
  formName: string;

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  formToParent: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  defaultFormName = 'topFormNameParent';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  outputValues: object[];

  propagateChange:any = () => {};
  validateFn:any = () => {};

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }


  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.outputValues = [];
    if (!this.formName) {
      this.formName = this.defaultFormName;
    }
  }

  ngOnInit() {
    this.form = this.createGroup();
    const self = this;

    this.storeService.startTotalFormValidation();
    this.storeService.passRequestValues(this.formName);

    this.storeService.retrieveRequestValues$
      .takeUntil(this.destroy$)
      .subscribe(data => {
        self.outputValues = self.storeService.getFormValues(self.formName);
        self.formToParent.emit(self.form);
      });

    this.form.valueChanges
      .takeUntil(this.destroy$)
      .subscribe(data => {
        console.log(self.form);
        self.storeService.passFormValues(self.value, self.formName);
        self.storeService.passFormStorage(self.form, self.formName);

        self.storeService.startTotalFormValidation();
        self.storeService.passRequestValues(self.formName);
      });
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => {
      if (control.type === 'repeat') {
        const groupSub = this.fb.group({});
        groupSub.addControl(control.name, this.createControl(control));
        group.addControl(control.name, groupSub);
      } else {
        group.addControl(control.name, this.createControl(control));
      }
    });
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.submit.emit(this.form);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
