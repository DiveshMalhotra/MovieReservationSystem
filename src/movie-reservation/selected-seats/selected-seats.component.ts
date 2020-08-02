import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CornerRowSeats, Seats } from '../movie.interface';

@Component({
    selector: 'app-selected-seats',
    templateUrl: './selected-seats.component.html',
    styles: []
})
export class SelectedSeatsComponent implements OnInit {

    @Input() showTiming: string;

    public noOfCornerRowSeats: CornerRowSeats[];

    public noOfSelectedSeats: number;

    public totalAmount: number;

    public selectedDate: boolean;

    @Output() readonly totalBookingAmount: EventEmitter<number>;

    constructor(public activeModal: NgbActiveModal) {
        this.noOfCornerRowSeats = [];
        this.noOfSelectedSeats = 0;
        this.totalBookingAmount = new EventEmitter<number>();
    }

    public ngOnInit() {
        this.getTheatreSeats(1, 25);
    }

    public getTheatreSeats(initialValue: number, lastValue: number) {
        let noOfRows;
        let seatsInRow;
        let totalSeats = [];
        let status;
        let seatNumber = '';
        for (noOfRows = 'a'; noOfRows <= 'j';) {
            for (seatsInRow = initialValue; seatsInRow <= lastValue; seatsInRow++) {
                const middleArea = seatsInRow === 5 || seatsInRow === 20;
                seatNumber = noOfRows.concat(seatsInRow);
                status = seatNumber.charAt(0) === 'f' ? 'text-danger no-action' : 'text-secondary';
                if (totalSeats.length <= 24) {
                    totalSeats.push({ seatNumber: seatNumber, seatStatus: status, middleArea: middleArea });
                } else {
                    totalSeats = [];
                    totalSeats.push({ seatNumber: seatNumber, seatStatus: status, middleArea: middleArea });
                }
            }
            this.noOfCornerRowSeats.push({ row: noOfRows, seats: totalSeats });
            noOfRows = String.fromCharCode(noOfRows.charCodeAt(0) + 1);
        }
    }

    public getSeatsStatus(seatNumber: string): string {
        let seatsStatus = '';
        this.noOfCornerRowSeats.forEach((seatSelection: CornerRowSeats) => {
            seatSelection.seats.forEach((seatStatus: Seats) => {
                if (seatNumber === seatStatus.seatNumber) {
                    seatStatus.seatStatus = 'text-success';
                    seatStatus.seatSelected = true;
                }
                seatsStatus =  seatStatus.seatStatus;
            });
        });
        return seatsStatus;
    }

    public getSelectedSeats() {
        this.totalAmount = this.totalAmount || 0;
        this.noOfSelectedSeats = this.noOfSelectedSeats + 1;
        this.totalAmount = this.totalAmount + 200;
    }

    public proceedPayment() {
        this.totalBookingAmount.emit(this.totalAmount);
        this.activeModal.close();
    }

    public dateSelected(dateSelected) {
        if (dateSelected) {
            this.selectedDate =  true;
        }
    }
}
