export function hello(text) {
  console.log('Im in the module with msg: ' + text)
  const div = document.createElement('div');
  div.textContent = `Hello ${text}`;
  document.body.appendChild(div);
}
