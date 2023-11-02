import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css'],
})
export class ReleasesComponent implements OnInit {
  title = 'Teste Target Sistemas';
  public releasesArr = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5'];

  constructor() {}

  ngOnInit(): void {}
}
