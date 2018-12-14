import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit, OnDestroy {

  @Input() id: string;
  private element: any;

  constructor( private modalService: ModalsService, private el: ElementRef) {
    this.element = el.nativeElement;
   }

  ngOnInit(): void {
    let modal = this;

    if ( !this.id ) {
      console.error( 'modal must have an id' );
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'app-modals') {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('app-modals-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modals-open');
  }

}
