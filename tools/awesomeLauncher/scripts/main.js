(function(){
  console.log("Welcome to Awesome Launcher!");

  var hasSelected = false;
  var selectIndex = 1;
  var itemLength = $(".launch-item-wrap").length;


  $(document).keydown(function(event){
    switch (event.which) {
      case 71: // G
        pressKeyG(event);
        break;
      case 37: // left
        pressKeyLeft(event);
        break;
      case 39: // right
        pressKeyRight(event);
        break;
      case 13: // enter
        pressKeyEnter(event);
        break;
      default:
        console.log("key pressed:", event);
    }
  });

  function pressKeyG (event) {
    if (hasSelected) {
      hasSelected = false;
      $(".launch-item-wrap .launch-item").removeClass("selected");
    } else {
      hasSelected = true;
      $(".launch-item-wrap:nth-of-type(" + selectIndex + ") .launch-item").addClass("selected");
    }
  }

  function pressKeyLeft (event) {
    if (hasSelected && (selectIndex > 1)) {
      selectIndex -= 1;
      $(".launch-item-wrap .launch-item").removeClass("selected");
      $(".launch-item-wrap:nth-of-type(" + selectIndex + ") .launch-item").addClass("selected");
    }
  }

  function pressKeyRight (event) {
    if (hasSelected && (selectIndex < itemLength)) {
      selectIndex += 1;
      $(".launch-item-wrap .launch-item").removeClass("selected");
      $(".launch-item-wrap:nth-of-type(" + selectIndex + ") .launch-item").addClass("selected");
    }
  }

  function pressKeyEnter (event) {
    if (hasSelected) {
      var href = $(".launch-item-wrap .launch-item.selected a").attr('href');
      // window.location.href = href;
      window.open(href, '_blank');
    }
  }

})();
