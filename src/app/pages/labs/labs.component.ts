import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { __values } from 'tslib';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  welcome = 'bienvenidos';
  tasks = signal([
    'primero',
    'segundo',
    'tercero',
  ]);

  name = signal('Andres');
  age = 18;
  img = 'https://www.khmer24.com/v1.0.2/template/img/default_profile.jpg';
  disabled = true;

  person = signal({
    name: 'Andres',
    age: 5,
    avatar: 'https://www.khmer24.com/v1.0.2/template/img/default_profile.jpg'
  });

  clickHandler(){
    alert('Hola')
  }

  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    })
  }

  changeName(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    })
  }
  
  colorCtrl = new FormControl();
  widhtCtrl = new FormControl(50, {
    nonNullable: true,
  });
  nametCtrl = new FormControl('ana', {
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })
  }
}
