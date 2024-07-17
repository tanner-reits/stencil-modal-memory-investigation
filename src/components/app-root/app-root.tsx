import { modalController } from '@ionic/core';
import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() state: any = {};

  @State() totalHeapSize: number = 0;
  @State() usedHeapSize: number = 0;

  @State() startingTotal: number = 0;
  @State() startingUsed: number = 0;

  async createNodes() {
    const node = document.createElement('app-home');
    Object.assign(node, { withList: true });
    document.body.appendChild(node);

    setTimeout(() => {
      node.remove();
      this.createNodes();
    }, 300);
  }

  async openModal(withList: boolean = false) {
    let modal = await modalController.create({
      component: 'app-home',
      handle: false,
      backdropDismiss: true,
      initialBreakpoint: 0.5,
      breakpoints: [0.5],
      showBackdrop: false,
      componentProps: {
        withList,
      },
    });
    modal.onDidDismiss().then(() => {
      this.updateStats();
      this.openModal(withList);
    });

    await modal.present();
    setTimeout(() => modal.dismiss(), 300);
  }

  private getStats(): { total: number; used: number } {
    const performance = (window as any).performance;
    if (!('memory' in performance)) {
      return {
        total: 0,
        used: 0,
      };
    }

    const stats = performance.memory;
    return {
      total: stats.totalJSHeapSize,
      used: stats.usedJSHeapSize,
    };
  }

  private updateStats() {
    const stats = this.getStats();

    if (!this.startingTotal) {
      this.startingTotal = stats.total;
    }
    if (!this.startingUsed) {
      this.startingUsed = stats.used;
    }

    this.totalHeapSize = stats.total;
    this.usedHeapSize = stats.used;
  }

  // private formatMemory(a: number): string {
  //   return `${a / Math.pow(1000, 2)} MB`;
  // }

  render() {
    return (
      <div>
        <header>
          <h1>Modal Memory Leak Investigation</h1>
        </header>

        <main class="ion-padding">
          {/* <ion-list>
            <ion-item>
              <ion-label>Total Heap Size</ion-label>
              <ion-note slot="end">{this.formatMemory(this.totalHeapSize)}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Used Heap Size</ion-label>
              <ion-note slot="end">{this.formatMemory(this.usedHeapSize)}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Used Diff</ion-label>
              <ion-note slot="end">{this.formatMemory(this.usedHeapSize - this.startingUsed)}</ion-note>
            </ion-item>
          </ion-list> */}
          <ion-button expand="block" onClick={() => this.openModal()}>
            Run Working
          </ion-button>
          <ion-button expand="block" onClick={() => this.openModal(true)}>
            Run Broken
          </ion-button>
          <ion-button expand="block" onClick={() => this.createNodes()}>
            No Modal
          </ion-button>
        </main>
      </div>
    );
  }
}
