import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS  } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  providers: [MatDatepickerModule,{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true }}],
  imports: [
    CommonModule,
    MatButtonModule,MatToolbarModule,
    MatInputModule,MatTableModule,
    MatProgressSpinnerModule,MatFormFieldModule,
    MatDialogModule
  ],
  exports: [MatButtonModule,MatDatepickerModule,MatNativeDateModule,
    MatToolbarModule,MatDialogModule,
    MatSelectModule,
    
    MatInputModule,MatProgressSpinnerModule,MatDividerModule,
    MatTableModule,MatFormFieldModule, MatIconModule,MatDialogModule]
})
export class MaterialModule { }
