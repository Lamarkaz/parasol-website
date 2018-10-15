require('./styles.scss');

$(document)
    .ready(function() {
      "use strict";
      
      $("nav .navbar-start").find("a").click(function(e) {
        var section = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(section).offset().top
        });
      });

      $("button.code-viewer").click(function(e){
        $(".modal").addClass('is-active');
      })

      $("button.modal-close").click(function(e){
        $(".modal").removeClass('is-active');
      })

      var npmClipboard = new Clipboard('#npmCopy');

      npmClipboard.on('success', function (e) {
        e.trigger.innerText = 'copied!';
        e.trigger.classList.add('is-success');
        setTimeout(function () {
          e.trigger.innerText = 'copy';
          e.trigger.classList.remove('is-success');
        }, 1500);
        e.clearSelection();
      });

      npmClipboard.on('error', function (e) {
        e.trigger.innerText = 'error!';
        e.trigger.classList.add('is-error');
        setTimeout(function () {
          e.trigger.innerText = 'copy';
          e.trigger.classList.remove('is-error');
        }, 500);
      });

      $(function() {
      var data = [
      { 
        action: 'type',
        strings: ["npm install -g parasol^400"],
        output: '<span class="gray">+ parasol@1.0.1</span><br><br>',
        postDelay: 1000
      },
      { 
        action: 'type',
        strings: ["parasol init^400"],
        output: '<span style="color:#00d137">✔ Parasol project created successfully!</span>',
        postDelay: 1000
      },
      { 
        action: 'type',
        strings: ["clear^400"],
        output: ' ',
        postDelay: 1000
      },
      { 
        action: 'type',
        strings: ["parasol^400"],
        output: $('.mimik-run-output').html(),
        postDelay: 2000,
        clear: true
      },
      { 
        action: 'type',
        strings: ["contracts['Token.psol:Token'].methods.transfer( accounts[1] , 5 ).send( { from: accounts[0] } )^700"],
        output: $('.trans-run-output').html(),
        postDelay: 2000
      }
    ];
      runScripts(data, 0);
    });

    // Functions

    function runScripts(data, pos) {
      var prompt = $('.prompt'),
        script = data[pos];
      if(script.clear === true) {
        $('.history').html(''); 
      }
      switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':
          break;
      }
    }

      document.addEventListener('DOMContentLoaded', function () {
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any nav burgers
        if ($navbarBurgers.length > 0) {

          // Add a click event on each of them
          $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

              // Get the target from the "data-target" attribute
              var target = $el.dataset.target;
              var $target = document.getElementById(target);
              var $navMenu = document.getElementById("navMenu");

              // Toggle the class on both the "navbar-burger" and the "navbar-menu"
              $el.classList.toggle('is-active');
              $navMenu.classList.toggle('is-active');

            });
          });
        }

        });
        AOS.init();
    })