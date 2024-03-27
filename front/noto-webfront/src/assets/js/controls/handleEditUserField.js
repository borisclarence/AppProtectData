import $ from "jquery";

function handleEditUserField() {
  if ($(".editUserInformation-form").length > 0) {
    $(".editUserInformation-form")
      .find("input")
      .on("change input", () => {
        let firstnameStatus = false,
          lastnameStatus = false,
          dateStatus = false,
          checkboxStatus = false,
          emailStatus = false,
          telStatus = false;

        $(".editUserInformation-form")
          .find("input")
          .each((i, elt) => {
            // i
            switch ($(elt).attr("type")) {
              case "text":
                if ("firstname" === $(elt).attr("id")) {
                  firstnameStatus = $(elt).val().length > 0;
                }
                if ("lastname" === $(elt).attr("id")) {
                  lastnameStatus = $(elt).val().length > 0;
                }
                if ("birthdate" === $(elt).attr("id")) {
                  dateStatus = $(elt).val().length > 0;
                }
                break;
              case "email":
                emailStatus =
                  /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/.test(
                    $(elt).val()
                  );
                break;
              case "tel":
                telStatus = $(elt).val().length > 9 && $(elt).val().length < 13;
                break;
              case "checkbox":
                checkboxStatus = $(elt).is(":checked");
                break;
            }
          });

        if (
          firstnameStatus &&
          lastnameStatus &&
          dateStatus &&
          emailStatus &&
          telStatus &&
          telStatus &&
          checkboxStatus
        ) {
          $(".editUserInformation-button").not("active").addClass("active");
        } else {
          $(".editUserInformation-button.active").removeClass("active");
        }
      });
  }
}

export { handleEditUserField };
