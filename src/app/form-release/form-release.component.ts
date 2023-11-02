import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ApiReleaseService } from '../service/api-release.service';
import { Subscription, interval, takeWhile } from 'rxjs';
import { GridReleaseComponent } from '../grid-release/grid-release.component';

export interface IRelease {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  status: string;
  avulso: string;
}

@Component({
  selector: 'app-form-release',
  templateUrl: './form-release.component.html',
  styleUrls: ['./form-release.component.css'],
})
export class FormReleaseComponent implements OnInit {
  checkUpdate = false;
  formData: any;
  releases: any[] = [];
  title_form = 'Adicionar Lançamento';
  formulario: FormGroup | undefined;
  descricao = '';
  valor = '';
  data = '';
  avulso = '';
  status = 'Válido';
  campoDesativado: boolean = true;
  private releaseInterval: Subscription | any;
  constructor(
    private apiReleaseService: ApiReleaseService,
    private grid: GridReleaseComponent
  ) {}

  ngOnInit() {
    this.releaseInterval = interval(1000)
      .pipe(takeWhile(() => this.checkUpdate === false))
      .subscribe(() => {
        this.formData = this.apiReleaseService.getReleaseSelected();
        if (this.formData.id) {
          this.descricao = this.formData.descricao;
          this.valor = this.formData.valor;
          this.checkUpdate = true;
          this.data = this.sendDataInput(this.formData.data);
          this.avulso =
            this.formData.avulso === 'Avulso' ? 'valido' : 'nao-avulso';
          this.status =
            this.formData.status === 'Válido' ? 'valido-status' : 'cancelado';
        }
      });
  }

  onLoadForm() {
    this.formData = this.apiReleaseService.getReleaseSelected();
    console.log(this.formData);
  }

  sendDataInput(d: any) {
    const data = new Date(d);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
  }

  onSubmit(f: NgForm) {
    this.descricao = f.value.descricao;
    this.valor = f.value.valor;
    this.avulso = 'Avulso';
    this.status = 'Válido';
    if (f.value.status === 'valido-status') {
      this.status = 'Válido';
    }
    if (this.checkUpdate === false) {
      if (f.value.avulso === 'nao-avulso') {
        this.avulso = 'Não avulso';
        this.data = f.value.data;
        this.grid.createReleaseNotSingle(
          this.descricao,
          this.valor,
          this.data,
          this.avulso,
          'Válido'
        );
      } else {
        this.grid.createRelease(
          this.descricao,
          this.valor,
          this.avulso,
          this.status
        );
      }
    } else {
      this.grid.updateRelease(
        this.formData.id,
        this.descricao,
        this.valor,
        this.data,
        this.avulso,
        this.status
      );
    }
    //this.apiReleaseService.getReleaseData('2');
  }
}
