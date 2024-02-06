const userInvalid = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com', 
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
  
  const emailInvalid = {
    email: 'rthrthsrth.com',
    password: 'secret_admin'
  }
  
  const passwordInvalid= {
    email: 'admin@admin.com',
    password: ' '
  }
  
  const loginOk = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  
  export { userInvalid, emailInvalid, passwordInvalid, loginOk };