## Readme

[LINK TO DEMO](https://sage-druid-499257.netlify.app/)

The initial idea was to use [Konva text path](https://konvajs.org/docs/shapes/TextPath.html) to draw the text along an arc, but the calculations to center the text in that case seem off.

[ISSUE VIDEO](https://www.loom.com/share/21d13a4473ce4b15bfbcdc7e9fe9850c)

[Github bug report](https://github.com/konvajs/konva/issues/902)

The alternative was to implement the drawing in a custom shape, letter by letter, calculating every letter angle separately.
The drawback on this approach is that HTML canvas was used to draw the letters, since Konva has no functionality to do that, and in that case we lose the Konva drag and drop, and automatic selection and scaling functionality. Those functionalities can be implemented manually, which would require more effort.

At the current state of the app, this took me 16 hours to implement.
