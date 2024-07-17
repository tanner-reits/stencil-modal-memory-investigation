import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'app-wrapper',
  shadow: true,
})
export class AppWrapper implements ComponentInterface {
  @Prop() withList = true;

  renderContent() {
    if (this.withList) {
      return <ion-list inset={true}></ion-list>;

      // return <ion-header>Test</ion-header>;
    }

    return [];

    // return (
    //   <div>
    //     {/* <ion-item> */}
    //     {/* <ion-toggle checked={true} /> */}
    //     {/* </ion-item> */}
    //   </div>
    // );
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
