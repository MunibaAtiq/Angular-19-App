import { Injectable } from '@angular/core';
import { Database, onValue, push, ref, set,update } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbPath = 'Books';
  private booksSubject = new BehaviorSubject<any[]>([]); // Observable Data for fetching

  constructor(private db: Database) {}

  // Insert data
  createBook(item: any) {
    const bookRef = ref(this.db, this.dbPath);
    const newBookRef = push(bookRef);
    return set(newBookRef, item);
  }

  // Fetch data
  getBooks() {
    const bookRef = ref(this.db, this.dbPath);
    onValue(bookRef, (snapshot) => {
      const data = snapshot.val();
  
      if (data && typeof data === 'object') {
        this.booksSubject.next(
          Object.entries(data).map(([id, value]) =>
            typeof value === 'object' ? { id, ...value } : { id, value }
          )
        );
      } else {
        this.booksSubject.next([]);
      }
    });
  }
  
  getItemObservable(): Observable<any[]> {
    return this.booksSubject.asObservable();
  }

  //delete data
  deleteBook(id:string){
    const bookRef = ref(this.db, `${this.dbPath}/${id}`);
    return set(bookRef,null);//Remove book from firebase
  }

  //update Books
  updateBook(id:string,updateData:any){
    const bookRef = ref(this.db, `${this.dbPath}/${id}`);
    return update(bookRef,updateData);
  }
}
