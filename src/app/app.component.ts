import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { FormGroup, NgForm} from '@angular/forms';
import { ItemJson } from './app.models';
import { AppStore } from './app.store';
import { HttpService } from './app.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpService]
})

export class AppComponent implements OnInit {
  items: ItemJson[] = [];
  modal: NgbModalRef;
  editedItem: ItemJson;
  method: string;
  title: string;
  nameUniq: boolean = true;
  config: object = {
    "editTitle": "Редактирование товара",
    "addTitle": "Добавление товара"
  };

  constructor (
    private store: AppStore,
    private cdr: ChangeDetectorRef,
    public modalService: NgbModal,
    private httpService: HttpService
  ) {
  }

  async ngOnInit () {
    this.httpService.getData().subscribe(data => {
      this.store.addList(data).then(function(){});
      this.cdr.markForCheck();
    });
    //связка по указателю
    this.items = await this.store.getItems();
  }

  save () {
    if (this.method == "add") {
      this.httpService.setData(this.editedItem).subscribe(data => {
        this.store.add(data).then(function () {});
        this.cdr.markForCheck();
        this.modal.close();
      });
    }
    if (this.method == "edit") {
      this.httpService.putData(this.editedItem).subscribe(data => {
        this.store.edit(data).then(function () {});
        this.cdr.markForCheck();
        this.modal.close();
      });
    }
  }

  //здесь нет транзакционности, т.к. item передается по ссылке, но в задании про это ничего не сказано
  //данный вопрос решается передачей значений (либо копированием значения в функции) и по сохранению
  //автоматически все применится
  openEdit (modalContent, item: ItemJson) {
    this.editedItem = item;
    //this.editedItem = {name: item.name, count: item.count, description: item.description};
    this.title =  this.config["editTitle"];
    this.method = "edit";
    this.modal = this.modalService.open(modalContent);
  }

  openAdd (modalContent) {
    this.editedItem = {name: "", count: 0, description: ""};
    this.title = this.config["addTitle"];
    this.method = "add";
    this.modal = this.modalService.open(modalContent);
  }

  //если хочется большей интерактивности, всегда можно повесить на keyUp
  checkUniq (name: string) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) {
        this.nameUniq = false;
        return
      }
    }
    this.nameUniq = true;
  }
}
