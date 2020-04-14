import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { PickListModule, MessageModule, MessagesModule, PanelModule, MessageService } from 'primeng/primeng';
import {ToolbarModule} from 'primeng/toolbar';
import {MenubarModule} from 'primeng/menubar';
import {InplaceModule} from 'primeng/inplace';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AccordionModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    KeyFilterModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    ToastModule,
    PickListModule,
    ToolbarModule,
    MenubarModule,
    InplaceModule,
    PanelModule,
    MessageModule,
    MessagesModule,TooltipModule
  ],
  exports: [
    BrowserAnimationsModule,
    AccordionModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    KeyFilterModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    ToastModule,
    PickListModule,
    ToolbarModule,
    MenubarModule,
    InplaceModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    TooltipModule
  ],
  providers: [MessageService]
})
export class PrimengModule { }
