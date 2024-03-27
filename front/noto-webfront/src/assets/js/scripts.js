function addEmptyField(value) {
  return value && value !== undefined && value !== null ? value : "";
}

//date
function parsingDate(date) {
  if (!date || date === undefined) return "01/01/1970";

  const date_day = new Date(date);

  const day =
    parseInt(date_day.getDate()) < 10
      ? "" + 0 + parseInt(date_day.getDate())
      : parseInt(date_day.getDate());

  const month =
    parseInt(date_day.getMonth() + 1) < 10
      ? "" + 0 + parseInt(date_day.getMonth() + 1)
      : parseInt(date_day.getMonth() + 1);

  return day + "/" + month + "/" + date_day.getFullYear();
}

//dynamic slashes
function addDynamicSlashes() {
  const inputDate = document.querySelector("#birthdate");

  inputDate.addEventListener("keyup", function (event) {
    const valueInput = event.target.value;

    if (valueInput.length <= 10) {
      if (valueInput.length >= 2) {
        if (
          // valueInput % 2 === 0 ||
          valueInput.length === 2 ||
          (valueInput.length === 5 && valueInput[valueInput.length - 1] !== "/")
        ) {
          event.target.value = valueInput + "/";
        }
      }
    }
  });
}

function countDecrement() {
  let time = 60;

  time = time - 1;

  if (time === 0) {
    return time;
  }

  return time;
}

function isDisabled(value) {
  document.getElementById(value).disabled;

  return true;
}

/**
 * Return array for list merchants
 */
function parsingArray(value) {
  let result = [];

  for (var i in value) {
    result.push([i, value[i]]);
  }

  let listParsed = [];

  result.map((value) => {
    let resultObj = {};
    resultObj["name"] = value[0];
    resultObj["merchants"] = value[1];
    resultObj["openCategory"] = false;

    listParsed.push(resultObj);

    return resultObj;
  });

  return listParsed;
}

/**
 * Return array for list merchants
 */
function parsingArrayForAccordion(value) {
  value.map((data) => {
    Object.assign(data, { openCategory: false });

    return data;
  });

  return value;
}

export {
  addEmptyField,
  parsingDate,
  addDynamicSlashes,
  countDecrement,
  isDisabled,
  parsingArray,
  parsingArrayForAccordion,
};
