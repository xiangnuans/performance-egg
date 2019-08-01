const loadHistory = {};
 
export default (url, attributes = {}) => {
  if (loadHistory[url]) {
    return loadHistory[url];
  }
  const script = window.document.createElement('SCRIPT');
  let promise;
  if (url.includes('callback'))  {
    promise = new Promise((resolve) => {
      window[url.substring(url.indexof('callback') + 9).split('&')[0]] = () => {
        resolve();
      };
    });
  } else {
    promise = new Promise((resolve) => {
      script.addEventListener('load', resolve);
    });
  }
  loadHistory[url] = promise;
  script.type = 'text/javascript';
  script.setAttribute('src', url);
  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    script.setAttribute(attributeName, attributeValue);    
  });
  window.document.body.appendChild(script);
  return promise;
}
