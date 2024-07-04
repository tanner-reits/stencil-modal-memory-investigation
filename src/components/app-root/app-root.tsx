import { modalController } from '@ionic/core';
import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @State() state: any = {};

  async openModal(withList: boolean, manual: boolean = false) {
    let modal = await modalController.create({
      component: 'app-home',
      handle: false,
      backdropDismiss: true,
      initialBreakpoint: 0.5,
      breakpoints: [0.5],
      showBackdrop: false,
      componentProps: {
        withList
      }
    });

    if (!manual) {
      modal.onDidDismiss().then(() => {
        this.openModal(withList);
      });
    }

    await modal.present();
    if (manual) {
      return;
    }

    setTimeout(() => modal.dismiss(), 300);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Modal Memory Leak Investigation</h1>
        </header>

        <main class="ion-padding">
          {/* This empty list is required to make the leak */}
          <ion-list></ion-list>
          <ion-button expand="block" onClick={() => this.openModal(false)}>Run Working</ion-button>
          <ion-button expand="block" onClick={() => this.openModal(true)}>Run Broken</ion-button>
          <ion-button expand="block" onClick={() => this.openModal(true, true)}>Run Broken Manual</ion-button>
        </main>
      </div>
    );
  }
}
