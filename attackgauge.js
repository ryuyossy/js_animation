var  attackGuageController = (function (doc) {
     
     var ua = navigator.userAgent.toLowerCase(),
         isGalaxyNexus = ua.indexOf('SC-04D') != -1 || ua.indexOf('galaxy nexus') != -1,
         isGalaxyS3 = ua.indexOf('sc-06d') != -1 || ua.indexOf('gt-i9300') != -1;

     var d = function (id) {
          return doc.querySelector('#' + id);
     }
          
     var playAnimation = function (element, animationName) {
          element.removeAttribute('class');
          setTimeout(function () {
               element.setAttribute('class', animationName);  
          }, 0);
     }
     
     var setCallAfter = function (element, callback) {
          element.addEventListener('webkitAnimationEnd', function () {
               callback();
               element.removeEventListener('webkitAnimationEnd', arguments.callee, false);
          }, false);
     }
     
     var setEventType = function (eventType) {
          d("shapeTapArea").addEventListener(eventType, function () {
               var matrix,
                   current,
                   transformStr;
               matrix = doc.defaultView.getComputedStyle(d("shapeGaugeCover"), '').webkitTransform.replace('matrix(', '').replace(')', '').split(',');
               current = parseInt(matrix[4], 10);
               if (current > 140) {
                    d("scene3").style.display = "block";
                    playAnimation(d("scene1"), "anime03");
                    setCallAfter(
                         d("shapeWhite2"),
                         function () {
                              //MAX時、ホワイトアウトアニメーション後の記述
                         }
                    );
               } else {
                    d("scene2").style.display = "block";
                    playAnimation(d("scene1"), "anime02");
                    transformStr = 'translate(' + parseInt(matrix[4], 10) + 'px,' + parseInt(matrix[5], 10) + 'px) scale(' + matrix[0] + ',' + parseInt(matrix[3], 10) + ')';
                    d("shapeGaugeCover").style.webkitTransform = transformStr;
                    setCallAfter(
                         d("shapeWhite"),
                         function () {
                              //通常時、ホワイトアウトアニメーション後の記述
                         }
                    );
               }
          }, false);
     }
     
     return {
          init: function () {
               d("an-anim").style.display = "block";
               playAnimation(d("scene1"), "anime01");
               attackGuageController.tapAnime();
          },
          tapAnime: function () {
               if(isGalaxyS3) {
                    setEventType("click");
               } else if(isGalaxyNexus) {
                    setEventType("click");
               } else {
                    setEventType("touchstart"); 
               }
          }
     }
     
}(document));

window.addEventListener("load", attackGuageController.init, false);