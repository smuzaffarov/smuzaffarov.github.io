//button
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});


//search
function search_title() {
  let input = document.querySelector('#search').value.toLowerCase()
  document.querySelectorAll('.options-car ul li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(input) ? '' : 'none'
  })
}
