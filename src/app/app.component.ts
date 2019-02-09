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

  config = {
    "editTitle": "Редактирование товара",
    "addTitle": "Добавление товара"
  };

  title: string = "";

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

  save (form: NgForm) {
    this.httpService.setData(form).subscribe(data => {
      this.store.add(data).then(function () {});
      this.cdr.markForCheck();
      this.modal.close();
    });
  }

  openEdit (modalContent, item) {
    this.modal = this.modalService.open(modalContent);
    this.title =  this.config.editTitle;
    console.log(item);
  }

  openAdd (modalContent) {
    this.modal = this.modalService.open(modalContent);
    this.title = this.config.addTitle;
  }
}
