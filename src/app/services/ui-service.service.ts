import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {


  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  isLoading = false;
  loaderCounter = 0;
  loading: HTMLIonLoadingElement;
  confirma = false;

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  async present(options: object) {
    this.loaderCounter = this.loaderCounter + 1;

    if (this.loaderCounter === 1) {
      this.isLoading = true;
      this.loading = await this.loadingController.create(options);
      await this.loading.present();
    }
  }

  async dismiss() {
    this.loaderCounter = this.loaderCounter - 1;
    if (this.loaderCounter === 0) {
        this.isLoading = false;
        await this.loading.dismiss();
    }
  }


/*
  async present(options: object) {
    // Dismiss all pending loaders before creating the new one
    await this.dismiss();

    await this.loadingController
      .create(options)
      .then(res => {
        res.present();
      });
  }

 
  async dismiss() {
    await this.presentToast( "Demiss = "  + JSON.stringify( await this.loadingController.getTop()));
 //   while (await this.loadingController.getTop() !== undefined) {
      await this.presentToast( "Demiss = "  + JSON.stringify( await this.loadingController.getTop()));
      await this.loadingController.dismiss();
//    }
    await this.presentToast( "Demiss = "  + JSON.stringify( await this.loadingController.getTop()));
  }
*/
  

  async presentAlert(header: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      inputs: [
        {
          name: 'observacao',
          type: 'text',
          placeholder: 'Informe o motivo da devolução'
        }
      ],
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Não');
            this.confirma=false;
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Sim');
            this.confirma=true;
          }
        }
      ]
    });

    await alert.present();
  }

}