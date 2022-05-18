import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  comp1Val: string;
  idforcustomeredit :string;
  customerinvoicestatus:string;
  selectedcustomer :string;
  customerOrSupplier:string;
  selectedjournal:string;

  _comp1ValueBS = new BehaviorSubject<string>('');
  constructor() { 
    this.comp1Val;
    this._comp1ValueBS.next(this.comp1Val);
  }
  updateComp1Val(val: string) {
    this.comp1Val = val;
    this._comp1ValueBS.next(this.comp1Val);
  }
  setidforcustomeredit(id:string,status:string){
    this.idforcustomeredit=id;  
    this.customerinvoicestatus=status; 
  }
  getidforcustomeredit(){
    return this.idforcustomeredit;
  }
  getcustomerinvoicestatus(){
    return this.customerinvoicestatus;
  }
  setSelectedCustomerID(id:string){
    this.selectedcustomer=id;
  }
  getSelectedCustomer(){
    return this.selectedcustomer;
  }
  setCustomerOrSupplier(user:string){
    this.customerOrSupplier=user;
  }
  getCustomerOrSupplier(){
    return this.customerOrSupplier;
  }
  setJournalSelected(id:string){
    this.selectedjournal=id;
  }

}
