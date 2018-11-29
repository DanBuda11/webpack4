import './styles/main.scss';

console.log('Hello World!');

const root = document.getElementById('root');
const root2 = document.getElementById('root2');

root.innerHTML = `<img src=${require('./images/big-img.jpg')} style="width: 300px;" />`;
root2.innerHTML = `<img src=${require('./images/bird.png')} />`;
root3.innerHTML = `<img src=${require('./images/apple.png')} />`;
