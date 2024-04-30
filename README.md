# Minitype

A validation library with a simple API thats easily treeshakeable.

# Usage example

```ts
import { object, string, number } from "@justcoding123/minitype";

const validator = object({
    name: string(),
    age: number(),
});

validator.parse(data); // Will throw an Error on validation errors
validator.safeParse(data); // Wont throw an Error on validation errors
```
