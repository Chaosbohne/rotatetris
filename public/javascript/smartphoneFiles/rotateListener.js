/**
 * @file yodh.js
 *
 * Jod - "Hand"
 */
;


(function(){
  /*
    * You can polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and 10 with the following code:
    * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
    */
   function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
   };

   CustomEvent.prototype = window.CustomEvent.prototype;

   window.CustomEvent = CustomEvent;
   /* end of polyfill */
})();



var Jod = function () {};

/**
 * eigenschaften
 */
Jod.prototype._isPortraitInitialView = null;
Jod.prototype._isPortraitCurrentView = null;
Jod.prototype._triggerAtDegree = null;
Jod.prototype._triggerTolerance = 0.2;
Jod.prototype._currentSector = null;

/**
 * methoden
 */
Jod.prototype.handle = function (params) {
   if (typeof params !== 'object') {
      console.log("i.handle ---> params !== 'object'");
      return false;
   }

   if (typeof params.rotation !== "undefined") {
      this._triggerAtDegree = params.rotation.degree ? params.rotation.degree : 90;
      this._triggerTolerance = params.rotation.tolerance ? params.rotation.tolerance : this._triggerTolerance;
   
      window.addEventListener("JodTriggerEvent", function (e) {
         //callback ist Array
         if (Object.prototype.toString.call(params.rotation.callback) === "[object Array]") {
            //Anzahl ist gleich 1
            if (params.rotation.callback.length === 1) {
   
               params.rotation.callback[0](e);
            }
            //Anzahl ist gleich 360° / Grad
            else if (params.rotation.callback.length === Math.round(360 / params.rotation.degree)) {
               params.rotation.callback[(e.detail.sector - 1) >= 0 ? (e.detail.sector - 1) : 0](e);
            }
         }
         else if (typeof params.rotation.callback === "function") {
            params.rotation.callback(e);
         }
      }, false);
   }

   if (typeof params.click !== "undefined") {
      for (var id in params.click) {
         document.getElementById(id).addEventListener("click", params.click[id], false);
      }
   }

   return this;
};




(function (window, document) {
   /*
    * i deklarien
    */
   window.i = new Jod();




   /*
    * ist view portrait (true) oder landscape (false)
    */
   var mql = window.matchMedia("(orientation: portrait)");

   i._isPortraitCurrentView = i._isPortraitInitialView = mql.matches;

   mql.addListener(function (m) {
      i._isPortraitCurrentView = m.matches;
   });




   /*
    * DeviceOrientation
    */
   if (window.DeviceOrientationEvent) {
   window.addEventListener("deviceorientation", function (doe) {
      console.log("DeviceOrientationEvent wird unterstuetzt");

      var e = {
            "absolute": Math.floor(doe.absolute), //doe.absolute Indicates whether or not the device is providing orientation data absolutely (that is, in reference to the Earth's coordinate frame) or using some arbitrary frame determined by the device
            "alpha": Math.floor(doe.alpha), //doe.alpha value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360
            "beta": Math.floor(doe.beta), //doe.beta value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device
            "gamma": Math.floor(doe.gamma) //doe.gamma value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device
          }
         ,alpha = {
            "triggerQuotient": null,
            "triggerQuotientRoundedUp": null,
            "diff": null
         };

      if (i._triggerAtDegree !== null) {
         alpha.triggerQuotient = e.alpha / i._triggerAtDegree;
         alpha.triggerQuotientRoundedUp = Math.ceil(alpha.triggerQuotient),
         alpha.quotRoundDiff = alpha.triggerQuotientRoundedUp - alpha.triggerQuotient

         if(alpha.quotRoundDiff < i._triggerTolerance && Jod._currentSector !== alpha.triggerQuotientRoundedUp) {
            Jod._currentSector = alpha.triggerQuotientRoundedUp;

            window.dispatchEvent(new CustomEvent ("JodTriggerEvent", {
               "detail": {
                  "sector": alpha.triggerQuotientRoundedUp,
                  "view": (i._isPortraitCurrentView ? "portrait" : "landscape")
               }
            }));
         }
      }
   }, false);
   }
   else {
      console.log("DeviceOrientationEvent wird nicht unterstuetzt");
   }




   /*
    * DeviceMotion
    */
   if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(e) {
         console.log("DeviceMotionEvent wird unterstuetzt");
      }, false);
   }
   else {
      console.log("DeviceMotionEvent wird nicht unterstuetzt");
   }
})(this, this.document);