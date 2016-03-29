#teleport-test

Testing Teleport's API (and at the same time advancing my knowledge of Babel/ES7
and Node.js in general).

## Install
```
git clone https://github.com/thijsputman/teleport-test
npm install
```

### Usage
```
npm run teleport [city] <fact>
```

When `<fact>` is omitted the script will output a list of all potential facts
for the specified city; specify a single fact (case-insenstive) to see the
information for that city/fact combination. For example:

```
npm run teleport eindhoven traffic
```

```
[ { data:
     [ { float_value: 0.7551,
         id: 'TRAFFIC-INDEX-TELESCORE',
         label: 'Traffic handling [Teleport score]',
         type: 'float' } ],
    id: 'TRAFFIC',
    label: 'Commute' } ]
```

The `npm run`-command is used purely for its convenience. In the background it
does nothing more than execute `babel-node teleport.js ...`, but within the
correct context so it automatically finds all required, locally installed,
node-modules.

### Development
By far the easiest approach is to use a recent version of
[**VSCode**](https://code.visualstudio.com/); simply opening the **teleport-test**
folder in VSCode will set you up with a fully functional development environment
(including finline linting support backed by ESLint/Babel).

If you prefer another editor, use the following command to test your modifications:

```
npm run test
```

Again for convenience, in the end this is nothing more than `eslint teleport.js`
(set up to use `babel-eslint` trhoug the included `.eslintrc`).