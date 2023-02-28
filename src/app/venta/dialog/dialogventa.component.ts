import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Concepto } from "src/app/models/concepto";
import { Venta } from "src/app/models/venta";
import { ApiClienteService } from "src/app/services/api-cliente.service";
import { ApiProductoService } from "src/app/services/api-producto.service";
import { ApiventaService } from "src/app/services/apiventa.service";

@Component({
    templateUrl: 'dialogventa.component.html'
})
export class DialogVentaComponent implements OnInit {
    public venta: Venta;
    public conceptos: Concepto[];
    public listProductos: any = new Array();  
    public listClientes: any = new Array();  

    public conceptoForm = this.fb.group({
        cantidad : [0,Validators.required],
        importe : [0,Validators.required],
        idproducto : [1,Validators.required],
        idcliente:  [0,Validators.required]
    })


    constructor(public dialogRef: MatDialogRef<DialogVentaComponent>,
        public snackBar: MatSnackBar,
        private fb: FormBuilder,
        public apiVenta: ApiventaService,
        public apiProducto: ApiProductoService,
        public apiCliente: ApiClienteService){
            this.conceptos = [];
            this.venta = {idCliente: 3,conceptos:[]}
        }

        ngOnInit(): void {
            this.getProductos();
            this.getClientes();
          }  


        close(){
            this.dialogRef.close();
        }

        addConcepto(){
            const conceptos: Concepto = {
                cantidad : this.conceptoForm.get('cantidad').value,
                idProducto: this.conceptoForm.get('idproducto').value,
                importe: this.conceptoForm.get('importe').value
            };
            
            this.conceptos.push(conceptos); 
        }

        addVenta(){
            this.venta.idCliente = this.conceptoForm.get('idcliente').value            
            this.venta.conceptos = this.conceptos;
            this.apiVenta.add(this.venta).subscribe(res =>{                
                if(res.exito === 200){
                    console.log('respuesta',res);
                    this.dialogRef.close();
                    this.snackBar.open('Venta realizada con exito','',{
                        duration: 2000
                    });
                }
            });
        }

        getProductos() {    
            let productos = this.apiProducto.get().subscribe(res =>{               
                if(res.exito === 200){
                    this.listProductos = res.data;                                        
                }
            });
            
        } 

        getClientes() {    
            let clientes = this.apiCliente.getClientes().subscribe(res =>{               
                if(res.exito === 200){
                    this.listClientes = res.data;                                        
                }
            });
            
        } 
}