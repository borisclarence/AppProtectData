import $ from "jquery";

function handleSubmitBehavior() {
  if ($(".confirmationCode-form").length > 0) {
    $(".confirmationCode-form")
      .find("input")
      .on("change input", () => {
        let smsCodeStatus = false,
          emailCodeStatus = false;
        $(".confirmationCode-form")
          .find("input")
          .each((i, elt) => {
            // i
            switch ($(elt).attr("type")) {
              case "text":
                if ("smsCode" === $(elt).attr("id")) {
                  smsCodeStatus = $(elt).val().length > 0;
                }
                if ("emailCode" === $(elt).attr("id")) {
                  emailCodeStatus = $(elt).val().length > 0;
                }
            }
          });

        if (smsCodeStatus && emailCodeStatus) {
          $(".confirmationCode-button").not("active").addClass("active");
        } else {
          $(".confirmationCode-button.active").removeClass("active");
        }
      });
  }
}

export { handleSubmitBehavior };
