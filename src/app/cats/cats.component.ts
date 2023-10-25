import { Component } from '@angular/core';
import { CatService } from './services/cat.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent {
  
    catImages$: Observable<any>;
    catBreeds$: Observable<any>;

    catsForm: FormGroup;

    public limite : number = 10; //limite por default
    public breed : string = 'bengl'; //raza por default

    constructor(private fb: FormBuilder, private catService: CatService, private spinner: NgxSpinnerService) {
      this.spinner.show();
      this.catBreeds$ = this.catService.getBreeds();
      this.catsForm = this.fb.group({
        limite: ['10', Validators.required],
        breed: ['Desconocido', Validators.required],
      });
  
      this.catImages$ = this.catService.getCatImages(this.catsForm.value.limite, this.catsForm.value.breed); // Llamada inicial al servicio
  
      // Suscribirse a los cambios en el formulario para llamar al servicio cuando cambian los valores
      this.catsForm.valueChanges.subscribe((formValues) => {
        const limite = formValues.limite;
        const breed = formValues.breed;
  
        // Llamar al servicio con los nuevos valores
        this.catImages$ = this.catService.getCatImages(limite, breed);
      });
    }

    public get limiteControl() {
      return this.catsForm.get('limite');
    }
  
    public get breedControl() {
      return this.catsForm.get('breed');
    }
}
