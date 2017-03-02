class Storage {

  getAuthToken() {
//noinspection TypeScriptUnresolvedFunction
    return localStorage.getItem('token');
  }

  setAuthToken(token:any) {
//noinspection TypeScriptUnresolvedFunction
    localStorage.setItem('token', token);
  }

  removeAuthToken() {
//noinspection TypeScriptUnresolvedFunction
    localStorage.clear();
  }

  setRoleToken(role:any){
//noinspection TypeScriptUnresolvedFunction
    localStorage.setItem('role', role);
  }

  setNameToken(name:any){
//noinspection TypeScriptUnresolvedFunction
    localStorage.setItem('name', name);
  }

  getRoleToken(){
//noinspection TypeScriptUnresolvedFunction
    return localStorage.getItem('role');
  }

  getNameToken(){
//noinspection TypeScriptUnresolvedFunction
    return localStorage.getItem('name');
  }

  getIdToken(){
//noinspection TypeScriptUnresolvedFunction
    return localStorage.getItem('user_id');
  }
}

export const storage = new Storage();
