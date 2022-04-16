// https://www.youtube.com/watch?v=ppUXN1tC57M&list=PLHgpVrCyLWAoSkzNPYt9nhmtSlpXjtnju&index=6
// Ejemplo de share, que nos permite compartir el observable entre dos o mas subscripciones...
//

import { Component, OnInit } from '@angular/core';
import { timer  } from 'rxjs'
import { tap, map, share } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs_5_share';

  public ngOnInit(): void{
    // Creamos un observable de timer para el ejemplo...
    const time = timer(1000)

    // Creamos un observable para que tenga  un disparador
    // pipe, vinculamos el tap y el map
    //

    const obs = time.pipe(
      tap(() => console.log('TAP ON')
     ),
     map(() => 'END OBS')
    )

    // La observable no es compartida, se ejecuta cada una de las subscripciones...

    const subs01 = obs.subscribe( val => console.log(val))
    const subs02 = obs.subscribe( val => console.log(val))

    // Indicamos que el observable es compartido...
    
    const shareObs = obs.pipe(share())
    console.log("Share ON")
    
    const subs03 = shareObs.subscribe( val => console.log(val))
    const subs04 = shareObs.subscribe( val => console.log(val)) 

    // Esto permite, que si vamos a tener muchas subscripciones a un observable, se lance una sola vez
    // Y se comparta en todas...


  }
}
