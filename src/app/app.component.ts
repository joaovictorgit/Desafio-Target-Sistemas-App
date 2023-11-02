import { Component } from '@angular/core';
/*import { Store, createAction, createReducer, on } from '@ngrx/store';

export const addRelease = createAction('add');
export const removeRelease = createAction('remove');

const initialState = {
  release: {},
};

export const reducer = createReducer(
  initialState,
  on(addRelease, (state) => ({ ...state, release: state.release })),
  on(removeRelease, (state) => ({ ...state, release: {} }))
);*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Release-App';
  /*release$ = this.store.select((state: any) => state.release);
  constructor(private store: Store) {}

  addRelease() {
    this.store.dispatch(addRelease());
  }

  removeRelease() {}*/
}
