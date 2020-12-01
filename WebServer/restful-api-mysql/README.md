# READ ME

## Variables
```javascript
var a = 'Hellow World!'

let a - 'Hello World!'

const b = {};
```


## Functions
```javascript
function a() {}


```


## Array & Objects

```javascript
const arr = [1, 2, 3, 4, 5];
const [first, ...otherNumbers] = arr;

const obj = { name: 'bob' };
const { name } = obj;
```

## Promises

```javascript
const p = new Promise((resolve, reject) => {
  if (err) {
    reject(false);
  }
  resolve(true);
});

// old
p.then((val) => console.log(value)).catch((err) => console.log(err));

async function a() {
  return await p;
}
```
