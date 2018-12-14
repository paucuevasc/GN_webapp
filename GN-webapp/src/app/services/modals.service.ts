import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private modals: any[] = [];

  // Add modal to active modals array
  add(modal: any) {
    this.modals.push(modal);
  }

  // Remove modal from active modals array
  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  // Open modal specified by id
  open(id: string) {
    let modal: any = this.modals.filter(x => x.id === id) [0];
    modal.open();
  }

  // Close modal specified by id
  close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id) [0];
    modal.close();
  }
  constructor() { }
}
