//var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var check = document.getElementsByClassName("fa-check-square");

// Array.from(thumbUp).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp': thumbUp
//       })
//     })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         window.location.reload(true)
//       })
//   });
// });

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const task = this.parentNode.parentNode.childNodes[1].innerText
    console.log(task); //this is the correct task

    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('deletetask', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'task': task.trim(),
        // 'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});



Array.from(check).forEach(function (element) {
  element.addEventListener('click', function () {
    const task = this.parentNode.parentNode.childNodes[1].innerText
    console.log(task); //this is the correct task

    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('completetask', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'task': task.trim(),
        // 'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});





// Array.from(trash).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });