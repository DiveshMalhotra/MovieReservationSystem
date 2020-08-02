import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-payment-page',
    templateUrl: './payment-page.component.html',
    styles: []
})
export class PaymentPageComponent implements OnInit {

    @Input() public amount: number;

    constructor() {}

    public ngOnInit() {}
}
