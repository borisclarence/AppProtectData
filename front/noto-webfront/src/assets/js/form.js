import $ from "jquery";

export const hideItemsOnCollapseOpened = (selector) => {
  const $btn = $(selector).find('button[data-toggle="collapse"]');
  $btn.on("click", (e) => {
    const $parentHead = $(e.currentTarget).parents(
      ".marchand-list__item__head"
    );
    const $untoggledItems = $(selector)
      .find(".marchand-list__item__head")
      .not("#" + $parentHead.attr("id"))
      .parent();
    $untoggledItems.toggleClass("custom-hide");
  });
};

export const checkAllCheckboxListOnClick = (
  toggler,
  container,
  targetContainerClass
) => {
  $(toggler)
    .find("input")
    .on("change", (e) => {
      const $target = $(e.currentTarget)
        .parents(".marchand-list__item__head")
        .next(container)
        .find(targetContainerClass + " input");
      $(e.currentTarget).is(":checked")
        ? $target.prop("checked", true)
        : $target.prop("checked", false);
    });
};

export const checkAllCategories = (toggler, target) => {
  $(toggler).on("change", (e) => {
    $(target).trigger("click");
    $(e.currentTarget).is(":checked")
      ? $(target).not(":checked").trigger("click")
      : $(target + ":checked").trigger("click");
  });
};

export const onCheckboxSwipe = () => {
  const $input = $(".custom-radio-container .checkmark");
  $input.on("touchstart", handleTouchStart);
  $input.on("touchmove", handleTouchMove);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  }

  function handleTouchStart(evt) {
    // evt.preventDefault();
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    // evt.preventDefault();
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      var target = $(evt.target).prev("input");
      /*most significant*/
      if (xDiff > 0 && target.is(":checked")) {
        target.prop("checked", false);
      }
      if (xDiff <= 0 && !target.is(":checked")) {
        target.prop("checked", true);
      }
    }

    /* reset values */
    xDown = null;
    yDown = null;
  }
};
