import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { MenuPage } from './menu.page';

const routes: Routes = [
  { path: '', redirectTo: '/menu/main', pathMatch: 'full' },
  {
    path: '',
    component: MenuPage,

    children: [
      {
        path: 'main',
        canActivate: [AuthGuard],
        loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
      }
    ]
  },
  {
    path: 'usuario',
    canActivate: [AuthGuard],
    loadChildren: () => import('../usuario/usuario.module').then(m => m.UsuarioPageModule)
  },

  {
    path: 'ramal',
    canActivate: [AuthGuard],
    loadChildren: () => import('../ramal/ramal.module').then(m => m.RamalPageModule)
  },
  {
    path: 'posicao',
    canActivate: [AuthGuard],
    loadChildren: () => import('../posicao/posicao.module').then(m => m.PosicaoPageModule)
  },
  {
    path: 'aluno',
    canActivate: [AuthGuard],
    loadChildren: () => import('../aluno/aluno.module').then(m => m.AlunoPageModule)
  },
  {
    path: 'contrato',
    canActivate: [AuthGuard],
    loadChildren: () => import('../contrato/contrato.module').then( m => m.ContratoPageModule)
  },
  {
    path: 'contratonovo',
    canActivate: [AuthGuard],
    loadChildren: () => import('../contratonovo/contratonovo.module').then( m => m.ContratonovoPageModule)
  },
  {
    path: 'unidade',
    canActivate: [AuthGuard],
    loadChildren: () => import('../unidade/unidade.module').then( m => m.UnidadePageModule)
  },
  {
    path: 'imovel',
    canActivate: [AuthGuard],
    loadChildren: () => import('../imovel/imovel.module').then( m => m.ImovelPageModule)
  },
  {
    path: 'custo',
    canActivate: [AuthGuard],
    loadChildren: () => import('../custo/custo.module').then( m => m.CustoPageModule)
  },
  {
    path: 'cidade',
    canActivate: [AuthGuard],
    loadChildren: () => import('../cidade/cidade.module').then( m => m.CidadePageModule)
  },
  {
    path: 'horanovo',
    canActivate: [AuthGuard],
    loadChildren: () => import('../horanovo/horanovo.module').then( m => m.HoranovoPageModule)
  },
  {
    path: 'contratorelatorio',
    canActivate: [AuthGuard],
    loadChildren: () => import('../contratorelatorio/contratorelatorio.module').then( m => m.ContratorelatorioPageModule)
  },
  {
    path: 'graficohora',
    canActivate: [AuthGuard],
    loadChildren: () => import('../graficohora/graficohora.module').then( m => m.GraficohoraPageModule)
  },
  {
    path: 'requisicao',
    canActivate: [AuthGuard],
    loadChildren: () => import('../requisicao/requisicao.module').then( m => m.RequisicaoPageModule)
  },
  {
    path: 'requisicaonovo',
    canActivate: [AuthGuard],
    loadChildren: () => import('../requisicaonovo/requisicaonovo.module').then( m => m.RequisicaonovoPageModule)
  },
  {
    path: 'graficorequisicao',
    canActivate: [AuthGuard],
    loadChildren: () => import('../graficorequisicao/graficorequisicao.module').then( m => m.GraficorequisicaoPageModule)
  },
  {
    path: 'relsolicitacao',
    canActivate: [AuthGuard],
    loadChildren: () => import('../relsolicitacao/relsolicitacao.module').then( m => m.RelsolicitacaoPageModule)
  },
  {
    path: 'solicitacaonovo',
    canActivate: [AuthGuard],
    loadChildren: () => import('../solicitacaonovo/solicitacaonovo.module').then( m => m.SolicitacaonovoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
