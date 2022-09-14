import type { ComponentInterface } from '@stencil/core';
import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'my-list'
})
export class MyList implements ComponentInterface {
  render() {
    return <Host class="list-md"></Host>;
  }
}
