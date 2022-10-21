import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', {static:true}) flashForm: NgForm;
  //title = 'flashcards';

  flashs: IFlash[] = [
    {
      question: "Question 1",
      answer: "Answer 1",
      show: false,
      id: getRandomNumber(),
    },
    {
      question: "Question 2",
      answer: "Answer 2",
      show: false,
      id: getRandomNumber(),
    },
    {
      question: "Question 3",
      answer: "Answer 3",
      show: false,
      id: getRandomNumber(),
    },
  ];

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash!.show = !flash!.show;
  }

  editing = false;

  editingId: number;

  handleDelete(id: number) {
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1)
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
  }

  handleRememberedChange({id, flag}) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash!.remembered = flag;
  }

  handleSubmit(): void {
    this.flashs.push({id: generateId(), ...this.flash})
    this.handleClear();
  }

  handleClear() {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
 }
