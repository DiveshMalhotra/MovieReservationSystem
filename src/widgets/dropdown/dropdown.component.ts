import { Component, OnInit, Input, Output, EventEmitter, Provider, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

// We need forward-ref to implement ngModel and ControlValueAccessor functionality
// tslint:disable:no-forward-ref
// tslint:disable:no-use-before-declare
/**
 * Provider Expression that allows tmo-dropdown to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
    /**
     * stores placeholder value
     */
    @Input() public placeholder: string;
    /**
     * stores dropdown items
     */
    @Input() public items: any[];
    /**
     * default selected value
     */
    @Input() set defaultValue(value: string) {
        this.currentValue = value;
    }
    /**
     * stores dropdown id
     */
    @Input() public dropdownId: string;
    /**
     * Boolean flag to disable dropdown
     */
    @Input() public disabled: boolean;
    /**
     * emitter to emit selected item
     */
    @Output() readonly selectedItem: EventEmitter<any>;
    /**
     * stores current selected value
     */
    public currentValue: string;
    /**
     * boolean value of drop down is open
     */
    public isOpen: boolean;
    constructor() {
        this.selectedItem = new EventEmitter<any>();
    }

    /**
     * Initializes the component
     */
    public ngOnInit(): void {}

    /**
     * selects the dropdown value
     */
    public select(selectedItem: any, index?: number): void {
        this.currentValue = selectedItem.toString();
        this.selectedItem.emit(selectedItem);
        this.onChangeCallback(selectedItem);
    }

    /**
     * trackby function to enhance ngFor performance
     * @param index
     * @param item
     */
    public trackByFn(index: number, item?: string): number {
        return index;
    }

    /**
     * Event handler for key selection
     * @param selectedItem : string
     * @param ngbDropDown : dropdown
     */
    public selectKeyHandler(selectedItem: string, index: number, ngbDropDown: NgbDropdown): void {
        this.select(selectedItem, index);
        ngbDropDown.close();
    }

    /**
     * to handle toggling of carat on the basis of if the srop down is open or not
     * @param event boolean value of drop down is open
     */
    public toggled(event: boolean) {
        this.isOpen = event;
    }

    /**
     * ngModel accessor to get the value of property [based on input type]
     * @docs-private
     */
    get value(): string {
        return this.currentValue;
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
        if (value !== this.currentValue) {
            this.currentValue = value;
            this.onChangeCallback(value);
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
     * Called when the input value is changed. Needed to properly implement ControlValueAccessor.
     * @docs-private
     * @returns void
     */
    public onChangeCallback(_: {}): void {}

    public onTouchedCallback(_: {}): void {}
    /**
     * Registers a callback to be triggered when the value has touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Function to be called on change.
     */
    public registerOnTouched(fn: (_: boolean) => {}): void {
        this.onTouchedCallback = fn;
    }
}
