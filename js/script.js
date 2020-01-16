$('.btn1').click(function() {
  alert('This is just a message that can be shown in multi lines! This is just a message that can be shown in multi lines!',
  {
    alertTitle: 'Alert Title Alert Title Alert Title Alert Title Alert Title',
    alertType: 'success',
    alertButtons: [
      {
        text: '<input type="submit" value="Send Send Send Send Send">',
        className: 'customAlert-cancelBtn',
        closeAlert: [
          'p1-1 fwfwe fw efe wfwef wefwef we wef wefwef wef wef we',
          {
            alertType: 'warn',
            alertButtons: [
              {
                text: 'another alert',
                closeAlert: [
                  'p1-2', {
                    alertType: 'error'
                  }
                ]
              },
              {
                text: 'close alert',
                closeAlert: true
              },
            ]
          }
        ],
        click: function() {
          console.log('cancel something in this function!');
        },
      },
      {
        text: 'OKOK',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
      {
        text: 'ffe ww efee fwe few',
        className: 'customAlert-cancelBtn',
        closeAlert: true,
        click: function() {
          console.log('cancel something in this function!');
        },
      },
      {
        text: 'fewfwe',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
      {
        text: 'fewfefwefewfwefwefwe',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
      {
        text: '<input type="submit" value="Send Send Send Send Send">',
        className: 'customAlert-cancelBtn',
        closeAlert: true,
        click: function() {
          console.log('cancel something in this function!');
        },
      },
      {
        text: 'OKOK',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
      {
        text: 'ffewwefeefww',
        className: 'customAlert-cancelBtn',
        closeAlert: true,
        click: function() {
          console.log('cancel something in this function!');
        },
      },
      {
        text: 'fewfwefew',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
      {
        text: 'fewfefwefewfwefwefwe',
        className: 'customAlert-aaaaBtn',
        idName: 'fewfdde',
        closeAlert: true,
        click: function() {
          console.log('ok is clicked!');
        },
        mousedown: function() {
          console.log('ok is mousedown!');
        },
        mouseup: function() {
          console.log('ok is mouseup!');
        }
      },
    ]
  });
  alert('aaaaaaaaa');
  alert('bbbbbbb', {
    alertTitle: 'b alert title',
    alertType: 'success',
  });
  alert('ccccccc', {
    alertTitle: 'c alert title',
    alertType: 'error',
  });

});

$('.btn2').click(function() {
  alert('This is just another test for a simple info alert!');
  alert('توضیحات در این قسمت قرار می گیرد');
});
