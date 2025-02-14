import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-book',
  imports: [CommonModule,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  newBook = {
    title : '',
    description :''
  };
  successMessage = '';
  items:any[] = [];
  editMode = false;
  editBookId :string | null = null;
  filteredItems:any[]=[];
  filterText:string = '';

  constructor(private firebaseService:FirebaseService){}
  addBook(){
    if (this.newBook.title.trim() && this.newBook.description.trim()) {
      this.firebaseService.createBook(this.newBook).then(
        ()=>this.successMessage = 'Book Added Successfully..');
        this.clearForm();
    }
  }

  //reset input-fields
  clearForm(){
    this.newBook =  {
    title : '',
    description :''
  };
  setTimeout(()=>(this.successMessage = ''),3000);
  }

  //Fetch Books Data
  ngOnInit() {
    this.firebaseService.getBooks(); 
    this.firebaseService.getItemObservable().subscribe((data) => {
      console.log("Fetched Books:", data); 
      this.items = data;
      this.applyFilter();
    });
  }
  

  //Delete Books
  deleteBook(id:string){
    this.firebaseService.deleteBook(id).then(()=>{
      console.log("Books deleted Successfully..")
    }).catch(error=>{
      console.error("Error deletig Books..",error);
    })
  }

  //edit data 
  selectBookFOrEdit(book:any){
    this.newBook = {title : book.title, description : book.description};
    this.editBookId = book.id;
    this.editMode = true;
  }

  updateBook(){
    if(this.editBookId){
      this.firebaseService.updateBook(this.editBookId,this.newBook).then(()=>{
        console.log("Book updated successfully..");
        this.clearForm();
        window.location.reload();
      }).catch(error=>{
        console.error("Error Updating book : ",error);
      });
    }
  }
  //Funtion to filter data
  applyFilter(){
    this.filteredItems = this.items.filter(book=>
      book.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
      book.description.toLowerCase().includes(this.filterText.toLowerCase()) 

    );
  }
}
