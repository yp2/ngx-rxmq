# ngx-rxmq

Angular 6 wrapper for [Rxmq.js](https://github.com/rxmqjs/rxmq.js) - in-memory message bus based on [reactive extensions](https://github.com/Reactive-Extensions/RxJS).

## Rxmq.js docs
[Rxmq.js](https://github.com/rxmqjs/rxmq.js)

[Docs Rxmq.js](http://rxmqjs.github.io/rxmq.js/) 

## Description
Package provides `RxmqService` that is a wrapper for [`Rxmq`](http://rxmqjs.github.io/rxmq.js/class/src/rxmq.js~Rxmq.html) message broker.
`RxmqService` provides `channel`, `registerChannelPlugin` and `registerPlugin` methods which corresponds with `Rxmq` methods 
and `requestResponseChannel` which return `RequestResponseChannel`. 

`ngx-rxmq` provide a `MQable` interface. 
```angular2html
interface MQable {
  connect(mq: RxmqService): void;
}
```
It should be used in service provided as arguments for `forRoot` and `forFeature` static methods of `NgxRxmqModule`. 
On provided service `connect` method will be called with `RxmqService` as argument. Instances of this services will be created at start up 
of application (`forRoot`) or on load of a feature module (`forFeature`).

## Usage
### Basic usage
TODO: Support for `RequestResponseChannel`.

Import `NgxRxmqModule.forRoot()` in AppModule. For feature modules (lazy loaded) import per module `NgxRxmqModule.forFeature()`

In component - use of `Channel`:
```typescript
export class DemoAComponent implements OnInit {

  message$: Observable<string>;

  constructor(private mq: RxmqService) { }

  ngOnInit() {
    this.message$ = this.mq.channel<{message: string}>('demo-a').observe('add.element')
      .pipe(map(event => event.message));
  }

  emitA() {
    this.mq.channel<{message: string}>('demo-a').subject('add.element').next({message: 'Added element to demo-a'});
  }
}
```

### Usege with services


Import `NgxRxmqModule` in AppModule:
```typescript
@NgModule({
  imports: [
    ...
    NgxRxmqModule.forRoot([DemoAService, DemoBService]),
    ...
  ],
  providers: [
    DemoAService,
    DemoBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Services: 
```typescript
@Injectable({
  providedIn: 'root'
})
export class DemoAService implements MQable {

  constructor(private mq: RxmqService) { }

  connect(mq: RxmqService): void {
    mq.channel<{message: string}>('demo-a').observe('add.element')
      .subscribe((event) => {
        console.log('demo-a:add.element', event);
      });
  }

  emit() {
    this.mq.channel<{message: string}>('demo-b').subject('add.element').next({message: 'added element to demo-b'});
  }
}

@Injectable({
  providedIn: 'root'
})
export class DemoBService implements MQable {

  constructor() { }

  connect(mq: RxmqService): void {
    mq.channel<{message: string}>('demo-b').observe('add.element')
      .subscribe((event) => {
        console.log('demo-b:add.element', event);
      });
  }
}
```
Service `DemoAService` and `DemoBService` will be created at startup of application. There is not need to inject this services to
component if this services only listen to message queue and act base on event passed to queue eg. side effects, http requests.

For feature modules:
```typescript
@NgModule({
  imports: [
    ...
    NgxRxmqModule.forFeature([FeatureAService]),
    ...
  ],
  declarations: [FeatureAComponent]
})
export class FeatureAModule { }

```
Feature service:
```typescript
@Injectable({
  providedIn: 'root'
})
export class FeatureAService implements MQable {

  constructor() { }

  connect(mq: RxmqService) {
    console.log('FeatureAService.connect', mq);
    mq.channel('demo-a').observe('add.element')
      .subscribe((event) => {
        console.log('Feature A service: demo-a:add.element', event);
      });
  }

}
```

Feature component:
```typescript
@Component({
  selector: 'app-feature-a',
  templateUrl: './feature-a.component.html',
  styleUrls: ['./feature-a.component.css']
})
export class FeatureAComponent implements OnInit {

  public readonly form: FormGroup;
  private readonly demoAChanel: Channel<{message: string}>;
  private readonly demoBChanel: Channel<{message: string}>;

  constructor(private formBuilder: FormBuilder, private mq: RxmqService) {
    this.form = formBuilder.group({
      messageDemoA: [''],
      messageDemoB: [''],
    });

    this.demoAChanel = this.mq.channel('demo-a');
    this.demoBChanel = this.mq.channel('demo-b');
  }

  ngOnInit() {
    this.demoAChanel.observe('add.element')
      .pipe(
        map(e => e.message),
        filter((message) => {
          return this.form.get('messageDemoA').value !== message;
        })
      )
      .subscribe((message) => {
        this.form.patchValue({
          messageDemoA: message
        });
      });
  }

  sendDemoA() {
    this.demoAChanel.subject('add.element').next({message: this.form.get('messageDemoA').value});
  }

  sendDemoB() {
    this.demoBChanel.subject('add.element').next({message: this.form.get('messageDemoB').value});
  }
}
```

### Contributors
[Daniel Dereziński](https://github.com/yp2)

### Licence
MIT

