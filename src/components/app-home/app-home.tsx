import { Component, ComponentInterface, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome implements ComponentInterface {

  @Prop() withList: boolean;

  renderContent() {
    return this.withList ? <my-list></my-list> : <div></div>;
  }

  render() {
    return (
      <ion-content>
        {this.renderContent()}
      </ion-content>
    );
  }
}
