import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/models/cliente";
import { ApiClienteService } from "src/app/services/api-cliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent{
    public nombre: string;

    constructor(public dialogRef: MatDialogRef<DialogClienteComponent>, 
        public apiCliente: ApiClienteService,
        public snakBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Cliente){
            if(this.cliente !== null){
                this.nombre = cliente.nombre;
            }
        }
        
    close(){
        this.dialogRef.close();
    }

    addCliente(){
        const cliente: Cliente = { id: 0, nombre: this.nombre};
        this.apiCliente.addCliente(cliente).subscribe(response => {
            if(response.exito === 200){
                this.dialogRef.close();
                this.snakBar.open('Cliente insertado con exito','',{duration: 2000});
            }
        });
    }

    editCliente(){
        const cliente: Cliente = { id: this.cliente.id, nombre: this.nombre};
        this.apiCliente.editCliente(cliente).subscribe(response => {
            if(response.exito === 200){
                this.dialogRef.close();
                this.snakBar.open('Cliente actualizado con exito','',{duration: 2000});
            }
        });
    }
}