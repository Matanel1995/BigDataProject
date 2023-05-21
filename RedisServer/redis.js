
console.time('mySection');
fetch("https://us1-ample-lacewing-40351.upstash.io/get/foo", {
  headers: {
    Authorization: "Bearer AZ2fASQgNWFkYzk2ZWQtZTgxZC00MDdiLWExZWItNzEwYjQ5ZGZhZTkzZWIxZjNmZDY1MGMwNDc5NWFiYjBmNWZkMDNlNTZkOWI="
  }
}).then(response => response.json())
  .then(data => console.log(data));
console.timeEnd('mySection')