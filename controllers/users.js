

module.exports = {
  show
}

function show(req, res){
  res.render('users/show', {
    title: req.user.name + "'s Profile",
    user: req.user
  })
}