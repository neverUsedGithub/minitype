import * as m from "../src";

const validator = m.object({
    user: m.object({
        username: m.string(),
        password: m.minLength(m.string(), 8),
        hobbies: m.array(m.string()),
        email: m.email(),
    }),
    test: m.union(m.literal("abc"), m.literal("efg")),
    foo: m.regex(/(foo)+/),
    partial: m.partial(
        m.object({
            a: m.number(),
            b: m.string(),
            c: m.literal(10),
        })
    ),
    abc: m.optional(m.literal(123)),
    tuple: m.tuple([m.string(), m.number()]),
});

type ValidatorOutput = m.infer<typeof validator>;
//   ^?

const output = validator.parse({
    user: {
        username: "user",
        password: "password",
        hobbies: [],
        email: "foo@bar.com",
    },
    test: "abc",
    foo: "foofoofoo",
    partial: {},
    tuple: ["e", 3]
});

console.log(output.tuple);