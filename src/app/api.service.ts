import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }
  findHash(str: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, 10);
  }
  insertNewUser(userfullname: string, useremail: string, password: string) {
    return this.http.post("http://localhost:3000/insert", { "userFullName": userfullname, "userEmailId": useremail, "userPassword": this.findHash(password) })
    //return this.http.post("http://localhost:3000/insert",{"userFullName":userfullname,"userEmailId":useremail,"userPassword":this.findHash(password)})
  }
  checkUserNameAvailable(userEmail: String) {
    return this.http.post("http://localhost:3000/checkAvailability", { "userEmailId": userEmail });
    // return this.http.post("http://localhost:3000/checkAvailability",{"userEmailId":userEmail}) ;  
  }
  authenticateUser(userEmail: string, password: string) {
    return this.http.post("http://localhost:3000/authenticate", { "userEmailId": userEmail, "password": this.findHash(password) });
  }
  checkCategoryAvailable(category: String) {
    //return this.http.post("https://exambackend.herokuapp.com/insert",{"user":user})     
    return this.http.post("http://localhost:3000/checkAvailabilityCategory", { "category": category });
  }
  checkExpenceCategoryAvailable(category: String) {
    //return this.http.post("https://exambackend.herokuapp.com/insert",{"user":user})     
    return this.http.post("http://localhost:3000/checkAvailabilityExpenceCategory", { "category": category });
  }
  insertNewCategory(titlecategory: string, category: string, whose: string) {

    return this.http.post("http://localhost:3000/insertNewCategory", { "titlecategory": titlecategory, "category": category, whose });
  }
  insertNewExpenceCategory(category: string) {
    return this.http.post("http://localhost:3000/insertNewExpenceCategory", { "category": category });
  }
  getCategories() {
    return this.http.get("http://localhost:3000/getCategories");
  }
  getExpenceCategories() {
    return this.http.get("http://localhost:3000/getExpenceCategories");
  }
  updateIncomes(email: string, incomes: any) {
    return this.http.post("http://localhost:3000/updateIncomes", { "email": email, "incomes": incomes });
  }
  updateExpences(email: string, expences: any) {
    return this.http.post("http://localhost:3000/updateExpences", { "email": email, "expences": expences });
  }
  getAllIncomeAndExpences(email: string) {
    return this.http.post("http://localhost:3000/getIncomesExpence", { "email": email });
  }
  //  tokemcall(){  
  //    return  this.http.get("http://localhost:8080/unrestrictedCall");window.alert("Contact Added Successfully..");
  //   // this.headers.set("Access-Control-Allow-Origin", "*");
  //   // this.headers.append("Accept","application/vnd.hmrc.1.0+json");  
  //   // return this.http.get("https://test-api.service.hmrc.gov.uk/hello/world",{headers: this.headers});
  //  }
  hmrcCall() {
    return this.http.get("http://localhost:3000/userCall");
  }
  checkHmrcDataUploaded(email: string, year: string, quarter: string) {
    return this.http.post("http://localhost:3000/checkHmrcUploaded", { "userEmailId": email, "year": year, "quarter": quarter });
  }
  hmrcDataUploaded(email: string, year: string, quarter: string) {
    return this.http.post("http://localhost:3000/hmrcUploaded", { "userEmailId": email, "year": year, "quarter": quarter });
  }
  getIncomeID(email: string) {
    return this.http.post("http://localhost:3000/getIncomeID", { "email": email });
  }
  getExpenceID(email: string) {
    return this.http.post("http://localhost:3000/getExpenceID", { "email": email });
  }
  modifyIncomes(email: string, originalincomes: any[], modifiedincomes: any[]) {
    return this.http.post("http://localhost:3000/modifyIncomes", { "email": email, "originalincomes": originalincomes, "modifiedincomes": modifiedincomes });
  }
  modifyExpences(email: string, originalexpences: any[], modifiedexpences: any[]) {
    return this.http.post("http://localhost:3000/modifyExpences", { "email": email, "originalexpences": originalexpences, "modifiedexpences": modifiedexpences });
  }
  addCustomerDetils(name: string, email: string, contactno: string, address: string, whose: string) {
    //titlecategory:string,category:string,whose:string

    let call1 = this.http.post("http://localhost:3000/insertNewCategory", { "titlecategory": "Customer", "category": name, whose });
    let call2 = this.http.post("http://localhost:3000/addCustomerDetils", { "name": name, "email": email, "contactno": contactno, "address": address, whose });
    return forkJoin([call1, call2]);

  }
  addSupplierDetils(name: string, email: string, contactno: string, address: string, whose: string) {
    let call1 = this.http.post("http://localhost:3000/insertNewCategory", { "titlecategory": "Supplier", "category": name, whose });
    let call2 = this.http.post("http://localhost:3000/addSupplierDetils", { "name": name, "email": email, "contactno": contactno, "address": address, whose });
    return forkJoin([call1, call2]);
  }
  addCustomerInvoice(date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string, whose: string, customerid: string, customername: string) {

    return this.http.post("http://localhost:3000/addCustomerInvoice", { "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails, whose, "customerid": customerid, "customername": customername });
  }
  insertNewBank(bank: string, code: string, whose: string) {
    return this.http.post("http://localhost:3000/insertNewBank", { bank, code, whose });
  }
  addSupplierInvoice(date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string, whose: string, customerid: string, customername: string) {
    return this.http.post("http://localhost:3000/addSupplierInvoice", { "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails, whose, "customerid": customerid, "customername": customername });
  }
  addCustomerInvoiceDraft(date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string, whose: string, customerid: string, customername: string) {
    return this.http.post("http://localhost:3000/addCustomerInvoiceDraft", { "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails, whose, "customerid": customerid, "customername": customername });
  }
  addSupplierInvoiceDraft(date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string, whose: string, customerid: string, customername: string) {
    return this.http.post("http://localhost:3000/addSupplierInvoiceDraft", { "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails, whose, "customerid": customerid, "customername": customername });
  }
  createNextCustomerInvoiceNumber(whose: string) {
    return this.http.post("http://localhost:3000/createNextCustomerInvoiceNumber", { whose });
  }
  getAllCustomers(whose: string) {
    return this.http.post("http://localhost:3000/getAllCustomers", { whose });
  }
  getAllSuppliers(whose: string) {
    return this.http.post("http://localhost:3000/getAllSuppliers", { whose });
  }
  getAllCustomerInvoioce(whose: string) {
    return this.http.post("http://localhost:3000/getAllCustomerInvoioce", { whose });
  }
  getAllCustomerInvoioceUnallocated(whose: string) {
    return this.http.post("http://localhost:3000/getAllCustomerInvoioceUnallocated", { whose });
  }
  getAllSupplierNegativeInvoioceUnallocated(whose: string) {
    return this.http.post("http://localhost:3000/getAllSupplierNegativeInvoioceUnallocated", { whose });
  }
  getAllSupplierInvoioceUnallocated(whose: string) {
    return this.http.post("http://localhost:3000/getAllSupplierInvoioceUnallocated", { whose });
  }
  getAllCustomerNegativeInvoioceUnallocated(whose: string) {
    return this.http.post("http://localhost:3000/getAllCustomerNegativeInvoioceUnallocated", { whose });
  }
  getAllSupplierInvoioce(whose: string) {
    return this.http.post("http://localhost:3000/getAllSupplierInvoioce", { whose });
  }
  getAllCustomerDraftInvoioce(whose: string) {
    return this.http.post("http://localhost:3000/getAllCustomerDraftInvoioce", { whose });
  }

  getAllSupplierDraftInvoioce(whose: string) {
    return this.http.post("http://localhost:3000/getAllSupplierDraftInvoioce", { whose });
  }

  getCustomerNameFromId(id: string) {
    return this.http.post("http://localhost:3000/getCustomerNameFromId", { "id": id });
  }

  getSupplierNameFromId(id: string) {
    return this.http.post("http://localhost:3000/getSupplierNameFromId", { "id": id });
  }
  getCustomerInvoioceFromId(id: string) {
    return this.http.post("http://localhost:3000/getCustomerInvoioceFromId", { "id": id });
  }
  getSupplierInvoioceFromId(id: string) {
    return this.http.post("http://localhost:3000/getSupplierInvoioceFromId", { "id": id });
  }
  getDraftCustomerInvoioceFromId(id: string) {
    return this.http.post("http://localhost:3000/getDraftCustomerInvoioceFromId", { "id": id });
  }
  getDraftSupplierInvoioceFromId(id: string) {
    return this.http.post("http://localhost:3000/getDraftSupplierInvoioceFromId", { "id": id });
  }
  updteCustomerInvoice(id: string, date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string) {
    return this.http.post("http://localhost:3000/updteCustomerInvoice", { "id": id, "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails });
  }
  updteSupplierInvoice(id: string, date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string) {
    return this.http.post("http://localhost:3000/updteSupplierInvoice", { "id": id, "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails });
  }
  updteCustomerInvoiceDraft(id: string, date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string) {
    return this.http.post("http://localhost:3000/updteCustomerInvoiceDraft", { "id": id, "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails });
  }
  updteSupplierInvoiceDraft(id: string, date: string, duedate: string, invoiceid: string, reference: string, products: any[], totalamount: number, additionaldetails: string) {
    return this.http.post("http://localhost:3000/updteSupplierInvoiceDraft", { "id": id, "date": date, "duedate": duedate, "invoiceid": invoiceid, "reference": reference, "products": products, "totalamount": totalamount, "additionaldetails": additionaldetails });
  }
  deleteCustomerInvoice(id: string) {
    return this.http.post("http://localhost:3000/deleteCustomerInvoice", { "id": id });
  }
  deleteSupplierInvoice(id: string) {
    return this.http.post("http://localhost:3000/deleteSupplierInvoice", { "id": id });
  }
  deleteCustomerInvoiceFromDraft(id: string) {
    return this.http.post("http://localhost:3000/deleteCustomerInvoiceFromDraft", { "id": id });
  }
  deleteSupplierInvoiceFromDraft(id: string) {
    return this.http.post("http://localhost:3000/deleteSupplierInvoiceFromDraft", { "id": id });
  }
  aprovedraftinvoice(id: string) {
    return this.http.post("http://localhost:3000/aprovedraftinvoice", { "id": id });
  }
  aprovedraftinvoiceSupplier(id: string) {
    return this.http.post("http://localhost:3000/aprovedraftinvoiceSupplier", { "id": id });
  }
  getCustomerDetails(id: string) {
    return this.http.post("http://localhost:3000/getCustomerDetails", { "id": id });
  }
  getSupplierDetails(id: string) {
    return this.http.post("http://localhost:3000/getSupplierDetails", { "id": id });
  }
  getAllInvoioceOfACustomer(whose: string, customerid: string) {
    return this.http.post("http://localhost:3000/getAllInvoioceOfACustomer", { whose, "customerid": customerid });
  }
  getAllInvoioceOfASupplier(whose: string, customerid: string) {
    return this.http.post("http://localhost:3000/getAllInvoioceOfASupplier", { whose, "customerid": customerid });
  }
  getAllInvoioceOfACustomerDraft(whose: string, customerid: string) {
    return this.http.post("http://localhost:3000/getAllInvoioceOfACustomerDraft", { whose, "customerid": customerid });
  }
  getAllInvoioceOfASupplierDraft(whose: string, customerid: string) {
    return this.http.post("http://localhost:3000/getAllInvoioceOfASupplierDraft", { whose, "customerid": customerid });
  }
  updateCustomer(id: string, userFullName: string, userEmailId: string, userContactNo: string, userAddress: string) {
    return this.http.post("http://localhost:3000/updateCustomer", { "id": id, "userFullName": userFullName, "userEmailId": userEmailId, "userContactNo": userContactNo, "userAddress": userAddress });
  }
  updateSupplier(id: string, userFullName: string, userEmailId: string, userContactNo: string, userAddress: string) {
    return this.http.post("http://localhost:3000/updateSupplier", { "id": id, "userFullName": userFullName, "userEmailId": userEmailId, "userContactNo": userContactNo, "userAddress": userAddress });
  }
  deleteCustomer(id: string) {
    return this.http.post("http://localhost:3000/deleteCustomer", { "id": id });
  }
  deleteSupplier(id: string) {
    return this.http.post("http://localhost:3000/deleteSupplier", { "id": id });
  }
  allocateToCustomerInvoice(whose: string, id: string, date: string, totalamount: number, allocatedAmount: number) {
    return this.http.post("http://localhost:3000/allocateToCustomerInvoice", { whose, id, date, totalamount, allocatedAmount });
  }
  allocateToSupplierInvoice(whose: string, id: string, date: string, totalamount: number, allocatedAmount: number) {
    return this.http.post("http://localhost:3000/allocateToSupplierInvoice", { whose, "id": id, "date": date, "totalamount": totalamount, "allocatedAmount": allocatedAmount });
  }
  createNextCashAccountNumber(whose: string) {
    return this.http.post("http://localhost:3000/createNextCashAccountNumber", { whose });
  }
  addCashAccount(whose: string, payment: any) {
    return this.http.post("http://localhost:3000/addCashAccount", { whose, "payment": payment });
  }

  addCashAccountFromAdjusted(whose: string, adjustedamount: any, date: string, cashaccountid: string) {
    return this.http.post("http://localhost:3000/addCashAccountFromAdjusted", { whose, "adjustedamount": adjustedamount, "date": date, "cashaccountid": cashaccountid });
  }

  getAllCashAccounts(email: string) {
    return this.http.post("http://localhost:3000/getAllCashAccounts", { "email": email });
  }
  getAllCashAccountsCustomer(username: string, email: string) {
    return this.http.post("http://localhost:3000/getAllCashAccountsCustomer", { "username": username, "email": email });
  }
  addbankstatement(date: string, amount: number, description: string, whose: string, bankObj?: any) {
    return this.http.post("http://localhost:3000/addbankstatement", { date, amount, description, whose, ...bankObj });
  }
  getAllBankStatements(email: string) {
    return this.http.post("http://localhost:3000/getAllBankStatements", { "email": email });
  }
  createNextJournalNumber(whose: string) {
    return this.http.post("http://localhost:3000/createNextJournalNumber", { whose });
  }
  addNewJournal(whose: string, narration: string, date: string, jno: string, tax: string, journalentries: any) {
    return this.http.post("http://localhost:3000/addNewJournal", { whose, "narration": narration, "date": date, "jno": jno, "tax": tax, "journalentries": journalentries });
  }
  getAllJournals(whose: string) {
    return this.http.post("http://localhost:3000/getAllJournals", { whose });
  }
  getJournalFromID(id: string) {
    return this.http.post("http://localhost:3000/getJournalFromID", { "id": id });
  }
  deleteJournal(id: string) {
    return this.http.post("http://localhost:3000/deleteJournal", { "id": id });
  }
  updateCashAccount(id: string, newcategory: string) {
    return this.http.post("http://localhost:3000/updateCashAccount", { "id": id, "newcategory": newcategory });
  }
}
