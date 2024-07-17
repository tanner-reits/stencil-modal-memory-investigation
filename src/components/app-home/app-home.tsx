import { Component, ComponentInterface, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  // shadow: true,
})
export class AppHome implements ComponentInterface {
  @Prop() withList: boolean;

  renderContent() {
    if (this.withList) {
      return <ion-list inset={true}></ion-list>;

      // return <ion-header>Test</ion-header>;
    }

    return (
      <div>
        {/* <ion-item> */}
        {/* <ion-toggle checked={true} /> */}
        {/* </ion-item> */}
      </div>
    );
  }

  disconnectedCallback(): void {
    console.log('Disconnected');
  }

  render() {
    return (
      // <ion-content>
      //   <p>
      //     Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
      //     <a href="https://stenciljs.com">stenciljs.com</a> to get started.
      //   </p>
      //   {/* <ion-list>
      //     <ion-item>
      //       <ion-toggle checked={true} />
      //     </ion-item>
      //   </ion-list> */}
      //   {this.renderContent()}
      // </ion-content>

      <app-wrapper>{this.renderContent()}</app-wrapper>
    );
  }
}
