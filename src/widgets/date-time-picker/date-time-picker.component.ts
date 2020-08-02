import { Component, OnInit, Input, Output, EventEmitter, Provider, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

// We need forward-ref to implement ngModel and ControlValueAccessor functionality
// tslint:disable:no-forward-ref
// tslint:disable:no-use-before-declare

/**
 * Provider Expression that allows tmo-date-time-picker to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const DATETIMEPICKER_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true
};

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [DATETIMEPICKER_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class DateTimePickerComponent implements OnInit {

    /**
     * inputs the maximum data that is allowed to be selected
     */
    @Input() public set maxDate(date: Date) {
        if (date) {
            this.maxAllowedDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }
    /**
     * stores the date-time-picker id
     */
    @Input() public dateTimePickerId: string;
    /**
     * Boolean falg to disable date time picker
     */
    @Input() public disabled: boolean;
    /**
     * emit data
     */
    @Output() public readonly dateTime: EventEmitter<string>;
    /**
     * Holds the maximum allowed date
     */
    public maxAllowedDate: NgbDate;
    /**
     * icon for time picker
     */
    public showTimePickerToggle = false;
    /**
     * stores selected date
     */
    public date: string;
    /**
     * Stores the current date selected in ngbDateStruct format
     */
    public dateValue: NgbDate;
    constructor() {
        this.dateTime = new EventEmitter<string>();
    }

    /**
     * Initializes the component
     */
    public ngOnInit(): void { }

    /**
     * get selected date
     * @param $dateEvent
     */
    public handleDateChange(dateEvent: NgbDate) {
        let day = dateEvent.day || '';
        day = day < 10 && day > 0 ? '0' + day.toString() : day.toString();
        let mon = dateEvent.month || '';
        mon = mon < 10 && mon > 0 ? '0' + mon.toString() : mon.toString();
        let year = dateEvent.year || '';
        year = year.toString().substr(2, 2);
        if ((day && mon && year) === '') {
            this.date = '';
        } else {
            this.date = mon + '/' + day + '/' + year;
        }
        this.emitSelectedDateTime();
    }

    /**
     * Emit Selected date and time when both are selected
     */
    public emitSelectedDateTime(): void {
        if (this.date) {
            this.dateTime.emit(this.date);
            this.onChangeCallback(this.date);
        }
    }

    /**
     * trackby function to enhance ngFor performance
     */
    public trackByFn(index: number, option: string): string {
        return option;
    }
    /**
     * ngModel accessor to get the value of property [based on input type]
     * @docs-private
     */
    get value(): string {
        return this.date;
    }

    /**
     * ngModel accessor to set the value
     * @param value - {} value: could be number or string
     * @docs - private
     */
    set value(value: string) {
        this.writeValue(value);
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     * @returns void
     */
    public writeValue(value: string): void {
        if (value !== this.date) {
            this.extractDateTimeValues(value);
            this.onChangeCallback(value);
        }
    }

    /**
     * Method to extract and set date and time based on the value being set
     * @param value Holds the value being set by ngmodel
     * @returns void
     */
    public extractDateTimeValues(value: string): void {
        if (value) {
            const res = value.split(' ');
            if (res.length === 3) {
                this.date = res[0];
                const date = this.date.split('/');
                this.dateValue = new NgbDate(+date[2], +date[1], +date[0]);
            }
        } else {
            this.date = '';
        }
    }

    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Function to be called on change.
     */
    public registerOnChange(fn: (_: boolean) => {}): void {
        this.onChangeCallback = fn;
    }

    /**
     * Method to mark date time picker as touched
     */
    public markAsTouched(): void {
        this.onTouchedCallback(true);
    }

    /**
     * Registers a callback to be triggered when the value has touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Function to be called on change.
     */
    public registerOnTouched(fn: () => {}): void {
        this.onTouchedCallback = fn;
    }

    /**
     * Called when the input value is changed. Needed to properly implement ControlValueAccessor.
     * @docs-private
     * @returns void
     */
    public onChangeCallback(_: {}): void { }

    /**
     * Called when the input is blurred. Needed to properly implement ControlValueAccessor.
     * @docs-private
     */
    private onTouchedCallback(_: {}): void { }
}
