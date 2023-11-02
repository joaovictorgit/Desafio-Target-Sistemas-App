import { Component, OnInit } from '@angular/core';
import { ApiReleaseService } from '../service/api-release.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-release',
  templateUrl: './grid-release.component.html',
  styleUrls: ['./grid-release.component.css'],
})
export class GridReleaseComponent implements OnInit {
  releases: any[] = [];
  releaseById: any = {};
  meuFormulario: FormGroup | any;
  constructor(
    private apiReleaseService: ApiReleaseService,
    private formBuilder: FormBuilder
  ) {}

  dataDigitada: string = '';

  ngOnInit(): void {
    const aux = new Date();
    aux.setDate(aux.getDate() - 2);
    const dia = String(aux.getDate()).padStart(2, '0');
    const mes = String(aux.getMonth() + 1).padStart(2, '0');
    const ano = aux.getFullYear();
    this.dataDigitada = `${dia}/${mes}/${ano}`;
    this.meuFormulario = this.formBuilder.group({
      dataFinal: [`${dia}/${mes}/${ano}`, Validators.required],
    });
    this.apiReleaseService.release$.subscribe((r) => {
      this.releases = r;
    });

    this.apiReleaseService
      .getReleaseData(this.dataDigitada)
      ?.subscribe((response: any) => {
        this.releases = response;
      });
  }

  formatDataInput(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    if (value.length >= 8) {
      const formattedValue = `${value.slice(0, 2)}/${value.slice(
        2,
        4
      )}/${value.slice(4, 8)}`;
      this.dataDigitada = formattedValue;
    } else {
      this.dataDigitada = value;
    }
  }

  filtrarLancamentos() {
    this.apiReleaseService
      .getReleaseData(this.dataDigitada)
      ?.subscribe((response: any) => {
        this.releases = response;
      });
  }

  selectRelease(release: any) {
    this.apiReleaseService.selectRelease(release);
  }

  formatData(data: string) {
    var aux = data.split('T');
    var aux_data = aux[0].split('-');
    return `${aux_data[2]}/${aux_data[1]}/${aux_data[0]}`;
  }

  formatValor(valor: number): string {
    return (
      'R$ ' +
      valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  deleteRelease(id: number) {
    Swal.fire({
      title: 'Você deseja excluir ?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiReleaseService.deleteRelease(id).subscribe((response) => {
          this.apiReleaseService
            .getReleaseData(this.dataDigitada)
            ?.subscribe((response: any) => {
              this.releases = response;
            });
        });
      } else if (result.isDismissed) {
        Swal.fire('Exclusão cancelada!', '', 'info');
      }
    });
    /*const result = window.confirm('Você tem certeza de que deseja fazer isso?');
    if (result) {
      this.apiReleaseService.deleteRelease(id).subscribe((response) => {
        this.apiReleaseService
          .getReleaseData(this.dataDigitada)
          ?.subscribe((response: any) => {
            this.releases = response;
          });
      });
    }*/
  }

  sendFormRelease(id: number) {
    this.apiReleaseService.getRelease(id).subscribe((response) => {
      this.releaseById = response;
      console.log(this.releaseById);
    });
  }

  createReleaseNotSingle(
    descricao: string,
    valor: any,
    data: any,
    avulso: string,
    status: string
  ) {
    this.apiReleaseService
      .creteReleaseByNotSingle(descricao, valor, data, avulso, status)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          window.location.reload();
        }
      );
  }

  createRelease(descricao: string, valor: any, avulso: any, status: any) {
    this.apiReleaseService
      .createRelease(descricao, valor, avulso, status)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (err) => {
          window.location.reload();
        }
      );
  }

  updateRelease(
    id: string,
    descricao: string,
    valor: any,
    data: string,
    avulso: any,
    status: any
  ) {
    this.apiReleaseService
      .updateRelease({ id, descricao, valor, data, avulso, status })
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (err) => {
          window.location.reload();
        }
      );
  }
}
