
(function($) {


  let addresses = [];
  let counter = 0;

$.ajax({
  url: 'http://demo3742896.mockable.io/addresses',
  data: { n: 'oracle', p: 'oc3' },
  success: function(data) {
      console.log(data);
       //document.getElementById("json").innerHTML = JSON.stringify(data);
   addressesData = data.parentOrganization.secondaryAddresses;
   
   for (let key in addressesData) {
    let obj = new Object();
    obj[key] = addressesData[key];
    addresses.push(obj)
   }
   showAdresses(counter, addresses);
  }
});


$('.list').on('click', '.globe-button', function(e){
  // console.log(e.target.dataset.user);
  let thisData = JSON.parse(e.target.dataset.user);
  let thisUser = Object.keys(JSON.parse(e.target.dataset.user));
  console.log(thisData, thisUser);
  $('.popup').html(`
    <div class="element-header">
      <h2 class="popup-header">${thisUser}</h2>
    </div>
    <div class="element-content">
      <ul class="popup-list">
        <li class="popup-address">${thisData[thisUser].address1}</li>
        <li class="popup-city">${thisData[thisUser].city}</li>
        <li class="popup-code">${thisData[thisUser].postalCode}</li>
        <li class="popup-state">${thisData[thisUser].state}</li>
      </ul>
    </div>
  `);

})

$('.list').on('scroll', function() {
  // $('.list').height();
  // console.log($('.list').height(), $('.address-item').height() * counter, $('.list').scrollTop());
  let listHeight = $('.address-item').height() * counter;
  if(listHeight < $('.list').scrollTop() + 120) {
    showAdresses(counter, addresses);
  }
})

function showAdresses(from, addresses) {

for (var i = from; i < from + 10; i++) {
    ++counter;
    for(let key in addresses[i]) {
      // console.log(addresses[i]);
      $('.list').append(`
        <li class="address-item">
          <button type="button">${key}</button>
          <img src="globe.png" class="globe-button" data-user='${JSON.stringify(addresses[i])}'/>
        </li>
      `)

    }
  }

}


  // Search function for search input
  $.fn.liveSearch = function(list, exclude) {
    var input = $(this),
      regexp = {
        provider: /provider:([a-zA-Z0-9\.\-\_]+)/i,
        email: /\@([a-zA-z0-9\-\_\.]+)/i
      },
      elements = list.children().not(exclude),
      filter = function() {
        var term = input.val().toLowerCase();

        elements.show().filter(function() {
          var text = $(this).text().toLowerCase(),
            open = term.replace(regexp.provider, '').trim(),
            found = term.match(regexp.provider);

          if (found) {
            if (text.indexOf('@' + found[1]) != -1 && !open) {
              return false;
            } else {
              if (open && text.indexOf('@' + found[1]) != -1) return text.replace(regexp.email, '').toLowerCase().indexOf(open) == -1;
            }
          }

          return text.replace(regexp.email, '').toLowerCase().indexOf(term) == -1;
        }).hide();
      };

    input.on('keyup select', filter);

    return this;
  };

  $('#search').liveSearch($('.list'), ':last-child');

})(jQuery);