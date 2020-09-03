let showMenu = false

const menu = document.getElementById('hidey')
const body = document.querySelector('body')

menu.addEventListener('click', function(){
  moveMenu()
})

function moveMenu(){
  if (showMenu){
    body.style.gridTemplateRows = "60px 1fr"
    showMenu = !showMenu
  } else {
    body.style.gridTemplateRows = "auto 1fr"
    showMenu = !showMenu
  }
}