
import { Component, computed, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    })
  }

  ngOnInit() {
    const storage = localStorage.getItem ('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
  }

  changeHandler() {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim()) {
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);

  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== id));
  }

  updateTask(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === id) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  };
  /*this.tasks.update(state => {
    const currentTask = state[index];
    state[index] = {
      ...currentTask,
      completed: !currentTask.completed
    }
  })
}
*/

  updateTaskEditingMode(id: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === id) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false,
        }
      })
    })
  }

  updateTaskTitle(id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === id) {
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        }
        return task;

      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }

}
