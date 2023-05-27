const a = [1, 3, 5, 2, 4];
const result1 = [];

for (let i = 0; i < a.length; i++) {
  const num = a[i];
  if (i % 2 === 0) {
    result1.push(num);
  }
}

console.log(result1); // Output: [1, 5, 4]
