import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  //When working with forms, you have to add the properties of the fields
  text!: string;
  day!: string;
  reminder: boolean = false;

  //To toggle the component
  showAddTask!: boolean;
  subscription!: Subscription;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // @todo- emit event from here.
    //We will be using the services from the task component (Parent) not here (add-task component)

    this.onAddTask.emit(newTask);
    // Reset the default value
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
