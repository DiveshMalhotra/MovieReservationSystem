import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { MovieTheatreTimings } from '../movie.interface';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SelectedSeatsComponent } from '../selected-seats/selected-seats.component';

@Component({
    selector: 'app-selected-movie',
    templateUrl: './selected-movie.component.html',
    styles: []
})
export class SelectedMovieComponent implements OnInit {

    @Input() public selectedMovie: string;

    public showTimings: MovieTheatreTimings[];

    @Output() readonly totalAmount: EventEmitter<number>;

    constructor(private modalService: NgbModal) {
        this.totalAmount = new EventEmitter<number>();
    }

    public ngOnInit() {
        this.showTimings = [
            {
                theatre: 'PVR DLF',
                location: 'Delhi NCR',
                timings: ['10:00AM', '01:00PM', '04:00PM', '07:00PM', '10:00PM']
            },
            {
                theatre: 'PVR Select City Mall',
                location: 'Delhi NCR',
                timings: ['10:00AM', '01:00PM', '04:00PM', '07:00PM', '10:00PM']
            },
            {
                theatre: 'Cinepolis FunCity',
                location: 'Delhi NCR',
                timings: ['10:00AM', '01:00PM', '04:00PM', '07:00PM', '10:00PM']
            },
            {
                theatre: 'PVR Elante',
                location: 'Chandigarh',
                timings: ['10:00AM', '01:00PM', '04:00PM', '07:00PM', '10:00PM']
            }
        ];
    }

    public selectedTiming(showTiming: string) {
        const modalConfig: NgbModalOptions = {
            backdrop: 'static',
            windowClass: 'show-timing-modal',
            keyboard: false,
            centered: true,
            size: 'lg'
        };
        const modalRef = this.modalService.open(SelectedSeatsComponent, modalConfig);
        modalRef.componentInstance.showTiming = showTiming;
        modalRef.componentInstance.totalBookingAmount.subscribe((amount: number) => {
            this.totalAmount.emit(amount);
        });
    }
}
