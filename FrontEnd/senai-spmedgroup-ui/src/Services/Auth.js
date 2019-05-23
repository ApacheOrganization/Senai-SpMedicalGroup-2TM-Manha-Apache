export const usuarioAutenticado = () => localStorage.getItem("usuario-lindao") !== null;

export const parseJwt = () => {
    var base64Url = localStorage.getItem("usuario-lindao").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    return JSON.parse(window.atob(base64));
}