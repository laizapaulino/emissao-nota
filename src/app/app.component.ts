import { Component } from '@angular/core';
import { produto } from './produto';
import { nota } from './nota';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emissao-nota';
  nota_fiscal:nota = {nome: 'Laiza', lista_produtos:[], quantidades:[]};
  produto_escolhido:produto = {codigo:null,descricao:null, valor_unitario: null, desconto: null};
  quantidade:number = 0;
  valorTotal:number = null;

  lista_produto:Array<produto> = [{codigo:1,descricao:'Calça couro', valor_unitario: 150.99, desconto: 5},
  {codigo:2,descricao:'Calça jeans', valor_unitario: 99.99, desconto: 5},
  {codigo:3,descricao:'Calça sarja', valor_unitario: 190, desconto: 5},
  {codigo:4,descricao:'Calça legging', valor_unitario: 70, desconto: 5},
  {codigo:5,descricao:'Vestido salmão', valor_unitario: 250, desconto: 5},
  {codigo:6,descricao:'Vestido noiva', valor_unitario: 1000, desconto: 5}];
  
  escolheProduto(){
    for(let i = 0;i< this.lista_produto.length;i++){
      if(this.produto_escolhido.codigo == this.lista_produto[i].codigo){
        this.produto_escolhido = this.lista_produto[i];
      }
    }
  }
  adicionaItem(){
    if(this.produto_escolhido.codigo!=null){
      this.nota_fiscal.lista_produtos.push(this.produto_escolhido);
      this.nota_fiscal.quantidades.push(this.quantidade);
      let tabela = document.getElementById('corpo-tabela');
      let novaLinha = document.createElement('tr');
      let col1 = document.createElement('th');
      let col2 = document.createElement('th');
      let col3 = document.createElement('th');
      let col4 = document.createElement('th');

      let tam = this.nota_fiscal.lista_produtos.length;
      col1.innerHTML =''+this.nota_fiscal.lista_produtos[tam-1].descricao;
      col2.innerHTML= ''+this.nota_fiscal.quantidades[tam-1];
      col3.innerHTML = ''+(this.produto_escolhido.valor_unitario *this.quantidade);
      col4.innerHTML = ''+this.produto_escolhido.desconto+'%';

      novaLinha.appendChild(col1);
      novaLinha.appendChild(col2);
      novaLinha.appendChild(col3);
      novaLinha.appendChild(col4);
      tabela.appendChild(novaLinha);
      this.produto_escolhido = {codigo:null,descricao:null, valor_unitario: null, desconto: null};
      this.quantidade= null;
    }
  }

  fecharPedido(){
    this.valorTotal=0;
    this.adicionaItem();
    for(let i=0;i<this.nota_fiscal.lista_produtos.length;i++){
      let item = this.nota_fiscal.lista_produtos[i].valor_unitario;
      let quantia = this.nota_fiscal.quantidades[i];
      let desc = this.nota_fiscal.lista_produtos[i].desconto;
      this.valorTotal+= (item * quantia)-(item * quantia*desc/100);
    }
  }
}
