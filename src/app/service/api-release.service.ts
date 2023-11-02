import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { format, subDays } from 'date-fns';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiReleaseService {
  private releasesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public release$: Observable<any[]> = this.releasesSubject.asObservable();

  url = 'https://localhost:7030/api/Release';
  private releaseSelected: any = {};

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  showAllRelease() {
    return this.http.get(`${this.url}`);
  }

  getAllReleases(): void {
    this.http.get(`${this.url}`).subscribe((response: any) => {
      //this.releases = response.results;
      this.releasesSubject.next(response);
    });
  }

  selectRelease(release: any) {
    this.releaseSelected = release;
    //console.log(this.releaseSelected);
  }

  getReleaseSelected() {
    return this.releaseSelected;
  }

  deleteRelease(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getReleaseData1(data: string) {
    const numeroDias = parseInt(data, 10);
    const dataAtual = new Date();

    const DataXDiasAtras = subDays(dataAtual, numeroDias);
    const dataFormatada = format(DataXDiasAtras, 'yyyy-MM-dd');

    return this.http.get(`${this.url}/data/${dataFormatada}`);
  }

  getReleaseData(data: string) {
    const aux = data.split('/');
    if (aux.length !== 3) {
      return null;
    }

    const dia = aux[0];
    const mes = aux[1];
    const ano = aux[2];

    const dataConvertida = `${ano}-${mes}-${dia}`;
    /*const numeroDias = parseInt(data, 10);
    const dataAtual = new Date();

    const DataXDiasAtras = subDays(dataAtual, numeroDias);
    const dataFormatada = format(DataXDiasAtras, 'yyyy-MM-dd');*/
    //console.log(dataFormatada);
    return this.http.get(`${this.url}/data/${dataConvertida}`);
  }

  getRelease(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  createRelease(descricao: string, valor: any, avulso: string, status: string) {
    return this.http.post(
      `${this.url}/`,
      JSON.stringify({ descricao, valor, avulso, status }),
      this.httpOptions
    );
  }

  creteReleaseByNotSingle(
    descricao: string,
    valor: any,
    data: any,
    avulso: string,
    status: string
  ) {
    return this.http.post(
      `${this.url}/nao-avulso`,
      JSON.stringify({
        descricao,
        valor,
        data,
        avulso,
        status,
      }),
      this.httpOptions
    );
  }

  updateRelease(release: any) {
    return this.http.put(
      `${this.url}/${release.id}`,
      JSON.stringify(release),
      this.httpOptions
    );
  }
}
