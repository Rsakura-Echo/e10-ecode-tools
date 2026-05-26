
function getUserObj() {
  return window.TEAMS?.currentUser || {}
}

function getTkObj() {
  return window.TEAMS?.currentTenant || {}
}


console.info('user obj => ', getUserObj());
console.info('tenantKey obj => ', getTkObj());
