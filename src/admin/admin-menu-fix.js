// @ts-ignore
function menuFix(slug) {
  const currentUrl  = window.location.href
  const isLocal     = currentUrl.indexOf('admin.html') > 0
  const currentPath = currentUrl.substr(currentUrl.indexOf(isLocal ? '#/' : 'admin.php'))
  const menuRoot    = document.querySelector(isLocal ? '.wp-menu-open' : `#toplevel_page_${slug}`)

  if (menuRoot) {
    menuRoot.addEventListener('click', function (e) {
      const target = e.target
      const items  = this.querySelectorAll('li')
      for (let i = 0; i < items.length; i++) {
        let  node = items[i];
        if (node !== e.target.parentElement) {
          node.classList.remove('current')
        } else {
          target.parentElement.classList.add('current')
        }
      }
    })

    var menu = menuRoot.querySelector(`.wp-submenu a[href="${currentPath}"`)
    if (menu) {
      menu.parentElement.classList.add('current')
    }
  }
}

export default menuFix;
