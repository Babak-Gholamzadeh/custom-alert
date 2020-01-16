// Saving default browser alert function that can be called by 'oldAlert(msg)'
var oldAlert = window.alert;
(function() {
  // Create Element Class
  function CreateElement(tagName, className) {
    this.tagName = tagName;
    this.className = className;
    this.element = document.createElement(this.tagName);
    this.element.className = className;
    // Setting multiply attributes
    this.attr = function(attrObj) {
      for (var attrName in attrObj) {
        this.element.setAttribute(attrName, attrObj[attrName]);
      }
    }
    // Adding html elements inside this element or adding some text
    this.text = function(txt) {
      this.element.innerHTML = txt;
    }
    // Adding an event listener
    this.event = function(eventName, callBack) {
      this.element.addEventListener(eventName, callBack);
    }
    // Getting the html element
    this.getElement = function() {
      return this.element;
    }
    // Adding a class to the element
    this.addClass = function(className) {
      this.element.classList.add(className);
    }
    // Removing a class from the element
    this.removeClass = function(className) {
      this.element.classList.remove(className);
    }
  }

  // Create alert container on loading page
  function CustomAlertContainer() {
    var scrollFreezeX = 0;
    var scrollFreezeY = 0;
    var body = document.body;
    var customAlertContainer = new CreateElement('div', 'customAlert-container');
    customAlertContainer.event('click', function(e) {
      e.target === this ? hideAlert() : false;
    });
    customAlertContainer.event('mouseup', function() {
      var btnList = document.getElementsByClassName('customAlert-btn');
      for(var i = 0; i < btnList.length; i++) {
        btnList[i].style.setProperty('--opacity', '0');
      }
      setTimeout(function() {
        for(var i = 0; i < btnList.length; i++) {
          btnList[i].removeAttribute('style');
        }
      }, 300);
    });
    var customAlertWrapper = new CreateElement('div', 'customAlert-wrapper');
    // customAlertWrapper.attr({'tabindex': '0'});
    customAlertWrapper = customAlertWrapper.getElement();
    customAlertContainer = customAlertContainer.getElement();
    customAlertContainer.appendChild(customAlertWrapper);
    body.appendChild(customAlertContainer);
  }

  //Initialization
  var alertContainer; //Container div for alert
  var alertWrapper; //Wrapper div for alert that is inside of the container
  var alertQueue = []; //Using a queue for running the alerts in order
  var alertInDOM = false; //A flag just for checking whatere any alert exists in DOM
  (function() {
    // Create a container element
    CustomAlertContainer();
    // Overriding the alert function for customization
    window.alert = function() {
      alertContainer = document.getElementsByClassName('customAlert-container')[0];
      alertWrapper = alertContainer.getElementsByClassName('customAlert-wrapper')[0];
      // Creating an alert and add it to the queue
      alertCreator(arguments);
      // Check if there isn't any alert in the DOM, fetch the first element of the queue and add it to the DOM
      if(alertQueue.length && !alertInDOM) {
        addAlertToDOM();
      }
    }
  }());

  var alertCreator = function(alertOptions) {
    var alertItemFragment = document.createDocumentFragment();
    //This flag be used to push the alert to 'alertQueue' array
    var alertPriority = 0;
    // The default class for alerts is 'customAlert-info' that shows the alert with an info icon, if the 'alertType' doesnt' be set
    var alertItem = new CreateElement('div', 'customAlert-item customAlert-info');
    var alertIcon = new CreateElement('figure', 'customAlert-icon');
    var alertTitle = new CreateElement('h4', 'customAlert-title');
    var alertDescription = new CreateElement('div', 'customAlert-description');
    var alertButtons = new CreateElement('div', 'customAlert-buttons');
    alertButtons = alertButtons.getElement();
    // Use a default OK button, if any button doesn't be set
    var alertBtn = new CreateElement('div', 'customAlert-btn');
    alertBtn.text('OK');
    alertBtn.event('click', hideAlert);
    alertBtn.event('mousedown', btnEffectStart);
    alertButtons.appendChild(alertBtn.getElement());

    // Customize the alert
    for (var i = 0; i < alertOptions.length; i++) {
      if (typeof alertOptions[i] == 'string') {
        alertDescription.text(alertOptions[i]);
      } else if (typeof alertOptions[i] == 'object') {
        applyAlertSettings(alertOptions[i]);
      }
    }
    function applyAlertSettings(settings) {

      for (var key in settings) {
        switch (key) {
          case 'alertPriority':
            alertPriority = settings[key];
            break;
          case 'alertTitle':
            alertTitle.text(settings[key]);
            break;
          case 'alertType':
            alertItem.removeClass('customAlert-info');
            alertItem.addClass('customAlert-' + settings[key]);
            break;
          case 'alertButtons':
            alertButtons.innerHTML = '';
            for (var b = 0; b < settings[key].length; b++) {
              var btn = new CreateElement('div', 'customAlert-btn');
              for (var btnKey in settings[key][b]) {
                switch (btnKey) {
                  case 'text':
                    btn.text(settings[key][b][btnKey]);
                    break;
                  case 'className':
                    btn.addClass(settings[key][b][btnKey]);
                    break;
                  case 'idName':
                    btn.attr({
                      'id': settings[key][b][btnKey]
                    });
                    break;
                  case 'closeAlert':
                    if (typeof settings[key][b][btnKey] == 'object') {
                      var alertArguments = settings[key][b][btnKey];
                      alertArguments.push({'alertPriority': 1});
                      btn.event('click', function() {
                        alert.apply(this, alertArguments);
                        hideAlert();
                      });
                    }
                    else if (settings[key][b][btnKey] === true) {
                      btn.event('click', hideAlert);
                    }
                    break;
                  default:
                    if (typeof settings[key][b][btnKey] == 'function') {
                      btn.event(btnKey, settings[key][b][btnKey]);
                    }
                    break;
                }
              }
              btn.event('mousedown', btnEffectStart);
              alertButtons.appendChild(btn.getElement());
            }
            break;
        }
      }
    }

    // Add all the elements to alertItem
    alertItem = alertItem.getElement();
    alertItem.appendChild(alertIcon.getElement());
    alertItem.appendChild(alertTitle.getElement());
    alertItem.appendChild(alertDescription.getElement());
    alertItem.appendChild(alertButtons);
    alertItemFragment.appendChild(alertItem);
    // Checking if the 'alertPriority' flag doesn't equals to zero, push this alert to 'alertQueue' array, otherwise just add it to the queue
    if(alertPriority) {
      alertQueue.unshift(alertItemFragment);
    }
    else {
      alertQueue.push(alertItemFragment);
    }
  }

  // Just a simple effect for clicking on the buttons
  var btnEffectStart = function(e) {
    var bodyRect = document.body.getBoundingClientRect();
    var thisRect = this.getBoundingClientRect();
    var left = e.pageX - (thisRect.left - bodyRect.left);
    var top = e.pageY - (thisRect.top - bodyRect.top);
    this.style.setProperty('min-width', window.getComputedStyle(this).width);
    this.style.setProperty('overflow', 'hidden');
    this.style.setProperty('--posX', left + 'px');
    this.style.setProperty('--posY', top + 'px');
    this.style.setProperty('--width', (parseInt(window.getComputedStyle(this).width) * 2.5) + 'px');
    this.style.setProperty('--height', (parseInt(window.getComputedStyle(this).width) * 2.5) + 'px');
    this.style.setProperty('--opacity', '1');
  }
  // Add the alert to the DOM
  // Add the alert to '.customAlert-container > .customAlert-wrapper'
  var addAlertToDOM = function() {
    // Fetch an alert from the queue and add it to the DOM
    alertWrapper.appendChild(alertQueue.shift());
    // Change the flag of existing any alert in the DOM
    alertInDOM = true;
    // Show the alert with a simple animation and block the other user intractions with body
    showAlert();
  }
  // Remove alert from the DOM
  var removeAlertFromDOM = function() {
    // Make the '.customAlert-wrapper' empty
    alertWrapper.innerHTML = '';
    // Check if the queue of alerts is empty, hide the container as well
    if(!alertQueue.length) {
      alertContainer.classList.remove('customAlert-container-show');
      // Unblock the user intractions with body
      unFreezeBody();
      // Change the flag of exsiting any alert in the DOM
      alertInDOM = false;
    }
    else {
      // if there is still any alert in the queue, fetch it from the queue and run it
      addAlertToDOM();
    }
  }
  // Show the added alertItem
  var showAlert = function() {
    alertContainer.classList.add('customAlert-container-show');
    alertWrapper.classList.add('customAlert-wrapper-show');
    freezeBody();
    // Set an event listener for closing the alert with 'EscKey'
    document.addEventListener('keydown', hideAlertEscKey);
  }
  // Hide the existing alert
  var hideAlert = function() {
    alertWrapper.classList.remove('customAlert-wrapper-show');
    // Remove the event listener it's useless any more
    document.removeEventListener('keydown', hideAlertEscKey);
    // Remove the alert from the after a delay to run the fading out animation
    setTimeout(function() {
      removeAlertFromDOM();
    }, 300);
  }
  // Hide the alert with 'EscKey'
  var hideAlertEscKey = function(e) {
    if (e.keyCode == 27) {
      hideAlert();
    }
  }
  // Block the user intractions with body
  // Just stop the user from scrolling and disable any mouse or touch events
  var freezeBody = function() {
    document.body.classList.add('freeze-body');
    scrollFreezeX = document.documentElement.scrollLeft;
    scrollFreezeY = document.documentElement.scrollTop;
    window.addEventListener('scroll', freezeScroll);
  }
  // Unblock the user intractions with body
  var unFreezeBody = function() {
    document.body.classList.remove('freeze-body');
    window.removeEventListener('scroll', freezeScroll);
  }
  // Set the previous positions of scroll on scrolling to stop user from scrolling
  var freezeScroll = function() {
    window.scrollTo(scrollFreezeX, scrollFreezeY);
  }
}());
