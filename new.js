var x = 10;

function y() {
  var count = 0;
  function x() {
    count++;
    console.log("Y:", count);
  }
  console.log("x:", count);
  return x;
}

let z = y();
z();
z();
z();
